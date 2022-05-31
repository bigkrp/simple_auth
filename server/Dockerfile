FROM node:16.15.0
WORKDIR /app
COPY ./package*.json ./

EXPOSE 8666

CMD npm config set cache-min 9999999 \
    && npm install \
    && npm run start