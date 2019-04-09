<template>
    <div class="sales-total">
        <!-- 面板 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>销售数据统计</span>
                
            </div>
            <!-- 内容 -->
            <div  class="text item">
               

 <el-form :inline="true" :model="salesFrom" ref="salesFrom"  class="demo-form-inline">
             <!-- 开始日期 -->
            <el-form-item label=" 时间：">
                <el-form-item prop="date1">
                    <el-date-picker size="mini" type="date" placeholder="选择日期" v-model="salesFrom.date1" style="width: 150px;"></el-date-picker>
                </el-form-item>--
               <!-- 结束日期 -->
                <el-form-item prop="date2">
                   <el-date-picker  size="mini" type="date" placeholder="选择日期" v-model="salesFrom.date2" style="width: 150px;"></el-date-picker>
                </el-form-item>
              <!--  销售情况统计-->
            </el-form-item>
                    <el-form-item  style="width:150px">
                        <el-select size="mini" v-model="salesFrom.region" placeholder="销售情况统计">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >

                         <el-button  size="mini" type="success" @click="queryform">查询</el-button>
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
      salesFrom: {
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
@import './salestotal.less';
</style>