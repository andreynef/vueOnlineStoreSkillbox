<template>
  <div>
    <Header/>
    <router-view/>
    <Footer/>
    <AppTheory/>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppTheory from "./AppTheory";


export default {
  components: {AppTheory, Header, Footer},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
