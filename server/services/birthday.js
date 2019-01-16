const _ = require('lodash')

const db = require('../sequelizes/db.js');
const Birthday = require('../models/birthday');
const User = require('../models/user');
const opt = require('./opt');
const token = require('../utils/token');

const birthdayServices ={
	async addBirthday(info, ctx){
        const userId = ctx && token.getTokenMessage(ctx).id;
        let result = {
			isError: true,
			msg: "代码逻辑有问题",
        };
        let birthdayInfo = _.cloneDeep(info);

        birthdayInfo.userId = userId;
        if(!birthdayInfo.advanceDay){ // 提前提醒日期默认为0天
            birthdayInfo.advanceDay = 0;
        }
        if(!birthdayInfo.dataType){ // 生日类型默认为0(阳历)
            birthdayInfo.dataType = 0;
        }
        if(!birthdayInfo.email){ // 提醒邮箱默认为用户邮箱
            let user = await opt.findAll(User, {
                where: {
                    id: userId
                }
            }, userId);
            if(user.isError || !user.length){
                return user;
            }
            else{
                birthdayInfo.email = user[0].email;
            }
        }

        result = await opt.create(Birthday, birthdayInfo);
        if(!result.isError){
			result.dataValues = result.map((item, index)=>{
				return item.dataValues;
			})
		}
        return result;
    },
    
}

module.exports = birthdayServices;