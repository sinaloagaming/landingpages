# Guía de Contribución

## Directrices del Ciclo de Desarrollo

### 1. Revisión de Analíticos
- Verifica que los scripts de analítica (Google Analytics, Pixel, etc.) estén correctamente implementados y actualizados en todas las páginas relevantes.

### 2. Documentación
- Asegúrate de que todos los archivos `README.md` estén actualizados y sean claros.
- Revisa que la documentación de endpoints, variables de entorno y dependencias esté presente.

### 3. SEO y Sitemap
- Confirma que el archivo `sitemap.xml` esté actualizado y refleje la estructura actual del sitio.
- Verifica la presencia y validez del archivo `robots.txt`.

### 4. Commits
- Utiliza mensajes de commit claros y descriptivos.
- Sigue el formato: `[tipo]: descripción breve` (ejemplo: `feat: agrega sección de contacto`).
- Antes de hacer commit, revisa que no haya archivos innecesarios o sensibles.

### 5. Revisión de Código
- Haz code review (revisión cruzada) antes de fusionar cambios a la rama principal.
- Usa linters y formateadores automáticos si están configurados.

### 6. Pruebas
- Ejecuta las pruebas automáticas (si existen) antes de hacer push.
- Verifica manualmente las funcionalidades principales.

---

Si tienes dudas o sugerencias sobre estas directrices, por favor abre un issue o discútelo con el equipo antes de hacer cambios importantes. 

Validación de archivos:

**robots.txt**
```
User-agent: *
Allow: /

Sitemap: https://www.sinaloagaming.com/sitemap.xml
```
- Permite el acceso a todos los bots a todo el sitio.
- Incluye correctamente la ruta al sitemap.

**sitemap.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.sinaloagaming.com/</loc>
  </url>
  <url>
    <loc>https://www.sinaloagaming.com/torneofortnite/</loc>
  </url>
  <url>
    <loc>https://www.sinaloagaming.com/torneofortnite/score</loc>
  </url>
  <url>
    <loc>https://www.sinaloagaming.com/torneofc25/</loc>
  </url>
</urlset>
```
- El sitemap está bien formado y contiene las URLs principales, incluyendo la nueva de FC25.
- No hay errores de sintaxis ni rutas faltantes relevantes.

Todo está correcto y actualizado. ¿Te gustaría agregar o modificar alguna URL, o necesitas otra validación? 