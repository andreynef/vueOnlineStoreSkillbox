<template>
  <div>
    <Header/>
<!--    <MainPage v-if="currentPage === 'main'"/>-->
<!--    <ProductPage v-if="currentPage === 'product'"/>-->
<!--    <NotFoundPage v-else/>-->
    <component :is="currentPageComponent" :page-params="currentPageParams" @gotoPageFromItem="(pageName, pageParams) => gotoPage(pageName, pageParams)"/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/ProductPage";

const routes ={
  main: 'MainPage',
  product: 'ProductPage',
}

export default {
  components: {Header, MainPage, ProductPage, Footer, NotFoundPage,},
  data() {//гл состояние
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  computed: {
    currentPageComponent(){
      return routes[this.currentPage] || 'NotFoundPAge';
    }
  },
  methods: {//перекл страниц
    gotoPage(pageName, pageParams){
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    }
  }
};
</script>
