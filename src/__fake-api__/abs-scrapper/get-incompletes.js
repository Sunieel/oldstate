const fs = require('fs');
const files = fs.readdirSync('./src/__fake-api__/abs-scrapper/results');

const run = () => {
    let all = [];
    files.map(f => {
        const crf = fs.readFileSync(`${__dirname}/results/${f}`);
        const cf = JSON.parse(crf);
        if (
            !cf.averagesByPostCode
            || !cf.averagesByPostCode
            || !cf.houseHoldTypes
            || !cf.maritalStatus
            || !cf.populationByPostCode
        ) {
            all.push(f.split(".")[0])
        }
    })
    console.log(JSON.stringify(all))
}

run();