<template>
    <div class="system-info">
        <!-- 面板 -->
        <el-card class="box-card">
            <!-- 头部 -->
            <div slot="header" class="clearfix">
                <span>系统信息</span>
            </div>
            <!-- 内容 -->
            <div class="text item">
                <!-- 消息提醒1 -->
             <el-alert
                title="商品总数"
                type="info"
                show-icon>
             </el-alert>
             <!-- 消息提醒2 -->
             <el-alert
                title="导入数据"
                type="info"
                show-icon>
             </el-alert>
             <!-- 内容面板 -->
             <el-row>
                 <!-- 左侧内容 -->
            <el-col :span="12"><div class="grid-content bg-purple ">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>销售排行</span>
                    </div>
                    <div  class="text item"> 
                       <el-table
                        :data="salesRank"
                        stripe
                        style="width: 100%">
                        <!-- 商品名称 -->
                        <el-table-column
                        prop="goodsname"
                        label="商品名称"
                        >
                        </el-table-column>
                        <!-- 销售 -->
                        <el-table-column
                        prop="sales"
                        label="销售">
                        </el-table-column>
                    </el-table> 
                        
                        
                    </div>
                </el-card>
                </div>
            </el-col>
            <!-- 右侧内容 -->
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>缺货的商品</span>
                   
                </div>
                <div  class="text item">
                    <el-table
                        :data="GoodstableData"
                        stripe
                        style="width: 100%">
                        <!-- 商品名称 -->
                        <el-table-column
                        prop="goodsname1"
                        label="商品名称"
                        >
                        </el-table-column>
                        <!-- 库存 -->
                        <el-table-column
                        prop="stock"
                        label="库存">
                        </el-table-column>

                        <!-- 销售 -->
                        <el-table-column
                        label="操作">
                         <template slot-scope="scope">
                                <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">入库</el-button>
                            </template>
                        </el-table-column>
                    </el-table> 
                </div>
                </el-card>
                
                </div></el-col>
            </el-row>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
      return {
        //   销售排行
      salesRank: [{
          goodsname: '优乐美',
          sales: 8
        },{
        goodsname: '茅台酒',
          sales: 4
        }
        ],
        // 缺货的商品
        GoodstableData :[{
            goodsname1: '优乐美',
            stock:0
        }]
      }
    },
    methods: {
        handleEdit(){
            
        }
    }
}
</script>
<style lang="less">
@import './systemInfo.less';
</style>

