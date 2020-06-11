const db = require("../handlers/dbFuncs.js")
const embed = require("../handlers/messageEmbeded.js")

var mystand = async (message, args) => {
    const client = message.client;
    const user = message.author.username;
    const stand = await db.getTuple(client.stands, user);
    if (!stand) {
        return message.channel.send(`You don't have a stand ${message.author}`);
    }
    message.channel.send(embed(client, stand))
    return;

}

module.exports = {
    name: "mystand",
    description: "Gets sender's stand if it exists",
    execute: mystand,
}