<template>
  <div class="cart-nav-bar">
    <nav-bar>
      <template v-slot:left>
        <img src="~assets/img/common/back-white.svg" class="back-img" @click="backClick">
      </template>
      <template v-slot:center>
        <span class="cart-title">购物车{{length}}</span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartNavBar",
    components: {
      NavBar
    },
    computed: {
      ...mapGetters({length: 'getProductCount'})
    },
    methods: {
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .cart-nav-bar {
    position: relative;
    background: var(--color-tint);
    z-index: 20;
  }

  .cart-title {
    color: #fff;
    font-weight: 700;
    font-size: 14px;
  }

  .back-img {
    position: relative;
    bottom: -5px;
  }
</style>
