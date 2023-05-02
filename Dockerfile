# Base image
FROM node:14-alpine AS install

# Installation de la même version de l'Angular CLI que celle utilisée localement
RUN npm install -g @angular/cli@15.2.3

# Définition du répertoire de travail
WORKDIR /app

# Copie des fichiers de l'application dans le conteneur
COPY . .

# Installation des dépendances
RUN npm install

# Build de l'application
FROM install AS build

RUN ng build --configuration=production --output-path=dist

# Configuration du serveur web pour servir l'application
FROM nginx:1.21-alpine

# Copie du fichier de configuration Nginx pour servir l'application
COPY nginx.conf /etc/nginx/nginx.conf

# Copie des fichiers de l'application dans le répertoire de Nginx
COPY --from=build /app/dist/ /usr/share/nginx/html

# Exposition du port 80 pour le serveur web Nginx
EXPOSE 80

# Commande pour démarrer le serveur web Nginx
CMD ["nginx", "-g", "daemon off;"]
