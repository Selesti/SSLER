#!/usr/bin/env node
'use strict';

console.log();

const fs = require('fs')
const os = require('os')
const url = require('url')
const readline = require('readline')

const SSLer = function (domain) {

    this.config = os.homedir() + '/Configs/openssl.cnf'
    this.newConfig = []
    this.lastDnsEntry = 0

    console.log(`SSL-ER :: Adding ${domain} to OpenSSL config`)

    this.updateSSLConfig = function () {
        const rl = readline.createInterface({
            input: fs.createReadStream(this.config),
            crlfDelay: Infinity
        })

        rl
        .on('line', line => {
            if (line.indexOf('DNS.') > -1) {
                this.lastDnsEntry = line.match(/(?<=DNS\.)([0-9]+)/g)[0];
            }

            if (line.indexOf('IP.1 =') === 0) {
                let newDnsEntry = parseInt(this.lastDnsEntry) + 1;

                this.newConfig.push(
                    `DNS.${newDnsEntry} = *.${domain}`
                )
            }

            return this.newConfig.push(line);
        })
        .on('close', () => {
            const config = this.newConfig.join('\n')

            fs.writeFile(this.config, config, err => {
                console.log(`SSL-ER :: OpenSSL config updated`)
                console.log(`SSL-ER :: Signing new certificates`)
                console.log('')
            })
        })
    }

    this.updateSSLConfig()
}

// Make sure we have a URL param.
if (typeof process.argv[2] == 'undefined') {
    console.error('Please provide a URL to continue')
    return process.exit(1)
}

// Make sure its a valid url
const parsedUrl = url.parse(
    (process.argv[2].indexOf('http') === -1 ? 'http://' : '') + process.argv[2]
)

if (!parsedUrl.hostname) {
    console.error('Please enter a valid URL')
    return process.exit(1)
}

new SSLer(parsedUrl.hostname)