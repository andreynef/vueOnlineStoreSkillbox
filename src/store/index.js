import Vue from "vue";
import Vuex from "vuex";
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {//стейт стора.
    cart:[],//начальное состояние корзины
  },
  mutations:{//изменение стора мутацией а не нов копией как в React. Сохраняет историю, удобно при отладке.
    addProductToCart(state, payload){
      const existingItems = state.cart.find(item=>item.productId === payload.productId);
      if(existingItems){
        existingItems.amount += payload.amount;
      }else{
        state.cart.push({
          productId: payload.productId,
          amount: payload.amount,
        })
      }
    },
    updateCartProductAmount(state, payload){
      const existingItems = state.cart.find(item=>item.productId === payload.productId);
      if (existingItems){
        existingItems.amount = payload.amount;
      }
    },
    deleteCartProduct(state, productId){
      state.cart = state.cart.filter(item=>item.productId !== productId);
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cart.map(item => {
        return {
          ...item,
          product: products.find(p=>p.id === item.productId),
        }
      })
    },
    cartTotalPrice(state,getters){

      return getters.cartDetailProducts.reduce((acc,item)=>(item.product.price * item.amount)+ acc, 0);
    }
  }
});



// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   },
// });
