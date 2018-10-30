import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login/login.vue'
import Quote from './views/quote/ATQuotePriceSet.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/quote',
      name: 'quote',
      component: Quote
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
