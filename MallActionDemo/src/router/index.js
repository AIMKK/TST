import Vue from 'vue'
import Router from 'vue-router'
import ShopMall from '@/components/pages/ShoppingMall'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'ShoppingMall',
        component: ShopMall
    }]
})