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
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId" :color-id.sync="filterColorId"/>
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

  import ProductList from "./../components/ProductList.vue";
  import Header from './../components/Header.vue';
  import Footer from './../components/Footer.vue';
  import BasePagination from './../components/BasePagination.vue';
  import ProductFilter from "./../components/ProductFilter";
  import axios from "axios";
  import {API_BASE_URL} from "../config";
  import Loader from "./../components/Loader";

  export default {
    components: {
      ProductList,
      Header,
      BasePagination,
      Footer,
      ProductFilter,
      Loader,
    },
    data() {
      return {
        page: 1,
        productsPerPage: 4,
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterColorId: undefined,
        productsData: null,
        productsLoading: false,
        productsLoadingFailed: false,
      };
    },
    computed: {//не все товары а только часть, поэтому не просто стейт а компутед.
      products() {
        return this.productsData//тернарник тк при первом рендере пока не совершен запрос на сервер. Поэтому пока пустой массив.
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
      loadProducts(){//запрос на сервер с данными из стейта.
        this.productsLoading=true;
        this.productsLoadingFailed=false;
        clearTimeout(this.loadProductsTimer);//трюк. запросов будет не 3 (3 поля в фильтре изменились = 3 запроса) а всего 1 - последний. При кажд новом вызове отменяется предыдущий. В итоге остается только последний.
        this.loadProductsTimer = setTimeout(()=>{//продолжение трюка. Запишем таймаут в св-ва экземпляра(не стейта)(чтобы потом его очищать по имени, выше)
          axios.get(`${API_BASE_URL}/api/products`, {
            params:  {//апи просит эти параметры.
              categoryId: this.filterCategoryId,
              colorId: this.filterColorId,
              page: this.page,
              limit: this.productsPerPage,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            }
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
      filterPriceFrom(){//Слежка за стейтом.
        this.loadProducts();
      },
      filterPriceTo(){//Слежка за стейтом.
        this.loadProducts();
      },
      filterCategoryId(){//Слежка за стейтом.
        this.loadProducts();
      },
      filterColorId(){//Слежка за стейтом.
        this.loadProducts();
      },
    },
    created(){// componentDidMount. При рендере компонента Main сразу срабатывает метод 'загрузка итемов'
      this.loadProducts();
    }
  };
</script>
