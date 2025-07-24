from flask import Blueprint, request, jsonify
from app.database import forms_collection
from app.schemas import Form
from bson import ObjectId
import json
from flask_jwt_extended import jwt_required
from datetime import datetime

form_bp = Blueprint('form', __name__)

@form_bp.route('/forms', methods=['GET'])
def get_forms():
    try:
        forms = list(forms_collection.find({}))
        for form in forms:
            form['_id'] = str(form['_id'])
        return jsonify(forms), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@form_bp.route('/forms/<form_id>/sign', methods=['PUT'])
def sign_form(form_id):
    try:
        data = request.json
        role = data.get('role')
        signature = data.get('signature')
        update_data = {f"signatures.{role}": signature}
        
        result = forms_collection.update_one(
            {"_id": ObjectId(form_id)},
            {"$set": update_data}
        )

        if result.modified_count > 0:
            return jsonify({"message": "Signature added successfully"}), 200
        return jsonify({"error": "Form not updated"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@form_bp.route('/forms', methods=['POST'])
def create_form():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        form = Form(data)
        form_id = form.save()
        return jsonify({"message": "Formulario creado exitosamente", "id": str(form_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@form_bp.route('/forms/<form_id>', methods=['PATCH'])
@jwt_required()
def update_form(form_id):
    try:
        # Verificar que el ID sea válido
        if not ObjectId.is_valid(form_id):
            return jsonify({"error": "ID de formulario inválido"}), 400
        
        data = request.get_json()
        new_status = data.get('status')
        
        if not new_status:
            return jsonify({"error": "El campo 'status' es requerido"}), 400
        
        # Actualizar en MongoDB
        result = forms_collection.update_one(
            {"_id": ObjectId(form_id)},
            {"$set": {"status": new_status}}
        )
        
        if result.modified_count == 0:
            return jsonify({"error": "Formulario no encontrado o sin cambios"}), 404
        
        return jsonify({
            "message": "Estado actualizado correctamente",
            "form_id": form_id,
            "new_status": new_status
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
