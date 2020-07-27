import Vue from 'vue';
import Vuex from 'vuex';
import Login from './login';
import Dish from './dish';
import Home from './home';
import Me from './me';

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
  me:Me,
  home: Home
  }
})



   