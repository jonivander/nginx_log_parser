#!/usr/bin/env node
const fs = require("fs");

const dummyData = `10.0.1.7 - - [08/Nov/2020:00:00:00 -0700] "GET /about HTTP/1.1" 200 890 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.3"
10.0.1.8 - - [08/Nov/2020:00:00:01 -0700] "GET /about HTTP/1.1" 200 890 "-" "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
10.0.1.6 - - [08/Nov/2020:00:00:02 -0700] "GET /news/ HTTP/1.1" 200 1430 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9"
10.0.1.1 - - [08/Nov/2020:00:00:03 -0700] "GET / HTTP/1.1" 200 1770 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"
10.0.1.8 - - [08/Nov/2020:00:00:04 -0700] "GET / HTTP/1.1" 200 1770 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"`


const parseLog = (incoming) => {
    return incoming.split(`\n`)
        .map(logLine => {
        const logs = logLine.split(` `)

        return {
            "ipAddress": logs[0],
            "requestTimestamp": `${logs[3]} ${logs[4]}`,
            "requestMethod": logs[5],
            "requestPath": logs[6],
            "requestStatus": logs[8],
            "userAgent": logs[11]
        }
    })
}

const fileInput = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.promises.readFile(fileName)
        .then(result => {
            resolve(`${result}`) 
        })
        .catch((err) => {
            resolve(`File failed to open`)
        })
    })
}

const fileOutput = async (fileName, fileContent) => {
    try {
        await fs.promises.writeFile(fileName, fileContent)
    } catch(err) {
        console.error(err)
    }
};

const convert = async (incoming, outgoing) => {
  if (incoming === undefined) {
    return `Incoming file name required`
  } else if (outgoing === undefined) {
    return `Outgoing file name required`
  } else {
      let data = await JSON.stringify(await parseLog(await fileInput(incoming)))
      return new Promise((resolve, reject) => {
        fileOutput(outgoing, data)
        .then(result => {
            resolve(`Log entries from ${incoming} successfully converted to JSON and stored in ${outgoing}`) 
        })
    })
  }
};

const ua = (parsed, date) => {
  if (parsed === undefined) {
    return `Incoming file name required`;
  } else if (date === undefined) {
    return `Date required`;
  } else {
    return `Mozilla/5.0 (some browser and version) (12932)`;
  }
};

const hits = (parsed, date) => {
  if (parsed === undefined) {
    return `Incoming file name required`;
  } else if (date === undefined) {
    return `Date required`;
  } else {
    return `GET /somepath (91356)`;
  }
};

const start = async () => {
    switch (process.argv[2]) {
    case "convert":
        console.log(await convert(process.argv[3], process.argv[4]))
        break
    case "ua":
        console.log(ua(process.argv[3], process.argv[4]))
        break
    case "hits":
        console.log(hits(process.argv[3], process.argv[4]))
        break
        case "testParse": 
        console.log(parseLog(dummyData))
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
            nginxcli hits access.json 10/Nov/2020`);
    }
}
start()