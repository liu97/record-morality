const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash')

const User = require('../models/user');
const Folder = require('../models/folder');
const Opt = require('./opt');
const token = require('../utils/token');

const userServices ={
	async getUserInfo(info, ctx){
		const userId = ctx && token.getTokenMessage(ctx).id;
		let result = {
			isError: true,
			msg: "代码逻辑有问题",
		};
		let userInfo = _.cloneDeep(info);

		if(!userInfo.id && userId){
			userInfo.id = userId;
		}

		result = await Opt.findAll(User,
			{
				where: {
					...userInfo
				}
			},
			userId
		)

		if(!result.isError){
			result.dataValues = result.rows.map((item, index)=>{
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
		if(!result.isError){
			initFolder = await Opt.create(Folder, {name: '我的文件夹', userId: result.id});
			if(initFolder.isError){
				result = initFolder;
			}
		}
		
		return result;
	},

	async updateUser(info, ctx){
		const userId = ctx && token.getTokenMessage(ctx).id;
		let result = {
			isError: true,
			msg: "代码逻辑有问题",
		};
		let userInfo = _.cloneDeep(info);
		if(!userInfo.id && userId){
			userInfo.id = userId;
		}

		result = await Opt.update(User, 
			{
				...userInfo
			},
			{
				where: {
					id: userInfo.id
				}
			}
		, userId)
		return result;
	}

}

module.exports = userServices;