FROM mysql:8.0

# Environment variables will be provided at runtime
# This is just a placeholder configuration
ENV MYSQL_ROOT_PASSWORD=changeme
ENV MYSQL_DATABASE=ta
ENV MYSQL_USER=ta
ENV MYSQL_PASSWORD=changeme

# You can copy custom configuration files if needed
# COPY my.conf /etc/mysql/conf.d/my.cnf

#Any .sql or .sh files placed here will run on container first startup
COPY ./a_ta.sql /docker-entrypoint-initdb.d/
COPY ./seeder_12-07-2024.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
