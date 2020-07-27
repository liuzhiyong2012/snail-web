export default {
  state: {
    payType:"1"
  },
  mutations: {
    changePayType(state: any, payType: number) {
      state.payType = payType;
    },

  },
  actions: {
    setUserInfo(context: any, state: any){
      context.commit('setName', state.name);
      context.commit('setToken', state.token);
    }
  }
}


