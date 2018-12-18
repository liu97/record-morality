const multer = require('koa-multer');
// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const config = require('../../config');
const path = require('path');
let now_time = new Date().toLocaleDateString(); //当前时间
let location = `static/upload_images/${now_time}/`; //相对项目根目录路径
let absolute_path = path.join(config.root,location); //绝对路径


let storage = multer.diskStorage({
    //文件保存路径  destination为字符串会自动创建不存在的目录，为函数不存在的目录会报错
    destination: absolute_path,
    //修改文件名称
    filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split('.');
      cb(null,Date.now() + '.' + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
let upload = multer({ storage: storage });


module.exports = upload;
