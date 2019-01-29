import moment from "moment";

export const format = (time)=> { // UTC时间格式化本地时间函数
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
}