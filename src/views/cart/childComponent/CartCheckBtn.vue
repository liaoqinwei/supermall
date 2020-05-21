<template>
  <div class="cart-check-btn" :class="{'check-pro':isCheck}" @click="changeStatus">
    <i class="iconfont icon-gou" v-if="isCheck"></i>
  </div>
</template>

<script>
  export default {
    name: "CartCheckBtn",
    props: {
      isCheck: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      changeStatus() {
        this.$emit('changeStatus')
      }
    }

  }
</script>

<style scoped>
  @import '~assets/css/carticonfont.css';

  .cart-check-btn {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px #eee solid;
  }

  .cart-check-btn > i {
    font-size: 12px;
    color: #fff;
  }

  .check-pro {
    background: red;
  }
</style>
