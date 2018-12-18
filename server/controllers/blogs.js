const article_model = require('../models/articles');
const tag_model = require('../models/tags');
const get_file = require('../utils/file');
const filter_markdown = require('../utils/filter_markdown');


let blogs = {
    /**
     * 获取blogs页初始数据
     * @param {Object} ctx
     */
    async get_blogs(ctx){
        let response_data = {status: 'err'};
        let articles;
        let article_count;
        let pageSize = ctx.query.pageSize ? ctx.query.pageSize : 8;
        let start = ctx.query.start ? ctx.query.start : 0 ;

        let tags = await tag_model.get_all_tags();

        let condition = {};
        if(ctx.query.tag != undefined){
            articles = await article_model.get_article_by_tag_limit(ctx.query.tag, parseInt(start), parseInt(pageSize));

            article_count = await article_model.get_article_count_by_tag(ctx.query.tag);
        }
        else{
            condition = {start: 0, pageSize: parseInt(pageSize)};
            articles = await article_model.get_article(condition);
            for(let i = 0; i < articles.length; i++){
                let article = articles[i];
                article.article_content = await get_file(article.article_path)
                article.article_content = await filter_markdown(article.article_content);
                article.article_content = article.article_content.slice(0,100)+'...';
            }
            article_count= await article_model.get_article_count();
        }
        var pa = Math.ceil(article_count.count/pageSize);
		var number = pa >= 3 ? 3 : pa;
        let article_paging = {
			page: 1,
			pageSize: pageSize,
            number: number,
            ...article_count
        }
        if(tags.length != 0 && articles.length != 0){
            response_data = {tags, articles, article_paging};
            await ctx.render(`blog${ctx.request.url.split('?')[0]}`, response_data);
        }
        else{
            ctx.status = 404;
            ctx.body = response_data;
        }

    }
};

module.exports = blogs;