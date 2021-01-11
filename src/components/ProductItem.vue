<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name:'product', params:{id:product.id}}">
<!--    <a class="catalog__pic" href="#" @click.prevent="gotoPageFromItem('product', {id: product.id})">-->
      <img :src="product.image" :alt="product.title" >
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{product.title}}
      </a>
    </h3>

    <span class="catalog__price">
      {{product.price | numberFormat}} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" value="color">
          <span :style="{ backgroundColor: `${color}` }" class="colors__value"></span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import gotoPageFromItem from "@/helpers/gotoPage";
import numberFormat from "../helpers/numberFormat";

export default {
  props: ['product'],
  methods: {
    gotoPageFromItem
  },
  filters: {// html -> {{product.price | numberFormat}} ₽ - значение слева передается аргументом в правую функцию. Фича Vue. Либо аналогом computed.
    numberFormat,
  },
};
</script>
