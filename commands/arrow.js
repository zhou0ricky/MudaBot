const db = require("../handlers/dbFuncs.js")
const Sequalize = require('sequelize');
const { stands, standStats } = require("../handlers/dbSetup"); 

/**
 * Assigns caller a stand from Database if user doesn't have one
 * @param {object} message 
 * @param {array} args 
 */
var arrow = async (message, args) => {
    const guildId = message.guild.id
    const userId = message.author.id;
    if (await db.getAttr(stands, {where: {guildId: guildId, 
        userId: userId}}, "stand")) {
        return message.channel.send(`You already have a stand ${message.author}`);
    }
    const usedStands = stands.findAll({
        where: {guildId: guildId},
        attributes: ['stand']
    })
    standStats.findOne({
        where: {stand: {[Sequalize.Op.notIn]: usedStands}},
        order: [Sequalize.fn( 'RANDOM')]
    }).then((encounter) => {
        if (!encounter) { return message.channel.send(`No stands available, ${message.author}!`) }
        db.addTuple(stands, {
            guildId: guildId,
            userId: userId,
            stand: encounter.stand
        })
        return message.channel.send(`${message.author} your new stand is ${encounter.stand}`);
    }) 
}

module.exports = {
    name: "arrow",
    description: "Gives user a random stand",
    cooldown: 1,
    execute: arrow,
}