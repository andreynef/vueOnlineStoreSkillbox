<template>
  <ul class="catalog__list" >
    <ProductItem v-for="item in products" :product="item" :key="item.id"/>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products'],
};
</script>
