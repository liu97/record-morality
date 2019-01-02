const _ = require('lodash')

const Note = require('../models/note');
const Opt = require('./opt');

const noteServices ={
	async getNoteInfo(info){
		let noteInfo = _.cloneDeep(info);

		let result = await Opt.findAll(Note,
			{
				where: {
					...noteInfo
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

}

module.exports = noteServices;