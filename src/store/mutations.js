import {ADD_COUNT,ADD_PRODUCT} from "./mutation-type";

export default {
  [ADD_COUNT](state, payload) {
    payload.pro.count += payload.count
  },
  [ADD_PRODUCT](state, payload) {
    state.cartList.push(payload)
  }
}
