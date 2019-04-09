<template>
    <div class="home">
         <el-container>
            <!-- 左侧 -->
            <el-aside width="200px">
                <!-- 导航 -->
                <LeftNav></LeftNav>
            </el-aside>

            <!-- 右侧 -->
            <el-container>
                <!-- 头 -->
                <el-header>
                      <!-- 自定义头部组件 -->
                    <Top></Top>
                </el-header>
                <!-- 中 -->
                <el-main>
                    <!-- 路由出口 -->
                    <router-view></router-view>
                </el-main>
                <!-- 尾 -->
                <el-footer>
                   <!-- 自定义尾部组件 -->
                    <Bottom></Bottom>
                </el-footer>
            </el-container>

        </el-container>   
    </div>
</template>
<script>
//引入组件
import LeftNav from '@/components/LeftNav/LeftNav.vue';
import Top from '@/components/Top/Top.vue';
import Bottom  from '@/components/Bottom/Bottom.vue';
export default {
  //注册组件
  components: {
    LeftNav,
    Top,
    Bottom
  }
};
</script>
<style lang="less">
//引入样式
@import "./home.less";
</style>

