<template>
  <BaseFormField :title="title" :error="error">
    <textarea class="form__input form__input--area" v-model="dataValue" :placeholder="placeholder"></textarea>
  </BaseFormField>
</template>

<script>

  import formFieldMixin from "../../mixins/formFieldMixin";

  export default {
    //повторяющийся код для форм вынесли в миксин. Рекурсивное смешивание с опциями компонента. Импорт шаблона и его использование.
    mixins: [formFieldMixin]
  };

</script>


