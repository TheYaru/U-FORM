from flask import Flask, make_response, jsonify, request, Blueprint
from flask_cors import CORS
from app.routes.form_routes import form_bp
from app.routes.auth_routes import auth_bp
from flask_jwt_extended import JWTManager, jwt_required
import os

def create_app():
    app = Flask(__name__)
    
    # Configuración JWT
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET", "super-secret-key")
    jwt = JWTManager(app)
    
    # Configuración CORS
    CORS(app, resources={r"/*": {"origins": "*"}})

    @app.before_request
    def handle_options():
        if request.method == "OPTIONS":
            response = make_response()
            response.headers.add("Access-Control-Allow-Origin", "*")
            response.headers.add("Access-Control-Allow-Headers", "*")
            response.headers.add("Access-Control-Allow-Methods", "*")
            return response
    
    # Registrar blueprints
    app.register_blueprint(form_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api')
    
    @app.route('/')
    def index():
        return "Backend U-FORM funcionando"
    
    # Ruta para verificar conexión a MongoDB
    @app.route('/testdb')
    def test_db():
        try:
            from .database import forms_collection
            count = forms_collection.count_documents({})
            return {
                "status": "success",
                "message": f"Connected to MongoDB. Forms count: {count}"
            }
        except Exception as e:
            return {
                "status": "error",
                "message": f"Database connection failed: {str(e)}"
            }, 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000, host='0.0.0.0')