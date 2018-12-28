/*
* @Author: liuchuanfu
* @Date:   2018-12-28 10:08:25
* @Last Modified time: 2018-12-28 10:10:44
* @Email: chuanfuliu@sohu-inc.com
*/
const app = require('./app');

// 监听启动端口
app.listen( config.port )
console.log(`the server is start at port ${config.port}`)
