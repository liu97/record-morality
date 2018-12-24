/*
* @Author: liuchuanfu
* @Date:   2018-12-24 19:54:20
* @Last Modified time: 2018-12-24 21:16:11
* @Email: chuanfuliu@sohu-inc.com
*/
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const birthdayServive = require('../services/birthday');
const folderServive = require('../services/folder');
const noteServive = require('../services/note');
const userServive = require('../services/user');
const config = require('../../config');


let userContrallers = {
    
    async getUserInfo(ctx){
        let result = {
			success: false,
			message: '',
			data: null,
        }

        let query = ctx.request.query;

        let userInfo = query.id && userServices.getUserInfo(query.id);
    },
    
}
module.exports = userContrallers;