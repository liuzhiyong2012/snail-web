import Vue from 'vue'
import Vuex from 'vuex'
import Login from './login'


Vue.use(Vuex);

//debugger;
const store = new Vuex.Store({
  state:{
		showHeadAndFoot:true,
  },
  modules: {
    login: Login,
  },
	mutations:{
		showHeadAndFoot(state,isShow){
			state.showHeadAndFoot = isShow;
		}
	}
})

export default store
