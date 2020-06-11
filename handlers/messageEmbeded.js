const Discord = require('discord.js')
const appRoot = require('app-root-path')
const fs = require('fs')

var createEmbed = (client, name) => {
    const file = name.replace(" ", "_");
    const embed = new Discord.MessageEmbed()
            .setColor('#b0e4ea')
            .setTitle(name)
    if (fs.existsSync(appRoot + `/images/${file}.png`)) { 
        embed.attachFiles([appRoot + `/images/${file}.png`])
            .setImage(`attachment://${file}.png`);
    }
    return embed
} 

module.exports = createEmbed