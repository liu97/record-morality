const fs = require('fs');
const path = require('path');
const config = require('../../config')
/**
 * 读取文件
 * @param  {[String]} filePath [文件路径]
 * @return {[String]}          [文件内容]
 */
async function getFile ( filePath ) {
	if(!path.isAbsolute(filePath)){
		filePath = path.join(config.root,filePath);
	}
    let content = await fs.readFile(filePath, 'utf-8');
    return content.toString();
}

/**
 * 创建多级目录
 * @param  {[String]}  dirname [路径]
 * @param  {[Bealoon]}  hasFileDir [是否为文件路径]
 * @return {[Boolean]}              [是否创建成功]
 */
async function mkdir(dirname, hasFileDir) {
	if(hasFileDir){
		dirname = path.dirname(dirname);
	}
	if(!path.isAbsolute(dirname)){
		dirname = path.join(config.root,dirname);
	}
    if (await fs.exists(dirname)) {
        return true;
    } 
    else if (await mkdir(path.dirname(dirname))) {
        await fs.mkdir(dirname);
        return true;
    }
    return false;
}

module.exports.file = {
	getFile,
	mkdir
}