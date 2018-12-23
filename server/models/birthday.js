const Sequelize = require('sequelize');
const sequelize = require('../sequelizes/db.js');
const user = require('./user.js');

var todolist = sequelize.define('birthday',{
    id: {
        type: Sequelize.INTEGER(12),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(255),  // 文件夹名称
    point_path: Sequelize.STRING(255),  // 文件夹名称
    time: Sequelize.DATE, // 上传时间
    upload_time: Sequelize.DATE, // 上传时间
    modify_time: Sequelize.DATE, // 修改时间
    email: Sequelize.STRING(255), // 文件夹父id
    is_delete: Sequelize.BOOLEAN, // 是否被删除
    user_id: {
		type: Sequelize.INTEGER(12),

		references: {
			model: user, // 这是引用另一个模型
			key: 'id', // 这是引用模型的列名称
		}
    }
},{
    timestamps: false   // 不要默认时间戳
});

module.exports = todolist;