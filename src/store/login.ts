import {localStore} from '../utils/data-management'
export default {
  state: {
    voyageInfo: {
      seatNumber: 'A34',
      seatClass:'G'
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
      localStorage.setItem('nickname',name)
    },
    setToken(state:any, token: string){
		// debugger;
      state.token = token
      state.userInfo.token = token
      localStorage.setItem('token',token)
    },
    setPhone(state:any,phone: string){
      state.token = phone
      state.userInfo.token = phone
      window.localStorage.setItem('phone',phone)
    },
    setAirbusId(state:any,id:string){
      state.airbusId = id
      window.localStorage.setItem('airbusId',id)
    },
    setSeatNumber(state:any,seat:string){
      state.voyageInfo.seatNumber = seat
      window.localStorage.setItem('seatNumber',seat)
    },

    setUserInfoObj(state:any, userInfo: any){
      state.userInfo = userInfo
      localStore.set('userInfo', userInfo)
    }
  },
  actions: {
    setUserInfo(context: any, state: any){
      context.commit('setName', state.name)
      context.commit('setToken', state.token)
      context.commit('setAirbusId', state.id)
      context.commit('setUserInfoObj', state)
    },
    setUserLoginInfo(context: any,state:any){
      context.commit('setToken', state.token)
      context.commit('setAirbusId', state.id)
    }
  }
}

