const dbu = require('../utils/db-util');
/**
 * sql与result的对应情况
 * values   ? ? ? [1,2,3]
 *          (?)   [[[1,2,3]]]
 *          ?     [1] or 1
 */
let user = {
    async get_user(condition){
        let addition = ['start', 'pageSize', 'desc'];
        let sql = 'select * from users';
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
            sql = `${sql} order by user_id desc`;
        }
        if(condition['start'] != undefined && condition['pageSize'] != undefined){
            sql = `${sql} limit ${condition['start']},${condition['pageSize']}`;
        }
        let result = await dbu.query(sql);
        return result;
    }
};

module.exports = user;