#!/bin/bash
set -e

IMAGES_DIR="website/statics/favicon"

if [ ! -d "$IMAGES_DIR" ]; then
  echo "Error: La carpeta de imágenes ($IMAGES_DIR) no existe."
  exit 1
fi

if ! command -v optipng &> /dev/null; then
  echo "Error: optipng no está instalado. Instálalo con: sudo apt-get install optipng"
  exit 1
fi

if ! command -v cwebp &> /dev/null; then
  echo "Error: cwebp no está instalado. Instálalo con: sudo apt-get install webp"
  exit 1
fi

echo "Optimizando imágenes PNG en $IMAGES_DIR ..."
for img in "$IMAGES_DIR"/*.png; do
  if [ -f "$img" ]; then
    echo "Comprimiendo $img ..."
    optipng -quiet "$img"
    # (Opcional) Convierte a WebP
    # cwebp -quiet "$img" -o "${img%.png}.webp"
  fi
done

echo "¡Optimización de imágenes completada!"

# Configuración
BUCKET="www.sinaloagaming.com"
DISTRIBUTION_ID="E16M0KWR9LJGLZ"

# Sincroniza archivos a S3
echo "Sincronizando archivos a S3..."
aws s3 sync website/ s3://$BUCKET/ --delete

# Invalida caché de CloudFront
echo "Invalidando caché de CloudFront..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "¡Despliegue completo!" 

