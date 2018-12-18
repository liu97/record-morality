const article_models = require('../models/articles');
const tag_models = require('../models/tags');
const to_models = require('../models/tag_to_article');
const get_file = require('../utils/file');
const datetime = require('../utils/datetime');
const config = require('../../config');
const path = require('path');
const fs = require('fs');
/**
 * 控制层操作
 */

 /**
  * 格式化tags
  */
function tags_format(tags){
    tags = Array.from(new Set( tags.replace(/\s|\n/g,'').split(/,|，/) )); //去空格回车、分割，,、去重
    tags = tags.filter(function(x){  //去空串''
        return x != '';
    })
    return tags;
}
/**
 * 同步创建多级目录
 * @param {String} dirname
 */
async function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (await mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

let operate_article = {
    /**
     * 新增文章
     * @param {Object} ctx
     */
    async insert_article(ctx){

        let response_data = {status: 'error', info: {list:[],count:0}};
        // let cover_path = ctx.req.file.path;
        // cover_path = cover_path.split(/static[\\\/]/);
        // let img_path = cover_path[cover_path.length-1];
        let now_time = datetime.getNowDatetime();
        let article = {title:null,tags:null,article_path:null,img_path:null,praise:0,upload_time: now_time,last_modify_time:now_time,type:null};
        Object.assign(article,ctx.request.body);
        // 将文章内容写入存储
        let now_date = new Date().toLocaleDateString();
        let now_second_date = new Date().getTime();
        let article_dir = path.join(config.root,`resources/article/${now_date}`);
        await mkdirsSync(article_dir);
        let article_path = path.join(article_dir,`${article.title}${now_second_date}.md`);
        fs.writeFile(article_path,article['text'],function(err){
            if (err) {
                return console.error(err);
            }
        });
        article.article_path = `resources/article/${now_date}/${article.title}${now_second_date}.md`;
        let tags = tags_format(article.tags)
        //将信息存入articles表
        article.tags = tags.join(',');
        let new_article = await article_models.insert_article(article);
        //将tags存入tags表
        for(let i = 0; i < tags.length; i++){
            let item = tags[i];
            let result = await tag_models.get_tag_by_name(item);
            if(result.length == 0){
                let tag = {tag_name : item, number : 1};
                let new_tag = await tag_models.insert_tag(tag);
                // 将tags与articles的关系存入tag_to_article表中
                await to_models.insert_to(new_tag.insertId,new_article.insertId);
            }
            else{
                result[0].number++;
                await tag_models.upload_tag(result[0]);
                // 将tags与articles的关系存入tag_to_article表中
                await to_models.insert_to(result[0].tag_id,new_article.insertId);
            }
        }

        if(new_article.affectedRows != 0){
            response_data = {...response_data, status: 'success', info: {list: [], count: new_article.affectedRows}};
        }
        ctx.body = response_data;

    },
    /**
     * 删除文章
     * @param {Object} ctx
     */
    async delete_article(ctx){
        let response_data = {status: 'error', info: {list:[],count:0}};
        let article_id;
        if(ctx.params.id != undefined){
            article_id = ctx.params.id;
        }
        else if(ctx.query.article_id != undefined)
        {
            article_id = ctx.query.article_id;
        }
        else{
            ctx.body = response_data;
        }
        //改变对应标签个数
        let tags = await to_models.get_tags_by_article_id(article_id);
        for(let i = 0; i < tags.length; i++){
            tags[i].number--;
            await tag_models.upload_tag(tags[i]);
        }
        // 删除对应文章,因为设置了外键CASCADE，所以tag_to_article对应数据会自动删除
        // eslint-disable-next-line no-unused-vars
        let result = await article_models.delete_article(article_id);
        ctx.body = {...response_data, info: {list:[],count:1}, 'msg': '删除成功'};
    },
    /**
     * 更新文章
     * @param {Object} ctx
     */
    async update_article(ctx){
        let response_data = {status: 'error', info: {list:[],count:0}};
        let condition = {}
        let body = ctx.request.body;
        if(ctx.params.id != undefined){
            condition.article_id = ctx.params.id;
        }
        else if(body.article_id != undefined)
        {
            condition.article_id = body.article_id;
        }
        else{
            ctx.body = response_data;
        }
        let article = await article_models.get_article(condition);
        article = article[0];
        let article_tags = article.tags.split(',');
        let body_tags = tags_format(body.tags);
        // 删除被用户移除的标签
        for(let i = 0; i < article_tags.length; i++){
            if(body_tags.indexOf(article_tags[i]) == -1){
                let result = await tag_models.get_tag_by_name(article_tags[i]);
                result[0].number--;
                await tag_models.upload_tag(result[0]);
                await to_models.delete_to(result[0].tag_id,article.article_id);
            }
        }
        // 添加用户新增的标签
        for(let i = 0; i < body_tags.length; i++){
            if(article_tags.indexOf(body_tags[i]) == -1){
                let tag = {tag_name : body_tags[i], number : 1};
                let new_tag = await tag_models.insert_tag(tag);
                // 将tags与articles的关系存入tag_to_article表中
                await to_models.insert_to(new_tag.insertId,article.article_id);
            }
        }
        Object.assign(article,body);
        //修改文章
        fs.writeFile(path.join(config.root,article.article_path),article['text'],function(err){
            if (err) {
                return console.error(err);
            }
        });
        article.tags = body_tags.join(',');
        article.last_modify_time = datetime.getNowDatetime();
        let result = await article_models.update_article(article);
        if(result.affectedRows != 0){
            response_data = {...response_data, status: 'success', info: {list: [], count: result.affectedRows}};
        }
        ctx.body = response_data;
    },
    /**
     * 获取文章
     * @param {Object} ctx
     */
    async get_article(ctx){
        let response_data = {status: 'error', info: {list:[],count:0}};
        let articles = [];
        let count = 0;
        let condition = {};
        if (ctx.params.id != undefined ){
            condition = {article_id: ctx.params.id};
        }
        else if( Object.keys(ctx.query).length != 0 ){
            condition = ctx.query;
        }
        articles = await article_models.get_article(condition);
        count = await article_models.get_article_count(condition);
        if(articles.length == 0){ //没有获取到文章
            ctx.body = response_data;
        }
        else{
            for(let i = 0; i < articles.length; i++){
                let article = articles[i];
                article.article_content = await get_file(article.article_path)
            }
            response_data = {...response_data, status: 'success', info:{list:articles, ...count}}
            ctx.body = response_data;
        }

    },
    /**
     * 上传图片
     * @param {Object} ctx
     */
    async upload_img(ctx){
        let file_path = ctx.req.file.path.replace(/\\/g, '/');
        // eslint-disable-next-line no-useless-escape
        file_path = file_path.split(/static[\\\/]/);
        let file_url = file_path[file_path.length-1];
        let result = { success: 1,
            message: '上传成功',
            url: file_url
        };
        ctx.body = result
    },


};

module.exports = operate_article;