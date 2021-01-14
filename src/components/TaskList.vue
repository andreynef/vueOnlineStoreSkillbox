<template>
  <section>
    <h2>{{title}}</h2>
    <ul class="list" style='list-style:none'>
      <li class="item" :class='{done: task.done}' v-for='task in tasks' :key='task.text' style='display:inline-block'>
        <input type="checkbox" v-model='task.done' style='display:inline-block'>
        {{task.text}}
        <LikeButtons :likes.sync='task.likes'/>
      </li>
    </ul>
  </section>
</template>

<script>

import LikeButtons from "./LikeButtons";
export default {
  components: {LikeButtons},
  props: ['tasks','title'],//проброс пропсов типа <Component tasks={tasks} title={title}/>
};
</script>

<style>
  .list {
    padding: 20px;
    border: 1px solid #ccc;
    margin: 20px 0;
  }
  .item {
    margin: 10px 0;
  }
  .done {
    text-decoration: line-through;
  }
</style>
