const router = require('koa-router')();
const folderController = require('./../controllers/folder');

const routers = router.get('/', folderController.getFolderTree)
                    .get('/openFolder', folderController.openFolder)
                    .post('/addFolder', folderController.addFolder)
                    .del('/deleteFolder', folderController.deleteFolder)
                    .put('/updateFolderInfo', folderController.updateFolderInfo)
                    

module.exports = routers