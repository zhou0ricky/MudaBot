const { prefix } = require('../config.json');
const { botDevs } = require('./dbSetup');

module.exports = async (message, client) => {
    // Disregard messages from bots and start with no prefix 
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Parses for command name and additional args
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Searches for potential aliases
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // No command found
    if (!command) return; 

    // Checks for cooldowns
    if (!require('./cooldowns')(message, client, command)) return;

    // Allow for only devs to use
    if (command.commandType && (command.commandType === "testing")) {
        const userId = message.author.id;
        const isBotDev = await botDevs.findOne( {where: {userId: userId} });
        if (!isBotDev) {
            return message.reply("you don't have access to that command")
        }
    }
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command')
    }
}
