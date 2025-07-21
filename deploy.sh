#!/bin/bash
set -e

# --- Logging ---
LOG_FILE="deploy.log"
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}
log "--- INICIO DE DESPLIEGUE ---"

# Configuración
BUCKET="www.sinaloagaming.com"
DISTRIBUTION_ID="E16M0KWR9LJGLZ"

# Validar existencia de .env y variables necesarias
if [ ! -f .env ]; then
  log "Error: No se encontró el archivo .env en el directorio actual."
  echo "Error: No se encontró el archivo .env en el directorio actual. Por favor crea uno con GOOGLE_INDEXING_API_KEY y GOOGLE_INDEXING_JSON."
  exit 1
fi

# Cargar variables de .env
set -a
. ./.env
set +a

if [ -z "$GOOGLE_INDEXING_API_KEY" ] || [ -z "$GOOGLE_INDEXING_JSON" ]; then
  log "Error: Las variables GOOGLE_INDEXING_API_KEY y/o GOOGLE_INDEXING_JSON no están configuradas en el archivo .env."
  echo "Error: Las variables GOOGLE_INDEXING_API_KEY y/o GOOGLE_INDEXING_JSON no están configuradas en el archivo .env."
  exit 1
fi

# Decoración ASCII
clear
cat <<'EOF'

  _________.__              .__                   ________               .__                
 /   _____/|__| ____ _____  |  |   _________     /  _____/_____    _____ |__| ____    ____  
 \_____  \ |  |/    \\__  \ |  |  /  _ \__  \   /   \  ___\__  \  /     \|  |/    \  / ___\ 
 /        \|  |   |  \/ __ \|  |_(  <_> ) __ \_ \    \_\  \/ __ \|  Y Y  \  |   |  \/ /_/  >
/_______  /|__|___|  (____  /____/\____(____  /  \______  (____  /__|_|  /__|___|  /\___  / 
        \/         \/     \/                \/          \/     \/      \/        \//_____/  
 __      __      ___.          .__  __                                                      
/  \    /  \ ____\_ |__   _____|__|/  |_  ____                                              
\   \/\/   // __ \| __ \ /  ___/  \   __\/ __ \                                             
 \        /\  ___/| \_\ \\___ \|  ||  | \  ___/                                             
  \__/\  /  \___  >___  /____  >__||__|  \___  >                                            
       \/       \/    \/     \/              \/                                             
                                          SG.com Website Deploy
EOF

echo "\n"

# Paso 1: Optimización de imágenes
echo "[1 de 4] ¿Deseas optimizar todas las imágenes (png, jpg, jpeg, webp) en website/statics/? (s/n)"
read -r OPTIMIZAR_IMG
if [ "$OPTIMIZAR_IMG" = "s" ]; then
  BASE_DIR="website/statics/"
  if [ ! -d "$BASE_DIR" ]; then
    log "Error: La carpeta de imágenes ($BASE_DIR) no existe."
    echo "Error: La carpeta de imágenes ($BASE_DIR) no existe."
  else
    # PNG
    if command -v optipng &> /dev/null; then
      log "Optimizando imágenes PNG..."
      find "$BASE_DIR" -type f -iname '*.png' | while read -r img; do
        log "Comprimiendo $img ..."
        optipng -quiet "$img"
      done
    else
      log "Advertencia: optipng no está instalado. Las imágenes PNG no se optimizarán."
      echo "Advertencia: optipng no está instalado. Las imágenes PNG no se optimizarán."
    fi
    # JPG/JPEG
    if command -v jpegoptim &> /dev/null; then
      log "Optimizando imágenes JPG/JPEG..."
      find "$BASE_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) | while read -r img; do
        log "Comprimiendo $img ..."
        jpegoptim --strip-all --quiet "$img"
      done
    else
      log "Advertencia: jpegoptim no está instalado. Las imágenes JPG/JPEG no se optimizarán."
      echo "Advertencia: jpegoptim no está instalado. Las imágenes JPG/JPEG no se optimizarán."
    fi
    # WEBP
    if command -v cwebp &> /dev/null; then
      log "Optimizando imágenes WEBP..."
      find "$BASE_DIR" -type f -iname '*.webp' | while read -r img; do
        log "Recomprimiendo $img ..."
        cwebp -quiet "$img" -o "$img"
      done
    else
      log "Advertencia: cwebp no está instalado. Las imágenes WEBP no se optimizarán."
      echo "Advertencia: cwebp no está instalado. Las imágenes WEBP no se optimizarán."
    fi
    log "¡Optimización de imágenes completada!"
    echo "¡Optimización de imágenes completada!"
  fi
else
  log "Saltando optimización de imágenes."
  echo "Saltando optimización de imágenes."
fi

# Paso 2: Sincronización a S3
echo "[2 de 4] ¿Deseas sincronizar archivos a S3? (s/n)"
read -r DEPLOY_S3
if [ "$DEPLOY_S3" = "s" ]; then
  log "Sincronizando archivos a S3..."
  echo "Sincronizando archivos a S3..."
  aws s3 sync website/ s3://$BUCKET/ --delete && log "Sincronización a S3 completada." || { log "Error en la sincronización a S3."; exit 1; }
else
  log "Saltando sincronización a S3."
  echo "Saltando sincronización a S3."
fi

# Paso 3: Invalidación de CloudFront
echo "[3 de 4] ¿Deseas invalidar la caché de CloudFront? (s/n)"
read -r INVALIDAR_CF
if [ "$INVALIDAR_CF" = "s" ]; then
  log "Invalidando caché de CloudFront..."
  echo "Invalidando caché de CloudFront..."
  aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" && log "Invalidación de CloudFront completada." || { log "Error en la invalidación de CloudFront."; exit 1; }
else
  log "Saltando invalidación de CloudFront."
  echo "Saltando invalidación de CloudFront."
fi

echo "TERMINADO!"
log "--- FIN DE DESPLIEGUE ---"