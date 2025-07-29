from app.database import forms_collection  
from datetime import datetime
from bson import ObjectId
class Form:
    def __init__(self, data):
        self.student = {
            'fullName': data.get('student', {}).get('fullName', ''),
            'documentType': data.get('student', {}).get('documentType', 'CC'),
            'documentNumber': data.get('student', {}).get('documentNumber', ''),
            'educationLevel': data.get('student', {}).get('educationLevel', 'Tecnología'),
            'academicProgram': data.get('student', {}).get('academicProgram', ''),
            'phone': data.get('student', {}).get('phone', ''),
            'email': data.get('student', {}).get('email', '')
        }
        
        self.company = {
            'name': data.get('company', {}).get('name', ''),
            'legalRepresentative': data.get('company', {}).get('legalRepresentative', ''),
            'nit': data.get('company', {}).get('nit', ''),
            'economicActivity': data.get('company', {}).get('economicActivity', ''),
            'economicSector': data.get('company', {}).get('economicSector', ''),
            'nationality': data.get('company', {}).get('nationality', ''),
            'size': data.get('company', {}).get('size', ''),
            'website': data.get('company', {}).get('website', ''),
            'address': data.get('company', {}).get('address', ''),
            'phone': data.get('company', {}).get('phone', '')
        }
        
        self.boss = {
            'fullName': data.get('boss', {}).get('fullName', ''),
            'position': data.get('boss', {}).get('position', ''),
            'email': data.get('boss', {}).get('email', ''),
            'phone': data.get('boss', {}).get('phone', '')
        }
        
        self.practice = {
            'modality': data.get('practice', {}).get('modality', 'CONVENIO'),
            'subModality': data.get('practice', {}).get('subModality', 'Regional o Nacional'),
            'position': data.get('practice', {}).get('position', ''),
            'department': data.get('practice', {}).get('department', ''),
            'startDate': data.get('practice', {}).get('startDate', ''),
            'endDate': data.get('practice', {}).get('endDate', ''),
            'workSchedule': data.get('practice', {}).get('workSchedule', ''),
            'isPaid': data.get('practice', {}).get('isPaid', False),
            'salary': data.get('practice', {}).get('salary', ''),
            'providesUniform': data.get('practice', {}).get('providesUniform', False),
            'functions': data.get('practice', {}).get('functions', ''),
            'resources': {
                'computer': data.get('practice', {}).get('resources', {}).get('computer', False),
                'others': data.get('practice', {}).get('resources', {}).get('others', False),
                'othersDescription': data.get('practice', {}).get('resources', {}).get('othersDescription', '')
            },
            'advisor': data.get('practice', {}).get('advisor', ''),
            'hours': data.get('practice', {}).get('hours', '')  # Nuevo campo para horas mínimas
        }
        
        self.commitments = {
            'reports': data.get('commitments', {}).get('reports', False),
            'compliance': data.get('commitments', {}).get('compliance', False),
            'attendance': data.get('commitments', {}).get('attendance', False),
            'confidentiality': data.get('commitments', {}).get('confidentiality', False),
            'intellectualProperty': data.get('commitments', {}).get('intellectualProperty', False)
        }
        
        self.signatures = {
            'student': data.get('signatures', {}).get('student', ''),
            'boss': data.get('signatures', {}).get('boss', ''),
            'advisor': data.get('signatures', {}).get('advisor', '')
        }
        
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