<template>
  <li class="options__item">
    <label class="options__label">
      <input class="options__radio sr-only" v-model="dataValue" :type="type" :name="name">
      <span class="options__value">
        <slot/>
      </span>
    </label>
  </li>
</template>

<script>
  import formFieldMixin from "../../mixins/formFieldMixin";

  export default {
    props:['type','name'],//value это v-model родителя. Именуется "value" по умолчанию. (<BaseFormText v-model="formData.name")
    mixins: [formFieldMixin]
  };
</script>


