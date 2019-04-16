var express = require('express');
var router = express.Router();

//引入数据库模板
const connection = require('./js/conn');
// 引入jwt
const jwt = require('jsonwebtoken')

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



router.post('/checklogin',(req,res)=>{
   //接受前端响应的参数
   let{account,password}=req.body;
   
   //查询语句sql
   const sqlStr = `select * from account where account='${account}' and password='${password}'`;
   console.log(sqlStr)

  // 执行sql
   connection.query(sqlStr,(err,data)=>{
	   if(err) throw err;
	   //判断长度是否大于0，代表成功
	   if(data.length){
		   //生成token 把token和数据一起响应给前端
		   const token = jwt.sign(Object.assign({}, data[0]), secretKey, { expiresIn:  60*60*2 })
		   //响应成功数据给前端
		   res.send({code:0,reason:"登陆成功！欢迎您",token})
	   }else{
		   //响应失败的数据给前端
		   res.send({code:1,reason:"登录失败！请检查账号名和密码"})
	   }
   })

});
module.exports = router;
