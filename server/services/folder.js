const _ = require('lodash')

const db = require('../sequelizes/db.js');
const User = require('../models/user');
const Folder = require('../models/folder');
const Note = require('../models/note');
const opt = require('./opt');
const token = require('../utils/token');

const folderServices ={
	async addFolder(info, ctx){ // 添加文件夹
		const userId = ctx && token.getTokenMessage(ctx).id;
		let folderInfo = _.cloneDeep(info);
		let result = {
			isError: true,
			msg: "代码逻辑有问题",
		};

		if(!folderInfo.name){
			folderInfo.name = "新建文件夹";
		}
		folderInfo.userId = userId;

		if(folderInfo.parentId){ // 如果传入父文件夹，判断父文件夹是否存在
			var parentFolder = await opt.findAll(Folder,
				{
					where: {
						id: folderInfo.parentId
					}
				},
				userId
			)
			if(!parentFolder.isError && parentFolder.length){
				result = await opt.create(Folder, folderInfo);
			}
			else{
				result = parentFolder.isError ? parentFolder : {
					isError: true,
					msg: '父文件夹不存在',
				}
			}
		}
		else{
			result = await opt.create(Folder, folderInfo);
		}

		return result;
	},

	async deleteFolder(info, ctx){ // 删除文件夹
		const userId = ctx && token.getTokenMessage(ctx).id;
		let folderInfo = _.cloneDeep(info);
		let result = {
			isError: true,
			msg: "代码逻辑有问题",
		};
		let dFolderCond = [];
		let needDeleteList = []; // 需要删除的元素（包括folder和note）

		dFolderCond = await opt.findAll(Folder,  // 查询所有需要删除的folder
			{
				where: {
					...folderInfo
				}
			},
			userId
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

					let childrenFolder = await opt.findAll(Folder, // 找到所有需要删除的folder的子folder
						{
							where: {
								parentId: item.id
							}
						},
						userId	
					);

					if(childrenFolder.isError){ // 预防查询结果出错
						result = childrenFolder;
						dFolderCond = []; // 跳出while循环
						break;
					}
					else{
						childrenList.push(...childrenFolder);
				
						let childrenNote = await opt.findAll(Note, // 找到所有需要删除的folder的子note
							{
								where: {
									folderId: item.id
								}
							},
							userId
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

	async updateFolderInfo(info, ctx){ // 修改文件夹
		const userId = ctx && token.getTokenMessage(ctx).id;
		let folderInfo = _.cloneDeep(info);
		let result = {
			isError: true,
			msg: "代码逻辑有问题",
		};
		result = await opt.update(Folder, folderInfo,
			{
				where: {
					id: folderInfo.id
				}
			},
			userId
		);
		
		return result;
	},

	async getFolderInfo(info, ctx){ // 获取文件夹信息
		const userId = ctx && token.getTokenMessage(ctx).id;
		let result = {
			isError: true,
			msg: "代码逻辑有问题",
		};
		let folderInfo = _.cloneDeep(info);

		result = await opt.findAll(Folder,
			{
				where: {
					...folderInfo
				}
			},
			userId
		);
		
		if(!result.isError){
			result.dataValues = result.map((item, index)=>{
				return item.dataValues;
			})
		}
		return result;
	},

}

module.exports = folderServices;