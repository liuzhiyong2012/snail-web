export default {
    state: {
      cartList:[
          {
                  Name: '素食拼盘',
                  SampleImgPath: 'http://172.16.125.11:8010/eb8ea336-9434-4295-8215-3821c76baba8',
                  BannerImgPath: 'http://172.16.125.11:8010/50.jpg',
                  Price: 32,
                  orderNumberL:3,
                  Remark: null,
                  Status: 0,
                  Stocking: 0,
                  Id: 'e2dc9e2c-6733-e911-b13c-96af276fddb7'
          }
      ]
    },
    mutations: {
      addCartItem(state: any, item: any) {
        state.cartList.push(item);
      },
      delCartItem(state: any, index: number) {
        state.cartList.splice(index,1,0);
      },
      clearCart(state:any){
          state.cartList = [];
      }
    },
    actions: {
      setUserInfo(context: any, state: any){
        context.commit('setName', state.name);
        context.commit('setToken', state.token);
      }
    }
  }
  
  