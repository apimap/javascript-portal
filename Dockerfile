FROM node:17-alpine
MAINTAINER apimap.io
RUN addgroup --system vue && adduser --system vue --ingroup vue --no-create-home
USER vue:vue
ENV APIMAP_API_URL="http://localhost"
ENV APIMAP_DEVELOPER_URL="http://localhost"
ENV APIMAP_TITLE="Apimap.io"
ENV APIMAP_SUPPORT=""
WORKDIR /app
COPY package.json /app
COPY server.js /app
COPY dist /app/dist
COPY node_modules /app/node_modules
EXPOSE 8080
CMD [ "npm", "run", "start" ]