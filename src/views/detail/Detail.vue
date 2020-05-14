<template>
  <div id="detail">
    <!--导航-->
    <detail-nav-bar :titles="['商品', '参数', '评论', '推荐']"></detail-nav-bar>
    <detail-carousel :topImages="topImages"></detail-carousel>
  </div>
</template>

<script>
  import DetailNavBar from "./childComponent/DetailNavBar";
  import DetailCarousel from "./childComponent/DetailCarousel";

  import {getDetail} from "network/detail";



  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailCarousel
    },
    data() {
      return {
        iid: null,
        topImages:null
      }
    },
    created() {
      // 1.保存商品的iid
      this.iid = this.$route.params.iid && this.$route.params.iid

      // 2.根据iid请求详情页的数据
      getDetail(this.iid).then(res=>{
        // 1.获取顶部的轮播数据
        this.topImages = res.result.itemInfo.topImages
      })
    }
  }


</script>

<style scoped>

</style>
