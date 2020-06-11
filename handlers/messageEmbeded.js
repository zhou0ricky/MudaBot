const Discord = require('discord.js')
const appRoot = require('app-root-path')

var createEmbed = (client, name) => {
    const file = name.replace(" ", "_");
    const embed = new Discord.MessageEmbed()
        .setColor('#b0e4ea')
        .setTitle(name)
        .attachFiles([appRoot + `/images/${file}.png`])
        .setImage(`attachment://${file}.png`);
    return embed
} 

module.exports = createEmbed