import BaseFormField from "../components/common/BaseFormField";

export default {
  components: {BaseFormField},
  props:['title','error','placeholder','value'],//value это v-model родителя. Именуется "value" по умолчанию. (<BaseFormText v-model="formData.name")
  computed: {
    dataValue: {//двунаправленное вычисляемое св-во
      get() {
        // console.log('get', this.value)
        return this.value
      },
      set(value) {
        // console.log('set', value)
        this.$emit('input', value);
      }
    }
  }
};
