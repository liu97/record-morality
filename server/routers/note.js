/**
 * restful note子路由
 */
const router = require('koa-router')();
const noteController = require('./../controllers/note');

const routers = router.get('/', noteController.getNoteInfo)
                    

module.exports = routers