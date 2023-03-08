const fullLawyers = require('./lawyers-list.min.json');
const fs = require('fs');

const byPostcode = {};

// TODO there are lawyers with empty postcodes, need to deal with that

fullLawyers.forEach(lawyer => {
    if(byPostcode[lawyer.postal_code]){
        byPostcode[lawyer.postal_code].push(lawyer)
    } else {
        byPostcode[lawyer.postal_code] = [lawyer]
    }
});

Object.keys(byPostcode).map(postcode => {
    try {
        fs.writeFileSync(`./src/__fake-api__/lawyers-by-postcode/${postcode}.json`, JSON.stringify(byPostcode[postcode]), { flag: 'a+' });
        // file written successfully
    } catch (err) {
        console.error(err);
    }
})