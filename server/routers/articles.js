/**
 * restful articles子路由
 */

const router = require('koa-router')()
const articlesController = require('./../controllers/articles')
/**
 * uploadImg.single('')中参数应该与前端input的name相同，终于做出来了，想哭
 */
const routers = router
                      .get('/', articlesController.get_article)
                      .get('/:id', articlesController.get_article)


module.exports = routers