const dbu = require('../utils/db-util');

let tag_to_article = {

    async insert_to(tag_id, article_id){
        let sql = 'insert into tag_to_article set tag_id = ?,article_id = ?;';
        let result = await dbu.query(sql,[tag_id,article_id]);
        return result;
    },
    async delete_to(tag_id, article_id){
        let sql = 'delete from tag_to_article where tag_id = ? and article_id = ?;';
        let result = await dbu.query(sql,[tag_id,article_id]);
        return result;
    },
    async update_to(obj){
        let sql = 'update tag_to_article set tag_id = ?,article = ? where to_id = ?;';
        let result = await dbu.query(sql,[obj.tag_id,obj.article_id,obj.to_id]);
        return result;
    },
    async get_articles_by_tag_id(tag_id){
        let sql = 'select articles.* from tag_to_article,articles where tag_to_article.tag_id = ? and tag_to_article.article_id = articles.article_id;';
        let result = await dbu.query(sql,[tag_id]);
        return result;
    },
    async get_tags_by_article_id(article_id){
        let sql = 'select tags.* from tag_to_article,tags where tag_to_article.tag_id = tags.tag_id and tag_to_article.article_id = ?;'
        let result = await dbu.query(sql,[article_id]);
        return result;
    }
}

module.exports = tag_to_article;