const fs = require('fs');
const files = fs.readdirSync('./src/__fake-api__/lawyers-by-postcode');
// console.log(files);

// const unknowns = require('./lawyers-by-postcode/null.json');
// console.log(unknowns)

const subset = files.filter(f =>
    // f.startsWith("0")
    // || f.startsWith("1")
    // || f.startsWith("8")
    // || f.startsWith("9")
    // f.startsWith("2")

    f.startsWith("6")

    // && !f.startsWith("60") 
    // && !f.startsWith("41") 
    // && !f.startsWith("40") 


    // ||
    // f.startsWith("22") 
    // ||
    // f.startsWith("44") 
    // ||
    // f.startsWith("45") 
    // ||
    // f.startsWith("46") 
    // ||
    // f.startsWith("47") 
    // ||
    // f.startsWith("48") 
    // ||
    // f.startsWith("49") 
);

// this is for DB changes
console.log(JSON.stringify(subset));

// this is for abs scrape
// console.log(JSON.stringify(subset.map(s =>
//     // parseInt(
//     s.split(".")[0]
//     // )
// )))

// const postcode = require("./lawyers-by-postcode/"+files[0]);
// console.log(postcode[0]);




// Need to consider publicity

// Read only for all / API key

// But shouldn't show pending/deleted