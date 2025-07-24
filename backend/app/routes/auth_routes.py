from flask import Blueprint, request, jsonify
from app.models.user import User
from flask_jwt_extended import create_access_token
import datetime
from bson import ObjectId

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    user = User.get_by_email(email)
    
    if not user:
        return jsonify({"error": "Credenciales inválidas"}), 401
        
    # Comparación directa sin hashing
    if user['password'] != password:
        return jsonify({"error": "Credenciales inválidas"}), 401
        
    # Crear token de acceso
    expires = datetime.timedelta(days=1)
    access_token = create_access_token(
        identity=str(user['_id']),
        expires_delta=expires,
        additional_claims={
            "name": user.get('name', ''),
            "email": user.get('email', ''),
            "role": user.get('role', 'admin')
        }
    )
    
    return jsonify({
        "token": access_token,
        "user": {
            "id": str(user['_id']),
            "name": user.get('name', ''),
            "email": user.get('email', ''),
            "role": user.get('role', 'admin')
        }
    }), 200

@auth_bp.route('/admin/verify', methods=['GET'])
def verify_token():
    # En una implementación real usaríamos @jwt_required()
    # Pero para simplificar, asumimos que el token es válido
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    
    # En una implementación real verificaríamos el token JWT
    # Aquí simplemente devolvemos un usuario de prueba
    return jsonify({
        "user": {
            "id": "6478a1b2c45d82eabf8d7e9f",
            "name": "Admin Demo",
            "email": "admin@universidad.edu.co",
            "role": "admin"
        }
    }), 200

@auth_bp.route('/admin/login', methods=['OPTIONS'])
def handle_login_options():
    return jsonify({}), 200