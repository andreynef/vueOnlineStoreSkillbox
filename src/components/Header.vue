<template>
  <header class="header">
    <div class="header__wrapper container">
      <span class="header__info myClass" @click.prevent="gotoPageFromItem('jhjdhf')">Go to "jhfdff" page</span>

      <a class="header__logo" href="#">
        <img src="img/svg/logo-tech.svg" alt="Лого Технозавррр" width="190" height="33">
      </a>

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>

      <a class="header__cart" href="cart.html" aria-label="Корзина с товарами">
        <svg width="30" height="21" fill="currentColor">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" aria-label="Количество товаров">3</span>
      </a>
    </div>
  </header>
</template>

<script>
  import gotoPageFromItem from '../helpers/gotoPage';

  export default {
    methods: {
      gotoPageFromItem
    },

  };
</script>

<style>
  .myClass {
    color: red;
  }
  .myClass:hover {
    cursor: pointer;
    border: 1px solid red;
  }
</style>
