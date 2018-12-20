const Sequelize = require('sequelize');
const sequelize = require('../db.js');
const user = require('./user.js');

var todolist = sequelize.define('folder',{
    folder_id: {
        type: Sequelize.INTEGER(12),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(255),  // 文件夹名称
    upload_time: Sequelize.DATE, // 上传时间
    modify_time: Sequelize.DATE, // 修改时间
    parent_id: Sequelize.INTEGER(12), // 文件夹父id
    is_delete: Sequelize.STRING(255), // 是否被删除
    user_id: {
		type: Sequelize.INTEGER(12),

		references: {
			model: user, // 这是引用另一个模型
			key: 'user_id', // 这是引用模型的列名称
		}
    }
},{
    timestamps: false   // 不要默认时间戳
});

module.exports = todolist;