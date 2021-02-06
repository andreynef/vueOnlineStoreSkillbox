import BaseFormField from "../components/common/BaseFormField";

export default {
  components: {BaseFormField},
  props:['title','error','placeholder','value'],//value это v-model родителя. Именуется "value" по умолчанию. (<BaseFormText v-model="formData.name")
  computed: {
    dataValue: {//двунаправленное вычисляемое св-во
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  }
};
