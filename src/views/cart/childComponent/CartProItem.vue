<template>
  <li class="cart-pro-item">
    <!--左边的按钮-->
    <div class="cart-item-left">
      <cart-check-btn :is-check="product.isCheck" @changeStatus="changeProStatus"/>
    </div>
    <!--右边的信息-->
    <div class="cart-item-right">
      <!--店铺名字-->
      <h3 class="shop-name">{{product.shopName}}</h3>
      <div class="pro-message-box">
        <!--商品图的展示-->
        <div class="pro-img-box"><img :src="product.image"></div>
        <!--商品信息的容器-->
        <div class="pro-info-box">
          <p class="pro-title">{{product.title}}</p>
          <span class="total-price">{{computedTotalPrice}}</span>
          <!--计数和按钮-->
          <div class="counter-box clearfix">
            <button class="decrement" @click="proCountDecrement">-</button>
            <span class="pro-count">{{product.count}}</span>
            <button class="increment" @click="proCountIncrement">+</button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
  import CartCheckBtn from "./CartCheckBtn";


  export default {
    name: "CartProItem",
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      CartCheckBtn
    },
    computed: {
      computedTotalPrice() {
        return this.product.count * this.product.realPrice
      }
    },
    methods: {
      // 增减商品的事件
      proCountIncrement() {
        this.$store.commit('proCountIncrement', this.product.iid)
      },
      proCountDecrement() {
        this.$store.commit('proCountDecrement', this.product.iid)
      },
      // 改变选中状态
      changeProStatus() {
        this.$store.commit('changeProStatus', this.product.iid)
      }
    }
  }
</script>

<style scoped>
  .cart-pro-item {
    display: flex;
    margin-top: 15px;
    padding: 15px 10px 15px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    background: #fff;
  }

  .cart-item-right {
    padding-left: 13px;
  }

  .shop-name {
    margin-bottom: 8px;
    font-size: 15px;
    font-weight: 600;
    color: #000;
  }

  .pro-message-box {
    display: flex;
  }

  .pro-title {
    height: 33px;
    font-size: 14px;
    margin-bottom: 20px;
    /*实现两行省略*/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .pro-img-box {
    overflow: hidden;
    flex-shrink: 0;
    width: 90px;
    height: 80px;
  }

  .pro-img-box > img {
    width: 80px;
  }

  .total-price {
    color: lightcoral;
    font-size: 15px;
  }

  .counter-box {
    display: inline-block;
    float: right;
  }

  .decrement, .increment {
    display: inline-block;
    border: 0;
    outline: 0;
    width: 20px;
    height: 20px;
    background: #f7f7f7;
  }

  .pro-count {
    display: inline-block;
    text-align: center;
    position: relative;
    bottom: 3px;
    margin: 0 1px;
    width: 30px;
    height: 20px;
    background: #f7f7f7;
  }

  .cart-item-left {
    padding-top: 40px;
    width: 30px;
  }
</style>
