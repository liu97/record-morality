const dbu = require('../utils/db-util');

const contacts = {
    /**
     * 增加联系我
     * @param {Object} obj
     */
    async insert_contacts(obj){
        let sql = 'insert into contacts (name,email,contact_path,time,saw) values ?;'
        let result = await dbu.query(sql,[[[obj.name,obj.email,obj.contact_path,obj.time,obj.saw]]])
        return result;
    },
    /**
     * 删除联系我
     * @param {int} id
     */
    async delete_contacts(id){
        let sql = 'delete from contacts where contact_id = ?;';
        let result = await dbu.query(sql,[id])
        return result;
    },
    /**
     * 更新联系我
     * @param {Object} obj
     */
    async update_contact(condition){
        if(Object.keys(condition).length == 0){
            return {affectedRows: 0};
        }
        let sql = 'update contacts';
        let addition = ['contact_id'];
        let i = 0;
        for(let item of Object.keys(condition)){
            if(addition.indexOf(item) != -1){
                continue;
            }
            if(i == 0){
                sql = `${sql} set ${item} = '${condition[item]}'`;
            }
            else{
                sql = `${sql}, ${item} = '${condition[item]}'`;
            }
            i++;
        }
        if(condition['contact_id'] != undefined)
        {
            sql = `${sql} where contact_id = '${condition['contact_id']}'`;
        }
        let result = await dbu.query(sql);
        return result;
    },
    /**
     * 获取contacts
     * @param {Object} condition
     */
    async get_contact(condition){
        let addition = ['start', 'pageSize', 'desc'];
        let sql = 'select * from contacts';
        let i = 0;
        for(let item of Object.keys(condition)){
            if(addition.indexOf(item) != -1){
                continue;
            }
            if(i == 0){
                sql = `${sql} where ${item} = '${condition[item]}'`;
            }
            else{
                sql = `${sql} and ${item} = '${condition[item]}'`;
            }
            i++;
        }
        if(condition['desc'] != undefined)
        {
            sql = `${sql} order by contact_id desc`;
        }
        if(condition['start'] != undefined && condition['pageSize'] != undefined){
            sql = `${sql} limit ${condition['start']},${condition['pageSize']}`;
        }
        let result = await dbu.query(sql);

        return result;
    },
    async get_contact_count(condition){
        let addition = ['start', 'pageSize', 'desc'];
        let sql = 'select count(*) as count from contacts';
        let i = 0;
        for(let item of Object.keys(condition)){
            if(addition.indexOf(item) != -1){
                continue;
            }
            if(i == 0){
                sql = `${sql} where ${item} = '${condition[item]}'`;
            }
            else{
                sql = `${sql} and ${item} = '${condition[item]}'`;
            }
            i++;
        }
        let result = await dbu.query(sql);

        return result[0]&&result[0];
    },
    /**
     * 根据id查询联系我
     * @param {int} id
     */
    async get_contact_by_id(id){
        let sql = 'select * from contacts where contact_id = ?;';
        let result = await dbu.query(sql,[id])
        return result;
    },
    /**
     * 根据是否已查看查找联系我
     * @param {String} saw
     */
    async get_contact_by_saw(saw){
        let sql ='select * from contacts where saw = ?;';
        let result = await dbu.query(sql,[saw]);
        return result;
    },
    async get_all_contact(){
        let sql ='select * from contacts;';
        let result = await dbu.query(sql);
        return result;
    }
}

module.exports = contacts;