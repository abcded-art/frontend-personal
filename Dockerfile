# [STAGE 1] Build the React Application
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# [STAGE 2] Serve the React Application with Nginx

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY public/env.template.js /usr/share/nginx/html/env.template.js
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 80

CMD ["/entrypoint.sh"]