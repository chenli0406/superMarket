<template>
    <div class="left-nav">
        <h1>华联超市管理系统</h1>
           <!-- 导航组件 -->
      <el-menu
       :default-active="$route.path"
       class="el-menu-vertical-demo"
       background-color="#333"
       text-color="#fff"
       active-text-color="rgb(64, 158, 255)"
       unique-opened
       router
       >
       <!-- 导航 -->
        <el-submenu :index="(index + 1) + ''" v-for="(menu,index) in menus" :key="index">
             <!-- 图标和标题 -->
            <template slot="title">
            <i :class="menu.inconClass"></i>
            <span>{{ menu.title }}</span>
            </template>
              <!-- 二级导航 -->
            <el-menu-item  v-for="(subMenu,index) in menu.children"
            :index="subMenu.path"
            :key="index"
            >
            {{ subMenu.subTitle }}
            </el-menu-item>
        </el-submenu>
           
    </el-menu>
    </div>
</template>
<script>
export default {
  data() {
    return {
      //导航菜单数据
      menus: [
        //系统管理
        {
          inconClass: "el-icon-document",
          title: "系统管理",
          //子菜单
          children: [{ path: "/home/systeminfo", subTitle: "系统信息" }]
        },
        //账号管理
        {
          inconClass: "el-icon-star-on",
          title: "账号管理",
          //子菜单
          children: [
            { path: "/home/accountmanage", subTitle: "账号管理" },
            { path: "/home/accountadd", subTitle: "添加账号" },
            { path: "/home/passwordmodify", subTitle: "密码修改" }
          ]
        },
        //商品管理
        {
          inconClass: "el-icon-circle-plus",
          title: "商品管理",
          //子菜单
          children: [
            { path: "/home/goodsmanage", subTitle: "商品管理" },
            { path: "/home/goodsadd", subTitle: "添加商品" }
          ]
        },
        //统计管理
        {
          inconClass: "el-icon-edit-outline",
          title: "统计管理",
          //子菜单
          children: [
            { path: "/home/salestotal", subTitle: "销售统计" },
            { path: "/home/stocktotal", subTitle: "进货统计" }
          ]
        },
        //进货管理
        {
          inconClass: "el-icon-news",
          title: "进货管理",
          //子菜单
          children: [
            { path: "/home/addinventory", subTitle: "添加库存" },
            { path: "/home/inventorymanage", subTitle: "库存管理" }
          ]
        },
        //出货管理
        {
          inconClass: "el-icon-time",
          title: "出货管理",
          //子菜单
          children: [
            { path: "/home/saleslist", subTitle: "销售列表" },
            { path: "/home/goodsoutofstock", subTitle: "商品出库" },
            { path: "/home/goodsreturn", subTitle: "商品退货" }
          ]
        },
        //会员管理
        {
          inconClass: "el-icon-edit",
          title: "会员管理",
          //子菜单
          children: [
            { path: "/home/membershipaccount", subTitle: "账号管理" },
            { path: "/home/membersaddaccounts", subTitle: "添加账号" }
          ]
        }
      ]
    };
  }
};
</script>
<style lang="less">
//引入样式
@import "./leftnav.less";
</style>
