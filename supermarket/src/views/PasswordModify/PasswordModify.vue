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
export default {
  data() {
    return {
     //表单验证
      passwordpodify: {
        oldPassword: "",
        newPassword: "",
        checkNewPass: ""
      },
     //验证规则
      rules:{
      oldPassword:[
         { required: true, message: "请输入账号", trigger: "blur" },
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
            newPassword: this.passwordpodify.newPassword,
          };
          console.log(params);

          alert("修改成功");
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
    }
  }
};
</script>
<style lang="less">
@import "./passwordmodify.less";
</style>