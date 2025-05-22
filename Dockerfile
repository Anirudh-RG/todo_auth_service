FROM node:22-slim

WORKDIR /app

ARG DB_HOST
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG JWT_SECRET

RUN echo "DB_HOST=${DB_HOST}" >> .env
RUN echo "DB_USER=${DB_USER}" >> .env
RUN echo "DB_PASSWORD=${DB_PASSWORD}" >> .env
RUN echo "DB_NAME=${DB_NAME}" >> .env
RUN echo "JWT_SECRET=${JWT_SECRET}" >> .env

COPY package.json package-lock.json ./
COPY . .
RUN npm install --production

EXPOSE 5000
CMD ["node","server.js"]

