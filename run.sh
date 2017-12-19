#!/usr/bin/env bash

if [ $# -eq 0 ]
  then
    echo "Please provide a URL to continue"
    exit 1;
fi

node ./index.js $1

source regenerate-certs.sh