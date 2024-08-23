FROM tomcat:latest as node_modules
RUN cp -R  /usr/local/tomcat/webapps.dist/*  /usr/local/tomcat/webapps
COPY /node_modules/target/*.war /usr/local/tomcat/webapps
