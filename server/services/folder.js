const _ = require('lodash')

const db = require('../sequelizes/db.js');
const User = require('../models/user');
const Folder = require('../models/folder');
const Note = require('../models/note');
const Opt = require('./opt');

const folderServices ={
	async addFolder(info){ // 添加文件夹
		let folderInfo = _.cloneDeep(info);
		let result = {
			isError: true,
			msg: "代码逻辑有问题",
		};

		let user = await Opt.findAll(User, // 先获取外键userId对应的user对象
			{
				where: {
					id: folderInfo.userId
				}
			}
		);

		if(user.length){ // 外键对应的用户存在
			if(!folderInfo.name){
				folderInfo.name = "新建文件夹";
			}

			if(folderInfo.parentId){ // 如果传入父文件夹，判断父文件夹是否存在
				var parentFolder = await Opt.findAll(Folder,
					{
						where: {
							id: folderInfo.parentId
						}
					}
				)
				if(!parentFolder.isError && parentFolder.length){
					var folder = await Opt.create(Folder, folderInfo);
				}
				else{
					var folder = {
						isError: true,
						msg: '父文件夹不存在',
					}
				}
			}
			else{
				var folder = await Opt.create(Folder, folderInfo);
			}

			if(!folder.isError){
				try{
					result = user[0].addFolder(folder);
				}
				catch(err){
					result = {
						isError: true,
						msg: err,
					};
				}
			}
			else{
				result = folder;
			}
		}
		else{
			result = {
				isError: true,
				msg: '用户不存在',
			};
		}

		return result;
	},

	async deleteFolder(info){ // 删除文件夹
		let folderInfo = _.cloneDeep(info);
		let result = {
			isError: true,
			msg: "代码逻辑有问题",
		};
		let dFolderCond = [];
		let needDeleteList = []; // 需要删除的元素（包括folder和note）

		dFolderCond = await Opt.findAll(Folder,  // 查询所有需要删除的folder
			{
				where: {
					...folderInfo
				}
			}
		);
		if(dFolderCond.isError){ // 预防查询结果出错
			result = dFolderCond;
		}
		else{
			needDeleteList.push(...dFolderCond);

			while(dFolderCond.length){
				let childrenList = [];
				for(let i = 0; i < dFolderCond.length; i++){
					let item = dFolderCond[i];

					let childrenFolder = await Opt.findAll(Folder, // 找到所有需要删除的folder的子folder
						{
							where: {
								parentId: item.dataValues.id
							}
						}	
					);

					if(childrenFolder.isError){ // 预防查询结果出错
						result = childrenFolder;
						dFolderCond = []; // 跳出while循环
						break;
					}
					else{
						childrenList.push(...childrenFolder);
				
						let childrenNote = await Opt.findAll(Note, // 找到所有需要删除的folder的子note
							{
								where: {
									folderId: item.dataValues.id
								}
							}	
						);
						if(childrenNote.isError){ // 预防查询结果出错
							result = childrenNote;
							dFolderCond = []; // 跳出while循环
							break;
						}
						else{
							needDeleteList.push(...childrenFolder, ...childrenNote);
						}
					}
				}
				dFolderCond = childrenList;
			}
			
			if(result.isError){ // 如果前面操作都未出错，开始进行删除
				try {
					result = await db.sequelize.transaction(function (t1) { //托管事物
						for(let i = 0; i < needDeleteList.length; i++){
							if(i == needDeleteList.length-1){
								return needDeleteList[i].destroy();
							}
							needDeleteList[i].destroy();
						}
					});
					if(!result){ 
						result = "删除成功"
					}
				} catch (err) {
					// Rollback transaction if any errors were encountered
					result = {
						isError: true,
						msg: 'Error occurred and rolled back!',
					}
				}
			}
		}
		return result;
	},

	async updateFolderInfo(info){ // 修改文件夹
		let folderInfo = _.cloneDeep(info);
		let result = {
			isError: true,
			msg: "代码逻辑有问题",
		};

		result = await Opt.update(Folder, folderInfo,
			{
				where: {
					id: folderInfo.id
				}
			}
		);
		
		return result;
	},

	async getFolderInfo(info){ // 获取文件夹信息
		let folderInfo = _.cloneDeep(info);

		let result = await Opt.findAll(Folder,
			{
				where: {
					...folderInfo
				}
			}
		);
        
		if(!result.isError){
			return result.map(function(item, index){
				return item.dataValues;
			})
		}
		return result;
	},

}

module.exports = folderServices;