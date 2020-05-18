<template>
  <div id="detail">
    <!--导航-->
    <detail-nav-bar :titles="['商品', '参数', '评论', '推荐']" class="detail-nav-bar"></detail-nav-bar>

    <scroll class="content"
            ref="scroll"
            :probeType="3"
            :pullUpLoad="true"
            @contentScroll="observedScroll">
      <!--轮播图-->
      <detail-carousel :topImages="topImages"></detail-carousel>
      <!--商品的基础信息-->
      <detail-base-info :goods="goods"/>
      <!--店铺的信息展示-->
      <detail-shop-info :shop="shop"/>
      <!--商品详细信息（图片）-->
      <detail-goods-info :detailInfo="detailInfo" @detailImgLoad="detailImgLoad"/>
      <!--商品的尺码参数-->
      <detail-desc-info :itemParams="itemParams"/>
      <!--评论信息-->
      <detail-comment-info :commentInfo="commentInfo"/>
      <!--商品推荐信息展示-->
      <goods-list :goods="recommendInfo"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBack"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComponent/DetailNavBar";
  import DetailCarousel from "./childComponent/DetailCarousel";
  import DetailBaseInfo from "./childComponent/DetailBaseInfo";
  import DetailShopInfo from "./childComponent/DetailShopInfo";
  import DetailGoodsInfo from "./childComponent/DetailGoodsInfo";
  import DetailDescInfo from "./childComponent/DetailDescInfo";
  import DetailCommentInfo from "./childComponent/DetailCommentInfo";

  import {getDetail, getRecommend, GoodsInfo, Shop, GoodsPram, CommentInfo} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin} from "common/mixin";

  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";
  import GoodsList from "components/content/goods/GoodsList";
  import GoodsListItem from "components/content/goods/GoodsListItem";

  export default {
    name: "Detail",
    components: {
      DetailDescInfo,
      DetailShopInfo,
      DetailNavBar,
      DetailCarousel,
      DetailBaseInfo,
      DetailGoodsInfo,
      DetailCommentInfo,
      GoodsList,
      GoodsListItem,

      Scroll,
      BackTop
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        iid: null,
        topImages: null,
        goods: {},
        shop: {},
        detailInfo: {},
        refresh: null,
        itemParams: {},
        isShowBack: false,
        commentInfo: {},
        recommendInfo: [],
      }
    },
    created() {
      // 1.保存商品的iid
      this.iid = this.$route.params.iid && this.$route.params.iid

      // 2.根据iid请求详情页的数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的轮播数据
        let data = res.result
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.获取店铺数据
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品详情信息
        this.detailInfo = data.detailInfo

        // 5.保存商品的尺寸信息
        this.itemParams = new GoodsPram(data.itemParams.info, data.itemParams.rule);

        // 6.保存评论信息
        if (data.rate.cRate != 0) {
          this.commentInfo = new CommentInfo(data.rate)
        }
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommendInfo = res.data.list
      })
    },
    mounted() {
    },
    methods: {
      /*监听事件*/
      detailImgLoad() {
        // 详情页图片加载完成
        this.refresh()
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      observedScroll(position) {
        let scrollY = position.y
        this.isShowBack = scrollY < -1000
      },
    },
    destroyed() {
      this.$bus.$off('itemImgDown', this.refresh)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 100;
    height: 100%;
    background: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

</style>
