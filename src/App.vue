<template>
  <div>
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {mapActions, mapMutations} from "vuex";

export default {
  components: {Header, Footer},
  methods: {
    ...mapActions(['loadCart','loadDeliveries']),
    ...mapMutations(['updateUserAccessKey']),
  },
  created(){
    const userAccessKey = localStorage.getItem('userAccessKey');//при первом рендере компонента сразу берется ключ из локала.
    if(userAccessKey){
      this.updateUserAccessKey(userAccessKey);//компонент отрендерился -> команда стору обновить ключ стора через мутацию.
    }
    // this.$store.dispatch('loadCart');//без mapActions. Загрузка сущ корзины. $store.dispatch вызывает методы actions у стора (store/index.js)
    this.loadCart();
    this.loadDeliveries();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
