<template>
  <div  class="cate-nav-bar">
    <nav-bar>
      <template v-slot:center>
        分类
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "CategoryNavBar",
    components:{
      NavBar
    }
  }
</script>

<style scoped>
  .cate-nav-bar{
    background: var(--color-tint);
    color: #fff;
    font-size: 14px;
  }
</style>
