<template>
  <div class="cart-bottom-bar">
    <div class="check-all">
      <cart-check-btn :is-check="isCheckAll" @changeStatus="checkAll"/>
      <span>全选</span>
    </div>
    <div class="total-price">
      <span class="total-text">总计：</span>
      <span class="total-money">￥{{getTotalPrice}}</span>
      <button class="to-account">去结算<span class="check-piece">{{'('+getCheckProduct+'件)'}}</span></button>
    </div>
  </div>
</template>

<script>
  import CartCheckBtn from "./CartCheckBtn";

  import {mapGetters} from 'vuex';

  export default {
    name: "CartBottomBar",
    components: {
      CartCheckBtn
    },
    computed: {
      ...mapGetters(['getCheckProduct', 'getTotalPrice', 'isCheckAll'])
    },
    methods: {
      checkAll() {
        this.$store.commit('checkAllProduct')
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 49px;
    height: 44px;
    background: rgb(250, 250, 250);
  }

  .check-all {
    padding-top: 5px;
    padding-left: 10px;
    width: 100px;
  }

  .total-text {
    font-size: .28rem;
    font-weight: bold;
    color: #000;
    white-space: nowrap;
  }

  .total-price {
    flex: 1;
    max-width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-around;

  }

  .check-piece {
    font-size: 12px;
  }

  .total-price > span, total-price > button {
    display: block;
  }

  .total-money {
    color: red;
    font-weight: bold;
    font-size: .28rem;
  }

  .to-account {
    max-width: 110px;
    width: 100%;
    height: 40px;
    border: 0;
    border-radius: 18px;
    font-size: 14px;
    font-weight: bold;
    background: #f2270c;
    color: #fff;
  }
</style>
