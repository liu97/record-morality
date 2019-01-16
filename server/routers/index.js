/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const user = require('./user');
const note = require('./note');
const folder = require('./folder');
const birthday = require('./birthday');


router.get('/', async(ctx)=>{
    ctx.redirect('/user/login');
})

router.use('/user', user.routes());
router.use('/note', note.routes());
router.use('/folder', folder.routes());
router.use('/birthday', birthday.routes());


module.exports = router


