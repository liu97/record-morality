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
// const userService = require('../services/user');
// const config = require('../../config');
const file = require('../utils/file');
const token = require('../utils/token');
const datatime = require('../utils/datetime');


const noteContrallers = {

    async addNoteInfo(ctx){ // 增加笔记
        const userId = token.getTokenMessage(ctx).id;
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = _.cloneDeep(ctx.request.body);
        if(!body.title){
			body.title = "新建文档";
        }
        
        if(!body.noteType){
            ctx.status = 404;
            result.msg = "未传入文件类型";
        }
        else if(!body.content){
            ctx.status = 404;
            result.msg = "未传入文件内容";
        }
        else{
            let writeMessage = await file.writeFile(`resource/users/${userId}/note/${datatime.parseStampToFormat('YYYY/MM/DD')}/${body.title}${+new Date()}.${body.noteType}`, body.content)
            if(writeMessage.isError){
                ctx.status = 404;
                result.msg = writeMessage.msg;
            }
            else{
                body.notePath = writeMessage.relativePath; // 文件写入成功，保存文件路径

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
        }

        console.log(result)
        ctx.body = result;

    },

    async deleteNoteInfo(ctx){ // 删除note
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = _.cloneDeep(ctx.request.body);

        if(!body.id){
            ctx.status = 404;
            result.msg = "未传入文件id";
        }
        else{
            let noteInfo = await noteService.deleteNote(body, ctx);

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
        console.log(result);
        ctx.body = result;

    },

    async updateNoteInfo(ctx){ // 修改note
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let body = _.cloneDeep(ctx.request.body);

        if(!body.id){
            ctx.status = 404;
            result.msg = "未传入文件id";
        }
        else{
            if(body.content){ // 如果传了笔记内容，更新笔记内容
                let oldNote = await noteService.getNoteInfo({id: body.id});
                if(!oldNote.isError && oldNote.length){
                    let writeMessage = await file.writeFile(oldNote[0].notePath, body.content);
                    if(writeMessage.isError){
                        ctx.status = 404;
                        result.msg = writeMessage.msg;
                    }
                }
                else{
                    body.status = 404;
                    result.msg = oldNote.isError ? oldNote.msg : '需要修改的文件不存在';
                }
            }

            let noteInfo = await noteService.updateNote(body, ctx);
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
        console.log(result);
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
                    let readMessage = await file.readFile(item.notePath);
                    item.content = readMessage.isError ? readMessage.msg : readMessage.content;
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