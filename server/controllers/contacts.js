const contact_model = require('../models/contacts');
const get_file = require('../utils/file');

let operate_contact = {
    /**
     * 删除联系我
     * @param {Object} ctx
     */
    async delete_contact(ctx){
        let response_data = {status: 'error', info: {list:[],count:0}};
        let contact_id;
        if(ctx.params.id != undefined){
            contact_id = ctx.params.id;
        }
        else if(ctx.query.contact_id != undefined){
            contact_id = ctx.query.contact_id;
        }
        else{
            ctx.body = response_data;
        }
        let result = await contact_model.delete_contacts(contact_id);
        if(result.affectedRows != 0){
            response_data = {...response_data, status: 'success', info: {list: [], count: result.affectedRows}};
        }
        ctx.body = response_data;
    },
    /**
     * 查询联系我
     * @param {Object} ctx
     */
    async get_contact(ctx){
        let response_data = {status: 'error', info: {list:[],count:0}};
        let condition = {};
        if(ctx.params.id != undefined){
            condition.contact_id = ctx.params.id;
        }
        else if(Object.keys(ctx.query).length != 0){
            condition = ctx.query;
        }
        let contacts = await contact_model.get_contact(condition);
        let contact_count = await contact_model.get_contact_count(condition);
        if(contacts.length != 0 && contact_count.length != 0){
            for(let i = 0; i < contacts.length; i++){
                let contact = contacts[i];
                contact.message = await get_file(contact.contact_path)
            }
            response_data = {...response_data, status: 'success', info: {list:contacts, ...contact_count}}
        }
        ctx.body = response_data;
    },
    /**
     * 已查看联系我
     * @param {Object} ctx
     */
    async saw_contact(ctx){
        let response_data = {status: 'error', info: {list:[],count:0}};
        let condition = {};
        if(ctx.params.id != undefined){
            condition.contact_id = ctx.params.id;
        }
        else if(ctx.request.body.contact_id != undefined){
            condition = ctx.request.body;
        }
        else{
            ctx.body = response_data;
        }
        let result = await contact_model.update_contact(condition);
        if(result.affectedRows != 0){
            response_data = {...response_data, status: 'success', info: {list: [], count: result.affectedRows}};
        }
        ctx.body = response_data;
    },
}

module.exports = operate_contact;