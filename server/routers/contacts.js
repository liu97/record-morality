/**
 * restful contacts子路由
 */
const router = require('koa-router')()
const contactsController = require('./../controllers/contacts')

const routers = router.get('/', contactsController.get_contact)
                      .get('/:id', contactsController.get_contact)


module.exports = routers