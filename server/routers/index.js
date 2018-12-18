/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const articles = require('./articles');
const contacts = require('./contacts');
const apis = require('./apis');

const home = require('./home');
const blogs = require('./blogs');
const category = require('./category');
const article = require('./article');

const admin = require('./admin');
// const error = require('./error')
router.get('/', async(ctx)=>{
    ctx.redirect('/home');
})
router.use('/articles', articles.routes())
router.use('/contacts', contacts.routes())

router.use('/apis', apis.routes())
router.use('/home', home.routes())
router.use('/blogs', blogs.routes())
router.use('/category', category.routes())
router.use('/article', article.routes())

router.use('/admin', admin.routes())
// router.use('/error', error.routes(), error.allowedMethods())

module.exports = router


