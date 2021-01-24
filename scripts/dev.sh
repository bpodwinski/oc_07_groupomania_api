#!/bin/bash

if [ ! -d "./node_modules" ]
then
    npm install
else
    NODE_ENV=development pm2 restart pm2.config.js && \
    pm2 logs api_dev
fi
