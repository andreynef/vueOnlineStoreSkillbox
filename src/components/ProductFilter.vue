<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтрыdsdsd</h2>

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
            <option value="category.id" v-for="category in categories" :key="category.id">{{category.title}}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет ({{currentColor || 'all'}})</legend>
        <ColorList :colors-arr="colors" :picked-color.sync="currentColor"/>
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

  import categories from "../data/categories";
  import colors from "../data/colors";
  import ColorList from "./ColorList";

export default {
  components: {ColorList},
  data() {//внутреннее состояние компонента Aside. Чтобы потом 1 кнопкой отправить действие на обновление осн стейта App.
    return {
      currentPriceFrom:0,
      currentPriceTo:0,
      currentCategoryId:0,
      currentColor:undefined,
    }
  },
  props:['priceFrom','priceTo', 'categoryId', 'color'],
  computed: {
    categories() {
      return categories;
    },
    colors() {//импортируем весь теоретический список возможных цветов из 'стора' и передаем дальше как вычисляемое значение. Напрямик с импорта нельзя.
      return colors;
    },
  },
  watch: {//исп watch (слежка за пропсами). Проп меняется - то и выполняется.
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
      this.currentColor = value;
    },
  },
  methods: {
    submit(){
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:color', this.currentColor);
    },
    reset(){
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:color', undefined);
      this.currentColor = undefined;
    },
  },
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
