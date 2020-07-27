export default {
    state: {
      userInfo: {
      },
      name: '',
      phone: '',
      internetData: ''
    },
    mutations: {
     
      setInternetCartData(state: any, data:any){
        state.internetData = data
      }
      
    },
    actions: {
        commitInternetCartData(context: any, state: any){
            console.log(state.data)
        context.commit('setInternetCartData', state.data)
      }
    }
  }
  
  