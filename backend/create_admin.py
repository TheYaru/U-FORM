from app.models.user import User

if __name__ == '__main__':
    admin_data = {
        'email': 'admin@fesc.edu.co',
        'password': 'password123',  # Contraseña en texto plano
        'name': 'Administrador FESC',
        'role': 'admin'
    }
    
    admin = User(admin_data)
    admin_id = admin.save()
    print(f"Usuario administrador creado con ID: {admin_id}")