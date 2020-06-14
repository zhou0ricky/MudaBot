const Sequalize = require('sequelize');

const sequelize = new Sequalize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const stands = sequelize.define('stands',
{
    guildId: {
        type: Sequalize.STRING,
        unique: false,
    },
    userId: { 
        type: Sequalize.STRING,
        unique: false,
    },
    stand: {
        type: Sequalize.STRING,
        unique: false,
        allowNull: false,
    },
},
{
    indexes:[
        {
            unique: false,
            fields: ["guildId"]
        }
    ]
});

const standStats = sequelize.define('Stand Statistics', 
{
    stand: {
        type: Sequalize.STRING,
        unique: true,
    },
    power: {
        type: Sequalize.NUMBER,
        defaultValue: 0,
    },
    speed: {
        type: Sequalize.NUMBER,
        defaultValue: 0,
    },
    range: {
        type: Sequalize.NUMBER,
        defaultValue: 0,
    },
    durability: {
        type: Sequalize.NUMBER,
        defaultValue: 0,
    },
    precision: {
        type: Sequalize.NUMBER,
        defaultValue: 0,
    },
    potential: {
        type: Sequalize.NUMBER,
        defaultValue: 0,
    }
});

const botDevs = sequelize.define('Bot Devs', {
    userId: {
        type: Sequalize.STRING,
        unique: true,
    }
});

module.exports = {
    sequelize: sequelize,
    stands: stands,
    standStats: standStats,
    botDevs: botDevs,
};