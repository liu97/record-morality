const router = require('koa-router')();
const noteController = require('./../controllers/note');

const routers = router.get('/', noteController.getNoteInfo)
                    .post('/addNote', noteController.addNoteInfo)
                    .del('/deleteNote', noteController.deleteNoteInfo)
                    .put('/updateNote', noteController.updateNoteInfo)
                    

module.exports = routers