FROM node:20-bullseye

WORKDIR /c-gn4-importer

COPY . .

# RUN npm install --no-cache --verbose
RUN npm install

COPY . .

EXPOSE 3016

CMD ["npm", "start"]
# CMD ["/bin/bash"]

