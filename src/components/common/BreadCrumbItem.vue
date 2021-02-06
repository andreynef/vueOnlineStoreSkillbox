<template>
  <li class="breadcrumbs__item">
    <router-link :to="to" class="breadcrumbs__link">
      {{text}}
    </router-link>
  </li>
</template>

<script>
  export default {
    props:['to','text'],
  };
</script>


