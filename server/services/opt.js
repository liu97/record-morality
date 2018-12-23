const Types = require('../utils/type');
const sequelize = require('../sequelizes/db.js');

const asyncECatch = require('../utils/asyncECatch');

/**
 * 新增表数据快捷函数
 * @param  {[Object]} model   [对应的表模型]
 * @param  {[Object|Array]} message [传入对象为增加一行数据，传入数组为增加批量数据]
 * @return {[Object|Array]}         [只有插入多行数据才返回数组]
 */
module.exports.insert = async function(model, message){
	// let result = await model.create(message);

	let result;

	if(Types.isJSON(message)){
		try{
			result = await model.create(message);
		} catch(err){
			result = {
				isError: true,
				msg: 'Errors were released during insertion!',
			}
		}
		result = !result.isError ? result.dataValues : result;
	}
	else if(Types.isArray(message)){
		try{
			result = await sequelize.transaction( function(t){
				return model.bulkCreate(message)
			} )
		} catch(err){
			result = {
				isError: true,
				msg: 'Errors were released during insertion!',
			}
		}
	}
	else{
		result = {
			isError: true,
			msg: 'Incorrect parameters!'
		}
	}
	return result;
}

/**
 * 删除表数据，未删除，删除标志为is_delete:true
 * @param  {[Object]} model   [对应的表模型]
 * @param  {[Object]} message [对应删除条件，删除多行时键值对的值为数组]
 * @return {[Array]}         [修改数据的行数]
 */
module.exports.delete = async function(model, message){
	let result;
	if(Types.isJSON(message)){
		try{
			result = await model.update(
				{
					is_delete: true,
				},
				{
					where : message
				}
			)
		} catch(err){
			result = {
				isError: true
			}
		}
	}
	else{
		result = {
			isError: true,
			msg: 'Incorrect parameters!'
		}
	}
	return result;
}

// module.exports.update = async function(model,)