# syntax=docker/dockerfile:1
FROM node:14-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
COPY package*.json ./
RUN npm install --save
EXPOSE 8080
# CMD ["node", "main.js"]
CMD "npm" "start"