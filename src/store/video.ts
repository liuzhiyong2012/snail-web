export default {
    state: {
      videoList:[]
    },
    mutations: {
      setVideoList(state: any, list: any) {
        state.videoList = list;
      },
      
    },
    actions: {
      setAddressData(context: any, state: any){
        context.commit('addressData', state.data);
      }
    }
  }
  
  
  