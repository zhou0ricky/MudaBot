// This script is used to fill the stands DB in case it's empty

const { stands } = require('./handlers/dbSetup');
const db = require("./handlers/dbFuncs.js")
const appDir = require('app-root-path');
const fs = require('fs');

const imageFiles = fs.readdirSync(appDir + '/images').filter(file => 
    file.endsWith('.png'));

console.log(imageFiles);

for (const file of imageFiles) {
    console.log(file);
    const standName = file.slice(0, -4).replace("_", " ");
    db.addTuple(stands, "empty", standName)
    

}