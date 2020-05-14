<template>
    <nav-bar class="detail-nav-bar">
      <!--左边部分-->
      <template v-slot:left>
        <div>123</div>
      </template>
      <!--中间部分-->
      <template v-slot:center>
        <ul class="title-list">
          <li v-for="item in title" class="title-item">{{item}}</li>
        </ul>

      </template>
      <!--右边部分-->
    </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    data(){
      return {
        title:['商品','参数','评论','推荐']
      }
    },
    components:{
      NavBar
    }
  }
</script>

<style scoped>
  .title-list{
    display: flex;
  }
  .title-item{
    flex: 1;
  }
</style>
