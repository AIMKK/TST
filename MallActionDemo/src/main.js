// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import {
    Stepper,
    PullRefresh,
    Tab,
    Tabs,
    Button,
    Row,
    Col,
    Swipe,
    SwipeItem,
    Lazyload,
    List,
    Field,
    NavBar,
    Tabbar,
    TabbarItem
} from 'vant';


Vue.use(Tabbar).use(TabbarItem).use(Button)
    .use(Row).use(Col).use(Swipe).use(SwipeItem)
    .use(Lazyload).use(List).use(Field)
    .use(NavBar).use(Tab).use(Tabs)
    .use(PullRefresh).use(Stepper);
//
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})