/*
* @Author: liuchuanfu
* @Date:   2018-12-28 10:17:33
* @Last Modified time: 2018-12-29 17:19:50
* @Email: chuanfuliu@sohu-inc.com
*/

const
    request = require('supertest'),
    app = require('../../app');

describe('#test koa app', () => {

    let server = app.listen(9998);

    describe('#test server', () => {

        // it('#test GET /folder', async () => {
        //     try{
        //         let res = await request(server)
        //                         .get('/folder')
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }

        // });

        // it('#test POST /folder/addFolder', async () => {
        //     try{
        //         let res = await request(server)
        //                         .post('/folder/addFolder')
        //                         .send({userId:3, name:"前端技术", parentId:1})
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }

        // });

        // it('#test DEL /folder/deleteFolder', async () => {
        //     try{
        //         let res = await request(server)
        //                         .del('/folder/deleteFolder')
        //                         .send({id:1})
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }

        // });

        // it('#test update /folder/updateFolderInfo', async () => {
        //     try{
        //         let res = await request(server)
        //                         .put('/folder/updateFolderInfo')
        //                         .send({id:1, name:"日记",parentId:2})
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }

        // });

        it('#test get /folder/openFolder', async () => {
            try{
                let res = await request(server)
                                .get('/folder/openFolder?id=4')
                                .expect(200);
            }
            catch(err){
                throw err;
            }

        });
    });
});