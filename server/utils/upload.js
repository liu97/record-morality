const multer = require('koa-multer');
const config = require('../../config');
const path = require('path');
const moment = require('moment');

let nowTime = moment().format('YYYY-MM-DD'); //当前时间
let location = `server/static/upload_images/${nowTime}/`; //相对项目根目录路径
let absolutePath = path.join(config.root,location); //绝对路径


let storage = multer.diskStorage({
    //文件保存路径  destination为字符串会自动创建不存在的目录，为函数不存在的目录会报错
    destination: absolutePath,
    //修改文件名称
    filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split('.');
      cb(null,Date.now() + '.' + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
let upload = multer({ storage: storage });


module.exports = {upload};
