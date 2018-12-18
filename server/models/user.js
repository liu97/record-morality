var Sequelize = require('sequelize');
var sequelize = require('../utils/db.js');

var todolist = sequelize.define('user',{
    user_id: {
        type: Sequelize.BIGINT(12),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    password: Sequelize.STRING(255),  // 标题
    name: Sequelize.STRING(255),  // 详细内容
    email: Sequelize.STRING(255), // 开始时间
    register_time: Sequelize.STRING, // 计划完成时间
},{
    timestamps: false   // 不要默认时间戳
});

module.exports = todolist;