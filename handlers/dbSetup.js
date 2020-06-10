const Discord = require('discord.js');
const Sequalize = require('sequelize');

const sequelize = new Sequalize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const Stands = sequelize.define('stands', {
    user: {
        type: Sequalize.STRING,
        unique: true,
    },
    stand: {
        type: Sequalize.STRING,
        unique: true,
        allowNull: false,
    },
});

module.exports = {
    stands: Stands
}