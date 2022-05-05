const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'mysql',
    username: 'root',
    database: 'blog',
});

module.exports = sequelize;

