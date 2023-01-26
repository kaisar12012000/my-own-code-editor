const fs = require("fs");
const path = require('path');
const { v4: uuid } = require('uuid')
const { exec } = require("child_process")

const execute = (filePath) => {
    return new Promise(resolve,reject)
}
const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, {recursive: true});
}

const generateCode = (format, code) => {
    const jobId = uuid();
    const fileName = `${jobId}.${format}`;
    const filePath = path.join(dirCodes, fileName);
    fs.writeFileSync(filePath, code)
    return filePath
}

module.exports = {
    generateCode,
};