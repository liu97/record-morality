const fs = require('fs');
const path = require('path');
const config = require('../../config')

/**
 * 读取文件
 * @param  {[String]} filePath [文件路径]
 * @return {[String]}          [文件内容]
 */
async function readFile ( filePath ) {
	let content, result = {
		isError: true,
		msg: ''
	}
	if(!path.isAbsolute(filePath)){
		filePath = path.join(config.root,filePath);
	}
	
    content = await new Promise(function (resolve, reject) {
		fs.readFile(filePath, 'utf-8', function(err, data) {
			if (err) reject(err);
			else resolve(data);
		});
	});

	result = {
		absolutePath: filePath,
		relativePath: filePath.replace(config.root,''),
		content
	}
    console.log( result );
}

async function writeFile(filePath, text){
	let content, result = {
		isError: true,
		msg: ''
	}
	if(!path.isAbsolute(filePath)){
		filePath = path.join(config.root,filePath);
	}

	if(await mkdir(filePath, true)){ // 判断是否存在路径，不存在的话就创建
		content = await new Promise(function(resolve, reject) {
			fs.writeFile(filePath, text, function(err, data) {
				if (err) reject(err);
				else resolve(true);
			});
		});

		result = {
			absolutePath: filePath,
			relativePath: filePath.replace(config.root,''),
			content
		}
	}
	else{
		result.msg = '路径有问题'
	}
	
	console.log( result );
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
    if (fs.existsSync(dirname)) {
        return true;
    } 
    else if (await mkdir(path.dirname(dirname))) {
        await new Promise(function (resolve, reject) {
			fs.mkdir(dirname, function(err, data) {
				if (err) reject(err);
				else resolve(true);
			});
		});
		return true;
    }
    return false;
}

module.exports = {
	readFile,
	writeFile,
	mkdir
}