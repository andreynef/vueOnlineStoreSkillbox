import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {API_BASE_URL} from "../config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {//стейт стора.
    cart:[],//начальное состояние корзины
    cartData:[],
    isCartLoading:false,
    isCartLoadingFailed:false,
    userAccessKey: null,
  },
  mutations:{//изменение стейта/стора мутацией а не нов копией как в React. Правило стора. Сохраняет историю, удобно при отладке. Всегда синхронные.
    updateCartProductAmount(state, payload){
      const existingItems = state.cart.find(item=>item.productId === payload.productId);
      if (existingItems){
        existingItems.amount = payload.amount;
      }
    },
    deleteCartProduct(state, productId){
      state.cart = state.cart.filter(item=>item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey){
      state.userAccessKey = accessKey;
    },
    updateCartData(state, items){
      state.cartData = items;
    },
    updateIsCartLoading(state, bool){
      state.isCartLoading = bool;
    },
    updateIsCartLoadingFailed(state, bool){
      state.isCartLoadingFailed = bool;
    },
    syncCartProducts(state){//cart свой и cartData приходящий с сервера не совпадают. Поэтому преобр их в 1 формат.
      state.cart = state.cartData.map(item=>{
        return {
          productId: item.product.id,//слева стейт и справа результат с сервера.
          amount: item.quantity,//слева стейт и справа результат с сервера.
        }
      })
    }
  },
  getters: {
    cartDetailProducts(state) {
      return state.cart.map(item => {
        const product = state.cartData.find(p=>p.product.id===item.productId).product;//найти тот элемент кот приходит с сервера в нашей корзине
        return {
          ...item,
          product: {
            ...product,
            image:product.image.file.url
          },
        }
      })
    },
    cartTotalPrice(state,getters){
      return getters.cartDetailProducts.reduce((acc,item)=>(item.product.price * item.amount)+ acc, 0);
    },
  },
  actions: {//опция actions где возможны синхр и ассинхр операции. Запуск происходит из компонента App.
    loadCart(context){//в контексте прилетают те же методы что и у глоб хранилища 'new Vuex.Store' например context.commit.
      context.commit('updateIsCartLoading', true);
      return axios//лучше всегда возвращать axios, хороший тон.
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey
          },
        })
        .then(res => {
          if(!context.state.userAccessKey){//если в сторе еще нет ключа то...
            localStorage.setItem('userAccessKey', res.data.user.accessKey);//записываем его в локал для дальн использования
            context.commit('updateUserAccessKey',res.data.user.accessKey);//мутируем. Первая загрузка и установка ключа в стейт. И при последующих запросах сохраненный ключ передается через context. При закрытой вкладке все удаляется, поэтому доп-но использ localStorage.
          }
          context.commit('updateCartData', res.data.items);//обновляем корзину мутацией...
          context.commit('syncCartProducts');//...и затем, после синхронного обновления корзины, переписываем приходящ данные под свой формат.
        })
        .catch(()=>{
          context.commit('updateIsCartLoadingFailed', true);
        })
        .then(()=>context.commit('updateIsCartLoading', false))
    },
    addProductToCart(context, {productId,amount}){//2м арг добавляется как и в мутации payload.
      return (new Promise(resolve => setTimeout(resolve,2000)))//обертка для любого действия с исскусств задержкой (чтобы посмореть статусы отправки)
        .then(()=>{
          return axios//не просто действие axios а с возвратом чтобы потом передать новости о статусе в <ProductPage>.
            .post(`${API_BASE_URL}/api/baskets/products`, {
              productId: productId,
              quantity : amount,
            },{
              params:{
                userAccessKey: context.state.userAccessKey
              }
            })
            .then(res => {
              context.commit('updateCartData', res.data.items);//обновляем корзину через мутацию...
              context.commit('syncCartProducts');//...и затем, после синхронного обновления корзины, переписываем приходящ данные под свой формат.
            })
        })
    },
    changeProductAmount(context, {productId,amount}){
      return (new Promise(resolve => setTimeout(resolve,1000)))
        .then(()=>{
          return axios
            .put(`${API_BASE_URL}/api/baskets/products`, {
              productId: productId,
              quantity : amount,
            },{
              params:{
                userAccessKey: context.state.userAccessKey
              }
            })
            .then(res => {
              context.commit('updateCartData', res.data.items);//обновляем корзину через мутацию...
              context.commit('syncCartProducts');//...и затем, после синхронного обновления корзины, переписываем приходящ данные под свой формат.
            })
        })
    },
    deleteProductFromCart(context, {productId}){//2м арг добавляется как и в мутации payload.
      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          params:{
            userAccessKey: context.state.userAccessKey,
            productId
          }
        })
        .then(res => {
          context.commit('updateCartData', res.data.items);//обновляем корзину через мутацию...
          context.commit('syncCartProducts');//...и затем, после синхронного обновления корзины, переписываем приходящ данные под свой формат.
        })
    },
    updateCartAmount(context, {productId,amount}){//схоже с addProductToCart
      context.commit('updateCartProductAmount', {productId,amount});//не дожидаясь ответа от сервера чтобы отобразить нужное число делаем сразу мутацию. Так быстрее.
      if(amount<1){//исправление ошибки невозможность набрать пустое поле
        return;
      }
      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          productId: productId,
          quantity : amount,
        },{
          params:{
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(res => {
          context.commit('updateCartData', res.data.items);
        })
        .catch(()=>{//в случае ошибки или ввода ошибочного числа происходит откат (предыд знач поля)
          context.commit('syncCartProducts');
        })

    }
  },
});

// return (new Promise(resolve =>setTimeout(resolve,2000)))//обертка для любого действия с исскусств задержкой
//   .then(()=>{
//
//   })


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
