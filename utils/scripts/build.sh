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
cp utils/.env.production dist/utils/
