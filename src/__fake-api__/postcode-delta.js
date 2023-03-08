const fs = require('fs');
const files = fs.readdirSync('./src/__fake-api__/abs-scrapper/results');

const done = files.map(f => f.split(".")[0]);

const fl = require('./postcodes-reduced.json')

const fullList = [...new Map(fl.map(f => [f.postcode, f.postcode])).values()];

const delta = fullList.filter(x => !done.includes(x));

// console.log(
//     JSON.stringify(delta)
// )

fs.writeFileSync("delta.json", JSON.stringify(delta));