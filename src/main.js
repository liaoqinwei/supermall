import Vue from 'vue'
import App from './App.vue'
import router from './router'
import responseSetting from "./common/responseSetting";

Vue.config.productionTip = false
responseSetting();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
