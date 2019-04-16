<template>
    <div class="account-add">
        <!-- 面板组件 -->
        <el-card class="box-card">
            <!-- 头部 -->
            <div slot="header" class="clearfix">
                <span>添加管理员账号</span>
            </div>
            <!-- 内容 -->
            <div class="text item">
                <!-- 添加用户表单 -->
                <el-form 
                    style="width: 300px;"
                    size="small"
                    :model="accountAddForm" 
                    status-icon 
                    :rules="rules" 
                    ref="accountAddForm" 
                    label-width="100px" 
                    class="demo-ruleForm"
                >
                    <!-- 账号 -->
                    <el-form-item label="账号" prop="account">
                        <el-input type="text" v-model="accountAddForm.account" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="accountAddForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                     <!-- 确认密码 -->
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="accountAddForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 选择用户组 -->
                      <el-form-item label="选择用户组" prop="user_group">
                        <el-select v-model="accountAddForm.user_group" placeholder="请选择用户组">
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                        <el-option label="普通用户" value="普通用户"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">添加</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>   
    </div>
</template>
<script>
// 引入验证密码函数
import { passwordReg } from "@/utils/validator";

//引入qs
import qs from "qs";

export default {
  data() {
    //密码自定义验证函数
    const checkPassword = (rules, value, callback) => {
      //判断非空
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (!passwordReg(value)) {
        callback(new Error("只能输入3~17个字母、数字、下划线"));
      } else {
        // 如果确认密码不为空
        if (this.accountAddForm.checkPass !== "") {
          // 触发一致性验证
          this.$refs.accountAddForm.validateField("checkPass");
        }
        callback();
      }
    };
    //确认密码自定义验证函数
    const confirmPassword = (rules, value, callback) => {
      // rules: 验证规则对象 value：用户输入的值 callback: 回调函数
      if (value === "") {
        //输出错误信息
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.accountAddForm.password) {
        //输出错误信息
        callback(new Error("两次密码不一致，请重新输入"));
      } else {
        //成功
        callback();
      }
    };


    //  // 账户是否存在
    // const validatorcheckAccount = (rules, value, callback) => {
    //  //发送axios给后端
    //  this.request.post('/account/checkAccount',{account:value})
    //  .then(res=>{
    //   //  //接受响应的数据
    //   //  let{code,reason}=res;
    //   //  //判断
    //   //  if(code === 0){
    //   //    callback()
    //   //  }
    //   //  else{
    //   //    callback(new Error(reason))
    //   //  }
    //    console.log(res);
       
    //  })
    //  .catch(err=>{
    //   console.log(err);
      
    //  })


    // };

    return {
      //表单验证
      accountAddForm: {
        account: "",
        password: "",
        checkPass: "",
        user_group: ""
      },
      //验证规则
      rules: {
        //账号
        account: [
          { required: true, message:"账号不能为空", trigger: "blur" },
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
        ],
        // 用户组
        user_group: [
          { required: true, message: "请选择用户组", trigger: "change" } // 非空
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.accountAddForm.validate(valid => {
        //如果所有前端验证通过，valid就是true，否则就是false
        if (valid) {
          //提交数据给后台
          let params = {
            account: this.accountAddForm.account,
            password: this.accountAddForm.password,
            user_group: this.accountAddForm.user_group
          };
          //发送axios请求，把数据发给后端
          this.request.post("/account/accountAdd", params)
            .then(res => {
              //回去后端响应回来的数据
              let { code, reason } = res;
              //判断
              if (code === 0) {
                //弹成功提示
                this.$message({
                  type: "success",
                  message: reason
                });

                //路由跳转
                this.$router.push('/home/accountmanage')
                
              } else if (code === 1) {
                //弹失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log("失败", err);
            });
        } else {
          console.log("前端验证不通过，不允许提交！");
          return;
        }
      });
    },
    resetForm() {
      // 重置表单
      this.$refs.accountAddForm.resetFields();
    },
  },
};
</script>
<style lang="less">
@import "./accountadd.less";
</style>

