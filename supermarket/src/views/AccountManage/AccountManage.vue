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
                        @selection-change="handleSelectionChange"
                        ref="accountTableData"
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
                            @click="handleEdit(scope.row.id)"
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
            
            <!-- 修改模板 -->
          <el-dialog width="400px" title="账号修改" :visible.sync="dialogFormVisible">
            <el-form :model="editform"  :rules="rules"    ref="editform" >
                <el-form-item label="姓名:"  style="width:230px" :label-width="formLabelWidth" prop="account">
                <el-input v-model="editform.account" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="选择用户组"  :label-width="formLabelWidth" prop="user_group"><br>
                <el-select v-model="editform.user_group" placeholder="请选择用户组">
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                  <el-option label="普通用户" value="普通用户"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="savaEdit">确 定</el-button>
            </div>
          </el-dialog>

               <!-- 批量删除&取消选择 -->
                    <div style="margin-top: 20px">
                        <el-button type="primary" @click="batcDelete">批量删除</el-button>
                        <el-button type="success" @click="canceSelect">取消选择</el-button>
                    </div>

               <!-- 分页组件 -->
                 <div style="margin-top: 20px">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[1, 5, 10, 15]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
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
      //当前页
      currentPage: 1,
      //总条数
      total:0,
      //每页条数
      pageSize:3,
      //修改模板数据
      editform: {
        account: "",
        user_group: ""
      },
      //修改模板
      dialogFormVisible: false,
      formLabelWidth: "",
      // 要修改的数据的id
      editId: "",
      //获取被选中的id 批量删除
      selectedId: [],
      //表单验证
      rules: {
        //账号
        account: [
          //非空
          { required: true, message: "请输入账号", trigger: "blur" },
          //长度
          { min: 3, max: 6, message: "账号长度 3~6 位", trigger: "blur" }
        ],
        // 用户组
        user_group: [
          { required: true, message: "请选择用户组", trigger: "change" } // 非空
        ]
      }
    };
  },
  methods: {
    getaccountlistByPage() {
      //收集参数
      let params ={
        currentPage:this.currentPage,
        pageSize:this.pageSize
      }
      //发送axios 请求所有数据
      this.request
        .get("/account/accountlistbypage",params)
        .then(res => {
          let{ total,data }=res
          //赋值给变量
          this.total=total;
          this.accountTableData=data;

           //如果这一页已经没有数据
        if(!data.length && this.currentPage !==1){
          //回到上一页
          this.currentPage -=1;
          //调用自己
          this.getaccountlistByPage();
        }
        })
        .catch(err => {
          console.log(err);
        })
       
    },
    //修改
    handleEdit(id) {
      //显示模态框
      this.dialogFormVisible = true;
      //请求id
      this.editId = id;
      this.request
        .get("/account/accountEdit", { id })
        .then(res => {
          //数据回填
          this.editform.account = res[0].account;
          this.editform.user_group = res[0].user_group;

          console.log(res);
        })
        .catch(err => {
          console.log("失败", err);
        });
    },

    // 保存修改
    savaEdit() {
      //获取整个表单验证
      this.$refs.editform.validate(valid => {
        //前端验证通过
        if (valid) {
          //关闭模态框
          this.dialogFormVisible = false;
          //收集数据
          let params = {
            account: this.editform.account,
            user_group: this.editform.user_group,
            editId: this.editId
          };
          //console.log(params);

          //发送请求把新数据和原来的id一起发送给后端
          this.request
            .post("/account/saveEdit", params)
            .then(res => {
              //接受后端响应的数据
              let { code, reason } = res;
              if (code === 0) {
                //提示成功
                this.$message({
                  type: "success",
                  message: reason
                });
                //刷新页面
                this.getaccountlistByPage();
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
    //删除
    handleDelete(index, row) {
      // 弹框
      this.$confirm("此操作将永久删除该账号, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const id = this.accountTableData[index].id;
          console.log(id);
          this.request
            .get("/account/accountDelete", { id })
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
                //刷新列表
                this.getaccountlistByPage();
              } else if (code === 1) {
                //弹失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log("失败", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //当选中选择框的状态发生变化，就会触发这个函数，而且传入被选中的数据 val是一个数组
    handleSelectionChange(val) {
      // 获取被选中的id 放入一个数组
      this.selectedId = val.map(v => v.id);
      console.log(this.selectedId);
    },
    //批量删除
    batcDelete() {
      //如果没选中就提示错误信息，并结束函数
      if(!this.selectedId.length){
        //提示错误
        this.$message.error("没有选中,请选择！")
        return
      }
      // 弹框
      this.$confirm("此操作将永久删除该账号, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //收集数据
        let params = {
          idArr: this.selectedId
        };
        //发送请求给后端
        this.request
          .get("/account/batchDelete", params)
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
              //刷新列表
              this.getaccountlistByPage();
            } else if (code === 1) {
              //弹失败提示
              this.$message.error(reason);
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(() => { // 取消
        this.$message({
            type: 'info',
            message: '已取消删除'
        })
      })
    },

    //取消选择
    canceSelect() {
      // 选中整个表格 调用函数取消选择
      this.$refs.accountTableData.clearSelection();
    },
    
    //每页条数
    handleSizeChange(val) {
      //把每页条数赋值给pageSize
      this.pageSize=val;
      //调用分页函数
      this.getaccountlistByPage();
      
      
    },
    //当前页码
    handleCurrentChange(val) {
     //把页码赋值给currentPage
     this.currentPage=val;
     this.getaccountlistByPage();
    }
  },
  // Vue生命周期 钩子函数，Vue实例创建完成，dom没生成
  created() {
    this.getaccountlistByPage();
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