const Sequelize = require('sequelize');
const sequelize = require('../sequelizes/db.js');
const User = require('./user.js');

var Folder = sequelize.define('folder',{
    id: {
        type: Sequelize.INTEGER(12),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(255),  // 文件夹名称
    parent_id: Sequelize.INTEGER(12), // 文件夹父id
},{
    paranoid: true,
});

User.hasMany(Folder);
Folder.belongsTo(User);

module.exports = Folder;