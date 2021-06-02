<template>
  <fieldset class="form__block">
    <legend class="form__legend">{{title}}</legend>
    <slot/><!-- = children-->
    <span class="form__error" v-if="error">{{error}}</span>
  </fieldset>
</template>

<script>

  export default {
    props:['title','error']
  };

</script>


