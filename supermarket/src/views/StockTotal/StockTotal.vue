<template>
    <div class="stock-total">
         <!-- 面板 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>进货数据统计</span>
                
            </div>
            <!-- 内容 -->
            <div  class="text item">

         <el-form :inline="true" :model="stockFrom" ref="salesFrom"  class="demo-form-inline">
             <!-- 开始日期 -->
            <el-form-item label=" 时间：">
                <el-form-item prop="date1">
                    <el-date-picker size="mini" type="date" placeholder="选择日期" v-model="stockFrom.date1" style="width: 150px;"></el-date-picker>
                </el-form-item>--
               <!-- 结束日期 -->
                <el-form-item prop="date2">
                   <el-date-picker  size="mini" type="date" placeholder="选择日期" v-model="stockFrom.date2" style="width: 150px;"></el-date-picker>
                </el-form-item>
                    <el-form-item >
                         <el-button  size="mini" type="success" @click="queryform">查询</el-button>
                    </el-form-item>
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
     stockFrom: {
        date1: "",
        date2: ""
      }
    };
  },
  methods: {
    queryform() {}
  }
};

</script>
<style lang="less">
@import './stocktotal.less';
</style>

