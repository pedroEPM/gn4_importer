FROM node:20.15.0-bullseye-slim

WORKDIR /c_gn4_importer

COPY package*.json ./

# RUN npm install --no-cache --verbose
RUN npm install

COPY . .

EXPOSE 3016

CMD ["npm", "start"]
# CMD ["/bin/bash"]

