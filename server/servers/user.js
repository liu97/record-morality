const user = require('../models/user.js');

user.create({
    password: '123',
    name: 'liu97',
    register_time: '2016-01-22 18:37:22',
});
user.create({
    password: '456',
    name: 'chuanfu',
    register_time: '2016-01-22 18:37:22',
});


user.update(
	{
		password:'111',
	},
	{
		'where':{
			user_id: 1,
		},
	}
)

user.destroy(
	{
		'where':{
			'user_id': 4
		}
	}
);