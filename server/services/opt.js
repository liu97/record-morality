const Types = require('../utils/type');
const db = require('../sequelizes/db.js');

const asyncECatch = require('../utils/asyncECatch');

/**
 * 新增表数据快捷函数
 * @param  {[Object]} model   [对应的表模型]
 * @param  {[Object|Array]} message [传入对象为增加一行数据，传入数组为增加批量数据]
 * @return {[Array]}         [插入的实例数组]
 */
module.exports.create = async function(model, message){

	let result;

	if(Types.isJSON(message)){
		try{
			result = await model.create(message);
		} catch(err){
			result = {
				isError: true,
				msg: 'Errors were released during insertion!',
			};
		}
	}
	else if(Types.isArray(message)){
		try{
			result = await model.bulkCreate(message);
		} catch(err){
			result = {
				isError: true,
				msg: 'Error occurred while insertion!',
			};
		}
	}
	else{
		result = {
			isError: true,
			msg: 'Incorrect parameters!',
		};
	}
	return result;
}

/**
 * 删除表数据，未删除，删除标志为is_delete:true
 * @param  {[Object]} model   [对应的表模型]
 * @param  {[Object|Array]} condition [对应删除条件，删除多行时键值对的值为数组]
 * @return {[Array]}         [修改数据的行数]
 */
module.exports.destroy = async function(model, condition){
	let result;
	if(Types.isJSON(condition)){
		try{
			result = await model.destroy(
				{
					where : condition,
				}
			);
		} catch(err){
			result = {
				isError: true,
				msg: 'Error occurred while deleting!',
			};
		}
	}
	else{
		result = {
			isError: true,
			msg: 'Incorrect parameters!',
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
module.exports.update = async function(model, message, condition){
	let result;
	if(Types.isJSON(message) && Types.isJSON(condition)){
		try{
			result = await model.update(
				message,
				{
					where : condition,
				}
			)
		} catch(err){
			result = {
				isError: true,
				msg: 'Error occurred while updating!',
			}
		}
	}
	else{
		result = {
			isError: true,
			msg: 'Incorrect parameters!',
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
module.exports.findAll = async function(model, message){
	let result;
	if(Types.isJSON(message)){
		try{
			result = await model.findAll(
				message,
			)
		} catch(err){
			result = {
				isError: true,
				msg: 'Error occurred while finding!',
			}
		}
	}
	else{
		result = {
			isError: true,
			msg: 'Incorrect parameters!',
		}
	}
	return result;
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
// 			msg: 'Incorrect parameters!',
// 		}
// 	}
// 	return result;
// }