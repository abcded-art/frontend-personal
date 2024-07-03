# [STAGE 1] Build the React Application
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# [STAGE 2] Serve the React Application with Nginx

FROM nginx:alpine
RUN apk add --no-cache nodejs npm
COPY --from=build /app/build /usr/share/nginx/html
COPY public/env.template.js /usr/share/nginx/html/env.template.js
COPY entrypoint.sh /entrypoint.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod +x /entrypoint.sh

COPY . /app
WORKDIR /app
RUN npm install

WORKDIR /app
EXPOSE 80
EXPOSE 5000

CMD ["/entrypoint.sh"]