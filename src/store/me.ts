export default {
  state: {
    payType:"1",
    address:'',
    points: 0,
    userData: {}
  },
  mutations: {
    changePayType(state: any, payType: number) {
      state.payType = payType;
    },
    addressData(state: any, data: string){
      state.address = data
    },
    setUserData(state: any, data: string){
      state.userData = data
      state.points = state.userData.points
    },
  },
  actions: {
    setAddressData(context: any, state: any){
      context.commit('addressData', state.data);
    }
  }
}


