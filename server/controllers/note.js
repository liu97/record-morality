/*
* @Author: liuchuanfu
* @Date:   2018-12-24 19:54:20
* @Last Modified time: 2018-12-28 10:22:00
* @Email: chuanfuliu@sohu-inc.com
*/
const _ = require('lodash');
const moment = require('moment');
// const birthdayService = require('../services/birthday');
const folderService = require('../services/folder');
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
        
        if(!body.folderId){
            ctx.status = 404;
            result.msg = "未传入文件夹ID";
        }
        else if(!body.noteType){
            ctx.status = 404;
            result.msg = "未传入文件类型";
        }
        else if(body.content == undefined){
            ctx.status = 404;
            result.msg = "未传入文件内容";
        }
        else{
            let writeMessage = await file.writeFile(`resource/users/${userId}/note/${datatime.parseStampToFormat('YYYY/MM/DD')}/${body.title}${+new Date()}.md`, body.content)
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
                    oldNote = oldNote.dataValues;

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
        if(query.fuzzy_title){
            query.title = {like: `%${query.fuzzy_title}%`}
            delete query.fuzzy_title;
        }
        if(query.start_time && query.end_time){
            query.createdAt = {
                '$gte': query.start_time,
                '$lte': query.end_time
            }
            delete query.start_time;
            delete query.end_time;
        }

        let noteInfo = await noteService.getNoteInfo(query);

        if(noteInfo.isError){
            ctx.status = 404;
            result.msg = noteInfo.msg;
        }
        else{
            noteInfo = noteInfo.dataValues;

            let notes = [];
            for(let i = 0; i < noteInfo.length; i++){
                let note = _.cloneDeep(noteInfo[i]);
                if(ctx.request.query.content){
                    let readMessage = await file.readFile(note.notePath);
                    note.content = readMessage.isError ? readMessage.msg : readMessage.content; // 获取文章内容
                }

                let folder = await folderService.getFolderInfo({id: note.folderId}, ctx);// 获取note的父文件夹
                folder = folder.dataValues;
                
                if(!folder.isError && folder.length){
                    note.noteFrom = folder[0].name; 

                    while(folder[0].parentId){
                        folder = await folderService.getFolderInfo({id:folder[0].parentId}, ctx);
                        note.noteFrom = folder[0].name + ">" + note.noteFrom;
                    }
                    notes.push(note);
                }
                else if(!folder.isError){
                    note.noteFrom = "";
                    notes.push(note);
                }
                else{
                    ctx.status = 404;
                    result.msg = folder.msg;
                }
            }

            result = {
                success: true,
                msg: 'It is 200 status',
                data: notes
            }
        }

        console.log(result)
        ctx.body = result;
    },
    async getNoteTrend(ctx){ // 根据时间范围类型统计笔记数量
        let result = {
			success: false,
			msg: '',
			data: null,
        }

        let query = _.cloneDeep(ctx.request.query);
        if(!query.type){
            ctx.status = 404;
            result.msg = "未传入时间范围类型";
        }
        else{
            let data = [], type = query.type;
            let config = {
                day: {num: 6, format: 'YYYY-MM-DD'},
                month: {num: 11, format: 'YYYY-MM'},
                year: {num: 11, format: 'YYYY'},
            }
            for(let i = config[type].num; i >= 0; i--){
                let time = moment()[type](moment()[type]() - i);
                let startTime = time.startOf(type).format('YYYY-MM-DD 00:00:00');
                let endtTime = time.endOf(type).format('YYYY-MM-DD 23:59:59');
                query.createdAt = {
                    '$gte': startTime,
                    '$lte': endtTime
                }
                delete query.type;
                let count = await noteService.getNoteInfo(query);
                if(count.isError){
                    ctx.status = 404;
                    result.msg = count.msg;
                    break;
                }
                data.push({[time.format(config[type].format)]: count.length});
            }

            result = {
                success: true,
                msg: 'It is 200 status',
                data: data
            }
        }

        console.log(result)
        ctx.body = result;
    },
}
module.exports = noteContrallers;