/*
* @Author: liuchuanfu
* @Date:   2018-12-24 19:54:20
* @Last Modified time: 2018-12-28 10:22:00
* @Email: chuanfuliu@sohu-inc.com
*/
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

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

        let query = _.cloneDeep(ctx.request.query);
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
                let userData = userInfo.dataValues;
                result = {
                    success: true,
                    msg: 'It is 200 status',
                    data: userData,
                    count: userInfo.count,
                }
            }
        }
        ctx.body = result;
    },

    async register(ctx){ //注册
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = _.cloneDeep(ctx.request.body);
        if(!body.password || !body.nickName || !body.email){
            ctx.status = 404;
            result.msg = "填写信息不完全";
        }
        else{
            let checkExist = await userService.getUserInfo({
                '$or': [
                    {nickName: body.nickName},
                    {email: body.email}
                ]
            });
            if(checkExist.length){
                result.msg = '昵称或者邮箱已存在';
            }
            else{
                let registerResult = await userService.registerUser(body);

                if(registerResult.isError){
                    ctx.status = 404;
                    result.msg = registerResult.msg;
                }
                else{
                    try{
                        registerResult = registerResult.dataValues;
                        const userToken = { // 用户token
                            nickName: registerResult.nickName,
                            id: registerResult.id
                        };
                        const token = jwt.sign(userToken, config.secret, {expiresIn: '6h'});  // 签发token

                        result = {
                            success: true,
                            msg: 'It is 200 status',
                            data: token,
                        }

                    }
                    catch(err){
                        ctx.status = 404;
                        result.msg = err;
                    }
                }
            }
        }
        console.log(result);
        ctx.body = result;
    },

    async login(ctx){
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = _.cloneDeep(ctx.request.body);
        if(!body.password || !body.email){
            ctx.status = 404;
            result.msg = "填写信息不完全";
        }
        else{
            let userInfo = await userService.getUserInfo({email: body.email});
            if(userInfo.isError){
                ctx.status = 404;
                result.msg = userInfo.msg;
            }
            else{
                if(userInfo.length){
                    
                    try{
                        if (bcrypt.compareSync(body.password, userInfo[0].password)) { // 判断数据库密码和用户输入密码是否相同
                            const userToken = { // 用户token
                                email: userInfo[0].email,
                                id: userInfo[0].id
                            };
                            const token = jwt.sign(userToken, config.secret, {expiresIn: '6h'});  // 签发token
    
                            result = {
                                success: true,
                                msg: 'It is 200 status',
                                data: token,
                            }
                        }
                        else{
                            result.msg = "邮箱或密码错误";
                        }
                    }
                    catch(err){
                        ctx.status = 404;
                        result.msg = err;
                    }
                }
                else{
                    result.msg = "邮箱不存在";
                }
            }
        }
        console.log(result);
        ctx.body = result;
    },
    
    async checkNickName(ctx){ // 检查昵称是否被占用
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = _.cloneDeep(ctx.request.body);

        if(!body.nickName){
            result.msg = "未填写昵称";
        }
        else{
            let checkExist = await userService.getUserInfo({nickName: body.nickName});
            if(checkExist.length){
                result.msg = '昵称已经被占用了呢';
            }
            else{
                result = {
                    success: true,
                    msg: 'It is 200 status',
                    data: null,
                }
            }
        }

        console.log(result);
        ctx.body = result;
    },

    async checkEmail(ctx){
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = _.cloneDeep(ctx.request.body);

        if(!body.email){
            result.msg = "未填写邮箱";
        }
        else{
            let checkExist = await userService.getUserInfo({email: body.email});
            if(checkExist.length){
                result.msg = '邮箱已经被注册过了呢';
            }
            else{
                result = {
                    success: true,
                    msg: 'It is 200 status',
                    data: null,
                }
            }
        }

        console.log(result);
        ctx.body = result;
    },
    
}
module.exports = userContrallers;