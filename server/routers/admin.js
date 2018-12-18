/**
 * admin子路由
 */

const router = require('koa-router')()
const articlesController = require('./../controllers/articles')
const contactsController = require('./../controllers/contacts')
const uploadImg = require('../utils/upload')

const routers = router.post('/articles/', articlesController.insert_article)
                      .get('/articles/', articlesController.get_article)
                      .del('/articles/', articlesController.delete_article)
                      .put('/articles/', articlesController.update_article)
                      .post('/articles/uploadImg', uploadImg.single('editormd-image-file'), articlesController.upload_img)
                      .get('/articles/:id', articlesController.get_article)
                      .del('/articles/:id', articlesController.delete_article)
                      .put('/articles/:id', articlesController.update_article)
                      .get('/contacts/', contactsController.get_contact)
                      .put('/contacts/', contactsController.saw_contact)
                      .del('/contacts/', contactsController.delete_contact)
                      .put('/contacts/:id', contactsController.saw_contact)
                      .del('/contacts/:id', contactsController.delete_contact)
                      .get('/contacts/:id', contactsController.get_contact)


module.exports = routers