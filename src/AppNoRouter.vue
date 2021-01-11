<template>
  <div>
    <Header/>
    <component :is="currentPageComponent" :page-params="currentPageParams"/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import eventBus from "./eventBus";

const routes ={
  main: 'MainPage',//ключ это передаваемое значение снизу, а значение это название компонента
  product: 'ProductPage',
}

export default {
  components: {Header, MainPage, ProductPage, Footer, NotFoundPage,},
  data() {//гл состояние. Здесь посл истина.
    return {
      currentPage: 'main',//потом изменять на 'product' итд
      currentPageParams: {},//потом добавлять доп инф в виде обьекта
    };
  },
  computed: {//вычисляемые автоматом значения
    currentPageComponent(){//отбор имени страницы/компонента в зависимости от состояния.
      return routes[this.currentPage] || 'NotFoundPage';
    }
  },
  methods: {//перекл страниц
    gotoPage(pageName, pageParams){// gotoPage('product', {id:100})
      this.currentPage = pageName;// менять стр
      this.currentPageParams = pageParams || {};// менять парам стр
    },
  },
  created() {// componentDidMount. Слушает глоб шину события. Имя ивента и что делать.
    eventBus.$on('gotoPageFromItem', (pageName, pageParams)=>this.gotoPage(pageName, pageParams));//$on - метод ловли ивента из глоб шины. Сложно искать баги.
  },
};
</script>
