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
                        <el-table-column prop="user_group" label="用 户 组" ></el-table-column>
                        <!-- 日期 -->
                        <el-table-column  label="日   期" >
                        <template slot-scope="scope">{{ scope.row.create_date | filterDate }}</template>
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
//引入moment
import moment from "moment";
export default {
  data() {
    return {
      // 账号表格数据
      accountTableData: [],
      currentPage: 1
    };
  },
  methods: {
    handleEdit() {},
    handleDelete(index, row) {
      const id = this.accountTableData[index].id;
      console.log(id);
      this.request.get("/account/accountDelete", { id })
        .then(res => {
          //获取后端响应回来的数据
          let { code, reason } = res;
          //判断
          if (code === 0) {
            //弹成功提示
            this.$message({
              type: "success",
              message: reason
            });
           location.reload();
            
          } else if (code === 1) {
            //弹失败提示
            this.$message.error(reason);
          }
        })
        .catch(err => {
          console.log("失败", err);
        });
    },
    handleSizeChange() {},

    handleCurrentChange() {}
  },
  // Vue生命周期 钩子函数，Vue实例创建完成，dom没生成
  created() {
    //发送axios 请求所有数据
    this.request
      .get("/account/accountlist")
      .then(res => {
        //后端请求的数据 赋值给accountTableDate;
        // console.log(res);
        this.accountTableData = res;
      })
      .catch(err => {
        console.log(err);
      });
  },
  filters: {
    //过滤时间
    filterDate(time) {
      return moment(time).format("YYYY-MM-DD hh:mm");
    }
  }
};
</script>
<style lang="less">
@import "./accountmanage.less";
</style>