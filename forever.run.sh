#!/bin/bash
#

FOREVER_ROOT=./forever
NODE_ENV=production
ID=gls_serv

echo "ENV: "$NODE_ENV
echo "FOREVER_ROOT: "$FOREVER_ROOT
echo "UID: "$ID

echo "Starting $ID server..."

FOREVER_ROOT=$FOREVER_ROOT NODE_ENV=$NODE_ENV forever start -m 1 -l forever.server.log --uid=$ID -a index.js