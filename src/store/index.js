import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {API_BASE_URL} from "../config";
import router from "../router/index"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {//стейт стора.
    cart:[],//начальное состояние корзины
    cartData:[],
    isCartLoading:false,
    isCartLoadingFailed:false,
    userAccessKey: null,
    isDeleting:false,
    isDeletingFailed:false,
    orderInfo: null,
    deliveries:null,
    payments:null,
  },
  mutations:{//изменение стейта/стора мутацией а не нов копией как в React. Правило стора. Сохраняет историю, удобно при отладке. Всегда синхронные.
    resetLocalCart(state){
      state.cart = [];
      state.cartData = [];
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
    updateOrderInfo(state, data){
      state.orderInfo = data;
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
    updatePayments(state, payments){
      state.payments = payments
    },
    syncCartProducts(state){//cart свой и cartData приходящий с сервера не совпадают. Поэтому преобр их в 1 формат.
      state.cart = state.cartData.map(item=>{
        return {
          productId: item.id,//слева стейт и справа результат с сервера.
          amount: item.quantity,//слева стейт и справа результат с сервера.
        }
      })
    }
  },
  getters: {
    cartDetailProducts(state) {
      return state.cart.map(item => {
        const product = state.cartData.find(dataItem=>dataItem.id===item.productId).productOffer.product;//найти тот элемент кот приходит с сервера в нашей корзине
        return {
          ...item,
          product: {
            ...product,
            image:product.preview.file.url
          },
        }
      })
    },
    cartTotalPrice(state,getters){
      return getters.cartDetailProducts.reduce((acc,item)=>(item.product.price * item.amount)+ acc, 0);
    },
    orderInfo(state){
      return state.orderInfo;
    },
  },
  actions: {//опция actions где возможны синхр и ассинхр операции. Запуск происходит из компонента App.
    makeOrder(context, payload){//2м арг добавляется как и в мутации payload.
      return axios
        .post(`${API_BASE_URL}/api/orders`, {
          name: payload.name,
          address: payload.address,
          phone: payload.phone,
          email: payload.email,
          comment: payload.comment,
          deliveryTypeId:payload.delivery.id,
          paymentTypeId:payload.payments.id,
        },{
          params:{
            userAccessKey: context.state.userAccessKey
          }
        })
        .then((res)=>{
          context.commit('resetLocalCart');
          context.commit('updateOrderInfo', res.data);
          router.push({name:'orderInfo', params: {id: res.data.id}});//перейти на стр оформленного заказа передавая id
        })
    },
    loadOrderInfo(context,orderId){
    return axios//лучше всегда возвращать axios, хороший тон.
    .get(`${API_BASE_URL}/api/orders/${orderId}`, {
        params: {
          userAccessKey: context.state.userAccessKey
        },
      })
      .then((res)=>{
        context.commit('updateOrderInfo', res.data)
      })
      .catch((err)=>{
        console.log('error from actions loadOrderInfo:',err);
        router.push({name:'notFound'});
      })
    },
    loadDeliveries(context){
      return axios
        .get(`${API_BASE_URL}/api/deliveries`, {

          })
        .then((res)=>{
          context.state.deliveries =  res.data
        })
        .catch((err)=>{
          console.log('error from actions loadDeliveries:',err);
        })
    },
    loadPayments(context,payload){
      console.log('loadPayments', payload.id)
      return axios
        .get(`${API_BASE_URL}/api/payments`, {
          params: {
            deliveryTypeId:payload.id
          },
        })
        .then((res)=>{
          // console.log('res.data', res.data)
          context.state.payments = res.data
          // context.commit('updatePayments', res.data)
          // console.log('state.payments', context.state.payments)
        })
        .catch((err)=>{
          console.log('error from actions loadPayments:',err);
        })
    },
    loadCart(context){//в контексте прилетают те же методы что и у глоб хранилища 'new Vuex.Store' например context.commit.
      context.commit('updateIsCartLoading', true);
      return axios//лучше всегда возвращать axios, хороший тон.
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey
          },
        })
        .then(res => {
          // console.log('load cart from server:',res)
            if(!context.state.userAccessKey){//если в сторе еще нет ключа то...
              localStorage.setItem('userAccessKey', res.data.user.accessKey);//...записываем его в локал для дальн использования...
              context.commit('updateUserAccessKey',res.data.user.accessKey);//...и мутируем. Первая загрузка и установка ключа в стейт. И при последующих запросах сохраненный ключ передается через context. При закрытой вкладке все удаляется, поэтому доп-но использ localStorage.
            }
            context.commit('updateCartData', res.data.items);//обновляем корзину мутацией...
            context.commit('syncCartProducts');//...и затем, после синхронного обновления корзины, переписываем приходящ данные под свой формат.
        })
        .catch(()=>{
          context.commit('updateIsCartLoadingFailed', true);
        })
        .then(()=>context.commit('updateIsCartLoading', false))
    },
    addProductToCart(context, {offerId,amount,colorId}){//2м арг добавляется как и в мутации payload.
      return (new Promise(resolve => setTimeout(resolve,2000)))//искуств предействие для любого action (исскусств задержка чтобы посмореть статусы отправки, для дебага)
        .then(()=>{
          return axios//не просто действие axios а с возвратом чтобы потом передать новости о статусе в <ProductPage>.
            .post(`${API_BASE_URL}/api/baskets/products`, {
              productOfferId: offerId,//нужные данные кот просит сервер
              colorId: colorId,
              quantity : amount,//нужные данные кот просит сервер
            },{
              params:{
                userAccessKey: context.state.userAccessKey//при рендере Арр создано новое или взятое с локала.
              }
            })
            .then(res => {//в ответ приходит обновленная вся корзина

              context.commit('updateCartData', res.data.items);//обновляем корзину через мутацию...
              context.commit('syncCartProducts');//...и затем, после синхронного обновления корзины, переписываем приходящ данные под свой формат.
            })
        })
    },
    changeProductAmountAction(context, {productId,amount}){
      console.log('changeProductAmountAction')
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
    },
    deleteProductFromCartAction(context, {productId}){//2м арг добавляется как и в мутации payload.
      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          data:{
            basketItemId: productId,
          },
          params:{
            userAccessKey: context.state.userAccessKey
          },
        })
        .then(res => {
          context.commit('updateCartData', res.data.items);//обновляем корзину через мутацию...
          context.commit('syncCartProducts');//...и затем, после синхронного обновления корзины, переписываем приходящ данные под свой формат.
        })
    },
    updateCartProductAmountAction(context, {productId,amount}){//схоже с addProductToCart
      context.commit('updateCartProductAmount', {productId,amount});//не дожидаясь ответа от сервера чтобы отобразить нужное число делаем сразу мутацию. Так быстрее.
      if(amount<1){//исправление ошибки невозможность набрать пустое поле
        return;
      }
      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          basketItemId: productId,
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

    },
    loadProductsAction(context, payload){
      if(payload.productId){
        console.log('axios productId:',payload.productId)
        return axios.get(`${API_BASE_URL}/api/products/${payload.productId}`)
      }else{
        console.log('axios all')
        return axios.get(`${API_BASE_URL}/api/products`, {
          params:  {//апи просит эти параметры.
            categoryId: payload.categoryId,
            colorId: payload.colorId,
            // 'props[length]':'1 метр',
            page: payload.page,
            limit: payload.limit,
            minPrice: payload.minPrice,
            maxPrice: payload.maxPrice,
          }
        })
      }
    },
  },
  modules:{

  }
});

// return (new Promise(resolve =>setTimeout(resolve,2000)))//обертка для любого action с исскусств задержкой
//   .then(()=>{
//
//   })
