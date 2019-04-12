<template>
    <div class="goods-add">
        <el-card class="box-card">
            <!-- title 头 -->
             <div slot="header" class="clearfix">
                <span>添加商品</span>
            </div>
            <!-- 身体 -->
            <div class="text item">
             <el-form 
             :model="goodsAddFrom" 
             :rules="rules" 
             ref="goodsAddFrom" 
             class="demo-goodsAddFrom"
             style="width: 200px;"
             size="small"
             
            
            >
            <!-- 所属分类 -->
            <el-form-item  prop="user_group" style="width: 150px;">
                <el-select v-model="goodsAddFrom.user_group" placeholder="---所属分类---">
                <el-option label="食品类" value="食品类"></el-option>
                <el-option label="生活类" value="生活类"></el-option>
                </el-select>
            </el-form-item>

             <!--商品条形码  -->
            <el-form-item label="商品条形码" prop="goodsBarCode" inline="true" class="demo-form-inline" >
                 <el-input   v-model="goodsAddFrom.goodsBarCode"></el-input>
              <el-button class="btn" type="success" @click="addBarCode">生成条形码</el-button>
            </el-form-item>

            <!--商品名称  -->
            <el-form-item label="商品名称" prop="goodsname">
                <el-input v-model="goodsAddFrom.goodsname"></el-input>
            </el-form-item>

            <!--商品售价 -->
            <el-form-item label="商品售价" prop="goodPrice" style="width: 150px;">
                <el-input v-model="goodsAddFrom.goodPrice"></el-input>
            </el-form-item>

            <!--市场价 -->
            <el-form-item label="市场价" prop="marketPrice" style="width: 150px;">
                <el-input v-model="goodsAddFrom.marketPrice"></el-input>
                 <span class="title">默认市场价为售价的1.2倍</span>
            </el-form-item>

             <!--商品进价 -->
            <el-form-item label="商品进价" prop="purchasePrice" style="width: 150px;">
                <el-input v-model="goodsAddFrom.purchasePrice"></el-input>
            </el-form-item>
             
              <!--入库数量 -->
            <el-form-item label="入库数量" prop="WarehousingNum" style="width: 150px;">
                <el-input v-model="goodsAddFrom.WarehousingNum"></el-input>
                <span class="title">记重商品单位为千克</span>
            </el-form-item>

             <!--商品重量 -->
            <el-form-item label="商品重量" prop="goodWeight" style="width: 150px;">
                <el-input v-model="goodsAddFrom.goodWeight"></el-input>
            </el-form-item>

            <!-- 会员单位 -->
           <el-form-item label="会员单位" prop="memberUnit">
                <el-radio-group v-model="goodsAddFrom.memberUnit">
                <el-radio label="享受"></el-radio>
                <el-radio label="不享受"></el-radio>
            </el-radio-group>
            </el-form-item>
          <!-- 会员优惠 -->
          <el-form-item label="会员优惠" prop="memberDiscount">
                <el-radio-group v-model="goodsAddFrom.memberDiscount">
                <el-radio label="启用"></el-radio>
                <el-radio label="禁止"></el-radio>
            </el-radio-group>
          <!-- 商品简介 -->
            </el-form-item>
            <el-form-item label="商品简介" prop="goodsIntroduction"  style="width: 500px;">
                <el-input type="textarea" v-model="goodsAddFrom.goodsIntroduction"></el-input>
            <span class="title">不超过200个汉字</span>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="addsubmitForm('goodsAddFrom')">添加</el-button>
                <el-button @click="resetForm('goodsAddFrom')">重置</el-button>
            </el-form-item>
          </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
//引入qs
import qs from "qs";
export default {
  data() {
    return {
       goodsAddFrom: {
        user_group: "",
        goodsBarCode:"",
        goodsname: "",
        goodPrice: "",
        marketPrice: "",
        purchasePrice: "",
        WarehousingNum: "",
        goodWeight: "",
        memberUnit: "",
        memberDiscount: "",
        goodsIntroduction: ""
      },
      //验证规则
      rules: {
        //所属分类
         user_group: [
          { required: true, message: "请选择分类", trigger: "change" } // 非空
        ],
        //商品条形码
        goodsBarCode: [
          { required: true, message: "请输入商品条形码", trigger: "blur" }
        ],
        // <!--商品名称  -->
        goodsname: [
          //非空
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        // <!--商品售价 -->
        goodPrice: [
          //非空
          { required: true, message: "请输入商品售价", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addsubmitForm() {
      this.$refs.goodsAddFrom.validate(valid => {
        //如果所有前端验证通过，valid就是true，否则就是false
        if (valid) {
          //提交数据给后台
          let params = {
             user_group:this.goodsAddFrom.user_group,
             goodsBarCode:this.goodsAddFrom.goodsBarCode,
             goodsname:this.goodsAddFrom.goodsname,
             goodPrice:this.goodsAddFrom.goodPrice,
             marketPrice:this.goodsAddFrom.marketPrice,
             purchasePrice:this.goodsAddFrom.purchasePrice,
             WarehousingNum:this.goodsAddFrom.WarehousingNum,
             goodWeight:this.goodsAddFrom.goodWeight,
             memberUnit:this.goodsAddFrom.memberUnit,
             memberDiscount:this.goodsAddFrom.memberDiscount,
             goodsIntroduction:this.goodsAddFrom.goodsIntroduction

          };
          console.log(params);
       //发送axios请求，把数据发给后端
          this.request.post("/goods/goodsAdd", params)
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
                this.$router.push('/home/goodsmanage')
                
              } else if (code === 1) {
                //弹失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log("失败", err);
            });
          //路由跳转
          this.$router.push("/home/goodsmanage");
        } else {
          console.log("前端验证不通过，不允许提交！");
          return;
        }
      });
    },
     resetForm() {
      // 重置表单
      this.$refs.goodsAddFrom.resetFields();
    },
    //生成随机条形码
    addBarCode(){
      var str='19';
      for(var i=0;i<10;i++){
        str+=Math.floor(Math.random()*10);
       }
      console.log(str);

      this.goodsAddFrom.goodsBarCode=str;

     //const code=document.querySelector(".text1");

     //console.log(code);
     //code.innerHTML=str;
     
    }
  }
};
</script>
<style lang="less">
@import "./goodsadd.less";
</style>