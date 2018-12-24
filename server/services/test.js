const Opt = require('./opt');
const db = require('../sequelizes/db');
const User = require('../models/user');
const Birthday = require('../models/birthday');
const Note = require('../models/note');

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
// Opt.destroy(User, {id: [10,11]});
// Opt.update(User,{name:'liuchaunfu'},{}).then(function(result){
// 	console.log(result)
// })
Opt.findAll(User,{}).then(function(result){
	console.log(result)
});


/*
 * User的实例对象将拥有getBirthdays、setBirthdays、addBirthday、createBirthday、removeBirthday、hasBirthday方法
 */
// User.hasMany(Birthday);
// /*
//  * Birthday的实例对象将拥有getUser、setUser、createUser方法
//  */
// Birthday.belongsTo(User);

// (async function(){
	// 增
	// var user = await User.create();
	// var birthday = user.createBirthday({
	// 	name: 'hah'
	// })
	// console.log(birthday)
	// var user = await User.create({'emp_id': '1'});
	// var note = await Note.create({'title': 'b'});
	// await user.addNote(note);

	//改
	// 为user增加note1、note2
	// var user = await User.create();
	// // var note1 = await user.createNote({'title': 'a'});
	// // var note2 = await user.createNote({'title': 'b'});
	// // 先创建note3、note4
	// var note3 = await Note.create({'title': 'c'});
	// var note4 = await Note.create({'title': 'd'});
	// // user拥有的note更改为note3、note4，清除以前的
	// await user.setNotes([note3, note4]);

	// var user = await User.findAll({
	// 	where: {
	// 		id: 4
	// 	}
	// });
	// var note = await Note.findAll({
	// 	where: {
	// 		id: 10
	// 	}
	// });
	// user[0].addNote(note); //user为一个实例对象数组

	// 删
	// let result= await Note.findAll({
	//     'where': {'userId': [1]}
	// });
	// console.log(result)
	// let result = await Opt.transaction([
			
	// 	])
	// console.log(result)
// })()

tran =  async function(events){
	// let transaction;    

	// try {
	//   // get transaction
	//   transaction = await db.sequelize.transaction();
	  
	//   await User.destroy({where: {id:1}, transaction});
	//   await User.update({name:'ha'},{where: {}, transaction});
	//   await User.findAll({where: {id: 3}}, {transaction})
	//   await User.create({}, {transaction});
	//   await transaction.commit();
	// } catch (err) {
	//   // Rollback transaction if any errors were encountered
	//   await transaction.rollback();
	// }

	// try {
	//     // Result is whatever you returned inside the transaction
	//     let result = await db.sequelize.transaction( async (t) => {
	//         // step 1
	//         await User.destroy({where: {id:1}}, {transaction: t});;

	//         // step 2
	//         return await User.create({}, {transaction: t});
	//     });

	//     // In this case, an instance of Model
	//     console.log(result);
	// } catch (err) {
	//     // Rollback transaction if any errors were encountered
	//     console.log(err);
	// }
	// try {
	//     // // Result is whatever you returned inside the transaction
	//     // let result = await db.sequelize.transaction( async (t) => {
	//     //     // step 1
	//     //     await User.destroy({where: {id:1}});

	//     //     // step 2
	//     //     return await User.create({});
	//     // });

	//     // // In this case, an instance of Model
	//     // console.log(result);
	//     let result = await db.sequelize.transaction(function (t1) {
	//       // 启用 CLS 后，将在事务中创建用户
	//       User.destroy({where: {id:1}});
	//       return User.create({ name: 'Alice' });
	//     });
	//     console.log(result)
	// } catch (err) {
	//     // Rollback transaction if any errors were encountered
	//     console.log(err);
	// }

}
// let result = tran();
// console.log(result)