<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>
<!--    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">-->
<!--      <BaseFilterField title="Цена:" label-class="form__label&#45;&#45;price">-->
<!--        <label class="form__label form__label&#45;&#45;price">-->
<!--          <input class="form__input" type="text" name="min-price" v-model.number="current.priceFrom">-->
<!--          <span class="form__value">От</span>-->
<!--        </label>-->
<!--        <label class="form__label form__label&#45;&#45;price">-->
<!--          <input class="form__input" type="text" name="max-price" v-model.number="current.priceTo">-->
<!--          <span class="form__value">До</span>-->
<!--        </label>-->
<!--      </BaseFilterField>-->
<!--      <BaseFilterField title="Категория:" :error="error.category">-->
<!--        <label class="form__label form__label&#45;&#45;select">-->
<!--          <select class="form__select" type="text" name="category" v-model.number="current.categoryId">-->
<!--            <option :value="category.id" v-for="category in computedCategories" :key="category.id">{{category.title}}</option>-->
<!--          </select>-->
<!--        </label>-->
<!--      </BaseFilterField>-->
<!--      <BaseFilterField title="Цвет:" :error="error.price">-->
<!--        <ColorList :colors-arr="computedColors" title="Цвет:" :picked-color-id.sync="current.colorId"/>-->
<!--      </BaseFilterField>-->
<!--      <BaseFilterField title="Объем в ГБ:" :error="error.memory">-->
<!--        list of gb-->
<!--      </BaseFilterField>-->

<!--      <button class="filter__submit button button&#45;&#45;primery" type="submit">-->
<!--        Применить-->
<!--      </button>-->
<!--      <button class="filter__reset button button&#45;&#45;second" type="button" @click.prevent="reset">-->
<!--        Сбросить-->
<!--      </button>-->
<!--    </form>-->
    <div style="height:600px">out of service</div>
  </aside>
</template>

<script>

  import axios from "axios";
  import {API_BASE_URL} from "../../config";
  import ColorList from "../common/ColorList";
  import BaseFilterField from "../common/BaseFilterField";

  export default {
  components: {BaseFilterField, ColorList},
  props:['categoryId', 'priceFrom', 'priceTo', 'colorId'],//родитель передает проп в виде обьекта filter c этими свойствами
  data() {
    return {
      current: {//внутреннее состояние компонента чтобы потом 1 кнопкой отправить действие на обновление род стейта MainPage.
        categoryId: null,
        priceFrom: null,
        priceTo: null,
        colorId: null,
      },
      categoriesData: null,//при загрузке компонента запрос и запись в стейт
      // categoriesDataExample: [{id: 2, title: "Ноутбуки", slug: "noutbuki"}, {...}],
      colorsData: null,//при загрузке компонента запрос и запись в стейт
      // colorsDataExample: [{id: 1, title: "Фиолетовый", code: "#a600ff"}, {...}],
      error:{
        category: null,
        memory: null,
        price: null,
      }
    }
  },
  computed: {
    computedCategories() {
      return this.categoriesData ? this.categoriesData :[];//если есть в стейте(кот загр из серв) то показ, иначе пусто.
    },
    computedColors() {
      return this.colorsData ? this.colorsData :[];
    }
  },
  // watch: {//можно сбрасывать стейт вручную в ресете, переназначая на 0, либо исп watch (слежка за пропсами)
  //   priceFrom(value){
  //     this.current.priceFrom = value;
  //   },
  //   priceTo(value){
  //     this.current.priceTo = value;
  //   },
  //   categoryId(value){
  //     this.current.categoryId = value;
  //   },
  //   colorId(value){
  //     this.current.colorId = value;
  //   },
  // },
  methods: {
    submit(){//команда на изменение вышестоящего стейта(чер пропсы), ватчер, смотрящий на тот стейт запускает метод loadProducts(запрос на сервер)
      this.$emit('update:categoryId', this.current.categoryId);
      this.$emit('update:priceFrom', this.current.priceFrom);
      this.$emit('update:priceTo', this.current.priceTo);
      this.$emit('update:colorId', this.current.colorId);
    },
    reset(){
      this.$emit('update:categoryId', null);
      this.$emit('update:priceFrom', null);
      this.$emit('update:priceTo', null);
      this.$emit('update:colorId', null);
    },
    loadCategories(){//загрузка готовых категорий с сервера и установка в локал стейт
      axios.get(API_BASE_URL+'/api/productCategories')
        .then(res => this.categoriesData = res.data.items)
    },
    loadColors(){//загрузка готовых цветов с сервера и установка в локал стейт
      axios.get(API_BASE_URL+'/api/colors')
        .then(res => this.colorsData = res.data.items)
    },
  },
  created() {//при рендере компонента, сразу вызывается загрузка категорий и цветов
    this.loadCategories();
    this.loadColors();
  }
  // currentPriceFrom: {//если менять список моментально и не ждать нажатия кнопки 'отправить' то исп геттер и сеттер. А так юзаем стейт передачу 1 кнопкой сабмит.
  //   get(){
  //     return this.priceFrom
  //   },
  //   set(value){
  //     this.$emit('update:priceFrom', value)
  //   },
  // },
};
</script>
