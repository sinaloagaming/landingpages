# Dependencias para Despliegue y Desarrollo

Este proyecto requiere algunas herramientas para facilitar el despliegue y la optimización. Aquí encontrarás cómo instalarlas en **Windows**, **MacOS** y **Linux**.

---

## Requeridas

- **AWS CLI**
  - Sincronización de archivos y limpieza de caché en AWS CloudFront.
- **Git**
  - Control de versiones y colaboración.
- **PowerShell 7+** (recomendado en Windows)

## Opcionales (para optimización de imágenes)

- **optipng**: Optimización de imágenes PNG
- **jpegoptim**: Optimización de imágenes JPG/JPEG
- **cwebp**: Optimización de imágenes WEBP

---

## Instalación por sistema operativo

### Windows

- **AWS CLI:** [Descargar instalador](https://awscli.amazonaws.com/AWSCLIV2.msi)
- **Git:** [Descargar Git para Windows](https://git-scm.com/download/win)
- **PowerShell 7+:** [Descargar PowerShell 7+](https://github.com/PowerShell/PowerShell#get-powershell)
- **optipng, jpegoptim, cwebp:**
  - Instala [Chocolatey](https://chocolatey.org/install) y luego ejecuta:
    ```powershell
    choco install optipng jpegoptim webp
    ```

### MacOS

- **AWS CLI:**
    ```sh
    brew install awscli
    ```
- **Git:**
    ```sh
    brew install git
    ```
- **optipng, jpegoptim, cwebp:**
    ```sh
    brew install optipng jpegoptim webp
    ```

### Linux (Debian/Ubuntu)

- **AWS CLI:**
    ```sh
    sudo apt update && sudo apt install awscli -y
    ```
- **Git:**
    ```sh
    sudo apt install git -y
    ```
- **optipng, jpegoptim, cwebp:**
    ```sh
    sudo apt install optipng jpegoptim webp -y
    ```

---

## Notas

- Si usas la optimización de imágenes, asegúrate de tener instaladas las utilidades opcionales.
- Node.js y npm solo son necesarios si deseas agregar herramientas de build o desarrollo frontend.
- Para cualquier duda, consulta la documentación oficial de cada herramienta. 