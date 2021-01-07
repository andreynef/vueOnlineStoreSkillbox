<template>
  <ul class="catalog__list">
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      @gotoPageFromItem="(pageName, pageParams) => $emit('gotoPageFromItem',pageName, pageParams)"/>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products'],
};
</script>
