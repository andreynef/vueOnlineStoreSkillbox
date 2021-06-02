import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// var cors = require('cors');
// app.use(cors());
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
