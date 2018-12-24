/*
* @Author: liuchuanfu
* @Date:   2018-12-18 20:45:19
* @Last Modified time: 2018-12-24 15:22:15
* @Email: chuanfuliu@sohu-inc.com
*/
const allConfig = require('../../config');
const config = allConfig.database;

const cls = require('continuation-local-storage');
const namespace = cls.createNamespace('my-very-own-namespace');
const Sequelize = require('sequelize');
Sequelize.useCLS(namespace);

const sequelize = new Sequelize(config.DATABASE, config.USERNAME, config.PASSWORD, {
	host: config.HOST,
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},

	timezone: '+08:00', //东八时区

});


module.exports.sequelize = sequelize;
module.exports.namespace = namespace;