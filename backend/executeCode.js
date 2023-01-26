const { exec } = require('child_process');
const fs = require('fs');
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, {recursive:true});
}

const executeCode = (filePath, lang) => {
    console.log(lang)
    switch(lang){
        case "py":
            return new Promise((resolve, reject) => {
                console.log(`C:/Python310/python.exe ${filePath}`)
                exec(`C:/Python310/python.exe ${filePath}`, (error, stdout, stderr) => {
                    error && reject({ error, stderr });
                    stderr && reject(stderr);
                    resolve(stdout);
                });
            });
            break;
        case "js":
            return new Promise((resolve, reject)=> {
                exec(`node ${filePath}`,(error, stdout, stderr) => {
                    error && reject({ error, stderr });
                    stderr && reject(stderr);
                    resolve(stdout);
                });
            });
            break;
        default:
            return "Unknown language";
            break;
    }
}

module.exports = {
    executeCode,
};