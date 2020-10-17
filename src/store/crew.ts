import {localStore} from '../utils/data-management'
export default {
  state: {
    voyageInfo: {
      seatNumber: '12',
      seatClass:'Y',
      seatType: 2,
      seatName:'3D',  
    },
    userInfo: {
		
    },
    airbusId: ''
  },
  mutations: {
    setCrewAirbusId(state:any,id:string){
      state.airbusId = id
      localStore.set('airbusId',id)
    },
  },
  actions: {
    setUserLoginInfo(context: any,state:any){
      context.commit('setToken', state.token)
      context.commit('setAirbusId', state.id)
    }
  }
}

