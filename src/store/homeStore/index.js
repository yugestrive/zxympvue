export default {
  namespaced: true,
  namespace: 'indexStore/',
  state: {
    data: {
      bindState: false,
      listId: '',
      newArray: [],
      listType: {}
    }
  },
  mutations: {
    checkState (state, data) {
      state.data.bindState = data
    },
    setListId (state, data) {
      state.data.listId = data
    },
    setNewArray (state, data) {
      state.data.newArray = data
    },
    setlistType (state, data) {
      state.data.listType = data
    }
  },
  actions: {
    checkState ({commit}, data) {
      commit('checkState', data)
    },
    setListId ({commit}, data) {
      commit('setListId', data)
    },
    setNewArray ({commit}, data) {
      commit('setNewArray', data)
    },
    setlistType ({commit}, data) {
      commit('setlistType', data)
    }
  }
}
