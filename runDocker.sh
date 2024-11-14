#!/bin/bash
echo Deteniendo y removiendo el contenedor anterior
sleep 1
docker stop dailyImporter
docker rm dailyImporter
sleep 1
echo Eiminando imagen anterior 
sleep 1
docker rmi daily-importer-v2
sleep 1
echo Creando nueva imagen del Importador Diario
sleep 1
docker build -t daily-importer-v2 .
echo Ejecutando el contenedor del Importador Diario

docker run --name dailyImporter  -p 3017:3016 -d daily-importer-v2
echo Hecho
