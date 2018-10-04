import Vue from 'vue'
import Router from 'vue-router'
import ShopMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'ShoppingMall',
            component: ShopMall
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/goods',
            name: 'Goods',
            component: Goods
        },
        {
            path: '/categoryList',
            name: 'CategoryList',
            component: CategoryList
        }
    ]
})