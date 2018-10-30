import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUserCode:''
  },
  mutations: {
    setLoginUser (state,userCode) {
      state.loginUserCode=userCode;
    }
  },
  actions: {

  }
})
