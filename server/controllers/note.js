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

// const birthdayServive = require('../services/birthday');
// const folderServive = require('../services/folder');
const noteServive = require('../services/note');
const userService = require('../services/user');
const config = require('../../config');


const noteContrallers = {
    
    async getNoteInfo(ctx){ // 获取笔记信息
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let query = ctx.request.query;
        if(!query.id){
            ctx.status = 404;
            result.msg = "未传入id";
        }
        else{
            let noteInfo = await noteService.getNoteInfo(query);

            if(noteInfo.isError){
                ctx.status = 404;
                result.msg = noteInfo.msg;
            }
            else{
                result = {
                    success: true,
                    msg: 'It is 200 status',
                    data: noteInfo
                }
            }
        }
        ctx.body = result;
    },
    
}
module.exports = noteContrallers;