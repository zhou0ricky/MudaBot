const db = require("../handlers/dbFuncs.js")
const embed = require("../handlers/messageEmbeded.js")

/**
 * Sends an embeded message containing stand information to the 
 * chat
 * @param {Object} message 
 * @param {Array} args 
 */
const mystand = async (message, args) => {
    const client = message.client;
    const user = message.author.username;
    const stand = await db.getAttr(client.stands, {where: {user: user}}, "stand");
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