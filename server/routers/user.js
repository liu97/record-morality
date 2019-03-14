const router = require('koa-router')();
const userController = require('./../controllers/user');

const routers = router.get('/', userController.getUserInfo)
				    .post('/login', userController.login)
                    .post('/register', userController.register)
                    .post('/checkNickName', userController.checkNickName)
                    .post('/checkEmail', userController.checkEmail)
                      


module.exports = routers