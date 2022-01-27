#!/usr/bin/env node 

const convert = (incoming, outgoing) => {
    if (incoming === undefined) {
        return `Incoming file name required`
    } else if (outgoing === undefined) {
        return `Outgoing file name required`
    } else {
        return `Log entries from ${incoming} successfully converted to JSON and stored in ${outgoing}`
    }
}

const ua = (parsed, date) => {
    if (parsed === undefined) {
        return `Incoming file name required`
    } else if (date === undefined) {
        return `Date required`
    } else {
        return `Mozilla/5.0 (some browser and version) (12932)`
    }
}

const hits = (parsed, date) => {
    if (parsed === undefined) {
        return `Incoming file name required`
    } else if (date === undefined) {
        return `Date required`
    } else {
        return `GET /somepath (91356)`
    }
}

switch(process.argv[2]) {
    case "convert": 
        console.log(convert(process.argv[3], process.argv[4]))
        break
    case "ua":
        console.log(ua(process.argv[3], process.argv[4]))
        break
    case "hits":
        console.log(hits(process.argv[3], process.argv[4]))
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