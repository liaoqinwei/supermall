import Vue from 'vue'
import VueX from 'vuex'
import mutations from "./mutations";
import actions from "./actions";

// 1.安装插件
Vue.use(VueX)

const state = {
  cartList: []
}

// 2.创建store对象
const store = new VueX.Store({
  state,
  mutations,
  actions
})

// 3.封装Vue实例上
export default store
