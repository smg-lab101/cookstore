FROM node:18-alpine

WORKDIR /home/node

# Kopiere nur das Nötigste zum Installieren
COPY package*.json ./
RUN npm install

# Jetzt den Rest
COPY . .

# Build für Produktion
RUN npm run build

EXPOSE 3002
CMD ["npm", "start"]
