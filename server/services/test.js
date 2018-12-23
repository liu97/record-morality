const opt = require('./opt');
const user = require('../models/user');

// user.create({
//     password: '123',
//     name: 'liu97',
//     undefined,
//     register_time: Date.now(),
// });
// user.create({
//     password: '456',
//     name: 'chuanfu',
//     register_time: '2016-01-22 18:37:22',
// });


// user.update(
// 	{
// 		password:'111',
// 	},
// 	{
// 		'where':{
// 			user_id: 1,
// 		},
// 	}
// )

// user.destroy(
// 	{
// 		'where':{
// 			'user_id': 4
// 		}
// 	}
// );
// const h = async function(m){
// 	let result;
// 	if(m){
// 		result = await user.findAll()
// 	}
// 	else{
// 		result = await user.create(
// 			// {
// 			//     password: '123',
// 			//     name: 'liu97',
// 			//     undefined,
// 			//     register_time: Date.now(),
// 			// }
// 			[]
// 		);
// 	}
// 	console.log(result)
// }
// h(true);
// h(false);

// opt.insert(user,[
// 	{
// 		password: '123',
// 		name: 'liu97',
// 		undefined,
// 		register_time: Date.now(),
// 	},
// 	{
// 		password: '123',
// 		name: 'liu97',
// 		undefined,
// 		register_time: Date.now(),
// 	}
// ])

// user.update(
// 	{
// 		is_delete: true
// 	},
// 	{
// 		where: {
// 			password: ['123','456']
// 		}
// 	}
// )
opt.delete(user, {id: [10,11]})