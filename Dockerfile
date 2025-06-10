FROM node:22-slim

WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm install --production

EXPOSE 5000
CMD ["node","server.js"]

