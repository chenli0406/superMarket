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
      <!-- 内容 -->
            <div class="text item">
                <!-- 1 准备一个容器 -->
                <div id="box" style="height: 400px;"></div>
            </div>
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
      },
    };
  },
  methods: {
      
      getinit(){
      var res = {
          categoryName: ['2019-04-01', '2019-04-02', '2019-04-03', '2019-04-04', '2019-04-05', '2019-04-06', '2019-04-07'],
          value: [100, 200, 320, 100, 480, 600, 200]
      }

      let {categoryName, value} = res;
      this.drawSalesChart(categoryName, value); // 调用函数 生成报表
    },
    queryform() {

     //收集参数
     let params ={
         date1:this.stockFrom.date1,
         date2:this.stockFrom.date2
     }
     //发送请求
      this.request.get('/goods/search', params)
        .then(res => {
        
        //遍历
        let arr=res.map(v=>v.date)
        let arr1=res.map(v=>v.count)
        //把数据赋值
       var res = {
          categoryName:arr,
          value:arr1
       }

       //解构
        let {categoryName, value} =res;
        // 调用函数 生成报表
        this.drawSalesChart(categoryName, value); 
        })
        .catch(err => {
          console.log(err)
        })

    },
    // 生成销售报表
    drawSalesChart(categoryData=[], value=[]) {

        // 选中dom容器 初始化
        let myChart = this.echarts.init( document.getElementById('box') )
        // 准备配置
        let option = {
            tooltip: {
                show: true
            },
            legend: {
                data:['统计']
            },
            xAxis : [
                {
                    type : 'category',
                    data : categoryData
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    "name":"统计",
                    "type":"line",
                    "data":value
                }
            ]
        }
        // 使用配置生成报表
        myChart.setOption( option )
    }
   },

// 生命周期钩子函数 适合操作dom
   mounted() {
     this.getinit()
   },
};
</script>
<style lang="less">
@import './stocktotal.less';
</style>

