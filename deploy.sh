#!/bin/bash

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