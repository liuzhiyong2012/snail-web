import {localStore} from '../utils/data-management'
export default {
  state: {
    voyageInfo: {
      seatNumber: 'A34',
      seatClass:'Y',
      seatType: 2,
    },
    userInfo: {
		
    },
    name: '',
    phone: '',
    token: '',
    airbusId: ''
  },
  mutations: {
    setName(state: any, name: any) {
      state.name = name
      state.userInfo.nickname = name
      localStore.set('nickname',name)
    },
    setToken(state:any, token: string){
		// debugger;
		// debugger;
      state.token = token
      state.userInfo.token = token
      localStore.set('token',token)
    },
    setPhone(state:any,phone: string){
      state.token = phone
      state.userInfo.token = phone
      localStore.set('phone',phone)
    },
    setAirbusId(state:any,id:string){
      state.airbusId = id
      localStore.set('airbusId',id)
    },
    setSeatNumber(state:any,seat:string){
      state.voyageInfo.seatNumber = seat
      localStore.set('seatNumber',seat)
    },
    setSeatType(state:any,seat:string){
      state.voyageInfo.seatType = seat
      localStore.set('seatType',seat)
    },

    setUserInfo(state:any, userInfo: any){
		// debugger;
      state.userInfo = userInfo
      localStore.set('userInfo', userInfo)
    }
  },
  actions: {
    setUserInfo(context: any, state: any){
		// debugger;
		context.commit('setName', state.name)
      context.commit('setName', state.name)
      context.commit('setToken', state.token)
      context.commit('setAirbusId', state.airbusId)
      context.commit('setUserInfo', state)
    },
    setUserLoginInfo(context: any,state:any){
      context.commit('setToken', state.token)
      context.commit('setAirbusId', state.id)
    }
  }
}

