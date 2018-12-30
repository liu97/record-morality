const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash')

const User = require('../models/user');
const Opt = require('./opt');

const userServices ={
	async getUserInfo(info){
		let result = await Opt.findAll(User,
			{
				where: {
					...info
				}
			}
		)
		if(!result.isError){
			return result.map(function(item, index){
				return item.dataValues;
			})
		}
		return result;
	},
	async registerUser(info){
		let userInfo = _.cloneDeep(info);

		let salt = bcrypt.genSaltSync(10);// 10 is by default
		userInfo.password = bcrypt.hashSync(userInfo.password, salt); // salt is inclued in generated hash
		
		let result = await Opt.create(User, userInfo);
		if(!result.isError){
			return result.dataValues;
		}
		return result;
	}
}

module.exports = userServices;