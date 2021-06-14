<template>
  <fieldset class="form__block">
    <legend class="form__legend">{{title}}</legend>
    <slot/><!-- = children-->
    <span class="form__error" v-if="errorText">{{errorText}}</span>
  </fieldset>
</template>

<script>

  export default {
    props:['title','errorText']
  };

</script>


