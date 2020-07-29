import {localStore} from '@/utils/data-management'
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
    token: ''
  },
  mutations: {
    setName(state: any, name: any) {
      state.name = name
      state.userInfo.nickname = name
      localStore.set('nickname',name)
    },
    setToken(state:any, token: string){
      state.token = token
      state.userInfo.token = token
      localStore.set('token',token)
    },
    setPhone(state:any,phone: string){
      state.token = phone
      state.userInfo.token = phone
      localStore.set('phone',phone)
    }
  },
  actions: {
    setUserInfo(context: any, state: any){
      context.commit('setName', state.name)
      context.commit('setToken', state.token)
    }
  }
}

