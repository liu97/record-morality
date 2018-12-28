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
const userServive = require('../services/user');
const config = require('../../config');


const userContrallers = {
    
    async getUserInfo(ctx){ // 获取用户信息
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = ctx.request.body;

        let userInfo = body.id && userServices.getUserInfo(body.id);

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
        ctx.body = result;
    },
    
}
module.exports = userContrallers;