<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{countProducts}} товара
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
        productsPerPage: 12,
        filter: {
          priceFrom: null,
          priceTo: null,
          categoryId: null,
          colorId: null,
        },
        productsLoading: false,
        productsLoadingFailed: false,
        memoryList:[],
        productsData: null,
        productsDataExample: [
          {
            id: 4,
            title: "Смартфон Xiaomi Mi A3",
            slug: "smartfon-xiaomi-mi-a3",
            price: 14960,
            colors: [
              {
                id: 4,
                color: {
                  id: 4,
                  title: "Чёрный",
                  code: "#000000"
                }
              },
              {
                id: 5,
                color: {
                  id: 7,
                  title: "Серый",
                  code: "#939393"
                }
              }
            ],
            preview: {
              file: {
                url: "https://vue-tzr.skillbox.cc/uploads/file/3/3/4/334f1af6e338ff856a10ab88b2e41ded.png",
                name: "334f1af6e338ff856a10ab88b2e41ded.png",
                originalName: "f71ff8d2c252cf17dac0768c8dd33b78.png",
                extension: "png",
                size: "218.9 Кб"
              }
            },
            mainProp: {
              id: 6,
              title: "Встроенная память",
              code: "built_in_memory"
            },
            offers: [
              {
                id: 7,
                title: "Смартфон Mi A3 4/64GB Android One",
                price: 14960,
                propValues: [
                  {
                    value: "64GB",
                    productProp: {
                      id: 6,
                      title: "Встроенная память",
                      code: "built_in_memory"
                    }
                  }
                ]
              },
              {
                id: 8,
                title: "Смартфон Mi A3 4/128GB Android One",
                price: 16960,
                propValues: [
                  {
                    value: "128GB",
                    productProp: {
                      id: 6,
                      title: "Встроенная память",
                      code: "built_in_memory"
                    }
                  }
                ]
              }
            ]
          },
          // {...}
        ],
      };
    },
    computed: {//не все товары а только часть, поэтому не просто стейт а компутед.
      products() {
        return this.productsData ? this.productsData.items : [];
      },
      countProducts() {
        return this.productsData ? this.productsData.pagination.total : 0;//общее число товаров берем из лок стейта productsData (загруженного с сервера при created) обьекта с товарами.
      },
    },
    methods: {
      ...mapActions(['loadProductsAction', 'loadCart']),//передаем метод добавления товара стору чтобы он через аксиос послал запрос и записал в свой стор нов данные.
      loadProducts(){//запрос на сервер с данными из стейта.
        this.productsLoading=true;
        this.productsLoadingFailed=false;
        clearTimeout(this.loadProductsTimer);//трюк. запросов будет не 3 (3 поля в фильтре изменились = 3 запроса) а всего 1 - последний. При кажд новом вызове отменяется предыдущий. В итоге остается только последний.
        this.loadProductsTimer = setTimeout(()=>{//продолжение трюка. Запишем таймаут в св-ва экземпляра(не стейта)(чтобы потом его очищать по имени, выше)
          console.log('loadProductsAction:', this.filter)
          this.loadProductsAction({
            categoryId: this.filter.categoryId,
            colorId: this.filter.colorId,
            minPrice: this.filter.priceFrom,
            maxPrice: this.filter.priceTo,
            page: this.page,
            limit: this.productsPerPage,
          })
          .then(res => this.productsData = res.data)//при успехе записывать рез в стейт.
          .catch((error)=>this.productsLoadingFailed=true)
          .then(()=>this.productsLoading=false);
        },0)
      },
    },
    watch: {//при люб пуке любого указанного значения-> перерендер
      page() {//При изменении стр, меняется page = новый запрос.
        this.loadProducts();
      },
      filter: {//При изменении знач фильтра (глубокий = весь обьект) = новый запрос.
        handler: function () {
          this.loadProducts()
        },
        deep: true
      },
    },
    created(){// componentDidMount.
      this.loadProducts();
    }
  };
</script>
<!--computed: {//не все товары а только часть, поэтому не просто стейт а компутед.-->
<!--products() {-->
<!--return this.productsData//тернарник тк при первом рендере пока не совершен запрос на сервер. Поэтому сначала пустой массив вместо списка товаров.-->
<!--?this.productsData.items.map(item =>{//приходящ шаблон с сервера меняем на свой. (либо настроить структуру своего шаблона на серверный).-->
<!--return {-->
<!--...item,-->
<!--image:item.preview.file.url-->
<!--}-->
<!--})-->
<!--:[];-->
<!--// const offset = (this.page - 1) * this.productsPerPage;//начальный индекс в списке отображения-->
<!--// return this.filteredProducts.slice(offset, offset + this.productsPerPage);//методом массива вырезать кусок из общ списка-->
<!--},-->
<!--countProducts() {-->
<!--return this.productsData ? this.productsData.pagination.total : 0;//общее число товаров берем из лок стейта productsData (загруженного с сервера при created) обьекта с товарами.-->
<!--},-->
<!--},-->
