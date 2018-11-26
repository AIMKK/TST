import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {dateFormatMixin} from './date-mixin.js';
import {
  Layout, Modal, FormGroup, Card, ListGroup, FormInput, Button, Badge
} from 'bootstrap-vue/es/components';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// import InfiniteLoading from 'vue-infinite-loading';
// Vue.use(InfiniteLoading);
//
Vue.use(Modal).use(Layout).use(FormGroup).use(Card)
  .use(ListGroup).use(FormInput).use(Button).use(Badge);
  
// import BootstrapVue from 'bootstrap-vue'
// Vue.use(BootstrapVue);

//
Vue.config.productionTip = false;
//
dateFormatMixin();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
