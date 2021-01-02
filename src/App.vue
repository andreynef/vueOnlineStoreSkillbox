<template>
  <div>
    <Header/>
    <main class="content container">
      <div class="content__top content__top--catalog">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
        152 товара
      </span>
      </div>
      <div class="content__catalog">
        <section class="catalog">
          <!--   проброс параметров в пропсы через v-bind:-->
          <ProductList :products="products"/>
        </section>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import products from './data/products';

export default {
  name: 'App',
  components: {
    ProductList,
    Header,
    Footer,
  },
  data() {
    return {
      products,
    };
  },
};
</script>
