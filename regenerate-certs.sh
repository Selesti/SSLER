#!/usr/bin/env bash

CURRENT_DIR=`pwd`

cd ~/Sites/ssl
CA.pl -newreq-nodes
CA.pl -sign
brew services restart httpd

cd $CURRENT_DIR

echo "SSL-ER :: Certificates updated"