const nodemailer = require('nodemailer');

const sendMail = function (mail, text) {
    //检测邮箱地址是否为空
    if (!mail) {
        throw new Error("邮箱地址为空！")
    }
    //检测邮箱地址是否符合规范
    var reg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/;
    if (!mail.match(reg)) {
        throw new Error("邮箱地址不符合规范，请重新输入！");
    }
    //邮件发送
    var transporter = nodemailer.createTransport({
        service: 'qq',
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            user: '1139472029@qq.com', //发送邮件的163邮箱账号
            // pass: '13870211799', //发送邮件的邮箱密码
            pass: 'tvlcyfkkgnnvbadc', //发送邮件的邮箱密码
        }
    });
    var mailOptions = {
        from: '1139472029@qq.com', // 发送地址
        to:mail, // 
        subject: '记德笔记生日提醒！', // Subject line
        text,
        // html:"<h2>老师您好，我是华东交通大学软件学院的学生刘传富，这个是毕业生的学历电子注册图像需要的照片。</h2>"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(!error){
            // return res.render("index", {message: "邮件发送成功，请注意查收！"});
            console.log("邮件发送成功！");
        }else{
            console.log(error);
            // return res.render("index", {message: "邮件发送失败，请稍后重试！"});
            console.log(`${mail}的邮件发送失败\n未发送的信息：${text}
            `);
        }
    });

};

module.exports = {sendMail};