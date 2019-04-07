const schedule = require('node-schedule');
const moment = require('moment');
const chineseLunar = require("chinese-lunar");
const birthdayService = require('../services/birthday');
const mailerServices = require('./mailer');
const file = require('../utils/file');

const scheduleServices = {
    isBirthday(date, advanceDay, type){ // 判断是否为生日

        let changeDay = moment().add(advanceDay, 'days'); // 今天+advanceDay
        if(type == 2){ // 2为阴历，1为阳历
            changeDay = chineseLunar.solarToLunar(new Date(changeDay.format('YYYY-MM-DD 00:00:00'))); // 阴历格式的 今天+advanceDay
            birthday = chineseLunar.solarToLunar(new Date(moment(date).format('YYYY-MM-DD 00:00:00')));// 数据库生日的 月日
            return (birthday.month == changeDay.month && birthday.day == changeDay.day);
        }
        else{
            changeDay = changeDay.format('MM-DD');
            birthday = moment(date).format('MM-DD');
            return changeDay == birthday;
        }
    },

    sendMailByMessage(item){ // 根据信息判断是否发送邮件
        if(scheduleServices.isBirthday(item.date, item.advanceDay, item.dateType)){
            let leftText = '';
            if(item.advanceDay == 0){
                leftText = '今天';
            }
            else{
                leftText = `还有${item.advanceDay}天就要`;
            }
            let message = `<p><strong>${item.name}</strong>${leftText}过生日啦！赶快准备好礼物祝福ta吧！</p>`;
            if(item.content){
                message += `<p>你曾今记下的笔记：</p><p>${item.content}</p>`
            }
            mailerServices.sendMail(item.email, message);
        }
    },
    
    scheduleSendMail(){ // 定时任务
        schedule.scheduleJob('0 0 0 * * *', async function(){
            let birthdayInfo = await birthdayService.getBirthdayInfo({});
    
            if(birthdayInfo.isError){
                ctx.status = 404;
                result.msg = birthdayInfo.msg;
            }
            else{
                birthdayInfo = birthdayInfo.dataValues;
                for(let i = 0; i< birthdayInfo.length; i++){
                    let item = birthdayInfo[i];
                    let readMessage = await file.readFile(item.pointPath);
                    item.content = readMessage.isError ? readMessage.msg : readMessage.content; // 获取文章内容
                    scheduleServices.sendMailByMessage(item);
                }
            }
        }); 
    }
}

module.exports = scheduleServices;