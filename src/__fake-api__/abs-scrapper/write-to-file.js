const fs = require('fs');

const checkIfObjectExists = async (postcode, title) => {
    try {
        const filePath = `${__dirname}/results/${postcode}.json`;
        if (fs.existsSync(filePath)) {
            const currentFileRaw = await fs.readFileSync(filePath);
            const currentFile = JSON.parse(currentFileRaw);
            return currentFile[title];
        }
        return false;
    } catch (error) {
        console.error(`ERROR READING FILE FOR ${postcode} ${title}`, error);
        return false;
    }
}

const writeToFile = async (postcode, title, content) => {
    try {
        const filePath = `${__dirname}/results/${postcode}.json`;

        if (fs.existsSync(filePath)) {
            const currentFileRaw = await fs.readFileSync(filePath);
            const currentFile = JSON.parse(currentFileRaw);
            currentFile[title] = content;
            await fs.writeFileSync(filePath, JSON.stringify(currentFile));
        } else {
            await fs.writeFileSync(filePath, JSON.stringify({
                [title]: content
            }));
        }
    } catch (error) {
        console.error(`ERROR WRITING TO FILE FOR ${postcode} ${title}`, error);
    }
}

module.exports = {
    writeToFile,
    checkIfObjectExists,
}