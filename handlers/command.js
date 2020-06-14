const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path')


const getFiles = (dirPath, fileArray) => {
    files = fs.readdirSync(dirPath)
    fileArray = fileArray || [];
    files.forEach(file => {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            fileArray = getFiles(dirPath + "/" + file, fileArray)
        } else {
            fileArray.push(dirPath + "/" + file)
        }
    });
    return fileArray;
};

// Loads commands into client.commands 
module.exports = client => {
    const commandFiles = getFiles(`${appRoot}/commands`, []).filter(file => 
        file.endsWith('.js'));
    console.log("Loaded Commands:");
    console.log(commandFiles)
    for (const file of commandFiles) {
        const command = require(file);
        client.commands.set(command.name, command);
    }
}