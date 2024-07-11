#!/bin/sh

envsubst '\$BACKEND_ADDR \$FRONTEND_ADDR \$ELASTICSEARCH_ADDR' < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js
nginx -g 'daemon off;' &
node server.js