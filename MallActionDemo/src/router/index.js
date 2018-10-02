import Vue from 'vue'
import Router from 'vue-router'
import ShopMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'

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
        }
    ]
})