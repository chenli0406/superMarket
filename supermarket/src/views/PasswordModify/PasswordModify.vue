<template>
    <div class="password-modify">
             <!-- 面板 -->
            <!-- 面板组件 -->
        <el-card class="box-card">
            <!-- 头部 -->
            <div slot="header" class="clearfix">
                <span>修改账户密码</span>
            </div>
            <!-- 内容 -->
            <div class="text item">
                <!-- 添加用户表单 -->
                <el-form 
                    style="width: 300px;"
                    size="small"
                    :model="passwordpodify" 
                    status-icon 
                    :rules="rules" 
                    ref="passwordpodify" 
                    label-width="100px" 
                    class="demo-ruleForm"
                >
                   <!-- 原密码 -->
                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input type="password" v-model="passwordpodify.oldPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 新密码 -->
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="password" v-model="passwordpodify.newPassword" autocomplete="off"></el-input>
                    </el-form-item>
                     <!-- 新密码 -->
                    <el-form-item label="新密码" prop="checkNewPass">
                        <el-input type="password" v-model="passwordpodify.checkNewPass" autocomplete="off"></el-input>
                    </el-form-item>
                

                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">修改</el-button>
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
//引入local
import local from "@/utils/local"
export default {
  data() {
    // 旧密码
    const validatorOldPassword = (rules, value, callback) => {
     //发送axios给后端
     this.request.post('/account/passwordmodify',{oldPassword:value})
     .then(res=>{
       //接受响应的数据
       let{code,reason}=res;
       //判断
       if(code === 0){
         callback()
       }else{
         callback(new Error(reason))
       }
       
     })
     .catch(err=>{
      console.log(err);
      
     })


    };
    //新密码
    const validatorNewPassword = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (!passwordReg(value)) {
        callback(new Error("只能输入3~17个字母、数字、下划线"));
      } else {
        if (this.passwordpodify.checkNewPass !== "") {
          this.$refs.passwordpodify.validateField("checkNewPass");
        }
        callback();
      }
    };

    //确认新密码
    const validatorCheckNewsPass = (rules, value, callback) => {
       if(value ===''){
            callback(new Error("请输入新密码"))
          }else if(value !==this.passwordpodify.newPassword){
                callback(new Error('两次密码不一致'))
            } else {
                callback()
            }
    };
         

    return {
      //表单验证
      passwordpodify: {
        oldPassword: "",
        newPassword: "",
        checkNewPass: ""
      },
      //验证规则
      rules: {
        oldPassword: [
          { required: true, validator: validatorOldPassword, trigger: "blur" }
        ],
        newPassword: [
          { required: true, validator: validatorNewPassword, trigger: "blur" }
        ],
        checkNewPass: [
          { required: true, validator: validatorCheckNewsPass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.passwordpodify.validate(valid => {
        //如果所有前端验证通过，valid就是true，否则就是false
        if (valid) {
          //提交数据给后台
          let params = {
            newPassword: this.passwordpodify.newPassword
          };
          //发送axios请求，把数据发给后端
          this.request
            .post("/account/savepassword", params)
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
                 //删除token
                 local.remove('c_h_e_n')
                //路由跳转
                this.$router.push("/login");
              } else if (code === 1) {
                //弹失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log("失败", err);
            });
          //   //路由跳转
          //   this.$router.push("/home/accountmanage");
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
    //获取当前登录账号
    getCurrentAccount() {
      this.request
        .get("/account/checkaccount")
        .then(res => {
          this.account = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // 调用函数 获取当前登录账号
    this.getCurrentAccount();
  }
};
</script>
<style lang="less">
@import "./passwordmodify.less";
</style>