import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login/Login'
import test from '@/components/common/alertTip'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Login',
        component: Login
    }]
})