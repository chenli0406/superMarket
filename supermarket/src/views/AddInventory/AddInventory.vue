<template>
    <div class="add-inventory">
        <el-card class="box-card">
            <!-- title 头 -->
             <div slot="header" class="clearfix">
                <span>商品入库</span>
            </div>
            <!-- 身体 -->
            <div class="text item">
             <el-form 
             :model="goodsInventoryFrom" 
             :rules="rules" 
             ref="goodsInventoryFrom" 
             class="demo-goodsInventoryFrom"
             style="width: 200px;"
             size="small"
             
            >
             <!--商品条形码  -->
            <el-form-item label="商品条形码" prop="goodsBarCode" inline="true" class="demo-form-inline">
                 <el-input v-model="goodsInventoryFrom.goodsBarCode"></el-input>
            </el-form-item>

              <!--入库数量 -->
            <el-form-item label="数量" prop="goodscount" style="width: 150px;">
                <el-input v-model="goodsInventoryFrom.goodscount"></el-input>
            </el-form-item>

             <!--商品进价 -->
            <el-form-item label="进价" prop="purchasePrice" style="width: 150px;">
                <el-input v-model="goodsInventoryFrom.purchasePrice"></el-input>
            </el-form-item>
             
            <el-form-item>
                <el-button type="primary" @click="addsubmit('goodsInventoryFrom')">入库</el-button>
                <el-button @click="resetForm('goodsInventoryFrom')">重置</el-button>
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
      goodsInventoryFrom: {
        goodsBarCode: "",
        goodscount: "",
        purchasePrice: ""
      },
      //验证规则
      rules: {
        //商品条形码
        goodsBarCode: [
          { required: true, message: "请输入商品条形码", trigger: "blur" }
        ],
        // <!--商品数量  -->
        goodscount: [
          //非空
          { required: true, message: "请输入商品数量", trigger: "blur" }
        ],
        // <!--进价 -->
        purchasePrice: [
          //非空
          { required: true, message: "请输入商品进价", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addsubmit() {
      this.$refs.goodsInventoryFrom.validate(valid => {
        //如果所有前端验证通过，valid就是true，否则就是false
        if (valid) {
          //提交数据给后台
          let params = {
            goodsBarCode: this.goodsInventoryFrom.goodsBarCode,
            goodscount: this.goodsInventoryFrom.goodscount,
            purchasePrice: this.goodsInventoryFrom.purchasePrice
          };

          //发送axios请求，把数据发给后端
          this.request
            .post("/goods/goodsInventory", params)
            .then(res => {
              //接受后端响应的数据
              let { code, reason } = res;
              if (code === 0) {
                //提示成功
                this.$message({
                  type: "success",
                  message: reason
                });
              
               //路由跳转
             this.$router.push("/home/inventorymanage");
              } else if (code === 1) {
                // 弹提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });

        }
      });
    },
    resetForm() {
      // 重置表单
      this.$refs.goodsInventoryFrom.resetFields();
    }
  }
};
</script>
<style lang="less">
@import "./addinventory.less";
</style>