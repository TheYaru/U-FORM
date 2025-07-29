from flask import Blueprint, request, jsonify, Response
from app.database import forms_collection
from app.schemas import Form
from bson import ObjectId
import json
from flask_jwt_extended import jwt_required
from datetime import datetime
from io import BytesIO
from app.excel_generator import generate_practice_excel

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

# NUEVA RUTA: Obtener formulario por ID
@form_bp.route('/forms/<form_id>', methods=['GET'])
def get_form(form_id):
    try:
        form = forms_collection.find_one({'_id': ObjectId(form_id)})
        if not form:
            return jsonify({"error": "Formulario no encontrado"}), 404
        form['_id'] = str(form['_id'])
        return jsonify(form), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@form_bp.route('/forms/<form_id>/sign', methods=['PUT'])
def sign_form(form_id):
    try:
        data = request.json
        signatures = data.get('signatures', {})
        
        update_data = {
            "signatures.student": signatures.get('student', ''),
            "signatures.boss": signatures.get('boss', ''),
            "signatures.advisor": signatures.get('advisor', ''),
            "signed_at": datetime.now()
        }
        
        result = forms_collection.update_one(
            {"_id": ObjectId(form_id)},
            {"$set": update_data}
        )

        if result.modified_count > 0:
            return jsonify({"message": "Firmas guardadas exitosamente"}), 200
        return jsonify({"error": "Formulario no encontrado"}), 404
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
    
@form_bp.route('/forms/<form_id>', methods=['PUT'])
def update_form(form_id):
    data = request.json
    # Elimina el campo _id si viene en el body para evitar error de Mongo
    if '_id' in data:
        del data['_id']
    result = forms_collection.update_one(
        {'_id': ObjectId(form_id)},
        {'$set': data}
    )
    if result.matched_count:
        return jsonify({"message": "Formulario actualizado correctamente"}), 200
    else:
        return jsonify({"error": "Formulario no encontrado"}), 404
    
@form_bp.route('/forms/<form_id>/download', methods=['GET'])
@jwt_required()
def download_form(form_id):
    try:
        form = forms_collection.find_one({"_id": ObjectId(form_id)})
        if not form:
            return jsonify({"error": "Formulario no encontrado"}), 404
        
        # Generar el Excel
        excel_file = generate_practice_excel(form)
        
        # Crear respuesta
        output = BytesIO()
        excel_file.save(output)
        output.seek(0)
        
        return Response(
            output,
            mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={
                "Content-Disposition": f"attachment; filename=formato_practica_{form_id}.xlsx",
                "Cache-Control": "no-cache"
            }
        )
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500