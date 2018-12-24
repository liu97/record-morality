const Sequelize = require('sequelize');
const db = require('../sequelizes/db.js');
const User = require('./user.js');

var Birthday = db.sequelize.define('birthday',{
    id: {
        type: Sequelize.INTEGER(12),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(255),  // 文件夹名称
    pointPath: Sequelize.STRING(255),  // 文件夹名称
    time: Sequelize.DATE, // 生日时间
    email: Sequelize.STRING(255), // 文件夹父id
},{
    paranoid: true,
});

User.hasMany(Birthday);
Birthday.belongsTo(User);

module.exports = Birthday;