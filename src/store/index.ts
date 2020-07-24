import Vue from 'vue';
import Vuex from 'vuex';
import Login from './login';
import Dish from './dish';
import News from './news';


Vue.use(Vuex)

export default new Vuex.Store<any>({
  state: {
    name: '1234'
  },
  mutations: {
	  
  },
  actions: {
  },
  modules: {
	login:Login,
	dish:Dish,
	news:News
  }
})



   