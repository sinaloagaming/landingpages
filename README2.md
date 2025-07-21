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
- Página de resultados del Torneo FC25 (19 y 20 de Julio 2025)
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
│   └── torneofortnite/
│       └── image.png
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
3. Accede a la página del torneo Fortnite en `torneofortnite/index.html`.
4. Accede a la página de resultados del Torneo FC25 en `torneofc25/index.html`.
5. Asegúrate de que los archivos de imágenes y favicon estén en las rutas indicadas.

## Despliegue con Docker

```sh
docker-compose up -d
```
Esto levanta:
- Web server NGINX (landing page)
- Jenkins (CI/CD)
- PostgreSQL (base de datos)

## SEO y optimización

- Todas las páginas incluyen meta etiquetas SEO, Open Graph y Twitter Cards.
- Sitemap y robots.txt incluidos para buscadores.
- Usa fuentes sans-serif y CSS centralizado.
- Para producción, se recomienda compilar/minificar el sitio y servir desde `/build` o `/dist`.

## Personalización

- Para agregar o modificar redes sociales, edita la sección `.social-icons` en `index.html`.
- Para cambiar estilos, edita `styles.css`.
- Para actualizar las bases del torneo Fortnite, edita el contenido de `torneofortnite/index.html`.
- Para actualizar la información del Torneo FC25, edita el contenido de `torneofc25/index.html`.

## Créditos

Desarrollado por la comunidad de [Sinaloa Gaming](https://sinaloagaming.com). 

## Redes Sociales

Actualmente puedes encontrarnos en:

- [Instagram](https://instagram.com/sinaloagaming)
- [Facebook](https://facebook.com/sinaloaesportsgaming)
- [Twitch](https://twitch.tv/sinaloagamingesports)
- [Discord](https://discord.gg/E8ffQxpaAV)
- [WhatsApp](https://chat.whatsapp.com/LxwRxgqL0BbKKJOGj0tFav)
- [TikTok](https://www.tiktok.com/@sinaloa_gaming)

## Funcionalidades

### Julio 2025

* Agrega validación y explicación de robots.txt y sitemap.xml en CONTRIBUTING.md
* Actualiza página principal y README.md para mostrar resultados del Torneo FC25
* Actualización de deploy y readme
* SEO: Agrega etiqueta canonical a todas las páginas principales

### Junio 2025

* Footer: copyright Sinaloa Gaming, fecha/hora estática, sin JS inline, responsivo para móvil/tableta
* Refactor: fusionar buttons.css en style.css y eliminar imports innecesarios
* Actualizar footers, README y detalles visuales para nueva estructura de torneos y tags
* Agregar torneo FC25 con banner y página dedicada
* Mejoras en el despliegue con Docker
* Si se usara parcel, lo agregaremos a ignore
* Agrega recomendación y botón para abrir registro de Toornament en nueva pestaña en FC25
* Agrega aviso de prueba a la página de torneo FC25
* Agrega página de torneo FC25 con registro Toornament y visuales consistentes
* Refactor: Clean up landing page and improve UI elements 