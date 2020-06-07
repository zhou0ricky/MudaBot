const fs = require('fs');

// Loads commands into client.commands 
module.exports = client => {
    const commandFiles = fs.readdirSync('./commands').filter(file => 
        file.endsWith('.js'));
    console.log("Loaded Commands:");
    console.log(commandFiles)
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        client.commands.set(command.name, command);
    }
}