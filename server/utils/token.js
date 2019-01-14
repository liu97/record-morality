const jwt = require('jsonwebtoken');
const util = require('util');
const config = require('../../config');
// 获取解析token存储的信息
function getTokenMessage(ctx){
    const dataString = ctx.request.header.authorization;
    try {
        const dataArr = dataString.split(' ');
        const token = dataArr[1];
        let playload = jwt.verify(token, config.secret);
        return playload;

    } catch (err) {
        console.log(err);
        return {
            isError: true,
            msg: err,
        };
    }
}

module.exports = {getTokenMessage};