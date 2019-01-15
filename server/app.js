const path = require('path');
const Koa = require('koa');
// const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
// const session = require('koa-session-minimal');
// const MysqlStore = require('koa-mysql-session');

const jwt = require('jsonwebtoken'); // 用于签发、解析`token`
const jwtKoa = require('koa-jwt'); // 用于路由权限控制
const util = require('util');
// eslint-disable-next-line no-unused-vars
const verify = util.promisify(jwt.verify); // 解密

const config = require('./../config');
const routers = require('./routers/index');

const app = new Koa();

// session存储配置
// const sessionMysqlConfig= {
//   user: config.database.USERNAME,
//   password: config.database.PASSWORD,
//   database: config.database.DATABASE,
//   host: config.database.HOST,
// }

// 配置session中间件
// app.use(session({
//   key: 'USER_SID',
//   store: new MysqlStore(sessionMysqlConfig)
// }))

// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname , './static')
))

// 配置服务端模板渲染引擎中间件
// app.use(views(path.join(__dirname, './views'), {
//   extension: 'ejs'
// }))

app.use(jwtKoa({secret:config.secret}).unless({
        path: [/^((?!\/admin).)*$/, /admin\/articles\/uploadImg/] //数组中的路径不需要通过jwt验证
}))
// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

module.exports = app;