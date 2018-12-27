const User = require('../models/user');
const Opt = require('./opt');

cosnt userServices ={
	async getUserInfofunction(id){
		let result = await Opt.findAll(User,
			{
				where: {
					id
				}
			}
		)
		if(!result.isError){
			return result[0].dataValues;
		}
		return result;
	}
}

module.exports = userServices;