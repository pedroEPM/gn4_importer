FROM node:20-bullseye

RUN useradd -m -u 1001 axon

WORKDIR /c-gn4-importer

COPY . .
RUN chown -R axon:axon /c-gn4-importer

# RUN npm install --no-cache --verbose
RUN npm install

COPY . .

USER axon

EXPOSE 3016

CMD ["npm", "start"]
# CMD ["/bin/bash"]

