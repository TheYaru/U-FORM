from app.database import forms_collection  
from datetime import datetime
from bson import ObjectId
class Form:
    def __init__(self, data):
        self.student = data.get('student', {})
        self.company = data.get('company', {})
        self.boss = data.get('boss', {})
        self.practice = data.get('practice', {})
        self.commitments = data.get('commitments', {})
        self.signatures = data.get('signatures', {})
        self.created_at = datetime.now()
        self.status = "pending"

    def save(self):
        form_data = {
            "student": self.student,
            "company": self.company,
            "boss": self.boss,
            "practice": self.practice,
            "commitments": self.commitments,
            "signatures": self.signatures,
            "created_at": self.created_at,
            "status": self.status
        }
        return forms_collection.insert_one(form_data).inserted_id

    @staticmethod
    def get_by_id(form_id):
        return forms_collection.find_one({"_id": ObjectId(form_id)})
        
    @staticmethod
    def update_status(form_id, new_status):
        result = forms_collection.update_one(
            {"_id": ObjectId(form_id)},
            {"$set": {"status": new_status}}
        )
        return result.modified_count > 0