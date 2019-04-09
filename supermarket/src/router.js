import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    //根目录
    {
      path: '/',
      redirect: '/login'
    },
    //登录
    {
      path: '/login',
      component: () => import('./views/Login/Login.vue')
    },
    //后台主页面 home
    {
      path: '/home',
      component: () => import('./views/Home/Home.vue'),
      redirect:'/home/systeminfo',
      children: [
        // 系统信息
        {
          path : '/home/systeminfo',
          component : () => import('./views/SystemInfo/SystemInfo.vue')
        },

        // 账号添加
        {
          path : '/home/accountadd',
          component : () => import('./views/AccountAdd/AccountAdd.vue')
        },
        // 账号管理
        {
          path : '/home/accountmanage',
          component : () => import('./views/AccountManage/AccountManage.vue')
        },
        // 密码修改
        {
          path : '/home/passwordmodify',
          component : () => import('./views/PasswordModify/PasswordModify.vue')
        },
        // 商品添加
        {
          path : '/home/goodsadd',
          component : () => import('./views/GoodsAdd/GoodsAdd.vue')
        },
        // 商品管理
        {
          path : '/home/goodsmanage',
          component : () => import('./views/GoodsManage/GoodsManage.vue')
        },
        // 销售统计
        {
          path : '/home/salestotal',
          component : () => import('./views/SalesTotal/SalesTotal.vue')
        },
        // 进货统计
        {
          path : '/home/stocktotal',
          component : () => import('./views/StockTotal/StockTotal.vue')
        },
        //会员账号管理
        {
          path : '/home/membershipaccount',
          component : () => import('./views/MembershipAccount/MembershipAccount.vue')
        },
        //会员账号添加
        {
          path : '/home/membersaddaccounts',
          component : () => import('./views/MembersAddAccounts/MembersAddAccounts.vue')
        },
        //销售列表
        {
          path : '/home/saleslist',
          component : () => import('./views/SalesList/SalesList.vue')
        },
        //商品出库
        {
          path : '/home/goodsoutofstock',
          component : () => import('./views/GoodsOutOfStock/GoodsOutOfStock.vue')
        },
        //商品退货
        {
          path : '/home/goodsreturn',
          component : () => import('./views/GoodsReturn/GoodsReturn.vue')
        },
        //库存管理
        {
          path : '/home/inventorymanage',
          component : () => import('./views/InventoryManage/InventoryManage.vue')
        },
        //添加库存
        {
          path : '/home/addinventory',
          component : () => import('./views/AddInventory/AddInventory.vue')
        },


      ]
    }
  ]
})