#!/bin/sh
set -e

echo "🟢 Generando .env dentro del contenedor con variables pasadas por docker run"

# Escribe solo las variables necesarias
# (puedes editar esta lista según tus necesidades)
echo "MONGO_URL=${MONGO_URL}" > .env
echo "FLASK_APP=${FLASK_APP}" >> .env
echo "FLASK_ENV=${FLASK_ENV}" >> .env
echo "JWT_SECRET=${JWT_SECRET}" >> .env

echo "✅ Contenido de .env generado:"
cat .env

# Ejecuta la app como módulo
exec python -m app.main
