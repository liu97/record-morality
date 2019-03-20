const Types = require('../utils/type');
const db = require('../sequelizes/db.js');
const User = require('../models/user');

/**
 * 
 * @param {[Object]} model   [对应的表模型] 
 * @param {[Object|Array]} message [传入对象为增加一行数据，传入数组为增加批量数据]
 * @param {[Number]} authId [用户Id]
 */
const authCheck = async function(model, message, authId){
	let auth = true;
	try{
		let result = await findAll(model, message, authId);
		if(result.isError){
			auth = false;
		}
	} catch(err){
		auth = false;
	}
	return auth;
}
/**
 * 新增表数据快捷函数
 * @param  {[Object]} model   [对应的表模型]
 * @param  {[Object|Array]} message [传入对象为增加一行数据，传入数组为增加批量数据]
 * @return {[Array]}         [插入的实例数组]
 */
const create = async function(model, message){

	let result;

	if(Types.isJSON(message)){
		try{
			result = await model.create(message);
		} catch(err){
			result = {
				isError: true,
				msg: '新增数据的时候发生了错误',
			};
		}
	}
	else if(Types.isArray(message)){
		try{
			result = await model.bulkCreate(message);
		} catch(err){
			result = {
				isError: true,
				msg: '新增多个数据的时候发生了错误',
			};
		}
	}
	else{
		result = {
			isError: true,
			msg: '传入参数有误',
		};
	}
	return result;
}

/**
 * 删除表数据
 * @param  {[Object]} model   [对应的表模型]
 * @param  {[Object|Array]} condition [对应删除条件，删除多行时键值对的值为数组]
 * @return {[Array]}         [修改数据的行数]
 */
const destroy = async function(model, condition, authId){
	let result, auth = true;
	if(Types.isJSON(condition)){
		if(authId){
			auth = await authCheck(model, condition, authId);
		}
		if(auth){
			try{
				result = await model.destroy(
					condition
				);
			} catch(err){
				result = {
					isError: true,
					msg: '删除数据的时候发生了错误',
				};
			}
		}
		else{
			result = {
				isError: true,
				msg: '无权限删除该数据',
			};
		}
	}
	else{
		result = {
			isError: true,
			msg: '传入参数有误',
		}
	}
	return result;
}

/**
 * 修改快捷函数
 * @param  [Object]} model   [对应的表模型]
 * @param  {[Object]} message   [修改内容]
 * @param  {[Object]} condition [修改条件]
 * @return {[Array]}           [修改后的实例数组]
 */
const update = async function(model, message, condition, authId){
	let result, auth = true;
	if(Types.isJSON(message) && Types.isJSON(condition)){
		if(authId){
			auth = await authCheck(model, condition, authId);
		}
		if(auth){
			try{
				result = await model.update(
					message,
					condition
				)
			} catch(err){
				result = {
					isError: true,
					msg: '更新数据的时候发生了错误',
				}
			}
		}
		else{
			result = {
				isError: true,
				msg: '无权限修改该数据',
			};
		}
	}
	else{
		result = {
			isError: true,
			msg: '传入参数有误',
		}
	}
	return result;
}

/**
 * 查找快捷函数
 * @param  [Object]} model   [对应的表模型]
 * @param  {[Object]} message [查找对应的要求或信息]
 * @return {[Array]}         [查找到的实例数组]
 */
const findAll = async function(model, message, authId){
	let result;
	if(Types.isJSON(message)){
		try{
			result = await model.findAndCountAll(
				message
			);
			if(authId){
				for(let i = 0; i < result.length; i++){
					let id = result[i].userId !== undefined ? result[i].userId : result[i].id
					if(id != authId){
						result = {
							isError: true,
							msg: '无权限查看该数据',
						};
						break;
					}
				}
			}
		} catch(err){
			result = {
				isError: true,
				msg: '查询数据的时候发生了错误',
			}
		}
	}
	else{
		result = {
			isError: true,
			msg: '传入参数有误',
		}
	}
	return result;
}

module.exports = {
	create,
	destroy,
	update,
	findAll
}

// module.exports.transaction = async function(events){
// 	let result;
// 	if(Types.isArray(events)){
// 		try {
// 		    result = await db.sequelize.transaction(function (t1) {
// 				// 启用 CLS 后，将在事务中创建用户
// 				User.destroy({where: {id:1}});
// 				return User.create({ name: 'Alice' });
//     	    });
// 		} catch (err) {
// 		    // Rollback transaction if any errors were encountered
// 		    result = {
// 		    	isError: true,
// 		    	msg: 'Error occurred and rolled back!',
// 		    }
// 		}
// 	}
// 	else{
// 		result = {
// 			isError: true,
// 			msg: '传入参数有误',
// 		}
// 	}
// 	return result;
// }