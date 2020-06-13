// This script is used to fill the stands DB in case it's empty
const db = require("./handlers/dbFuncs.js")
const appDir = require('app-root-path');
const fs = require('fs');
const { standStats, botDevs } = require("./handlers/dbSetup"); 

const dbFill = async () => {
    const imageFiles = fs.readdirSync(appDir + '/images').filter(file => 
        file.endsWith('.png'));

    console.log(imageFiles);

    for (const file of imageFiles) {
        console.log(file);
        const standName = file.slice(0, -4).replace("_", " ");
        await db.addTuple(standStats, {stand: standName, stats: 0})    
    }

    await db.addTuple(botDevs, {userId: "322430899981647872"} )
}

dbFill();