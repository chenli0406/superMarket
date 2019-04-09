<template>
    <div class="account-manage">
          <!-- 面板 -->
            <el-card class="box-card">
                <!-- 头部 -->
                  <div slot="header" class="clearfix">
                    <span>账号管理</span>
                 </div>
                 <!-- 内容 -->
                <div  class="text item">
                    <el-table
                        ref="multipleTable"
                        :data="accountTableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                         <!-- 选择框 -->
                        <el-table-column type="selection" width="55"></el-table-column>
                        <!-- 账号 -->
                        <el-table-column prop="account" label="姓   名" ></el-table-column>
                        <!-- 用户组 -->
                        <el-table-column prop="userGroup" label="用 户 组" ></el-table-column>
                        <!-- 日期 -->
                        <el-table-column  label="日   期" >
                        <template slot-scope="scope">{{ scope.row.createDate }}</template>
                        </el-table-column>
                          
                           <!-- 操作 -->
                <el-table-column label="操   作">
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
               <!-- 批量删除&取消选择 -->
                    <div style="margin-top: 20px">
                        <el-button type="primary">批量删除</el-button>
                        <el-button type="success">取消选择</el-button>
                    </div>

               <!-- 分页组件 -->
                 <div style="margin-top: 20px">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="100">
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
      // 账号表格数据
      accountTableData: [
        {
          account: "李寻欢",
          userGroup: "超级管理员",
          createDate: "2019-04-08"
        }
      ],
      currentPage : 1,
    };
  },
  methods:{
     handleEdit(){

     },
     handleDelete(){

     },
     handleSizeChange(){

     },
     handleCurrentChange(){

     }

  }
};
</script>
<style lang="less">
@import "./accountmanage.less";
</style>