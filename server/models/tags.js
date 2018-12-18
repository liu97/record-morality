const dbu = require('../utils/db-util');

let tag = {
    async insert_tag(tag){
        let sql = 'insert into tags set tag_name = ?,number = ?;';
        let result = await dbu.query(sql,[tag.tag_name,tag.number]);
        return result;
    },
    async delete_tag(name){
        let sql = 'delete from tags where tag_name = ?;';
        let result = await dbu.query(sql,[name]);
        return result;
    },
    async upload_tag(tag){
        let sql = 'update tags set  number = ? where tag_name = ?;';
        let result = await dbu.query(sql,[tag.number,tag.tag_name]);
        return result;
    },
    async get_tag_by_name(name){
        let sql = 'select * from tags where tag_name = ?;';
        let result = await dbu.query(sql,[name]);
        return result;
    },
    async get_all_tags(){
        let sql = 'select * from tags where number != 0;';
        let result = await dbu.query(sql,[]);
        return result;
    }
}
module.exports = tag;