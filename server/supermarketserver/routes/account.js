var express = require('express');
var router = express.Router();

//引入数据库模板
const connection = require('./js/conn');
// 设置统一响应头
router.all('*', (req, res, next) => {
	//解决跨域
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
})

// 添加账号路由--------------------------------------------------
router.post('/accountAdd', (req, res) => {

	//接受前端发来的数据
	let {
		account,
		password,
		user_group
	} = req.body;
	//console.log( account,password,user_group);
	//sql语句
	const sqlStr = `insert into account(account, password, user_group) values('${account}','${password}','${user_group}')`;
	// console.log(sqlStr); 测试
	//执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		//判断受影响大于0 代表成功 否则失败
		if (data.affectedRows > 0) {
			//响应成功的数据对象给前端
			res.send({
				code: 0,
				reason: "添加成功"
			})
		} else {
			//响应失败的数据对象给前端
			res.send({
				code: 1,
				reason: "添加失败"
			})
		}

	})

})

//请求账号列表路由

router.get('/accountlist', (req, res) => {
	// 写sql
	const sqlStr = `select * from account order by create_date desc`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send(data);
	})
})

//删除账号路由
router.get('/accountDelete',(req,res)=>{
	// res.send(1);
	let{id}=req.query;
	console.log(id);
	//删除sql
	const sqlStr = `delete from account where id=${id}`;
	console.log(sqlStr);
	
	//执行
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		//判断受影响大于0 代表成功 否则失败
		if (data.affectedRows > 0) {
			//响应成功的数据对象给前端
			res.send({
				code: 0,
				reason: "删除成功",
			})
		} else {
			//响应失败的数据对象给前端
			res.send({
				code: 1,
				reason: "删除失败"
			})
		}
	})
	
})
module.exports = router;