const _ = require('lodash')

const Note = require('../models/note');
const Folder = require('../models/folder');
const opt = require('./opt');
const token = require('../utils/token');

const noteServices ={

	async addNote(info, ctx){
		const userId = ctx && token.getTokenMessage(ctx).id;
		let noteInfo = _.cloneDeep(info);
		let result = {
			isError: true,
			msg: "代码逻辑有问题",
		};

		noteInfo.userId = userId;

		if(noteInfo.folderId){ // 如果传入所在文件夹id
			var folder = await opt.findAll(Folder,
				{
					where: {
						id: noteInfo.folderId
					}
				},
				userId
			)
			if(!folder.isError && folder.count){
				result = await opt.create(Note, noteInfo);
			}
			else{
				result = folder.isError ? folder : {
					isError: true,
					msg: '文件夹不存在',
				}
			}
		}
		else{
			result = await opt.create(Note, noteInfo);
		}

		return result;
	},

	async deleteNote(info, ctx){
		const userId = ctx && token.getTokenMessage(ctx).id;
		let result = {
			isError: true,
			msg: "代码逻辑有问题",
		};

		let noteInfo = _.cloneDeep(info);

		result = await opt.destroy(Note, {
			where: {
				...noteInfo
			}
		}, userId)
		return result;
	},

	async updateNote(info, ctx){
		const userId = ctx && token.getTokenMessage(ctx).id;
		let result = {
			isError: true,
			msg: "代码逻辑有问题",
		};
		let noteInfo = _.cloneDeep(info);

		result = await opt.update(Note, 
			{
				...noteInfo
			},
			{
				where: {
					id: noteInfo.id
				}
			}
		, userId)
		return result;
	},

	async getNoteInfo(info, ctx){
		const userId = ctx && token.getTokenMessage(ctx).id;
		let result = {
			isError: true,
			msg: "代码逻辑有问题",
		};
		let noteInfo = _.cloneDeep(info);

		result = await opt.findAll(Note,
			{
				where: {
					...noteInfo
				},
				order: [
					['createdAt', 'DESC']
				]
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
}

module.exports = noteServices;