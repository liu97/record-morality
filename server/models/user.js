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
    nickName: Sequelize.STRING(255), // 昵称
    password: Sequelize.STRING(255),  // 密码
    telephone: Sequelize.STRING(11), // 手机号
    email: Sequelize.STRING(20), // 用户email
},{
    paranoid: true,
});

module.exports = User;