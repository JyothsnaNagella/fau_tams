FROM nginx:latest

# Remove the default configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx config
COPY ./nginx-config/jlabs.network.conf /etc/nginx/conf.d/

# Copy SSL certificates (optional, if you have them locally)
COPY ./nginx-config/ssl/ /etc/nginx/ssl/

#Delete the existing index file
RUN rm /var/www/html/index.html || true

# Copy index file 
COPY ./index.html /var/www/html/


# Web app frontend


# Expose port 80 and 443
EXPOSE 80 443
