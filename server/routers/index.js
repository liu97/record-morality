/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const user = require('./user');
const note = require('./note');
const folder = require('./folder');


router.get('/', async(ctx)=>{
    ctx.redirect('/user/login');
})

router.use('/user', user.routes());
router.use('/note', note.routes());
router.use('/folder', folder.routes());


module.exports = router


