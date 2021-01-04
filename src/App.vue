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
        <Aside/>
        <section class="catalog">
          <!--   проброс параметров в пропсы через v-bind:-->
          <ProductList :products="products"/>
          <BasePagination v-model="page" :total-items="countProducts" :per-page="productsPerPage"/>
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
import BasePagination from './components/BasePagination.vue';
import Aside from "./components/Aside";

export default {
  name: 'App',
  components: {
    ProductList,
    Header,
    BasePagination,
    Footer,
    Aside,
  },
  data() {
    return {
      page: 1,
      productsPerPage: 4,
    };
  },
  computed: {//не все товары а только часть, поэтому не просто стейт а компутед.
    products() {
      const offset = (this.page - 1) * this.productsPerPage;//начальный индекс в списке отображения
      return products.slice(offset, offset + this.productsPerPage);//методом массива вырезать кусок из общ списка
    },
    countProducts() {
      return products.length;
    },
  },
};
</script>
