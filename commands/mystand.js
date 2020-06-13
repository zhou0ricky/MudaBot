const db = require("../handlers/dbFuncs.js")
const embed = require("../handlers/messageEmbeded.js")
const { stands } = require("../handlers/dbSetup"); 

/**
 * Sends an embeded message containing stand information to the 
 * chat
 * @param {Object} message 
 * @param {Array} args 
 */
const mystand = async (message, args) => {
    const guildId = message.guild.id;
    const id = message.author.id;
    const stand = await db.getAttr(stands, {where: {
        guildId: guildId, userId: id}}, "stand");
    if (!stand) {
        return message.channel.send(`You don't have a stand ${message.author}`);
    }
    return message.channel.send(embed(stand))
}

module.exports = {
    name: "mystand",
    description: "Gets sender's stand if it exists",
    execute: mystand,
}