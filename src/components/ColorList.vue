<template>
  <ul class="colors">
    <li class="colors__item" v-for="item in colorsArr" :key="item.id" @click="clickColor(item.color)">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color" :checked="computedColor">
        <span :style='{ backgroundColor: `${item.color}` }' class="colors__value"/>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['colorsArr', 'currentColor'], // Важно. Принимаем пропсы в стиле camelCase а пробрасываем/вызываем в стиле kebab-case. Vue автоматом сконвертит в camel. Ибо vue это html а там не исп camel.
  methods: {
    clickColor(clickedColor) {
      this.$emit('update:currentColor', clickedColor);
    },
  },
  computed: {
    computedColor: {
      get() {
        return this.currentColor
      },
      set(value) {
        this.$emit('update:currentColor', value);
      }
    }
  }
};
</script>
