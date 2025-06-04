FROM nginx:alpine

# Copia tu configuración personalizada de nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia todos los archivos del sitio al directorio raíz de nginx
COPY . /usr/share/nginx/html

EXPOSE 80