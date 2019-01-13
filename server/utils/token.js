const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify) // 解密
const config = require('../../config');
// 获取解析token存储的信息
function getTokenMessage(ctx){
    const dataString = ctx.header.authorization;
    try {
        const dataArr = dataString.split(' ');
        const token = dataArr[1];
        let playload = verify(token, config.secret)
        const { data } = playload;
        return data;

    } catch (err) {
        return {
            isError: true,
            msg: err,
        };
    }
}

module.exports = {getTokenMessage};