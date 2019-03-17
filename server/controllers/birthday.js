/*
* @Author: liuchuanfu
* @Date:   2018-12-24 19:54:20
* @Last Modified time: 2018-12-28 10:22:00
* @Email: chuanfuliu@sohu-inc.com
*/
const _ = require('lodash');

const birthdayService = require('../services/birthday');
// const folderService = require('../services/folder');
// const noteService = require('../services/note');
// const userService = require('../services/user');
// const config = require('../../config');
const file = require('../utils/file');
const token = require('../utils/token');
const datatime = require('../utils/datetime');
const scheduleServices = require('../services/schedule'); // 定时任务


const birthdayContrallers = {
    async addBirthday(ctx){
        const userId = token.getTokenMessage(ctx).id;
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = _.cloneDeep(ctx.request.body);
        if(!body.name){
			ctx.status = 404;
            result.msg = "未传入生日者的名称";
        }
        else if(!body.date){
            ctx.status = 404;
            result.msg = "未传入生日时间";
        }
        else if(!body.content){
            body.content = '';
        }
        else{
            let writeMessage = await file.writeFile(`resource/users/${userId}/birthdayPoint/${body.name}${datatime.parseStampToFormat('YYYY-MM-DD')}.text`, body.content)
            if(writeMessage.isError){
                ctx.status = 404;
                result.msg = writeMessage.msg;
            }
            else{
                body.pointPath = writeMessage.relativePath; // 文件写入成功，保存文件路径
            }

            let birthdayInfo = await birthdayService.addBirthday(body, ctx);

            if(birthdayInfo.isError){
                ctx.status = 404;
                result.msg = birthdayInfo.msg;
            }
            else{
                scheduleServices.sendMailByMessage(birthdayInfo); // 检查新建的生日提醒是否就是今天
                result = {
                    success: true,
                    msg: 'It is 200 status',
                    data: birthdayInfo
                }
            }
        }

        console.log(result);
        ctx.body =  result;
    },

    async deleteBirthday(ctx){
        const userId = token.getTokenMessage(ctx).id;
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = _.cloneDeep(ctx.request.body);

        if(!body.id){
            ctx.status = 404;
            result.msg = "未传入生日id";
        }
        else{
            let birthdayInfo = await birthdayService.deleteBirthday(body, ctx);

            if(birthdayInfo.isError){
                ctx.status = 404;
                result.msg = birthdayInfo.msg;
            }
            else{
                result = {
                    success: true,
                    msg: 'It is 200 status',
                    data: birthdayInfo
                }
            }
        }
        console.log(result);
        ctx.body = result;
    },
    
    async updateBirthdayInfo(ctx){
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = _.cloneDeep(ctx.request.body);

        if(!body.id){
            ctx.status = 404;
            result.msg = "未传入生日id";
        }
        else{
            if(body.content){
                let oldBirthday = await birthdayService.getBirthdayInfo({id: body.id}, ctx);

                if(oldBirthday.isError && oldBirthday.length){
                    oldBirthday = oldBirthday.dataValues;

                    let writeMessage = await file.writeFile(oldBirthday.pointPath, body.content);
                    if(writeMessage.isError){
                        ctx.status = 404;
                        result.msg = writeMessage.msg;
                    }
                }
                else{
                    body.status = 404;
                    result.msg = oldBirthday.isError ? oldBirthday.msg : '需要修改的文件不存在';
                }
            }

            let birthdayInfo = await birthdayService.updateBirthday(body, ctx);

            if(birthdayInfo.isError){
                ctx.status = 404;
                result.msg = birthdayInfo.msg;
            }
            else{
                result = {
                    success: true,
                    msg: 'It is 200 status',
                    data: birthdayInfo
                }
            }
        }

        console.log(result);
        ctx.body = result;
    },

    async getBirthdayInfo(ctx){
        const userId = token.getTokenMessage(ctx).id;
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let query = _.cloneDeep(ctx.request.query);

        query.userId = userId;
        let birthdayInfo = await birthdayService.getBirthdayInfo(query, ctx);

        if(birthdayInfo.isError){
            ctx.status = 404;
            result.msg = birthdayInfo.msg;
        }
        else{
            birthdayInfo = birthdayInfo.dataValues;
            for(let i = 0; i < birthdayInfo.length; i++){
                let birthday = birthdayInfo[i];
                let readMessage = await file.readFile(birthday.pointPath);
                birthday.content = readMessage.isError ? readMessage.msg : readMessage.content; // 获取文章内容
            }
            result = {
                success: true,
                msg: 'It is 200 status',
                data: birthdayInfo
            }
        }

        console.log(result);
        ctx.body = result;
    }
    
}
module.exports = birthdayContrallers;