const fs = require('fs');

const fileName = `${Date.now()}.txt`;
const file = fs.createWriteStream(`./logs/${fileName}`);

module.exports = data => file.write(data + '\n');
