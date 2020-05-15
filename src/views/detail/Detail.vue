<template>
  <div id="detail">
    <!--导航-->
    <detail-nav-bar :titles="['商品', '参数', '评论', '推荐']"></detail-nav-bar>
    <detail-carousel :topImages="topImages"></detail-carousel>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
  import DetailNavBar from "./childComponent/DetailNavBar";
  import DetailCarousel from "./childComponent/DetailCarousel";
  import DetailBaseInfo from "./childComponent/DetailBaseInfo";

  import {getDetail,GoodsInfo} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailCarousel,
      DetailBaseInfo
    },
    data() {
      return {
        iid: null,
        topImages:null,
        goods:{}
      }
    },
    created() {
      // 1.保存商品的iid
      this.iid = this.$route.params.iid && this.$route.params.iid

      // 2.根据iid请求详情页的数据
      getDetail(this.iid).then(res=>{
        // 1.获取顶部的轮播数据
        let data = res.result
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
      })
    }
  }


</script>

<style scoped>

</style>
