FROM tomcat:latest as webapp
RUN cp -R  /usr/local/tomcat/webapps.dist/*  /usr/local/tomcat/webapps
COPY /node_modules/target/*.war /usr/local/tomcat/webapps
