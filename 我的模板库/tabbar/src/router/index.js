import Vue from 'vue'
import VueRouter from 'vue-router'

const About = () => import('@/views/profile/About.vue')
const Category = () => import('@/views/category/Category.vue')
const ShopCart = () => import('@/views/shopCart/ShopCart.vue')
const Home = () => import('@/views/home/Home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:"",
    redirect:"/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
