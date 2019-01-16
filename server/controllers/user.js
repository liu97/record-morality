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
                userInfo = userInfo.dataValues;
                result = {
                    success: true,
                    msg: 'It is 200 status',
                    data: userInfo
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
        if(!body.password || !body.name || !body.email){
            ctx.status = 404;
            result.msg = "填写信息不完全";
        }
        else{
            let checkExist = await userService.getUserInfo({name: body.name});
            if(checkExist.length){
                result.msg = '用戶名已存在';
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
                            name: registerResult.name,
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
        if(!body.password || !body.name){
            ctx.status = 404;
            result.msg = "填写信息不完全";
        }
        else{
            let userInfo = await userService.getUserInfo({name: body.name});
            if(userInfo.isError){
                ctx.status = 404;
                result.msg = userInfo.msg;
            }
            else{
                if(userInfo.length){
                    
                    try{
                        if (bcrypt.compareSync(body.password, userInfo[0].password)) { // 判断数据库密码和用户输入密码是否相同
                            const userToken = { // 用户token
                                name: userInfo[0].name,
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
                            result.msg = "用戶名或密码错误";
                        }
                    }
                    catch(err){
                        ctx.status = 404;
                        result.msg = err;
                    }
                }
                else{
                    result.msg = "用戶名不存在";
                }
            }
        }
        console.log(result);
        ctx.body = result;
    }
    
}
module.exports = userContrallers;