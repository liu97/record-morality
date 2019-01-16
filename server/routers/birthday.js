const router = require('koa-router')();
const birthdayController = require('./../controllers/birthday');

const routers = router.post('/addBirthday', birthdayController.addBirthday)
                    

module.exports = routers