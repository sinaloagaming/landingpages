FROM nginx:alpine

# Copia la configuración personalizada de nginx si la tienes
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos del sitio al directorio raíz de nginx
COPY website/ /usr/share/nginx/html

EXPOSE 80