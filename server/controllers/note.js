/*
* @Author: liuchuanfu
* @Date:   2018-12-24 19:54:20
* @Last Modified time: 2018-12-28 10:22:00
* @Email: chuanfuliu@sohu-inc.com
*/
const _ = require('lodash');

// const birthdayService = require('../services/birthday');
// const folderService = require('../services/folder');
const noteService = require('../services/note');
const userService = require('../services/user');
const config = require('../../config');
const file = require('../utils/file');


const noteContrallers = {

    async addNoteInfo(ctx){ // 增加笔记
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = _.cloneDeep(ctx.request.body);
        if(!body.noteType){
            ctx.status = 404;
            result.msg = "未传入文件类型";
        }
        else{
            let noteInfo = await noteService.addNote(body, ctx);

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

        console.log(result)
        ctx.body = result;

    },
    
    async getNoteInfo(ctx){ // 获取笔记信息
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let query = _.cloneDeep(ctx.request.query);

        delete query.content; // 过滤conten参数
        if(query.fuzzy_name){
            query.name = {like: `%${query.fuzzy_name}%`}
            delete query.fuzzy_name;
        }

        let noteInfo = await noteService.getNoteInfo(query);

        if(noteInfo.isError){
            ctx.status = 404;
            result.msg = noteInfo.msg;
        }
        else{
            if(ctx.request.query.content){
                for(let i = 0; i < noteInfo.length; i++){
                    let item = noteInfo[i];
                    item.notePath && (item.content = await file.getFile(item.notePath));
                }
            }
            result = {
                success: true,
                msg: 'It is 200 status',
                data: noteInfo
            }
        }

        console.log(result)
        ctx.body = result;
    },
    
}
module.exports = noteContrallers;