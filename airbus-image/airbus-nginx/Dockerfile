FROM nginx:latest

COPY dist/. /usr/share/nginx/html
#COPY airbus-map/.   /data/airbus/airbus-image/airbus-map
#COPY airbus-static/.   /data/airbus/airbus-image/airbus-static

COPY nginx.conf /etc/nginx/conf.d/default.conf

