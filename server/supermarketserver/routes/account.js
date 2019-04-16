var express = require('express');
var router = express.Router();

//引入数据库模板
const connection = require('./js/conn');
// 设置统一响应头
router.all('*', (req, res, next) => {
	//解决跨域
	res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
	res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token
	next();
})

// 准备一个签名（秘钥）
const secretKey = 'chenli';
/* 验证token的合法性 */
const expressJwt = require('express-jwt');

// 验证token的合法性
router.use(expressJwt ({
            secret: secretKey
}).unless({
    path: ['/login/checklogin']  // 除了这个地址，其他的URL都需要验证（其他的所有请求 都要带上token 才能获取数据 否则不能获取到数据）
})); 
// 路由拦截器
router.use(function (err, req, res, next) {
    // 如果前端没有token或者是错误的token 就会抛出如下错误
    if (err.name === 'UnauthorizedError') { 
        // 响应给前端token无效的信息
        res.status(401).send('token不合法...');
    }
})

//检验账号是否存在

// router.post('/checkAccount', (req, res) => {
// 	//接受账户
// 	let{account}=req.body;
// 	console.log(account);
	
// 	//SQL
// 	const sqlStr =`select  account  from account `;

//     connection.query(sqlStr,(err,data)=>{
// 	if(err) throw err;
// 	 console.log(data);
// 	//判断受影响大于0 代表成功 否则失败
// 	if (account !== data) {
// 		//响应成功的数据对象给前端
// 		res.send({
// 			code: 0,
// 			reason: "密码修改成功，请重新登录！",
// 		})
// 	} else {
// 		//响应失败的数据对象给前端
// 		res.send({
// 			code: 1,
// 			reason: "修改失败,请输入正确的密码"
// 		})
// 	}
//  })
// })
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
	if (req.user.user_group === '普通用户') {
		res.send({code:2, reason: "对不起,你没有权限"})
		return;
	}
	// res.send(1);
	let{id}=req.query;
	//console.log(id);
	//删除sql
	const sqlStr = `delete from account where id=${id}`;
	
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
router.get('/accountEdit',(req,res)=>{
	
	
	let{id}=req.query;
	console.log(id);
	
	//查询
	const sqlStr = `select * from account where id=${id}`;
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
	let{account,user_group,editId}=req.body;

	//修改SQL
	const sqlStr = `update account set account='${account}',user_group='${user_group}' where id=${editId}`;

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
	const sqlStr = `delete from account where id in (${idArr})`;
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
router.get('/accountlistbypage',(req,res)=>{
	//接受参数
	let { currentPage,pageSize }=req.query;
	//查询sql
	let sqlStr = `select * from account order by create_date desc`;

	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
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




//检查旧密码
router.post('/passwordmodify',(req,res)=>{
	//接受旧密码
	let{oldPassword}=req.body;
	//获取当前登录的用户密码
	let{password}=req.user;
	if(password === oldPassword){
		res.send({code:0,reason:"原密码输入正确"})
	}else{
		res.send({code:1,reason:"原密码输入错误"})
	}

})

//修改密码
router.post('/savepassword',(req,res)=>{
	//接受参数
	let{newPassword}=req.body;
	
	//修改SQL
	const sqlStr = `update account set password='${newPassword}' where account='${req.user.account}'`;

	//执行
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		//console.log(data);
		//判断受影响大于0 代表成功 否则失败
		if (data.affectedRows > 0) {
			//响应成功的数据对象给前端
			res.send({
				code: 0,
				reason: "密码修改成功，请重新登录！",
			})
		} else {
			//响应失败的数据对象给前端
			res.send({
				code: 1,
				reason: "修改失败,请输入正确的密码"
			})
		}
	})
})
/* 个人信息 */ 
router.get('/accountinfo', (req, res) => {
	// 获取当前登录用户的id
	const id = req.user.id;
	const sqlStr = `select * from account where id=${id}`;
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send(data)
	})
})
/* ----------------- 上传后端配置 开始 -------------- */ 

// 引入multer
const multer = require('multer')

