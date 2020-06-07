const { prefix } = require('../config.json');
var help = (message, args) => {
    const data = [];
    const { commands } = message.client 

    // Send list of commands given no arguments
    if (!args.length) {
        data.push('Here\'s a list of all the commands:');
        data.push(commands.map(command => command.name).join(', '));
        data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

        // Sends DM to author of message
        return message.author.send(data, {split: true})
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('I\'ve sent you a DM with all commands!');
            })
            .catch(error => {
                console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                message.reply('DM could not be sent')
            });
    }

    // Given information specified command
    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
        return message.reply('that\'s not a valid command!');
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (command.description) data.push(`**Description:** ${command.description}`);
    if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

    data.push(`**Cooldown:** ${command.cooldown || 0} second(s)`);

    message.channel.send(data, { split: true });

};

module.exports = {
    name: 'help',
    description: 'List all commands or info aobut a single command.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute: help,
};