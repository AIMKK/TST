import Vue from 'vue'
import Vuex from 'vuex'

// import vuexI18n from 'vuex-i18n';

Vue.use(Vuex);

// let store = new Vuex.Store({
//   modules: {
//     i18n: vuexI18n.store
//   }
// })
// Vue.use(vuexI18n.plugin, store)
//
export default new Vuex.Store({
  state: {
    loginUserCode:''
  },
  mutations: {
    setLoginUserInfo (state, userInfo) {
      state.loginUserCode=userInfo.UserCode;
    }
  },
  actions: {

  }
})
