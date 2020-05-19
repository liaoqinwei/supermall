import Vue from 'vue'
import App from './App.vue'
import router from './router'
import responseSetting from "./common/responseSetting";
import store from "./store";

Vue.config.productionTip = false
responseSetting();

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
