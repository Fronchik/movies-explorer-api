FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@10.8.1 && npm install
COPY . .
CMD ["npm", "start", "app.js"]
