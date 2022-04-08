FROM node:14.17.5-alpine3.11

WORKDIR /usr/src/app

EXPOSE 8091

CMD npm install && npm run start:dev
