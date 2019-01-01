const _ = require('lodash')

const Note = require('../models/note');
const Opt = require('./opt');

const noteServices ={
	async getNoteInfo(info){
		let result = await Opt.findAll(Note,
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

}

module.exports = noteServices;