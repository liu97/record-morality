const router = require('koa-router')();
const userController = require('./../controllers/user');
const { upload } = require('../utils/upload')

const routers = router.get('/', userController.getUserInfo)
				    .post('/login', userController.login)
                    .post('/register', userController.register)
                    .post('/checkNickName', userController.checkNickName)
                    .post('/checkEmail', userController.checkEmail)
                    .put('/updateUser', userController.updateUserInfo)
                    .put('/updatePassword', userController.updatePassword)
                    .post('/uploadImg', upload.single('avatar-file'), userController.uploadAvatar)
                      


module.exports = routers;