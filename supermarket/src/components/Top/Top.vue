
<template>
  <div class="top">
      <el-row :gutter="20">
          <!-- 左侧标题 -->
            <el-col :span="20">
                <span class="title">
                    <i class="el-icon-menu"></i>
                    华联超市管理系统
                </span>
                 </el-col>
                <!-- 右侧头像和当前登录用户账号名 -->
                <el-col :span="4">
                    <el-row>
                       <el-col :span="8"> 
                           <!-- 头像 -->
                           <div class="avatar">
                             <img width="100%" height="100%" src="../../assets/img/1.jpg" alt="">
                           </div>
                       </el-col>
                       <el-col :span="16"> 
                        <!-- 登录账号名 -->
                         <el-dropdown>
                            <span class="el-dropdown-link">
                                彭于晏<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="a">个人中心</el-dropdown-item>
                                <el-dropdown-item command="b">退出系统</el-dropdown-item>
                            </el-dropdown-menu>

                        </el-dropdown>
                      </el-col> 
                    </el-row>
                </el-col>
           </el-row>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
 @import './top.less';
</style>