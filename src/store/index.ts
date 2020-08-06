import Vue from 'vue';
import Vuex from 'vuex';
import Login from './login';
import Dish from './dish';
import Shopping from './shopping';
import Home from './home';
import Me from './me';
import News from './news';
import Music from './music/index';
import Message from './message';

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
	shopping:Shopping,
  me:Me,
  home: Home,
  news:News,
  music:Music,
    message:Message
  }
})



   