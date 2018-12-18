const tag_model = require('../models/tags');

let blogs = {
    /**
     * 获取article页初始数据
     * @param {Object} ctx
     */
    async get_article(ctx){
        let message = {msg: 'error'};

        let tags = await tag_model.get_all_tags();
        if(tags.length != 0){
            message = {tags};
            await ctx.render('blog/article', message);
        }
        else{
            ctx.body = message;
        }

    }
};

module.exports = blogs;