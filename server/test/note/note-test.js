/*
* @Author: liuchuanfu
* @Date:   2018-12-28 10:17:33
* @Last Modified time: 2018-12-29 17:19:50
* @Email: chuanfuliu@sohu-inc.com
*/

const
    request = require('supertest'),
    app = require('../../app'),
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGl1Y2h1YW5mdSIsImlkIjozNCwiaWF0IjoxNTQ3NDU4MDYxLCJleHAiOjE1ODM0Nzk2NjF9.6IiVlRiIeMiuF5zk6kTrq85UwIjLtT6uj2Wh85UHfZo";

describe('#test koa app', () => {

    let server = app.listen(9998);

    describe('#test server', () => {

        // it('#test GET /note', async () => {
        //     try{
        //         let res = await request(server)
        //                         .get('/note?id=14&content=true')
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }
        // });

        // it('#test POST /note/addNoteInfo', async () => {
        //     try{
        //         let res = await request(server)
        //                         .post('/note/addNoteInfo')
        //                         .send({title:'liu97', noteType:'md'})
        //                         .set('Authorization', 'Bearer ' + token) // header处加入token验证
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }
        // });

        // it('#test DELETE /note/deleteNoteInfo', async () => {
        //     try{
        //         let res = await request(server)
        //                         .del('/note/deleteNoteInfo')
        //                         .send({id:3})
        //                         .set('Authorization', 'Bearer ' + token) // header处加入token验证
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }
        // });

        it('#test PUT /note/updateNoteInfo', async () => {
            try{
                let res = await request(server)
                                .put('/note/updateNoteInfo')
                                .send({title:'liuchaunfu', noteType:'md', id: 14, content: 'hahha'})
                                .set('Authorization', 'Bearer ' + token) // header处加入token验证
                                .expect(200);
            }
            catch(err){
                throw err;
            }
        });
    });
});