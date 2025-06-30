<p align="center">
  <img src="statics/logo.png" alt="Sinaloa Gaming Logo" width="220">
</p>

# Sinaloa Gaming Landing Page

Sitio web estático para la comunidad Sinaloa Gaming, con torneos, resultados, video de finales y secciones visuales modernas.

## Características
- Sección destacada para el torneo activo (FC25) con banner, botón de inscripción y emojis.
- Sección separada para torneos pasados (Fortnite) con video de la final y botón de resultados.
- Barra de tags con palabras clave e iconos para reforzar la identidad gamer y de comunidad.
- Footers automáticos con fecha y hora de actualización en todas las páginas.
- Diseño responsive y visualmente atractivo.

## Estructura
- `/website/index.html`: Página principal con torneos, video, tags y redes sociales.
- `/website/torneofc25/index.html`: Página dedicada al torneo FC25.
- `/website/torneofortnite/index.html`: Página dedicada al torneo de Fortnite.
- `/website/torneofortnite/estadisticas.html`: Resultados del torneo de Fortnite.

## Despliegue
El sitio se sirve como estático usando NGINX en Docker. Ver instrucciones en este mismo archivo para build y despliegue.

---

¡Sinaloa Gaming, la comunidad gamer de Sinaloa! 🏆🎮🌎

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