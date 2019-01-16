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
                result = {
                    success: true,
                    msg: 'It is 200 status',
                    data: birthdayInfo.birthdayInfo
                }
            }
        }

        console.log(result);
        ctx.body =  result;
    }
    
    
}
module.exports = birthdayContrallers;