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
        //                         .get('/note?id=4&content=true')
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }
        // });

        it('#test POST /note/addNoteInfo', async () => {
            try{
                let res = await request(server)
                                .post('/note/addNoteInfo')
                                .send({name:'liu97', password:'liu970923', email:'1139472029@qq.com'})
                                .set('Authorization', 'Bearer ' + token) // header处加入token验证
                                .expect(200);
            }
            catch(err){
                throw err;
            }
        });

        // it('#test POST /note/login', async () => {
        //     try{
        //         let res = await request(server)
        //                         .post('/note/login')
        //                         .send({name:'liu97', password:'liu970923'})
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }

        // });
    });
});