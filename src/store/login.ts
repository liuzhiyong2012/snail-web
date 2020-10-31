import {localStore} from '../utils/data-management';

export default {
  state: {
	userId:'',
    nickname: '',
    phone: '',
    token: ''
  },
  mutations: {
    setNickname(state: any, nickname: any) {
      state.name = nickname;
      localStore.set('nickname',nickname);
    },
    setToken(state:any, token: string){
      state.token = token
      localStore.set('token',token)
    },
    setPhone(state:any,phone: string){
      state.phone = phone;
      localStore.set('phone',phone);
    },
	setUserId(state:any,userId: string){
	  state.userId = userId;
	  localStore.set('userId',userId);
	},
  },
  actions: {
	setUserInfo(context: any, userInfo: any){
		context.commit('setNickname', userInfo.nickname);
		context.commit('setToken', userInfo.token);
		context.commit('setPhone', userInfo.phone);
		context.commit('setUserId', userInfo.userId);
	},
	logout(context: any, state: any){
		context.commit('setNickname', '');
		context.commit('setToken', '');
		context.commit('setPhone', '');
		context.commit('setUserId', '');
	}
  }
}

