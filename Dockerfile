# ---- Build Stage ----
FROM node:18 AS builder

WORKDIR /app
COPY . .
RUN npm install && npm run build

# ---- Nginx Serve Stage ----
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

