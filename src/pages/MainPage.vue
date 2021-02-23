<template>
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
      <ProductFilter v-bind.sync="filter"/><!--передача пропа как обьекта без предоставления его названия + sync-->
      <section class="catalog">
        <div style="margin: 0 auto">
          <Loader v-if="productsLoading"/>
          <div v-if="productsLoadingFailed">
            Network error
            <button @click.prevent="loadProducts">try again</button>
          </div>
        </div>
        <ProductList :products="products"/>
        <BasePagination v-model="page" :total-items="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>

  import ProductList from "../components/product/ProductList.vue";
  import Header from './../components/Header.vue';
  import Footer from './../components/Footer.vue';
  import BasePagination from '../components/common/BasePagination.vue';
  import ProductFilter from "../components/product/ProductFilter";
  import axios from "axios";
  import {API_BASE_URL} from "../config";
  import Loader from "../components/common/Loader";
  import {mapActions} from "vuex";

  export default {
    components: {
      ProductList,
      Header,
      BasePagination,
      Footer,
      ProductFilter,
      Loader,
    },
    data() {//локальн стейт
      return {
        page: 1,
        productsPerPage: 4,
        filter: {
          priceFrom: 0,
          priceTo: 0,
          categoryId: 0,
          colorId: null,
        },
        productsData: null,
        productsLoading: false,
        productsLoadingFailed: false,
      };
    },
    computed: {//не все товары а только часть, поэтому не просто стейт а компутед.
      products() {
        return this.productsData//тернарник тк при первом рендере пока не совершен запрос на сервер. Поэтому сначала пустой массив вместо списка товаров.
          ?this.productsData.items.map(item =>{//приходящ шаблон с сервера меняем на свой. (либо настроить структуру своего шаблона на серверный).
            return {
              ...item,
              image:item.image.file.url
            }
          })
          :[];
        // const offset = (this.page - 1) * this.productsPerPage;//начальный индекс в списке отображения
        // return this.filteredProducts.slice(offset, offset + this.productsPerPage);//методом массива вырезать кусок из общ списка
      },
      countProducts() {
        return this.productsData ? this.productsData.pagination.total : 0;//общее число товаров берем из загруженного с сервера обьекта с товарами.
      },
    },
    methods: {
      ...mapActions(['loadProductsAction', 'loadCart']),//передаем метод добавления товара стору чтобы он через аксиос послал запрос и записал в свой стор нов данные.
      loadProducts(){//запрос на сервер с данными из стейта.
        this.productsLoading=true;
        this.productsLoadingFailed=false;
        clearTimeout(this.loadProductsTimer);//трюк. запросов будет не 3 (3 поля в фильтре изменились = 3 запроса) а всего 1 - последний. При кажд новом вызове отменяется предыдущий. В итоге остается только последний.
        this.loadProductsTimer = setTimeout(()=>{//продолжение трюка. Запишем таймаут в св-ва экземпляра(не стейта)(чтобы потом его очищать по имени, выше)
          this.loadProductsAction({
            categoryId: this.filter.categoryId,
            colorId: this.filter.colorId,
            page: this.page,
            limit: this.productsPerPage,
            minPrice: this.filter.priceFrom,
            maxPrice: this.filter.priceTo,
          })
          .then(res => this.productsData = res.data)//при успехе записывать рез в стейт.
          .catch(()=>this.productsLoadingFailed=true)
          .then(()=>this.productsLoading=false);
        },0)
      },
    },
    watch: {//при люб пуке любого указанного значения-> перерендер
      page() {//Слежка за стейтом. При нажатии на пагинацию, меняется список товаров. Кажд раз новый запрос.
        this.loadProducts();
      },
      filter: {
        handler: function () {
          this.loadProducts()
        },
        deep: true
      },
    },
    created(){// componentDidMount. При рендере компонента Main сразу срабатывает метод 'загрузка итемов'
      this.loadProducts();
    }
  };
</script>
