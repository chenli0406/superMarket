<template>
    <div class="inventory-manage">
       <!-- 面板 -->
     <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>库存管理</span>
           
        </div>
        <!-- 内容 -->
        <div class="text item">
            <!-- 查询 -->
            <el-form :inline="true" :model="queryForm" ref="queryForm"  class="demo-form-inline">
                    <el-form-item style="width:150px">
                        <el-select v-model="queryForm.region" placeholder="--选择分类--">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关键字:">
                        <el-input v-model="queryForm.key" placeholder="食品"></el-input>
                    </el-form-item>
                    <el-form-item>
                     (食品名称、条形码)
                        <el-button size="mini" type="success" @click="queryform">查询</el-button>
                    </el-form-item>
            </el-form>
            <hr>
            <!-- 商品列表 -->
             <el-table
                        ref="multipleTable"
                        :data="InventoryTableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                         <!-- 选择框 -->
                        <el-table-column type="selection" width="55"></el-table-column>
                        <!-- 商品条形码 -->
                        <el-table-column prop="goodsBarCode" label="商品条形码" width="140" ></el-table-column>
                        <!-- 商品名称 -->
                        <el-table-column prop="goodsname" label="商品名称" width="140"></el-table-column>
                      
                       <!-- 进价(元 -->
                        <el-table-column prop="purchasePrice" label="进价(元)" width="140"></el-table-column>
                       <!-- 入    库 -->
                        <el-table-column prop="goodscount" label="入库" width="140"></el-table-column>
                          <!-- 已  售 -->
                        <el-table-column prop="onsales" label="已售" width="140"></el-table-column>
                       <!-- 库    存 -->
                        <el-table-column prop="WarehousingNum" label="库    存" width="140"></el-table-column> 
                <!-- 操作 -->
                <el-table-column label="管  理">
                   <template slot-scope="scope">
                    <!-- 修改按钮 -->
                       <el-button
                            size="mini"
                            type="primary"
                            circle
                            @click="handleEdit(scope.$index, scope.row)"
                            >
                            <i class="el-icon-edit"></i>
                          
                       </el-button>
                    <!-- 删除按钮 -->
                    <el-button
                            size="mini"
                            type="danger"
                            circle
                            @click="handleDelete(scope.$index, scope.row)"
                            >
                            <i class="el-icon-delete"></i>
                    </el-button>
                </template>
              </el-table-column>
           </el-table>
             
               <!-- 分页组件 -->
                 <div style="margin-top: 20px">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[ 3, 5, 7]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="10">
                    </el-pagination>
                </div>

        </div>
    </el-card>
    </div>
</template>
<script>
export default {
    data() {
    return {
      // 查询
      queryForm: {
        region: "",
        key: ""
      },

      //商品列表
       // 表格数据
     InventoryTableData: [
        {
         goodsBarCode : '1336452000',
         goodsname : '泡面',
         purchasePrice : '4.5',
         goodscount : '5',
         WarehousingNum  :'20',
         onsales:5

        }
      ],
      currentPage : 1,
    };
  },
  methods: {
    // 查询
    queryform() {
      console.log("submit!");
    },

    //商品列表方法
     handleEdit(){

    
     },
     handleSizeChange(){

     },
     handleCurrentChange(){

     }
  }
}
</script>
<style lang="less">
@import "./inventorymanage.less";
</style>