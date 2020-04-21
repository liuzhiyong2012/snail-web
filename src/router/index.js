import Vue from 'vue'

import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import A1 from '../components/A1';
import Home from '../pages/home/index';


Vue.use(Router)

// Vue.config.test = 'i am test';

export default new Router({
  /* mode:'history', */
  routes: [
   {
      path: '/a1',
       strict:true,
    /*   name: 'HelloWorld', */
      component: A1
    },
    {
       path: '/hello',
        strict:true,
     /*   name: 'HelloWorld', */
       component: HelloWorld
     },
     {
        path: '/index',
         strict:true,
      /*   name: 'HelloWorld', */
        component: Home
      }

  ]
})
