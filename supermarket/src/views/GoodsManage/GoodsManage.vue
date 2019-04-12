<template>
    <div class="goods-manage">
     <!-- 面板 -->
     <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>商品管理</span>
           
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
                        @selection-change="handleSelectionChange"
                        ref="goodsTableData"
                        :data="goodsTableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                         <!-- 选择框 -->
                        <el-table-column type="selection" width="55"></el-table-column>
                        <!-- 商品条形码 -->
                        <el-table-column prop="goodsbarcode" label="商品条形码"></el-table-column>
                        <!-- 商品名称 -->
                        <el-table-column prop="goodsname" label="商品名称" ></el-table-column>
                        <!--售价(元)  -->
                        <el-table-column prop="goodPrice" label="售价(元)"></el-table-column>
                         <!--商品进价(元)  -->
                        <el-table-column prop="purchasePrice" label="售价(元)"></el-table-column>
                       <!-- 市场价(元) -->
                        <el-table-column prop="marketPrice" label="市场价(元)"></el-table-column>
                       <!-- 库    存 -->
                        <el-table-column prop="WarehousingNum" label="库    存"></el-table-column> 
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
          <el-dialog width="800px" title="添加商品修改" :visible.sync="dialogFormVisible">
            <el-form :model="editform"  :rules="rules"    ref="editform" >
                 <!-- 所属分类 -->
            <el-form-item  prop="user_group" style="width: 150px;">
                <el-select v-model="editform.user_group" placeholder="---所属分类---">
                <el-option label="食品类" value="食品类"></el-option>
                <el-option label="生活类" value="生活类"></el-option>
                </el-select>
            </el-form-item>

             <!--商品条形码  -->
            <el-form-item label="商品条形码" prop="goodsBarCode" inline="true" class="demo-form-inline" style="width: 150px;" >
                 <el-input    v-model="editform.goodsBarCode" readonly unselecttable="on"></el-input>
            </el-form-item>

            <!--商品名称  -->
            <el-form-item label="商品名称" prop="goodsname" style="width: 150px;">
                <el-input v-model="editform.goodsname"></el-input>
            </el-form-item>

            <!--商品售价 -->
            <el-form-item label="商品售价" prop="goodPrice" style="width: 150px;">
                <el-input v-model="editform.goodPrice"></el-input>
            </el-form-item>

            <!--市场价 -->
            <el-form-item label="市场价" prop="marketPrice" style="width: 150px;">
                <el-input v-model="editform.marketPrice"></el-input>
                 <span class="title">默认市场价为售价的1.2倍</span>
            </el-form-item>

             <!--商品进价 -->
            <el-form-item label="商品进价" prop="purchasePrice" style="width: 150px;">
                <el-input v-model="editform.purchasePrice"></el-input>
            </el-form-item>
             
              <!--入库数量 -->
            <el-form-item label="入库数量" prop="WarehousingNum" style="width: 150px;">
                <el-input v-model="editform.WarehousingNum"></el-input>
                <span class="title">记重商品单位为千克</span>
            </el-form-item>

             <!--商品重量 -->
            <el-form-item label="商品重量" prop="goodWeight" style="width: 150px;">
                <el-input v-model="editform.goodWeight"></el-input>
            </el-form-item>

            <!-- 会员单位 -->
           <el-form-item label="会员单位" prop="memberUnit">
                <el-radio-group v-model="editform.memberUnit">
                <el-radio label="享受"></el-radio>
                <el-radio label="不享受"></el-radio>
            </el-radio-group>
            </el-form-item>
          <!-- 会员优惠 -->
          <el-form-item label="会员优惠" prop="memberDiscount">
                <el-radio-group v-model="editform.memberDiscount">
                <el-radio label="启用"></el-radio>
                <el-radio label="禁止"></el-radio>
            </el-radio-group>
          <!-- 商品简介 -->
            </el-form-item>
            <el-form-item label="商品简介" prop="goodsIntroduction"  style="width: 500px;">
                <el-input type="textarea" v-model="editform.goodsIntroduction"></el-input>
            <span class="title">不超过200个汉字</span>
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
export default {
  data() {
    return {
      // 查询
      queryForm: {
        region: "",
        key: ""
      },
       //修改模板数据
      editform: {
       user_group:'',
       goodsBarCode:'',
       goodsname:'',
       goodPrice:'',
       marketPrice:'',
       purchasePrice:'',
       WarehousingNum:'',
       goodWeight:'',
       memberUnit:'',
       memberDiscount:'',
       goodsIntroduction:'',
      },
      //验证
      rules:{},
      //商品列表
      // 表格数据
      goodsTableData: [],
      //当前页
      currentPage: 1,
      //总条数
      total: 0,
      //每页条数
      pageSize: 3,
      editId: "",
      //获取被选中的id 批量删除
      selectedId: [],
      //修改模板
      dialogFormVisible: false,
      formLabelWidth: "",
      // 要修改的数据的id
      editId: ""
    };
  },
  methods: {
    // 查询
    queryform() {
      console.log("submit!");
    },

    //显示列表
    getgoodslist() {
      //收集参数
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      //发送axios 请求所有数据
      this.request
        .get("/goods/goodslistbypage", params)
        .then(res => {
          let { total, data } = res;
          //赋值给变量
          this.total = total;
          this.goodsTableData = data;

          //如果这一页已经没有数据
          if (!data.length && this.currentPage !== 1) {
            //回到上一页
            this.currentPage -= 1;
            //调用自己
            this.getgoodslist();
          }
        })
        .catch(err => {
          console.log(err);
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
          const id = this.goodsTableData[index].id;
          console.log(id);
          this.request
            .get("/goods/goodsDelete", { id })
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
                this.getgoodslist();
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
      if (!this.selectedId.length) {
        //提示错误
        this.$message.error("没有选中,请选择！");
        return;
      }
      // 弹框
      this.$confirm("此操作将永久删除该账号, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //收集数据
          let params = {
            idArr: this.selectedId
          };
          //发送请求给后端
          this.request
            .get("/goods/batchDelete", params)
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
                this.getgoodslist();
              } else if (code === 1) {
                //弹失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //取消选择
    canceSelect() {
      // 选中整个表格 调用函数取消选择
      this.$refs.goodsTableData.clearSelection();
    },
    //每页条数
    handleSizeChange(val) {
      //把每页条数赋值给pageSize
      this.pageSize = val;
      //调用分页函数
      this.getgoodslist();
    },
    //当前页码
    handleCurrentChange(val) {
      //把页码赋值给currentPage
      this.currentPage = val;
      this.getgoodslist();
    },
    //修改
    handleEdit(id) {
      //显示模态框
      this.dialogFormVisible = true;
      //请求id
      this.editId = id;
      this.request
        .get("/goods/goodsEdit", { id })
        .then(res => {
          //数据回填
          this.editform.user_group = res[0].user_group;
          this.editform.goodsBarCode = res[0].goodsbarcode;
          this.editform.goodsname = res[0].goodsname;
          this.editform.goodPrice = res[0].goodPrice;
          this.editform.marketPrice = res[0].marketPrice;
          this.editform.purchasePrice = res[0].purchasePrice;
          this.editform.WarehousingNum = res[0].WarehousingNum;
          this.editform.goodWeight = res[0].goodsweight;
          this.editform.memberUnit = res[0].memberUnit;
          this.editform.memberDiscount = res[0].memberDiscount;
          this.editform.goodsIntroduction = res[0].goodsIntroduction;
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
            user_group: this.editform.user_group,
            goodsBarCode: this.editform.goodsBarCode,
            goodsname: this.editform.goodsname,
            goodPrice: this.editform.goodPrice,
            marketPrice: this.editform.marketPrice,
            purchasePrice: this.editform.purchasePrice,
            WarehousingNum: this.editform.WarehousingNum,
            goodWeight: this.editform.goodWeight,
            memberUnit: this.editform.memberUnit,
            memberDiscount: this.editform.memberDiscount,
            goodsIntroduction: this.editform.goodsIntroduction,
            editId: this.editId
          };
          //console.log(params);

          //发送请求把新数据和原来的id一起发送给后端
          this.request
            .post("/goods/saveEdit", params)
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
                this.getgoodslist();
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
  },
  // Vue生命周期 钩子函数，Vue实例创建完成，dom没生成
  created() {
    this.getgoodslist();
  }
};
</script>
<style lang="less">
@import "./goodsmanage.less";
</style>