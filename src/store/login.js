import {getUserInfo} from '../api/login'
import {getLikeCount} from '../api/login'
export default {
  state: {  
		inited:false,
    name: '登陆/注册',
    id:'',
    avatar: '',
    introduce:'',
    token: '',
    toggleLogin: true,
    userInfo:{},
    likeCount:''
  },
  mutations: {  
    setName(state, name) {
      state.name = name
      state.userInfo.nickname=name
      window.localStorage.setItem('nickname',name)
     
    },
    setAvatar(state, avatar) {
      state.avatar = avatar;
      state.userInfo.headimgurl=avatar;
      window.localStorage.setItem('headImgUrl',avatar)
    },
    setIntroduce(state,introduce){
      state.introduce = introduce;
      state.userInfo.introduce=introduce
      window.localStorage.setItem('introduce',introduce)
    },
    setBalance(state,balance){
      state.userInfo.balance=balance;
    },
    setToken(state, token) {
      state.token = token
    },
    isLogin(state,isLogin) {
			if(typeof isLogin !== 'undefined'){
				state.toggleLogin = isLogin;
			}else{
				state.toggleLogin = !state.toggleLogin
			}
    },
    setId(state,id){
      state.id=id
    },
		setInited(state,inited){
		  state.inited = inited;
		},
    setUserInfo(state,userInfo){
      state.userInfo=userInfo;
      window.localStorage.setItem('nickname',userInfo.nickname)
      window.localStorage.setItem('headimgurl',userInfo.headimgurl)
      window.localStorage.setItem('introduce',userInfo.introduce)
    },
    getUserInfo(state){
      state.userInfo.nickname=window.localStorage.getItem('nickname')
      state.userInfo.headimgurl=window.localStorage.getItem('headimgurl')
      state.userInfo.introduce=window.localStorage.getItem('introduce')
    },
    setLikeCount(state,count){
      state.likeCount=count;
    },
    addFollowCount: state => {
      ++state.userInfo.followCount;
    },
    delFollowCount: state =>{
      --state.userInfo.followCount;
    },
  },
  actions: {
    login({commit,state},loginInfo) {
			const THIS = this;
			let token = loginInfo.token,
			    inited = loginInfo.inited;
					
      commit('setToken', token);
			
			if(inited){
				state.inited = inited;
			}
			
      getUserInfo(token).then(function (res) {
        if (res.returnCode == 1000) {
          commit('setAvatar', res.dataInfo.headimgurl)
          commit('setId', res.dataInfo.id)
          commit('setName', res.dataInfo.nickname)
          commit('setIntroduce', res.dataInfo.introduce)
          commit('isLogin',true) 
          commit('setUserInfo',res.dataInfo)
        }else{
					
				}
      })
      getLikeCount(token).then(function(res){
        if(res.returnCode==1000){
          commit('setLikeCount',res.dataInfo.gainLikeCount)
        }
      })
    },
    logOut({commit}) {
      commit('setToken', '')
      commit('setAvatar', '')
      commit('setId', '')
      commit('setName', '登陆/注册')
      commit('setUserInfo',{})
      commit('setLikeCount','')
      localStorage.removeItem('zb_notShowQRTips');
    },
		changeLoginStatus({commit,state}){
			state.toggleLogin = false;
		},
    checkLogin({commit,state}) {
      if(!state.token) {
        state.toggleLogin = false
      }
    },
    resetUserInfo({commit,state}){
      commit('setName', state.name)
      commit('setAvatar', state.avatar)
      commit('setIntroduce',state.introduce)
    },
  }
}

