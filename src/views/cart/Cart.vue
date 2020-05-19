<template>
  <div class="cart">
    <nav-bar class="cart-nav-bar">
      <template v-slot:left>
        <img src="~assets/img/common/back.svg" width="20" height="20px">

      </template>
      <template v-slot:center>
        <span class="cart-title">购物车</span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "Cart",
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .cart-nav-bar {
    background: var(--color-tint);
  }

  .cart-title {
    color: #fff;
    font-weight: 700;
    font-size: 14px;
  }
</style>
