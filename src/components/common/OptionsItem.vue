<template>
  <li class="options__item">
    <label class="options__label">
      <input class="options__radio sr-only" v-model="computedValue" type="radio" :value="value">
      <span class="options__value">
        <slot/>
      </span>
    </label>
  </li>
</template>

<script>
  export default {
    props:['picked','value'],//value это v-model родителя. Именуется "value" по умолчанию. (<BaseFormText v-model="formData.name")
    computed:{
      computedValue: {//двунаправленное вычисляемое св-во
        get() {
          return this.picked
        },
        set(value) {
          // console.log('set', value)
          this.$emit('update:picked', value);
        }
      }
    },
  };
</script>


