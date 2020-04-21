
export default {
  state: {
    name: '登陆/注册',
  },
  mutations: {
    setName(state, name) {
      state.name = name
    }
  },
  actions: {
    setNameAction({commit,state}){
      commit('setName', state.name)
    },
  }
}
