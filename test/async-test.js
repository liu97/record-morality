/*
* @Author: liuchuanfu
* @Date:   2018-12-27 21:20:24
* @Last Modified time: 2018-12-27 21:21:56
* @Email: chuanfuliu@sohu-inc.com
*/
const hello = require('./user1');
const assert = require('assert');

it('#async function', async () => {
    let r = await hello();
    assert.strictEqual(r, 15);
});