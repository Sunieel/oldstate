const axios = require('axios').default;
const wtf = require("./write-to-file.js");
const fs = require('fs');

const absScrapper = async (url, postcode, title, observations) => {
    try {

        const skip = await wtf.checkIfObjectExists(postcode, title);
        if (skip) {
            // console.log("OBJECT EXISTS SKIPPING FOR", postcode, title)
            return;
        }

        const raw = await axios.get(url)

        const dataResults = raw.data.data.dataSets[0].observations;
        const allObservations = raw.data.data.structure.dimensions.observation;

        const finalUnordered = {}
        Object.keys(dataResults).map((dk, i) => {
            const splitKey = dk.split(":");
            const value = dataResults[dk][0];
            const keyName = observations.map(o =>
                allObservations[o].values[parseInt(splitKey[o])].name
            ).join(" / ");
            finalUnordered[keyName] = value;
        });

        const finalOrdered = Object.keys(finalUnordered).sort().reduce(
            (obj, key) => { obj[key] = finalUnordered[key]; return obj; }, {});

        await wtf.writeToFile(postcode, title, finalOrdered)

        return finalOrdered;
    } catch (error) {
        if (error.response && error.response.status && error.response.status != 404) {
            console.error(`ERROR SCRAPING ABS FOR ${postcode} ${title} ${error.response.status}`);
        }
    }
}

module.exports = {
    absScrapper,
}