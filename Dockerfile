FROM node:lts-alpine3.14
MAINTAINER apimap.io
RUN addgroup -S vue && adduser -S vue -G vue
USER vue:vue
ENV API_URL="http://localhost"
ENV DEVELOPER_URL="http://localhost"
ENV TITLE="Apimap.io"
WORKDIR /app
COPY package.json /app
COPY server.js /app
COPY dist /app/dist
COPY node_modules /app/node_modules
EXPOSE 8080
CMD [ "npm", "run", "start" ]