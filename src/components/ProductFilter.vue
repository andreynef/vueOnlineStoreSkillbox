<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category" v-model.number="currentCategoryId">
            <option value="0">All categories</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">{{category.title}}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет ({{currentColorId || 'all'}})</legend>
        <ColorList :colors-arr="colors" :picked-color-id.sync="currentColorId"/>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>

  import axios from "axios";
  import {API_BASE_URL} from "../config";
  import ColorList from "./ColorList";

  export default {
  components: {ColorList},
  data() {//внутреннее состояние компонента Aside. Чтобы потом 1 кнопкой отправить действие на обновление осн стейта App.
    return {
      currentPriceFrom:0,
      currentPriceTo:0,
      currentCategoryId:0,
      currentColorId:null,
      categoriesData: null,
      colorsData:null,
    }
  },
  props:['priceFrom','priceTo', 'categoryId', 'color'],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items :[];//если есть в стейте(кот загр из серв) то показ, иначе пусто.
    },
    colors() {
      return this.colorsData;
    }
  },
  watch: {//можно сбрасывать стейт вручную в ресете, переназначая на 0, либо исп watch (слежка за пропсами)
    priceFrom(value){
      this.currentPriceFrom = value;
    },
    priceTo(value){
      this.currentPriceTo = value;
    },
    categoryId(value){
      this.currentCategoryId = value;
    },
    color(value){
      this.currentColorId = value;
    },
  },
  methods: {
    submit(){//при нажатии на Submit происходит команда на изменение вышестоящего стейта(чер пропсы), ватчер, смотрящий на стейт запускает метод loadProducts(запрос на сервер)
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorId', this.currentColorId);
    },
    reset(){
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:color', null);
      this.currentColor = null;
    },
    loadCategories(){//загрузка готовых категорий с сервера
      axios.get(`${API_BASE_URL}/api/productCategories`)
        .then(res => this.categoriesData = res.data)
    },
    loadColors(){//загрузка готовых цветов с сервера
      axios.get(`${API_BASE_URL}/api/colors`)
        .then(res => this.colorsData = res.data.items)
    },
  },
  created() {//при рендере блока, сразу вызывается загрузка категорий и цветов
    this.loadCategories();
    this.loadColors();
  }
  // currentPriceFrom: {//если менять список моментально и не ждать нажатия кнопки отправить то исп геттер и сеттер. А так юзаем стейт передачу 1 кнопкой сабмит.
  //   get(){
  //     return this.priceFrom
  //   },
  //   set(value){
  //     this.$emit('update:priceFrom', value)
  //   },
  // },
};
</script>
