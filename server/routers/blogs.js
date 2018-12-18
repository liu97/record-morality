/**
 * restful blogs子路由
 */
const router = require('koa-router')()
const blogsController = require('./../controllers/blogs')


module.exports = router.get('/', blogsController.get_blogs)
