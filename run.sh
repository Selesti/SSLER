#!/usr/bin/env bash

SOURCE="${BASH_SOURCE[0]}"

while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
    SCRIPT_DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /* ]] && SOURCE="$SCRIPT_DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done

SCRIPT_DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

if [ $# -eq 0 ]
  then
    echo "Please provide a URL to continue"
    exit 1;
fi

node $SCRIPT_DIR/index.js $1

source $SCRIPT_DIR/regenerate-certs.sh