// 配置上传到服务器放置的目录 和 重命名
const storage = multer.diskStorage({
	destination: 'public/upload', // 图片上传到服务器的这个目录
	  // 图片重命名
    filename (req, file, cb) {
        var fileFormat =(file.originalname).split("."); // haha.jpg => ['haha', 'jpg']
        // 获取时间戳
        var filename = new Date().getTime();  
        // 124354654 + "." + jpg
        cb(null, filename + "." + fileFormat[fileFormat.length - 1]);
    }
})

// 上传对象
const upload = multer({
    storage,
});

/* ----------------- 上传后端配置 结束-------------- */ 

/* 头像上传请求 */ 
router.post('/uploadavatar', upload.single('file'), (req, res) => {
	// 获取文件名
	let filename = req.file.filename;
	// 拼接路径
	let path = `/upload/${filename}`;

	// 构造sql
	const sqlStr = `update account set img_url='${path}' where id=${req.user.id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		if (data.affectedRows > 0) {
			res.send({code: 0, reason: "头像修改成功!", path})
		} else {
			res.send({code: 1, reason: "头像修改失败"})
		}
	})
})

/* 用户角色 */ 
router.get('/menus', (req, res) => {
	// 获取用户组
	let userGroup = req.user.user_group;

	let role = userGroup === '超级管理员' ? 'super' : 'normal';

	let menus =  [
               //系统管理
        {
			inconClass: "el-icon-document",
			title: "系统管理",
			//子菜单
			roles: ['super'],
			children: [{ path: "/home/systeminfo", subTitle: "系统信息" }]
		  },
		  //账号管理
		  {
			inconClass: "el-icon-star-on",
			title: "账号管理",
			//子菜单
			roles: ['super', 'normal'],
			children: [
			  { path: "/home/accountmanage", subTitle: "账号管理" },
			  { path: "/home/accountadd", subTitle: "添加账号" },
			  { path: "/home/passwordmodify", subTitle: "密码修改" }
			]
		  },
		  //商品管理
		  {
			inconClass: "el-icon-circle-plus",
			title: "商品管理",
			//子菜单
			roles: ['super', 'normal'],
			children: [
			  { path: "/home/goodsmanage", subTitle: "商品管理" },
			  { path: "/home/goodsadd", subTitle: "添加商品" }
			]
		  },
		  //统计管理
		  {
			inconClass: "el-icon-edit-outline",
			title: "统计管理",
			//子菜单
			roles: ['super'],
			children: [
			  { path: "/home/salestotal", subTitle: "销售统计" },
			  { path: "/home/stocktotal", subTitle: "进货统计" }
			]
		  },
		  //进货管理
		  {
			inconClass: "el-icon-news",
			title: "进货管理",
			//子菜单
			roles: ['super'],
			children: [
			  { path: "/home/addinventory", subTitle: "添加库存" },
			  { path: "/home/inventorymanage", subTitle: "库存管理" }
			]
		  },
		  //出货管理
		  {
			inconClass: "el-icon-time",
			title: "出货管理",
			roles: ['super', 'normal'],
			//子菜单
			children: [
			  { path: "/home/saleslist", subTitle: "销售列表" },
			  { path: "/home/goodsoutofstock", subTitle: "商品出库" },
			  { path: "/home/goodsreturn", subTitle: "商品退货" }
			]
		  },
		  //会员管理
		  {
			inconClass: "el-icon-edit",
			title: "会员管理",
			roles: ['super', 'normal'],
			//子菜单
			children: [
			  { path: "/home/membershipaccount", subTitle: "账号管理" },
			  { path: "/home/membersaddaccounts", subTitle: "添加账号" }
			]
		  }
       ]

    // // 过滤菜单
    // let accessMenu = [];
    // // 遍历菜单 把roles中包含 当前登录用户角色的数据 添加进入一个新数组 那么 这个新数组 就是
    // // 过滤之后的权限菜单

    // menus.forEach(item => {
    // 	if (item.roles.includes(role)) {
    // 		accessMenu.push(item)
    // 	}
    // })

    // 功能和上面一样 把菜单数组中 包含当前登录用户角色的数据 过滤出来
    let accessMenu = menus.filter(item => item.roles.includes(role))

	res.send({accessMenu})
})

module.exports = router;