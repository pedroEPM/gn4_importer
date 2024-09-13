FROM node:20-bullseye-slim

WORKDIR /c_gn4_importer

COPY package*.json ./

RUN npm install --no-cache --verbose

COPY . .

EXPOSE 3016

# CMD ["npm", "start"]
CMD ["/bin/bash"]

