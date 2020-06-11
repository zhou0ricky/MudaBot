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
        unique: false,
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