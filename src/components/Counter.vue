<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click="updateAmount(currentAmount-1)"
    >&darr;</button>

    <input type="text" v-model.number="currentAmount">

    <button
      type="button"
      aria-label="Добавить один товар"
      @click="updateAmount(currentAmount+1)"
    >&uarr;</button>
  </div>
</template>

<script>

  export default {
    props:['amount'],//=':amount' на входе.
    methods: {
      updateAmount(value){
        if(value>=0){
          this.$emit(`update:amount`, value);
        }
      },
    },
    computed: {
      currentAmount: {//currentAmount тжсм проп amount но с доп возможностью его изменения (+.sync синхронизация)
        get(){
          return this.amount;//возвращ проп как обычн проп.
        },
        set(value){//изменить проп. Хей проп amount, я печатаю твое значение, измени себя.
          this.$emit('update:amount', value);//двунаправленная связь параметров (+ '.sync' снаружи (:likes.sync='headerLikes'), тжсм v-on:update:likes='headerLikes').
        }
      }
    },

  };
</script>
