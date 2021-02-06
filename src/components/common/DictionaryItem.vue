<template>
  <li class="dictionary__item">
    <span class="dictionary__key">{{left}}</span>
    <span class="dictionary__value">{{right}}</span>
  </li>
</template>

<script>
  export default {
    props:['left','right'],
  };
</script>


