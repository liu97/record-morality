const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash')

const User = require('../models/user');
const Opt = require('./opt');

const userServices ={
	async getUserInfo(info){
		let result = {
			isError: true,
			msg: "代码逻辑有问题",
		};
		let userInfo = _.cloneDeep(info);

		result = await Opt.findAll(User,
			{
				where: {
					...userInfo
				}
			}
		)

		if(!result.isError){
			result.dataValues = result.map((item, index)=>{
				return item.dataValues;
			})
		}
		return result;
	},

	async registerUser(info){
		let result = {
			isError: true,
			msg: "代码逻辑有问题",
		};
		let registerInfo = _.cloneDeep(info);

		let salt = bcrypt.genSaltSync(10);// 10 is by default
		registerInfo.password = bcrypt.hashSync(registerInfo.password, salt); // salt is inclued in generated hash
		
		result = await Opt.create(User, registerInfo);
		
		return result;
	},

}

module.exports = userServices;