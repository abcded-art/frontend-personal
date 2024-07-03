#!/bin/sh

envsubst '\$BACKEND_ADDR \$BACKEND_PORT' < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

nginx -g 'daemon off;' &
node server.js