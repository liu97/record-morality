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

		if(!noteInfo.title){
			noteInfo.title = "新建文档";
		}
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

	async getNoteInfo(info){
		let noteInfo = _.cloneDeep(info);

		let notes = await opt.findAll(Note,
			{
				where: {
					...noteInfo
				}
			}
		)
        
		if(!notes.isError){
			let result = [];
			for(let i = 0; i < notes.length; i++){
				let note = _.cloneDeep(notes[i].dataValues);
				let parentFolder = await folderService.getFolderInfo({id: note.folderId});// 获取note的父文件夹

				if(!parentFolder.isError){
					note.noteFrom = parentFolder[0].name; 

					while(parentFolder[0].parentId){
						parentFolder = await folderService.getFolderInfo({id:parentFolder[0].parentId});
						note.noteFrom = parentFolder[0].name + ">" + note.noteFrom;
					}
					
					result.push(note);
				}
				else{
					result = {
						isError: true,
						msg: '用户不存在',
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