<template>
  <ul class="cart-pro-list">
    <cart-pro-item v-for="item in proList" :product="item"/>
  </ul>
</template>

<script>
  import CartProItem from "./CartProItem";
  export default {
    name: "CarProList",
    components:{
      CartProItem
    },
    data(){
      return{
        proList:this.$store.getters.getProducts
      }
    }
  }
</script>

<style scoped>
  .cart-pro-list{
    padding-bottom: 20px;
  }
</style>
