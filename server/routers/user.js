/**
 * restful api子路由
 */
const router = require('koa-router')();
const userController = require('./../controllers/user');

const routers = router.get('/', userController.getUserInfo)
					.post('/login', userController.login)
                    .post('/register', userController.register)
                      


module.exports = routers