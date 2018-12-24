/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const user = require('./user');

router.get('/', async(ctx)=>{
    ctx.redirect('/user/login');
})

router.use('/user', user.routes())

module.exports = router


