import Vue from 'vue'
import Vuex from 'vuex'
import homeStore from './homeStore'

const globalStore = {
  namespaced: true,
  namespace: 'globalStore/',
  state: {
    data: {
      area: '',
      openId: ''
    },
  },
  mutations: {
    // 存储openId
    setOpenId (state, data) {
      state.data.openId = data
    },
    // 存储area
    setArea (state, data) {
      state.data.area = data
    }
  },
  actions: {
    // 存储openId
    setOpenId ({commit}, data) {
      commit('setOpenId', data)
    },
    // 存储area
    setArea ({commit}, data) {
      commit('setArea', data)
    }
  }
}
Vue.use(Vuex)
export default new Vuex.Store({
  strict: false,
  modules: {
    homeStore,
    globalStore
  }
})
