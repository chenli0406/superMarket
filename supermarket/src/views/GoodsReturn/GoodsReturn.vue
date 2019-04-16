<template>
    <div class="goods-return">
        <!-- 面板组件 -->
        <el-card class="box-card">
            <!-- 头部 -->
            <div slot="header" class="clearfix">
                <span>商品退货</span>
            </div>
            <!-- 内容 -->
            <div class="text item">
                <!-- 添加用户表单 -->
            <el-form :inline="true" :model="goodsReturn" class="demo-form-inline">
                <el-form-item label="订单号">
                    <el-input v-model="goodsReturn.num"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="onSubmit">查询</el-button>
                </el-form-item>
                </el-form>
            </div>
        </el-card>  
    </div>
</template>
<script>
export default {
    
    data () {
        return {
            goodsReturn:{}
        }
    },
    methods: {
       onSubmit(){
  console.log(1);
  
       } 
    }
}
</script>
<style lang="less">
@import './goodsreturn.less';
</style>