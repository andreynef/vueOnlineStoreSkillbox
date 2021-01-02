import Vue from 'vue';
import App from './App.vue';
import { customString1, customString2 } from './newFileDZ3.2strings';
import toAlert from './newFileDZ3.2alert';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

toAlert(customString1);
toAlert(customString2);
