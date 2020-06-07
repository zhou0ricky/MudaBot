const Discord = require('discord.js');
const { token } = require('./config.json');

const client = new Discord.Client();

// Creates storage for commands and cooldowns on client
['commands', 'cooldowns'].forEach(x => client[x] = new Discord.Collection());

// Loads all commands from command folder
['command'].forEach(x => (require(`./handlers/${x}`)(client)));

// Signifies Bot is connected
client.once('ready', () => {
    console.log('Ready!');
});

// Handles message based commands
client.on('message', message => (require(`./handlers/message`)(message, client)));

client.login(token);