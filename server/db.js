/*
* @Author: liuchuanfu
* @Date:   2018-12-18 20:45:19
* @Last Modified time: 2018-12-18 21:05:40
* @Email: chuanfuliu@sohu-inc.com
*/
const allConfig = require('../config')
const config = allConfig.database

const Sequelize = require('sequelize');
const record = new Sequelize(config.DATABASE, config.USERNAME, config.PASSWORD, {
	host: config.HOST,
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},

	define: {
	    timestamps: false
	}
});


module.exports = record