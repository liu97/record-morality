/*
* @Author: liuchuanfu
* @Date:   2018-12-28 10:17:33
* @Last Modified time: 2018-12-29 17:19:50
* @Email: chuanfuliu@sohu-inc.com
*/

const
    request = require('supertest'),
    app = require('../../app'),
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGl1Y2h1YW5mdSIsImlkIjozNCwiaWF0IjoxNTQ3NDU4MDYxLCJleHAiOjE1ODM0Nzk2NjF9.6IiVlRiIeMiuF5zk6kTrq85UwIjLtT6uj2Wh85UHfZo";;

describe('#test koa app', () => {

    let server = app.listen(9998);

    describe('#test server', () => {

        // it('#test GET /birthday', async () => {
        //     try{
        //         let res = await request(server)
        //                         .get('/birthday')
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }
        // });

        it('#test POST /birthday/addBirthday', async () => {
            try{
                let res = await request(server)
                                .post('/birthday/addBirthday')
                                .send({ name:"奶奶", date:new Date(), content: '奶奶不喜欢奶油'})
                                .set('Authorization', 'Bearer ' + token) // header处加入token验证
                                .expect(200);
            }
            catch(err){
                throw err;
            }
        });

        // it('#test DEL /birthday/deletebirthday', async () => {
        //     try{
        //         let res = await request(server)
        //                         .del('/birthday/deletebirthday')
        //                         .send({id:1})
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }
        // });

        // it('#test update /birthday/updatebirthdayInfo', async () => {
        //     try{
        //         let res = await request(server)
        //                         .put('/birthday/updatebirthdayInfo')
        //                         .send({id:1, name:"日记",parentId:2})
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }
        // });

        // it('#test get /birthday/openbirthday', async () => {
        //     try{
        //         let res = await request(server)
        //                         .get('/birthday/openbirthday?id=4')
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }
        // });
    });
});