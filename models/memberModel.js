const {DataTypes} = require('sequelize');
const db = require('../config/db');

module.exports = db.define('member', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            is: [/^[a-zA-Z\s]*$/],
        },
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    committee: {
        type: DataTypes.ENUM('PR', 'Graphics','Video', 'SMM', 'Technical'),
        allowNull: false,
    },
});