const {DataTypes} = require('sequelize');
const db = require('../config/db');

module.exports = db.define('post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    headerIMG: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
});