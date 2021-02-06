<template>
  <label class="form__label">
    <slot/><!-- = children. Все что передано внутри родительского тэга. Динамическое место-->
    <span class="form__value">{{title}}</span>
    <span class="form__error" v-if="error">{{error}}</span>
  </label>
</template>

<script>

  export default {
    props:['title','error']
  };

</script>


