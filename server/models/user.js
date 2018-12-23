const Sequelize = require('sequelize');
const sequelize = require('../sequelizes/db.js');

var todolist = sequelize.define('user',{
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
    register_time: Sequelize.DATE, // 注册时间
    is_delete: Sequelize.BOOLEAN, // 是否被删除
},{
    timestamps: false   // 不要默认时间戳
});

module.exports = todolist;