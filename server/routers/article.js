/**
 * restful article子路由
 */
const router = require('koa-router')()
const articlesController = require('./../controllers/article')


module.exports = router.get('/', articlesController.get_article)
