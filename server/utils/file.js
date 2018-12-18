const fs = require('fs');
const path = require('path');
const config = require('../../config')
/**
 * 读取文件方法
 * @param  {string} filePath 文件相对根目录的路径
 * @return {string}
 */
async function file ( filePath ) {
    let absolute_path = path.join(config.root,filePath);
    //不要通过stat判断是否为文件，因为stat是异步的
    let content = fs.readFileSync(absolute_path, 'utf-8');
    return content.toString();
}


module.exports = file