const Sequelize = require('sequelize');
const db = require('../sequelizes/db');
const User = require('./user');

const Folder = db.sequelize.define('folder',{
    id: {
        type: Sequelize.INTEGER(12),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(255),  // 文件夹名称
    parentId: Sequelize.INTEGER(12), // 文件夹父id
},{
    paranoid: true,
});

User.hasMany(Folder);
Folder.belongsTo(User);

module.exports = Folder;