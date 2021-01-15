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
    <ColorList :colors-arr="product.colors" :picked-color.sync="currentColor"/>
  </li>
</template>

<script>
import numberFormat from "../helpers/numberFormat";
import ColorList from "./ColorList";
import gotoPageFromItem from "../helpers/gotoPage";

export default {
  components: {ColorList},
  props: ['product'],
  data(){//локальное состояние
    return {
      currentColor: undefined,
    }
  },
  methods: {
    gotoPageFromItem,
  },
  filters: {// html -> {{product.price | numberFormat}} ₽ - значение слева передается аргументом в правую функцию. Фича Vue. Либо аналогом computed.
    numberFormat,
  },
};
</script>
