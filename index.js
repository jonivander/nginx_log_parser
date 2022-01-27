#!/usr/bin/env node 

switch(process.argv[2]) {
    case "convert": 
        console.log(`converting`)
        break
    case "ua":
        console.log(`user agent`)
        break
    case "hits":
        console.log(`hits`)
        break
    default:
        console.log(`unknown command ${process.argv[2]}
        usable commands:
        convert - converts nginx logs into json format
        ua - Identifies the most used User Agent and number of hits
        hits - Identifies the most used HTTP Method and Request Path and number of hits
        
        Example:
        nginxcli convert access.log access.json
        nginxcli ua access.json 08/Nov/2020
        nginxcli hits access.json 10/Nov/2020`)
}