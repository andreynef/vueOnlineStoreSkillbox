<template>
  <BaseFormField :title="title" :error="error">
    <input class="form__input" v-model="dataValue" type="text" name="name" :placeholder="placeholder">
  </BaseFormField>
</template>

<script>

  import formFieldMixin from "../../mixins/formFieldMixin";

  export default {
    //повторяющийся код для форм вынесли в миксин. Рекурсивное смешивание с опциями компонента. Импорт шаблона и его использование.
    props: {//вариант пропсов в виде обьекта а не массива
      type: {
        default: 'text'//по умолчанию будет текст. У родителей уже не обязательно указывать, если это не что-то другое.
      }
    },
    mixins: [formFieldMixin]
  };

</script>


