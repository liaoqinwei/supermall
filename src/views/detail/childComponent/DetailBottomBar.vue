<template>
  <div class="detail-bottom-bar">
    <!--左边的三个图标-->
    <div class="bar-left">
      <div class="bar-left-item">
        <i class="iconfont icon-kefu"></i>
        <span>客户</span>
      </div>
      <div class="bar-left-item">
        <i class="iconfont icon-dianpu"></i>
        <span>店铺</span>
      </div>
      <div class="bar-left-item">
        <i class="iconfont icon-shoucang"></i>
        <span>收藏</span>
      </div>
    </div>
    <!--右边的按钮-->
    <div class="bar-right">
      <button>加入购物车</button>
      <button>购买</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar"
  }
</script>

<style scoped>
  @import "~assets/css/dbiconfont.css";

  .detail-bottom-bar {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 55px;
    background: #fff;
  }

  .bar-right, .bar-left {
    display: flex;
    flex: 1;
  }

  .bar-left-item {
    flex: 1;
    text-align: center;
  }

  .bar-left-item > i {
    display: block;
  }

  .bar-right {
    justify-content: space-around;
  }

  .bar-right > button {
    display: block;
    height: 30px;
    width: 48%;
    border: 0;
    border-radius: 15px;
    color: #fff;
    font-weight: bold;
  }
  .bar-right > button:nth-of-type(1){
    background: linear-gradient(135deg,#f2140c,#f2270c 70%,#f24d0c);
  }
  .bar-right > button:nth-of-type(2){
    background: linear-gradient(135deg,#ffba0d,#ffc30d 69%,#ffcf0d);
  }
</style>
