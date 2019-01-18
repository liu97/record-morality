const router = require('koa-router')();
const birthdayController = require('./../controllers/birthday');

const routers = router.get('/', birthdayController.getBirthdayInfo)
                    .del('/deleteBirthday', birthdayController.deleteBirthday)
                    .put('/updateBirthday', birthdayController.updateBirthdayInfo)
                    .post('/addBirthday', birthdayController.addBirthday)
                    

module.exports = routers