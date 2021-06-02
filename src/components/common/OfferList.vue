<template>
    <ul class="sizes sizes--primery">
      <li class="sizes__item" v-for="item in offersArr" :key="item.id">
        <label class="sizes__label" v-for="subItem in item.propValues">
          <input class="sizes__radio sr-only" type="radio" name="sizes-item" v-model="computedOfferId" :value="item.id" >
          <span class="sizes__value">{{subItem.value}}</span>
        </label>
      </li>
    </ul>
</template>

<script>
  export default {
    props: {
      offersArr: Array,
      pickedOfferId: Number,
    },
    computed: {
      computedOfferId: {
        get() {
          return this.pickedOfferId
        },
        set(value) {
          this.$emit('update:pickedOfferId', value);
        }
      }
    },
  };
</script>
