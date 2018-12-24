const Sequelize = require('sequelize');
const db = require('../sequelizes/db');

const User = db.sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER(12),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    password: Sequelize.STRING(255),  // 用户密码
    name: Sequelize.STRING(255),  // 用户昵称
    email: Sequelize.STRING(255), // 用户email
},{
    paranoid: true,
});

module.exports = User;