<template>
  <div class="login">
   
   <div class="login-wrap">
   
        <div class="title">
       <!-- 图标 -->
       <span class="el-icon-loading"></span>
       华联超市管理系统
        </div>
         <!-- 登录表单 -->
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
                <!-- 账号 -->
                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
   </div>

  </div>

</template>

<script>
// 引入验证密码函数
import { passwordReg } from "@/utils/validator";
//引入local
import local from "@/utils/local"
export default {
  data() {
    //确认密码自定义验证函数
    const confirmPassword = (rules, value, callback) => {
      // rules: 验证规则对象 value：用户输入的值 callback: 回调函数
      if (value === "") {
        //输出错误信息
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.loginForm.password) {
        //输出错误信息
        callback(new Error("两次密码不一致，请重新输入"));
      } else {
        //成功
        callback();
      }
    };

    //密码自定义验证函数
    const checkPassword = (rules, value, callback) => {
      //判断非空
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (!passwordReg(value)) {
        callback(new Error("只能输入3~17个字母、数字、下划线"));
      } else {
        // 如果确认密码不为空
        if (this.loginForm.checkPass !== "") {
          // 触发一致性验证
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      //表单验证
      loginForm: {
        account: "",
        password: "",
        checkPass: ""
      },
      //验证规则
      rules: {
        //账号
        account: [
          //非空
          { required: true, message: "请输入账号", trigger: "blur" },
          //长度
          { min: 3, max: 6, message: "账号长度 3~6 位", trigger: "blur" }
        ],
        //密码
        password: [
          //自定义验证
          { required: true, validator: checkPassword, trigger: "blur" }
        ],
        //确认密码
        checkPass: [
          //自定义验证
          { required: true, validator: confirmPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //登录
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        //如果所有前端验证通过，valid就是true，否则就是false
        if (valid) {
          //提交数据给后台
          let params = {
            account: this.loginForm.account,
            password: this.loginForm.password
          };
          console.log(params);
          // 发送axios给后端，把账号和密码发送给后端
          this.request.post('/login/checklogin',params)
          .then(res=>{
          //接受后台响应的数据
         let {code, reason, token} = res;
          //判断
          console.log(token);
          
          if(code === 0){
            //把token存入浏览器
            local.save('c_h_e_n',token)
            
            //弹出成功提示
            this.$message({
              type:"success",
              message:reason
            })
            //跳转到首页
            this.$router.push('/home')
          }else if(code === 1){
            this.$message.error(reason)
          }
           
          })
          .catch(err=>{
          console.log(err)
          })
        } else {
          console.log("前端验证不通过，不允许提交！");
          return;
        }
      });
    },
    // 重置
    resetForm() {
      // 重置表单
      this.$refs.loginForm.resetFields();
    }
  }
}
</script>

<style lang="less">
//引入样式
@import "./login.less";
</style>
