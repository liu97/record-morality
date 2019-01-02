/*
* @Author: liuchuanfu
* @Date:   2018-12-24 19:54:20
* @Last Modified time: 2018-12-28 10:22:00
* @Email: chuanfuliu@sohu-inc.com
*/
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

// const birthdayService = require('../services/birthday');
const folderService = require('../services/folder');
const noteService = require('../services/note');
const userService = require('../services/user');
const config = require('../../config');


const folderContrallers = {
    async addFolder(ctx){
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = ctx.request.body;

        if(!body.userId){
            ctx.status = 404;
            result.msg = "未传入用户id";
        }
        else{
            let folderInfo = await folderService.addFolder(body);

            if(folderInfo.isError){
                ctx.status = 404;
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
    
    async deleteFolder(ctx){ // 删除文件夹
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = ctx.request.body;

        if(!body.id){
            ctx.status = 404;
            result.msg = "未传入文件夹id";
        }
        else{
            let folderInfo = await folderService.deleteFolder(body);

            if(folderInfo.isError){
                ctx.status = 404;
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

        let body = ctx.request.body;
        let folderInfo = await folderService.updateFolderInfo(body);

        if(folderInfo.isError){
            ctx.status = 404;
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

    async getFolderInfo(ctx){ // 获取文件夹信息
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let query = ctx.request.query;
        let folderInfo = await folderService.getFolderInfo(query);

        if(folderInfo.isError){
            ctx.status = 404;
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
    
}
module.exports = folderContrallers;