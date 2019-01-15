const router = require('koa-router')();
const noteController = require('./../controllers/note');

const routers = router.get('/', noteController.getNoteInfo)
                    .post('/addNoteInfo', noteController.addNoteInfo)
                    .del('/deleteNoteInfo', noteController.deleteNoteInfo)
                    .put('/updateNoteInfo', noteController.updateNoteInfo)
                    

module.exports = routers