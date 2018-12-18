/**
 * restful api子路由
 */
const router = require('koa-router')();
const apisController = require('./../controllers/apis');

const routers = router.post('/contacts', apisController.contact_me)
                      .post('/articles/like', apisController.like)
                      .post('/login', apisController.login)


module.exports = routers