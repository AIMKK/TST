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

//

//
Vue.config.productionTip = false;
//
dateFormatMixin();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
