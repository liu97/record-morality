/*
* @Author: liuchuanfu
* @Date:   2018-12-28 10:17:33
* @Last Modified time: 2018-12-29 17:19:50
* @Email: chuanfuliu@sohu-inc.com
*/

const
    request = require('supertest'),
    app = require('../../app'),
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjExMzk0NzIwMjlAcXEuY29tIiwiaWQiOjEsImlhdCI6MTU1Mjc5MzA0NiwiZXhwIjoxNTUyODE0NjQ2fQ.ZGG0e5bMtdM_inNLv3jfvdNBl4FaXjgih7IDQaI29xg";;

describe('#test koa app', () => {

    let server = app.listen(9998);

    describe('#test server', () => {

        it('#test GET /birthday', async () => {
            try{
                let res = await request(server)
                                .get('/birthday')
                                .set('Authorization', 'Bearer ' + token) // header处加入token验证
                                .expect(200);
            }
            catch(err){
                throw err;
            }
        });

        // it('#test POST /birthday/addBirthday', async () => {
        //     try{
        //         let res = await request(server)
        //                         .post('/birthday/addBirthday')
        //                         .send({ name:"奶奶", date:new Date(), content: '奶奶不喜欢奶油'})
        //                         .set('Authorization', 'Bearer ' + token) // header处加入token验证
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }
        // });

        // it('#test DEL /birthday/deleteBirthday', async () => {
        //     try{
        //         let res = await request(server)
        //                         .del('/birthday/deleteBirthday')
        //                         .send({id:1})
        //                         .set('Authorization', 'Bearer ' + token) // header处加入token验证
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }
        // });

        // it('#test update /birthday/updateBirthday', async () => {
        //     try{
        //         let res = await request(server)
        //                         .put('/birthday/updateBirthday')
        //                         .send({id:1, name:"爷爷"})
        //                         .set('Authorization', 'Bearer ' + token) // header处加入token验证
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }
        // });

    });
});