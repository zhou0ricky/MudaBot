const db = require("../handlers/dbFuncs.js")
const Sequalize = require('sequelize');

/**
 * Assigns caller a stand from Database if user doesn't have one
 * @param {object} message 
 * @param {array} args 
 */
var arrow = async (message, args) => {
    const client = message.client;
    const user = message.author.username;
    if (await db.getAttr(client.stands, {where: {user: user}}, "stand")) {
        return message.channel.send(`You already have a stand ${message.author}`);
    }
    const standTup = client.stands.findOne({
        where: {user: "empty"},
        order: [Sequalize.fn( 'RANDOM')]
    }).then((encounter) => {
        if (!encounter) { return message.channel.send(`No stands available, ${message.author}!`) }
        encounter.user = message.author.username;
        encounter.save();
        return message.channel.send(`${message.author} your new stand is ${encounter.stand}`);
    }) 
}

module.exports = {
    name: "arrow",
    description: "Gives user a random stand",
    cooldown: 1,
    execute: arrow,
}