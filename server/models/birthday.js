const Sequelize = require('sequelize');
const db = require('../sequelizes/db');
const User = require('./user');

const Birthday = db.sequelize.define('birthday',{
    id: {
        type: Sequelize.INTEGER(12),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(11),  // 生日者名字
    pointPath: Sequelize.STRING(255),  // 提醒信息存储位置
    date: Sequelize.DATE, // 生日日期
    advanceDay: Sequelize.STRING(11), // 生日提前提醒天数
    dateType: Sequelize.BOOLEAN, //生日日期类型（阳历|阴历）
    email: Sequelize.STRING(20), // 提醒生日邮箱
},{
    paranoid: true,
});

User.hasMany(Birthday);
Birthday.belongsTo(User);

module.exports = Birthday;