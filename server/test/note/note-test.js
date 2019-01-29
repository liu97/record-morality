/*
* @Author: liuchuanfu
* @Date:   2018-12-28 10:17:33
* @Last Modified time: 2018-12-29 17:19:50
* @Email: chuanfuliu@sohu-inc.com
*/

const
    request = require('supertest'),
    app = require('../../app'),
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGl1Y2h1YW5mdSIsImlkIjoxLCJpYXQiOjE1NDg3NTU4MTMsImV4cCI6MTU0ODc3NzQxM30.3aiE9j_CL32HkFlWJS98jJwwtTC17AehOB2WREjnF0A";

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

        it('#test POST /note/addNote', async () => {
            try{
                let res = await request(server)
                                .post('/note/addNote')
                                .send({title:'记德', noteType:'txt',content:'测试2'})
                                .set('Authorization', 'Bearer ' + token) // header处加入token验证
                                .expect(200);
            }
            catch(err){
                throw err;
            }
        });

        // it('#test DELETE /note/deleteNote', async () => {
        //     try{
        //         let res = await request(server)
        //                         .del('/note/deleteNote')
        //                         .send({id:3})
        //                         .set('Authorization', 'Bearer ' + token) // header处加入token验证
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }
        // });

        // it('#test PUT /note/updateNote', async () => {
        //     try{
        //         let res = await request(server)
        //                         .put('/note/updateNote')
        //                         .send({title:'liuchaunfu', noteType:'md', id: 14, content: 'hahha'})
        //                         .set('Authorization', 'Bearer ' + token) // header处加入token验证
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }
        // });
    });
});