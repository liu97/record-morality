const Sequelize = require('sequelize');
const db = require('../sequelizes/db.js');
const User = require('./user.js');
const Folder = require('./folder.js');

var Note = db.sequelize.define('note',{
    id: {
        type: Sequelize.INTEGER(12),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    title: Sequelize.STRING(255),  // 笔记标题
    notePath: Sequelize.STRING(255),  // 笔记存储路径
    noteType: Sequelize.STRING(255), // 笔记类型（txt、md）
},{
    paranoid: true,
});

User.hasMany(Note);
Note.belongsTo(User);
Folder.hasMany(Note);
Note.belongsTo(Folder);

module.exports = Note;