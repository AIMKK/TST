import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {dateFormatMixin} from './date-mixin.js';
// import {
//   Layout, Modal, FormGroup, Card, ListGroup, FormInput, Button, Badge
// } from 'bootstrap-vue/es/components';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

// //
// Vue.use(Modal).use(Layout).use(FormGroup).use(Card)
//   .use(ListGroup).use(FormInput).use(Button).use(Badge);

//
//http://www.cnblogs.com/fangshidaima/p/9889353.html
import XHeader from 'vux/src/components/x-header';
Vue.component('x-header', XHeader);
import Group from 'vux/src/components/group'; 
Vue.component('group', Group);
import GroupTitle from 'vux/src/components/group-title'; 
Vue.component('group-title', GroupTitle);
// import Popup  from 'vux/src/components/popup'; 
// Vue.component('popup', Popup );
//
import Actionsheet  from 'vux/src/components/actionsheet'; 
Vue.component('action-sheet', Actionsheet );
//
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'CHS',    // 语言标识
  messages: {
    'CHS': require('./assets/langs/chs'),   // 简体
    'CHI': require('./assets/langs/chi'),   // 繁体
    'ENG': require('./assets/langs/eng'),   // 英文
  },
})
//
import './assets/icon/iconfont.css';
import './assets/icon/iconfontsvg.css';
import './assets/icon/iconfont.js';
//
Vue.config.productionTip = false;
//
dateFormatMixin();

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
