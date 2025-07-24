from app.database import db
from datetime import datetime
from bson import ObjectId

class User:
    def __init__(self, data):
        self.email = data.get('email')
        self.password = data.get('password')  
        self.name = data.get('name')
        self.role = data.get('role', 'admin')
        self.created_at = datetime.now()

    def save(self):
        user_data = {
            "email": self.email,
            "password": self.password,  
            "name": self.name,
            "role": self.role,
            "created_at": self.created_at
        }
        return db.users.insert_one(user_data).inserted_id

    @staticmethod
    def get_by_email(email):
        return db.users.find_one({"email": email})

    @staticmethod
    def check_password(stored_password, input_password):
        # Comparación directa sin hashing
        return stored_password == input_password