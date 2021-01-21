<template>
  <ul class="colors">
    <li class="colors__item" v-for="item in colorsArr" :key="item.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" v-model="computedColorId" :value="item.id">
        <span :style='{ backgroundColor: `${item.code}` }' class="colors__value"/>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: {// Важно. Принимаем пропсы в стиле camelCase а пробрасываем/вызываем в стиле kebab-case. Vue автоматом сконвертит в camel. Ибо vue это html а там не исп camel.
    colorsArr: Array,//[{id:1, color:'red'},...]
    pickedColorId: Number,
  },
  computed: {
    computedColorId: {
      get() {
        return this.pickedColorId
      },
      set(value) {
        this.$emit('update:pickedColorId', value);
      }
    }
  }
};
</script>
