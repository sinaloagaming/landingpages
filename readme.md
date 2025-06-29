<p align="center">
  <img src="statics/logo.png" alt="Sinaloa Gaming Logo" width="220">
</p>

# Sinaloa Gaming Landing Page

Landing page oficial de la comunidad **Sinaloa Gaming**.

---

<p align="center">
  <a href="https://instagram.com/sinaloagaming" target="_blank">
    <img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white" alt="Instagram">
  </a>
  <a href="https://facebook.com/sinaloaesportsgaming" target="_blank">
    <img src="https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=Facebook&logoColor=white" alt="Facebook">
  </a>
  <a href="https://twitch.tv/sinaloagamingesports" target="_blank">
    <img src="https://img.shields.io/badge/Twitch-%239146FF.svg?style=for-the-badge&logo=Twitch&logoColor=white" alt="Twitch">
  </a>
  <a href="https://discord.gg/E8ffQxpaAV" target="_blank">
    <img src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=Discord&logoColor=white" alt="Discord">
  </a>
</p>

---

## Características

- Diseño responsive y moderno
- Enlaces a redes sociales (Twitch, Discord, Instagram, Facebook)
- Optimización SEO y meta etiquetas para redes sociales (Open Graph, Twitter Cards)
- Accesibilidad y buenas prácticas web
- Fuentes sans-serif en todo el sitio
- CSS centralizado en `styles.css`
- Página especial para el Torneo Fortnite
- Página especial para el Torneo FC25
- Sitemap y robots.txt para buscadores
- Listo para despliegue en Docker (NGINX), Jenkins y PostgreSQL
- Recomendaciones para build y optimización

## Estructura del proyecto

```
landingpages/
├── index.html
├── styles.css
├── torneofortnite/
│   └── index.html
├── torneofc25/
│   └── index.html
├── statics/
│   ├── logo.png
│   ├── torneofortnite/
│   │   └── image.png
│   ├── torneofc25/
│   │   ├── bannerfc25_500.png
│   │   ├── bannerfc25_800.png
│   │   ├── bannerfc25_1000.png
│   │   ├── bannerfc25_hr.png
│   │   └── bannerfc25_screen.png
│   └── favicon/
│       ├── favicon.ico
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── apple-touch-icon.png
│       ├── android-chrome-192x192.png
│       ├── android-chrome-512x512.png
│       └── site.webmanifest
├── sitemap.xml
├── robots.txt
├── Dockerfile
├── nginx.conf
├── docker-compose.yml
```

## Uso

1. Clona o descarga este repositorio.
2. Abre `index.html` en tu navegador o levanta el sitio con Docker.
3. Accede a la página del torneo en `torneofortnite/index.html`.
4. Asegúrate de que los archivos de imágenes y favicon estén en las rutas indicadas.

## Despliegue con Docker

### Configuración actual
Este proyecto usa NGINX en Docker para servir el sitio estático desde la carpeta `website/`.

### Archivos de configuración

#### Dockerfile
```dockerfile
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY website/ /usr/share/nginx/html

EXPOSE 80
```

#### nginx.conf
```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

#### docker-compose.yml
```yaml
services:
  web:
    build: .
    container_name: sinaloa-landing
    ports:
      - "8080:80"
    restart: unless-stopped
```

### Comandos de despliegue

1. **Detener contenedores existentes (si los hay):**
   ```bash
   docker-compose down
   ```

2. **Construir la imagen:**
   ```bash
   docker-compose build
   ```

3. **Levantar el contenedor:**
   ```bash
   docker-compose up -d
   ```

4. **Acceder al sitio:**
   Abre [http://localhost:8080](http://localhost:8080) en tu navegador.

### Comandos útiles

- **Ver logs del contenedor:**
  ```bash
  docker-compose logs web
  ```

- **Detener el contenedor:**
  ```bash
  docker-compose down
  ```

- **Reconstruir después de cambios:**
  ```bash
  docker-compose down
  docker-compose build --no-cache
  docker-compose up -d
  ```

## SEO y optimización

- Todas las páginas incluyen meta etiquetas SEO, Open Graph y Twitter Cards.
- Sitemap y robots.txt incluidos para buscadores.
- Usa fuentes sans-serif y CSS centralizado.
- Para producción, se recomienda compilar/minificar el sitio y servir desde `/build` o `/dist`.

## Personalización

- Para agregar o modificar redes sociales, edita la sección `.social-icons` en `index.html`.
- Para cambiar estilos, edita `styles.css`.
- Para actualizar las bases del torneo, edita el contenido de `torneofortnite/index.html`.

## Créditos

Desarrollado por la comunidad de [Sinaloa Gaming](https://sinaloagaming.com).