import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
