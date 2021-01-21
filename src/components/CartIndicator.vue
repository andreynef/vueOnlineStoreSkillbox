<template>
  <router-link class="header__cart" :to="{name: 'cart'}">
<!--    <svg width="30" height="21" fill="currentColor">-->
<!--      <use xlink:href="#icon-cart"></use>-->
<!--    </svg>-->
    <div v-show="!$store.state.isCartLoading && !$store.state.isCartLoadingFailed">
      cart
      <span class="header__count" aria-label="Количество товаров">{{$store.state.cart.length}}</span>
    </div>
    <Loader v-show="$store.state.isCartLoading"/>
    <span v-show="$store.state.isCartLoadingFailed" style="font-size: 10px">cart load failed</span>
  </router-link>
</template>

<script>
  import Loader from '../components/Loader'
  export default {
    components:{Loader},
  };
</script>
