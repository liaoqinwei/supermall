<!--右边的所有内容，相当于是个盒子-->
<template>
  <div class="category-content">
    <div v-for="item in subCategory.list" class="cate-content-item">
      <img v-lazy="item.image">
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CategoryContent",
    props: {
      subCategory: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped>
  .category-content {
    padding-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    text-align: center;
  }

  .cate-content-item {
    display: inline;
    margin-top: 5px;
    width: 26%;
  }

  .cate-content-item > img {
    width: 100%;
  }

  .cate-content-item > p {
    margin-top: 10px;
    text-align: center;
  }
</style>
