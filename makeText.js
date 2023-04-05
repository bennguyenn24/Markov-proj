/** Command-line tool to generate Markov text. */
const fs = require("fs");
const axios = require("axios");
const process = require("process");
const { markov } = require("./markov");

function generateText(txt) {
    let mm = new markov.MarkovMachine(txt);
    console.log(mm.makeText());
}

function makeText(path) {
    fs.readFile(path, "utf8", function cb(err,data) {
        if (err) {
            console.log(`cannot read file: ${path}: ${err}`)
            process.exit(1);
        } else {
            generateText(data);
        }
    })
}

async function makeURL(url){
    let res; 
    try {
        res = await axios.get(url);
    } catch (err) {
        console.log(`cannot read URL: ${url} : ${err}`);
        process.exit(0);
    }
    generateText(res.data)
}
