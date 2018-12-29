const User = require('../models/user');
const Opt = require('./opt');

const userServices ={
	getUserInfo: async function (id){
		let result = await Opt.findAll(User,
			{
				where: {
					id
				}
			}
		)
		if(!result.isError){
			return result[0] && result[0].dataValues;
		}
		console.log(result)
		return result;
	}
}

module.exports = userServices;