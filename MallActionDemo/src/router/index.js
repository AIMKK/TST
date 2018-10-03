import Vue from 'vue'
import Router from 'vue-router'
import ShopMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
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
        }
    ]
})