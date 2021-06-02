<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name:'product', params:{id:product.id}}">
<!--    <a class="catalog__pic" href="#" @click.prevent="gotoPageFromItem('product', {id: product.id})">-->
      <img :src="product.preview.file.url" :alt="product.title" >
    </router-link>

    <router-link :to="{name:'product', params:{id:product.id}}">
      <h3 class="catalog__title">
        <a href="#">
          {{product.title}}
        </a>
      </h3>
    </router-link>

    <span class="catalog__price">
      {{product.price | numberFormat}} ₽
    </span>
    <ColorList :colors-arr="computedColorList" :picked-color.sync="currentColor"/>
  </li>
</template>

<script>
// import gotoPageFromItem from "@/helpers/gotoPage";
import numberFormat from "../../helpers/numberFormat";
import ColorList from "../common/ColorList";

export default {
  props: ['product'],
  components: {ColorList},
  data() {
    return {
      currentColor: null,
    }
  },
  computed:{
    computedColorList(){
      return this.product.colors.map(item => item.color)
    }
  },
  filters: {// html -> {{product.price | numberFormat}} ₽ - значение слева передается аргументом в правую функцию. Фича Vue. Либо аналогом computed.
    numberFormat,
  },
  methods: {
    // gotoPageFromItem
  },
};
</script>
