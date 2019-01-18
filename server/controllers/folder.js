/*
* @Author: liuchuanfu
* @Date:   2018-12-24 19:54:20
* @Last Modified time: 2018-12-28 10:22:00
* @Email: chuanfuliu@sohu-inc.com
*/
const _ = require('lodash');
const token = require('../utils/token');

// const birthdayService = require('../services/birthday');
const folderService = require('../services/folder');
const noteService = require('../services/note');
// const userService = require('../services/user');


const folderContrallers = {
    async addFolder(ctx){
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = _.cloneDeep(ctx.request.body);
        let folderInfo = await folderService.addFolder(body, ctx);

        if(folderInfo.isError){
            ctx.status = 404;
            ctx.data = null;
            result.msg = folderInfo.msg;
        }
        else{
            result = {
                success: true,
                msg: 'It is 200 status',
                data: folderInfo
            }
        }

        console.log(result)
        ctx.body = result;
    },
    
    async deleteFolder(ctx){ // 删除文件夹
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = _.cloneDeep(ctx.request.body);

        if(!body.id){
            ctx.status = 404;
            ctx.data = null;
            result.msg = "未传入文件夹id";
        }
        else{
            let folderInfo = await folderService.deleteFolder(body, ctx);

            if(folderInfo.isError){
                ctx.status = 404;
                ctx.data = null;
                result.msg = folderInfo.msg;
            }
            else{
                result = {
                    success: true,
                    msg: 'It is 200 status',
                    data: folderInfo
                }
            }
        }

        console.log(result)
        ctx.body = result;
        
    },

    async updateFolderInfo(ctx){
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = _.cloneDeep(ctx.request.body);

        if(body.id == body.parentId){
            ctx.status = 404;
            ctx.data = null;
            result.msg = "文件不能成为自己的子文件夹";
        }
        else{
            let folderInfo = await folderService.updateFolderInfo(body, ctx);

            if(folderInfo.isError){
                ctx.status = 404;
                ctx.data = null;
                result.msg = folderInfo.msg;
            }
            else{
                result = {
                    success: true,
                    msg: 'It is 200 status',
                    data: folderInfo
                }
            }
        }
        console.log(result)
        ctx.body = result;
    },

    async findChildList(folders, ctx){ // 辅助函数（返回文件夹树结构）
        for(let i = 0; i< folders.length; i++){
            let folderInfo = await folderService.getFolderInfo({parentId: folders[i].id}, ctx);
            if(folderInfo.isError){
                ctx.status = 404;
                ctx.data = null;
                ctx.body = {
                    success: false,
                    message: folderInfo.msg
                }
                return;
            }
            folders[i].children = folderInfo.dataValues;
            await folderContrallers.findChildList(folders[i].children, ctx);
        }
    },

    async getFolderTree(ctx){ // 获取文件夹树信息
        const userId = ctx && token.getTokenMessage(ctx).id;
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let folderInfo = await folderService.getFolderInfo({userId, parentId:null}, ctx);
        if(folderInfo.isError){
            ctx.status = 404;
            ctx.data = null;
            result.msg = folderInfo.msg;
        }
        else{
            folderInfo = folderInfo.dataValues;
            await folderContrallers.findChildList(folderInfo, ctx);
            
            result = {
                success: true,
                msg: 'It is 200 status',
                data: folderInfo
            }
        }
        console.log(result)
        ctx.body = result;
    },
    
    async openFolder(ctx){ //打开文件夹
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let query = _.cloneDeep(ctx.request.query);

        if(!query.id){
            ctx.status = 404;
            ctx.data = null;
            result.msg = "未传入文件夹id";
        }
        else{
            let folder = await folderService.getFolderInfo({id: query.id}, ctx);

            let childFolder = await folderService.getFolderInfo({parentId: query.id}, ctx);

            let childNote = await noteService.getNoteInfo({folderId: query.id}, ctx);

            if(!folder.isError && !childNote.isError && !childFolder.isError){
                result = {
                    success: true,
                    msg: 'It is 200 status',
                    data: {
                        folder: folder.dataValues,
                        children: {
                            childFolder: childFolder.dataValues,
                            childNote: childNote.dataValues,
                        }
                    }
                }
            }
            else{
                folder.isError && (result.msg = result.msg + folder.isError);
                childNote.isError && (result.msg = result.msg + childNote.isError);
                childFolder.isError && (result.msg = result.msg +' '+ childFolder.isError);
            }
        }

        console.log(result);
        ctx.body = result;
    }
}
module.exports = folderContrallers;