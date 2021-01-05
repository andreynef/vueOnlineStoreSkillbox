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
        <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId" :color.sync="filterColor"/>
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
import ProductFilter from "./components/ProductFilter";

export default {
  name: 'App',
  components: {
    ProductList,
    Header,
    BasePagination,
    Footer,
    ProductFilter,
  },
  data() {
    return {
      page: 1,
      productsPerPage: 4,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: undefined,
    };
  },
  computed: {//не все товары а только часть, поэтому не просто стейт а компутед.
    filteredProducts(){
      let filteredProducts = products;//изначально список равен всему списку. Далее его переназначение.
      if(this.filterPriceFrom > 0){
        filteredProducts = filteredProducts.filter(item=>item.price > this.filterPriceFrom);
      }
      if(this.filterPriceTo > 0){
        filteredProducts = filteredProducts.filter(item=>item.price < this.filterPriceTo);
      }
      if(this.filterCategoryId){
        filteredProducts = filteredProducts.filter(item=>item.categoryId === this.filterCategoryId);
      }
      if(this.filterColor){
        filteredProducts = filteredProducts.filter(item=>item.colors.includes(this.filterColor));
      }
      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;//начальный индекс в списке отображения
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);//методом массива вырезать кусок из общ списка
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>
