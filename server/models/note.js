const Sequelize = require('sequelize');
const sequelize = require('../db.js');
const user = require('./user.js');
const folder = require('./folder.js');

var todolist = sequelize.define('note',{
    note_id: {
        type: Sequelize.INTEGER(12),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    title: Sequelize.STRING(255),  // 笔记标题
    note_path: Sequelize.STRING(255),  // 笔记存储路径
    upload_time: Sequelize.DATE, // 上传时间
    modify_time: Sequelize.DATE, // 修改时间
    note_type: Sequelize.STRING(255), // 笔记类型（txt、md）
    is_delete: Sequelize.STRING(255), // 是否被删除
    user_id: {
		type: Sequelize.INTEGER(12),

		references: {
			model: user, // 这是引用另一个模型
			key: 'user_id', // 这是引用模型的列名称
		}
    },
    folder_id: {
		type: Sequelize.INTEGER(12),

		references: {
			model: folder, // 这是引用另一个模型
			key: 'folder_id', // 这是引用模型的列名称
		}
    },
},{
    timestamps: false   // 不要默认时间戳
});

module.exports = todolist;