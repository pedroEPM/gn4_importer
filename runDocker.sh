#!/bin/bash
echo deteniendo y eliminando la contenedor anterior
sleep 1
docker stop cc
docker rm cc
sleep 1
echo eliminando imagen anterior 
sleep 1
docker rmi centro-consulta
sleep 1
echo creando nueva imagen de centro de consulta ws
sleep 1
docker build -t centro-consulta .
echo ejecutando el contenedor centro-consulta

docker run --name cc  -p 3002:3001 -e NODE_ENV=staging -v /home/public/centro-de-consulta-ws:/usr/src/centro-de-consulta-ws/public -v /home/public/files-to-upload:/usr/src/centro-de-consulta-ws/files-to-upload -d centro-consulta
echo listo.
