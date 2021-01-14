<template>
  <div style="width: 30%; margin: 0 auto 300px">
    <h1>Vue Module 4.1-4.2</h1>
    <span>
    <LikeButtons :likes.sync='headerLikes' :dislikes.sync='headerDislikes'/>
  </span>
    <h3>Total likes: {{countTotalLikes}}</h3>
    <h3>Total dislikes: {{countTotalDislikes}}</h3>
    <p v-if='count===2' style='color:orange; font-weight:bold'>Good! Almost done!</p>
    <p v-else-if='count===1' style='color:purple; font-weight:bold'>Great! 1 task left!</p>
    <p v-else-if='count===0' style='color:green; font-weight:bold'>Perfect! Now take a rest for future heroic deeds!</p>
    <p v-else>Tasks left: <span class="counter">{{count}}</span></p>
    <transition name='myTransition'>
      <img src="https://pbs.twimg.com/media/Dili0RGXUAICZgc.png" v-show='count===0' style='width:30%'/>
    </transition>
    <TaskList :tasks='uncompletedTasks' v-show='uncompletedTasks.length!==0'/>
    <form class="form" v-on:submit.prevent='addTask'>
      <input v-model='inputValue'>
      <button type="submit" v-bind:disabled='buttonDisabled' :title='buttonTitle'>add task</button>
      <LikeButtons :likes.sync='formLikes' :dislikes.sync='formDislikes'/>
    </form>
    <TaskList :tasks='completedTasks' v-show='completedTasks.length!==0' :title='"Completed tasks"'/>
  </div>
</template>

<script>
import TaskList from "./components/TaskList";
import LikeButtons from "./components/LikeButtons";

export default {
  components: {LikeButtons, TaskList},
  data() {
    return {
      headerLikes: 2,
      headerDislikes: 3,
      formLikes: 4,
      formDislikes: 5,
      inputValue: 'do smth good',
      buttonDisabled: false,
      buttonTitle: 'no doubts!',
      tasks: [
        {text: 'Poo this', done: true, likes: 12, dislikes: 100},
        {text: 'Poo that', done: true, likes: 7, dislikes: 101},
        {text: 'Poo there', done: false, likes: 33, dislikes: 102},
        {text: 'Poo here', done: false, likes: 18, dislikes: 103}
      ],
    }
  },
  methods: {//методы активного действия
    addTask() {
      console.log('adding task');
      this.tasks.push({text: this.inputValue, done: false, likes: 0, dislikes: 0});
      this.inputValue = "";
    },
  },
  computed: {//методы вычисляемые самостоятельно.
    count() {
      console.log('counting', this.tasks.filter(item => !item.done).length);
      return this.tasks.filter(item => !item.done).length;
    },
    completedTasks() {
      console.log('returning filtered compl list');
      return this.tasks.filter(item => item.done);
    },
    uncompletedTasks() {
      console.log('returning filtered uncompl list');
      return this.tasks.filter(item => !item.done);
    },
    countTotalLikes() {
      return this.headerLikes + this.formLikes + this.tasks.reduce((value, task) => value + task.likes, 0);
    },
    countTotalDislikes() {
      return this.headerDislikes + this.formDislikes + this.tasks.reduce((value, task) => value + task.dislikes, 0);
    },
  },
}
</script>

<style>
  .form {
    margin: 20px 0;
  }

  .myTransition-enter-active{
    animation: myAnimation 0.5s;
  }

  .myTransition-leave-active {
    animation: myAnimation 0.5s reverse;
  }
  @keyframes myAnimation {
    0% {
      transform: scale(0) rotate(180deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }
</style>


