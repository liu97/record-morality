/*
* @Author: liuchuanfu
* @Date:   2018-12-28 10:17:33
* @Last Modified time: 2018-12-29 17:19:50
* @Email: chuanfuliu@sohu-inc.com
*/

const
    request = require('supertest'),
    app = require('../server/app');

describe('#test koa app', () => {

    let server = app.listen(9998);

    describe('#test server', () => {

        it('#test GET /user', async () => {
            try{
                let res = await request(server)
                                .get('/user?id=3')
                                // .send({id:3})
                                .expect(200);
            }
            catch(err){
                throw err;
            }

        });
        // it('#test POST /user/register', async () => {
        //     try{
        //         let res = await request(server)
        //                         .post('/user/register')
        //                         .send({name:'hhhhh', password:'liu970923', email:'1139472029@qq.com'})
        //                         .expect(200);
        //     }
        //     catch(err){
        //         throw err;
        //     }

        // });
    });
});