const article_model = require('../models/articles');
const get_file = require('../utils/file');
const filter_markdown = require('../utils/filter_markdown');


let home = {
    async get_home(ctx){
        let data = {status: 'err'};

        let about_me = await article_model.get_article({type: 'about_me'});
        about_me[0].article_content = await get_file(about_me[0].article_path);
        about_me[0].article_content = await filter_markdown(about_me[0].article_content);
        about_me[0].article_content = about_me[0].article_content.slice(0,100)+'...';
        let new_article = await article_model.get_article({desc: 3, start: 0, pageSize: 3});
        for(let i = 0; i < new_article.length; i++){
            let article = new_article[i];
            article.article_content = await get_file(article.article_path)
            article.article_content = await filter_markdown(article.article_content);
            article.article_content = article.article_content.slice(0,100)+'...';
        }
        if(about_me.length != 0 && new_article.length != 0){
            data = {about_me,new_article};
            await ctx.render('blog/index', data)
        }
        else{
            ctx.body = data;
        }

    }
}

module.exports = home