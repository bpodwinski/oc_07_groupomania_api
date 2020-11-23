#!/bin/bash

# check if dist folder exist
if [ -d dist ]
then
    rm -r dist
else
    mkdir dist/
fi
sleep 1

# build the app
tsc --build
sleep 1

# copy the files
if [ -f utils/.env.production ]
then
    cp utils/.env.production.example dist/utils/ && \
    cp package.json dist/
fi
