<template>
  <div class="cart">
    <cart-nav-bar/>
    <scroll class="scroll-content" ref="scroll">
      <cart-pro-list/>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import CartNavBar from "./childComponent/CartNavBar";
  import CartProList from "./childComponent/CartProList";
  import CartBottomBar from "./childComponent/CartBottomBar";

  export default {
    name: "Cart",
    components: {
      CartNavBar,
      CartProList,
      CartBottomBar,

      Scroll
    },
    // 进来的时候刷新scroll
    activated() {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cart {
    position: relative;
    overflow: hidden;
    height: 100%;
    background: #faf1ff;
  }

  .scroll-content {
    position: absolute;
    top: 44px;
    bottom: calc(49px + 44px);
    left: 0;
    right: 0;
  }
</style>
