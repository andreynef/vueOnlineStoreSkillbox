<template>
  <div style='display:inline-block'>
    <button type='button' @click='incrementLike'> &#10084; {{likes}}</button>
  </div>
</template>

<script>

export default {
  // model: {//model нужен для инпутовских компонентов которые хотим изменять. Вместо v-bind:likes.sync='headerLikes' что сделано сейчас, будет через v-model, т.е. <span v-model='headerLikes'></span>
  //   prop: 'likes',//то что передастся дальше в props. По умолчанию 'value'.
  //   event: 'likes-change',//как будет называться ивент. (в $emit вместо 'update:likes' будет 'likes-change'). По умолчанию 'input'.
  // },
  props: ['likes'],//проброс пропсов типа <Component likes={likes}/>};
  methods: {
    incrementLike(){
      //$emit - запрос наверх. 1арг - назв пропса кот нужно изменить с приставкой update. 2арг - на что изменить.
      this.$emit('update:likes', this.likes + 1);//двунаправленная связь параметров (+ '.sync' снаружи (:likes.sync='headerLikes'), тжсм v-on:update:likes='headerLikes').
    },
  },
}
</script>
