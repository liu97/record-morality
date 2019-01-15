const _ = require('lodash')

const Note = require('../models/note');
const Folder = require('../models/folder');
const opt = require('./opt');
const folderService = require('./folder');
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
			if(!folder.isError && folder.length){
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
		let noteInfo = _.cloneDeep(info);

		let result = await opt.destroy(Note, {
			where: {
				...noteInfo
			}
		}, userId)
		return result;
	},

	async updateNote(info, ctx){
		const userId = ctx && token.getTokenMessage(ctx).id;
		let noteInfo = _.cloneDeep(info);

		let result = await opt.update(Note, 
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
		let noteInfo = _.cloneDeep(info);

		let notes = await opt.findAll(Note,
			{
				where: {
					...noteInfo
				}
			},
			userId
		)
        
		if(!notes.isError){
			let result = [];
			for(let i = 0; i < notes.length; i++){
				let note = _.cloneDeep(notes[i].dataValues);
				let folder = await folderService.getFolderInfo({id: note.folderId}, ctx);// 获取note的父文件夹

				if(!folder.isError && folder.length){
					note.noteFrom = folder[0].name; 

					while(folder[0].parentId){
						folder = await folderService.getFolderInfo({id:folder[0].parentId}, ctx);
						note.noteFrom = folder[0].name + ">" + note.noteFrom;
					}
					
					result.push(note);
				}
				else{
					result = {
						isError: true,
						msg: '文件夹不存在',
					};
					break;
				}
				
			}
			return result;
		}
		return notes;
	},
}

module.exports = noteServices;