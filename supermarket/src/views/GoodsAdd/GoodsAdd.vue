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
            <el-form-item  prop="region" style="width: 150px;">
                <el-select v-model="goodsAddFrom.region" placeholder="---所属分类---">
                <el-option label="食品类" value="食品类"></el-option>
                <el-option label="生活类" value="生活类"></el-option>
                </el-select>
            </el-form-item>

             <!--商品条形码  -->
            <el-form-item label="商品条形码" prop="goodsBarCode" inline="true" class="demo-form-inline">
                 <el-input v-model="goodsAddFrom.goodsBarCode"></el-input>
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

export default {
  data() {
    return {
      goodsAddFrom: {
        region: "",
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
        region: [
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
          let params = {};
          console.log(params);

          alert("添加成功");
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
    }
  }
};
</script>
<style lang="less">
@import "./goodsadd.less";
</style>