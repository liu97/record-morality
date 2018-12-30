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
// const noteServive = require('../services/note');
const userService = require('../services/user');
const config = require('../../config');


const userContrallers = {
    
    async getUserInfo(ctx){ // 获取用户信息
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
            let userInfo = await userService.getUserInfo(query);

            if(userInfo.isError){
                ctx.status = 404;
                result.msg = userInfo.msg;
            }
            else{
                result = {
                    success: true,
                    msg: 'It is 200 status',
                    data: userInfo
                }
            }
        }
        console.log(result)
        ctx.body = result;
    },

    async register(ctx){ //注册
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = ctx.request.body;
        if(!body.password || !body.name || !body.email){
            ctx.status = 404;
            result.msg = "填写信息不完全";
        }
        else{
            let checkExist = await userService.getUserInfo({name: body.name});
            let registerResult = await userService.registerUser(body);

            if(registerResult.isError){
                ctx.status = 404;
                result.msg = registerResult.msg;
            }
            else{
                result = {
                    success: true,
                    msg: 'It is 200 status',
                    data: registerResult
                }
            }
        }
        ctx.body = result;
    }
    
}
module.exports = userContrallers;