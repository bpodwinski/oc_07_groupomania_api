#!/bin/bash

if [ ! -d "./node_modules" ]
then
    npm install
elif  [ ! -d "./dist" ]
then
    npm run build
fi

NODE_ENV=production pm2 restart pm2.config.js && \
pm2 logs api
