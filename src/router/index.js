import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../components/Login'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Login')

// import Home from '../components/Home'
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Home')

// import Welcome from '../components/welcome'
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Welcome')

// import Users from '../components/users/Users'
const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/users/Users')

// import Rights from '../components/power/Rights'
const Rights = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/power/Rights')

// import Roles from '../components/power/Roles'
const Roles = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/power/Roles')

// import Cate from '../components/goods/Cate'
const Cate = () => import(/* webpackChunkName: "Cate_Params" */ '../components/goods/Cate')

// import Params from '../components/goods/Params'
const Params = () => import(/* webpackChunkName: "Cate_Params" */ '../components/goods/Params')

// import GoodsList from '../components/goods/List'
const GoodsList = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/goods/List')

// import Add from '../components/goods/Add'
const Add = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/goods/Add')

// import Order from '../components/order/order'
const Order = () => import(/* webpackChunkName: "Order_Report" */ '../components/order/Order')

// import Report from '../components/report/Report'
const Report = () => import(/* webpackChunkName: "Order_Report" */ '../components/report/Report')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Cate },
        { path: '/params', component: Params },
        { path: '/goods', component: GoodsList },
        { path: '/goods/add', component: Add },
        { path: '/orders', component: Order },
        { path: '/reports', component: Report }
      ]
    }
  ]
})

export default router

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
