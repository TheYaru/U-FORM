Manual de Instalación y Despliegue - U-FORM

--------------------------------------------------------------------------------------------------------------------

Descripción General
U-FORM es una plataforma para la gestión de prácticas universitarias, desarrollada con:

  Frontend: React + Vite
  Backend: Flask (Python)
  Base de datos: MongoDB
  Requisitos Previos
  Node.js (v18 o superior)
  pnpm (gestor de paquetes para Node.js)
  Python (3.10 o superior)
  pip (gestor de paquetes de Python)
  MongoDB (local o en la nube)
  Docker y Docker Compose (opcional, para despliegue en contenedores)
  Dependencias Principales
  Backend (Flask)
  Flask
  Flask-CORS
  Flask-JWT-Extended
  pymongo
  python-dotenv
  openpyxl
  (y otras listadas en requirements.txt)
  Frontend (React + Vite)
  React
  Vite
  pnpm
  react-router-dom
  axios
  tailwindcss
  react-signature-canvas
  chart.js
  react-chartjs-2
  (y otras listadas en package.json)

--------------------------------------------------------------------------------------------------------------------

Instalación y Ejecución Manual
1. Clonar el repositorio
   git clone https://github.com/TheYaru/U-FORM.git
  cd U-FORM
2. Backend (Flask)
   cd backend
  pip install -r requirements.txt
a) Instalar dependencias
b) Configurar variables de entorno
Crea un archivo .env en la carpeta backend (opcional):

1 vulnerabilidad
c) Ejecutar el backend python -m app.main
El backend estará disponible en http://localhost:5000

3. Frontend (React + Vite)
a) Instalar dependencias
  cd ../frontend
  pnpm install
b) Configurar variables de entorno
Crea un archivo .env en la carpeta frontend si necesitas cambiar la URL del backend:

c) Ejecutar el frontend
El frontend estará disponible en http://localhost:5173
(Revisa la consola por si el puerto cambia).
pnpm dev

--------------------------------------------------------------------------------------------------------------------

Estructura del Proyecto
  U-FORM/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md

--------------------------------------------------------------------------------------------------------------------

Acceso
Frontend: http://localhost:3000
Backend API: http://localhost:5000
MongoDB: localhost:27017
