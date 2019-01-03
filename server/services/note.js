const _ = require('lodash')

const Note = require('../models/note');
const Opt = require('./opt');
const folderService = require('./folder');

const noteServices ={
	async getNoteInfo(info){
		let noteInfo = _.cloneDeep(info);

		let notes = await Opt.findAll(Note,
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