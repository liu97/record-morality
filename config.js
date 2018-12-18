/*
* @Author: liuchuanfu
* @Date:   2018-12-18 20:25:47
* @Last Modified time: 2018-12-18 20:55:05
* @Email: chuanfuliu@sohu-inc.com
*/
const config = {

  port: 3000,

  database: {
    DATABASE: 'record',
    USERNAME: 'root',
    PASSWORD: '',
    PORT: '3306',
    HOST: '127.0.0.1'
  },

  secret: 'jwtlogin',

  root: __dirname
}

module.exports = config