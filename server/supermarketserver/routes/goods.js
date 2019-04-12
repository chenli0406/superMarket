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
router.post('/goodsAdd', (req, res) => {

	//接受前端发来的数据
	let {
        user_group,
        goodsBarCode,
        goodsname,
        goodPrice,
        marketPrice,
        purchasePrice,
        WarehousingNum,
        goodWeight,
        memberUnit,
        memberDiscount,
        goodsIntroduction
	} = req.body;
	// //sql语句
    const sqlStr = `insert into goods(user_group,goodsbarcode,goodsname,goodPrice,marketPrice,purchasePrice,WarehousingNum,
                    goodsweight,memberUnit,memberDiscount,goodsIntroduction) values('${user_group}','${goodsBarCode}','${goodsname}',${goodPrice},${marketPrice},${purchasePrice}
                    ,${WarehousingNum},${goodWeight},'${memberUnit}','${memberDiscount}','${goodsIntroduction}')`;
	console.log(sqlStr); //测试
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
router.get('/goodslist', (req, res) => {
	// 写sql
	const sqlStr = `select * from goods order by create_time desc`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send(data);
	})
})

//删除账号路由
router.get('/goodsDelete',(req,res)=>{
	// res.send(1);
	let{id}=req.query;
	//console.log(id);
	//删除sql
	const sqlStr = `delete from goods where id=${id}`;
	console.log(sqlStr);
	
	//执行
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		//console.log(data);
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

//修改账号
router.get('/goodsEdit',(req,res)=>{
	
	let{id}=req.query;
	console.log(id);
	
	//查询
	const sqlStr = `select * from goods where id=${id}`;
	//console.log(sqlStr); 
		//执行
		connection.query(sqlStr,(err,data)=>{
			if(err) throw err;
			//console.log(data);
			// data.account=account;
			// data.user_group=user_group;
			//数据响应前端
			res.send(data);
		})
		
	
	
})

//修改保存
router.post('/saveEdit',(req,res)=>{
	//接受参数
	let{  
		user_group,
        goodsBarCode,
        goodsname,
        goodPrice,
        marketPrice,
        purchasePrice,
        WarehousingNum,
        goodWeight,
        memberUnit,
        memberDiscount,
		goodsIntroduction,
		editId

	}=req.body;
	//修改SQL
	const sqlStr = `update goods set user_group='${user_group}',goodsbarcode='${goodsBarCode}',goodsname='${goodsname}',goodPrice=${goodPrice},
					marketPrice=${marketPrice},purchasePrice=${purchasePrice},WarehousingNum=${WarehousingNum},goodsweight=${goodWeight},
					memberUnit='${memberUnit}',memberDiscount='${memberDiscount}',goodsIntroduction='${goodsIntroduction}'
	where id=${editId}`;
	
	//执行
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		//console.log(data);
		//判断受影响大于0 代表成功 否则失败
		if (data.affectedRows > 0) {
			//响应成功的数据对象给前端
			res.send({
				code: 0,
				reason: "修改成功",
			})
		} else {
			//响应失败的数据对象给前端
			res.send({
				code: 1,
				reason: "修改失败"
			})
		}
	})
	
})

//批量删除
router.get('/batchDelete',(req,res)=>{
	let{ idArr }=req.query;
	//删除sql
	const sqlStr = `delete from goods where id in (${idArr})`;
	// console.log(sqlStr);
	//执行SQL
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
			//判断受影响大于0 代表成功 否则失败
			if (data.affectedRows > 0) {
				//响应成功的数据对象给前端
				res.send({
					code: 0,
					reason: "批量删除成功",
				})
			} else {
				//响应失败的数据对象给前端
				res.send({
					code: 1,
					reason: "批量删除失败"
				})
			}
		})
})
	
//分页功能
router.get('/goodslistbypage',(req,res)=>{
	//接受参数
	let { currentPage,pageSize }=req.query;
	//查询sql
	let sqlStr = `select * from goods order by create_time desc`;

	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		console.log(data);
		
		//计算总条数
		let total=data.length;
		//计算跳过多少条
		let n =(currentPage-1)*pageSize;
		//拼接SQL
		sqlStr += ` limit ${n}, ${pageSize}`;
		//执行sql
		connection.query(sqlStr,(err,data)=>{
			if(err)throw err;
			//把总条数和页数对应的数据响应给前端
			res.send({total,data});
		})

	})
	
})

module.exports = router;