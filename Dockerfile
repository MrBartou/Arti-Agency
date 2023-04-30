FROM node:latest

LABEL org.opencontainers.image.authors="Ynov Toulouse"
LABEL multi.label1="Arti Agency"

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

EXPOSE 4200

CMD [ "npm", "run", "start"]