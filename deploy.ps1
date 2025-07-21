$ErrorActionPreference = "Stop"

# --- Logging ---
$LOG_FILE = "deploy.log"
function Log($msg) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "[$timestamp] $msg" | Tee-Object -FilePath $LOG_FILE -Append
}
Log "--- INICIO DE DESPLIEGUE ---"

# Configuración
$BUCKET = "www.sinaloagaming.com"
$DISTRIBUTION_ID = "E16M0KWR9LJGLZ"

# Validar existencia de .env
if (!(Test-Path ".env")) {
    Log "Error: No se encontró el archivo .env en el directorio actual."
    Write-Host "Error: No se encontró el archivo .env en el directorio actual. Por favor crea uno con GOOGLE_INDEXING_API_KEY y GOOGLE_INDEXING_JSON."
    exit 1
}

# Cargar variables de .env
Get-Content .env | ForEach-Object {
    if ($_ -match "^(.*?)=(.*)$") {
        Set-Variable -Name $matches[1] -Value $matches[2]
    }
}

if (-not $GOOGLE_INDEXING_API_KEY -or -not $GOOGLE_INDEXING_JSON) {
    Log "Error: Las variables GOOGLE_INDEXING_API_KEY y/o GOOGLE_INDEXING_JSON no están configuradas en el archivo .env."
    Write-Host "Error: Las variables GOOGLE_INDEXING_API_KEY y/o GOOGLE_INDEXING_JSON no están configuradas en el archivo .env."
    exit 1
}

Clear-Host
Write-Host @"
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
"@

# Paso 1: Optimización de imágenes
$opt = Read-Host "[1 de 4] ¿Deseas optimizar todas las imágenes (png, jpg, jpeg, webp) en website/statics/? (s/n)"
if ($opt -eq "s") {
    $BASE_DIR = "website/statics/"
    if (!(Test-Path $BASE_DIR)) {
        Log "Error: La carpeta de imágenes ($BASE_DIR) no existe."
        Write-Host "Error: La carpeta de imágenes ($BASE_DIR) no existe."
    } else {
        # PNG
        if (Get-Command optipng -ErrorAction SilentlyContinue) {
            Log "Optimizando imágenes PNG..."
            Get-ChildItem -Path $BASE_DIR -Recurse -Include *.png | ForEach-Object {
                Log "Comprimiendo $($_.FullName) ..."
                optipng -quiet $_.FullName
            }
        } else {
            Log "Advertencia: optipng no está instalado. Las imágenes PNG no se optimizarán."
            Write-Host "Advertencia: optipng no está instalado. Las imágenes PNG no se optimizarán."
        }
        # JPG/JPEG
        if (Get-Command jpegoptim -ErrorAction SilentlyContinue) {
            Log "Optimizando imágenes JPG/JPEG..."
            Get-ChildItem -Path $BASE_DIR -Recurse -Include *.jpg,*.jpeg | ForEach-Object {
                Log "Comprimiendo $($_.FullName) ..."
                jpegoptim --strip-all --quiet $_.FullName
            }
        } else {
            Log "Advertencia: jpegoptim no está instalado. Las imágenes JPG/JPEG no se optimizarán."
            Write-Host "Advertencia: jpegoptim no está instalado. Las imágenes JPG/JPEG no se optimizarán."
        }
        # WEBP
        if (Get-Command cwebp -ErrorAction SilentlyContinue) {
            Log "Optimizando imágenes WEBP..."
            Get-ChildItem -Path $BASE_DIR -Recurse -Include *.webp | ForEach-Object {
                Log "Recomprimiendo $($_.FullName) ..."
                cwebp -quiet $_.FullName -o $_.FullName
            }
        } else {
            Log "Advertencia: cwebp no está instalado. Las imágenes WEBP no se optimizarán."
            Write-Host "Advertencia: cwebp no está instalado. Las imágenes WEBP no se optimizarán."
        }
        Log "¡Optimización de imágenes completada!"
        Write-Host "¡Optimización de imágenes completada!"
    }
} else {
    Log "Saltando optimización de imágenes."
    Write-Host "Saltando optimización de imágenes."
}

# Paso 2: Sincronización a S3
$opt = Read-Host "[2 de 4] ¿Deseas sincronizar archivos a S3? (s/n)"
if ($opt -eq "s") {
    Log "Sincronizando archivos a S3..."
    Write-Host "Sincronizando archivos a S3..."
    aws s3 sync website/ "s3://$BUCKET/" --delete
    if ($LASTEXITCODE -eq 0) {
        Log "Sincronización a S3 completada."
    } else {
        Log "Error en la sincronización a S3."
        exit 1
    }
} else {
    Log "Saltando sincronización a S3."
    Write-Host "Saltando sincronización a S3."
}

# Paso 3: Invalidación de CloudFront
$opt = Read-Host "[3 de 4] ¿Deseas invalidar la caché de CloudFront? (s/n)"
if ($opt -eq "s") {
    Log "Invalidando caché de CloudFront..."
    Write-Host "Invalidando caché de CloudFront..."
    aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
    if ($LASTEXITCODE -eq 0) {
        Log "Invalidación de CloudFront completada."
    } else {
        Log "Error en la invalidación de CloudFront."
        exit 1
    }
} else {
    Log "Saltando invalidación de CloudFront."
    Write-Host "Saltando invalidación de CloudFront."
}

Write-Host "¡Despliegue completo!"
Log "¡Despliegue completo!"

# Paso 4: Indexación Google
Write-Host "TERMINADO!"
Log "--- FIN DE DESPLIEGUE ---" 