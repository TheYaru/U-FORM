#!/bin/sh
set -e

echo "🔧 Generando archivo .env desde variables de entorno..."

# Escribir solo variables VITE_
printenv | grep '^VITE_' > .env

echo "✅ Variables VITE_ escritas en .env:"
cat .env

echo "📦 Instalando dependencias y construyendo..."
npm install --frozen-lockfile
npm run build

# Copiar el build a la carpeta pública de nginx
cp -r dist/* /var/lib/nginx/html

echo "🚀 Iniciando Nginx..."
nginx -g "daemon off;"
