/*
* @Author: liuchuanfu
* @Date:   2018-12-28 10:17:33
* @Last Modified time: 2018-12-28 10:18:52
* @Email: chuanfuliu@sohu-inc.com
*/

const
    request = require('supertest'),
    app = require('../server/app');

describe('#test koa app', () => {

    let server = app.listen(9900);

    describe('#test server', () => {

        it('#test GET /', async () => {
            let res = await request(server)
                .get('/')
                .expect('Content-Type', /text\/html/)
                .expect(200, '<h1>Hello, world!</h1>');
        });

        it('#test GET /path?name=Bob', async () => {
            let res = await request(server)
                .get('/path?name=Bob')
                .expect('Content-Type', /text\/html/)
                .expect(200, '<h1>Hello, Bob!</h1>');
        });
    });
});