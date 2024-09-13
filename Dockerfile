# Usa la imagen base de Node.js 20.14.0
FROM node:20.14.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /c_gn4_importer

# Actualiza npm a una versión estable
RUN npm install -g npm@9.6.1

# Copia el archivo package.json y package-lock.json si existe
COPY package*.json ./

# Instala las dependencias sin usar caché
RUN npm install --no-cache --verbose

# Copia el resto de los archivos al contenedor
COPY . .

# Expone el puerto personalizado (3016)
EXPOSE 3016

# Comando para iniciar la aplicación
CMD ["npm", "start"]
