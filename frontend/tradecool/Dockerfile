#build
FROM node:alpine as builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

RUN npm install

FROM nginx:stable-alpine

COPY build/ /usr/share/nginx/html 