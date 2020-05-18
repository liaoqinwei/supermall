import {debounce} from "./utils";

export const itemListenerMixin = {
  data(){
    return{
      refresh:null
    }
  },
  mounted() {
    // 赋值防抖
    this.refresh = debounce(this.$refs.scroll.refresh, 200)

    //全局事件监听商品列表图片加载事件
    this.$bus.$on('itemImgDown', this.refresh)
  }
}
