<template>
  <ul class="colors">
    <li class="colors__item" v-for="item in colorsArr" :key="item.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" v-model="computedColor" :value="item.color">
        <span :style='{ backgroundColor: `${item.color}` }' class="colors__value"/>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: {// Важно. Принимаем пропсы в стиле camelCase а пробрасываем/вызываем в стиле kebab-case. Vue автоматом сконвертит в camel. Ибо vue это html а там не исп camel.
    colorsArr: Array,//[{id:1, color:'red'},...]
    pickedColor: String,//'red'
  },
  computed: {
    computedColor: {
      get() {
        return this.pickedColor
      },
      set(value) {
        this.$emit('update:pickedColor', value);
      }
    }
  }
};
</script>
