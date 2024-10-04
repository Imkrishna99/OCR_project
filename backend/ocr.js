const Tesseract = require('tesseract.js');

const extractText = (imagePath) => {
    return new Promise((resolve, reject) => {
        Tesseract.recognize(
            imagePath,
            'eng',
            {
                logger: info => console.log(info) // Optional: Log progress
            }
        ).then(({ data: { text } }) => {
            // Parse text and return structured data
            const extractedData = parseText(text);
            resolve(extractedData);
        }).catch(err => reject(err));
    });
};

const parseText = (text) => {
    // Implement a simple parsing logic here
    const lines = text.split('\n');
    const extractedData = {
        name: lines[0] || '',
        jobTitle: lines[1] || '',
        companyName: lines[2] || '',
        email: lines.find(line => line.includes('@')) || '',
        phone: lines.find(line => line.match(/\d+/)) || '',
        address: lines.slice(3).join(', ') || ''
    };
    return extractedData;
};

module.exports = { extractText };
