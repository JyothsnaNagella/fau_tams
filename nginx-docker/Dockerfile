# --------------------------
# Stage 1: Build frontend
# --------------------------
FROM node:18 AS builder


WORKDIR /app

COPY ../frontend/.env.example ./.env

COPY ../frontend/ .
RUN npm install && npm run build

# --------------------------
# Stage 2: NGINX serve
# --------------------------
FROM nginx:latest

# Remove default NGINX config
RUN rm /etc/nginx/conf.d/default.conf || true

# Add custom NGINX config and SSL
COPY ./nginx-docker/nginx-config/jlabs.network.conf /etc/nginx/conf.d/
COPY ./nginx-docker/nginx-config/ssl/ /etc/nginx/ssl/

# index for jlabs.network
COPY ./nginx-docker/index.html /var/www/html/

# ✅ Copy build output to the exact path expected by nginx.conf
COPY --from=builder /app /var/www/html/tams

# Expose ports
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
