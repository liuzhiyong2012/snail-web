export default {
  state: {
    payType:"1",
    address:''
  },
  mutations: {
    changePayType(state: any, payType: number) {
      state.payType = payType;
    },
    addressData(state: any, data: string){
      state.address = data
      console.log(state.address)
    }
  },
  actions: {
    setAddressData(context: any, state: any){
      context.commit('addressData', state.data);
    }
  }
}


