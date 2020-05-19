<template>
  <div id="detail">
    <!--导航-->
    <detail-nav-bar
      :titles="['商品', '参数', '评论', '推荐']" class="detail-nav-bar"
      @titleClick="titleClick"
      ref="nav"></detail-nav-bar>

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
      <detail-desc-info :itemParams="itemParams" ref="params"/>
      <!--评论信息-->
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <!--商品推荐信息展示-->
      <goods-list :goods="recommendInfo" ref="recommend"/>
    </scroll>

    <detail-bottom-bar/>
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
  import DetailBottomBar from "./childComponent/DetailBottomBar";

  import {getDetail, getRecommend, GoodsInfo, Shop, GoodsPram, CommentInfo} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin,backTopMixin} from "common/mixin";

  import Scroll from "components/common/scroll/Scroll";
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
      DetailBottomBar,
      GoodsList,
      GoodsListItem,

      Scroll,
    },
    mixins: [itemListenerMixin,backTopMixin],
    data() {
      return {
        iid: null,
        topImages: null,
        goods: {},
        shop: {},
        detailInfo: {},
        itemParams: {},
        commentInfo: {},
        recommendInfo: [],
        themeTopYs: [],
        themeTopYsFn: null
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

        // 7.当页面渲染完成保存themeTopYs数据(方法不可行)
        /*this.$nextTick(() => {
          this.themeTopYs = []

          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          console.dir(this.$refs.recommend);
          console.log(this.$refs.recommend.$el);
          console.log(this.themeTopYs);
        })*/
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommendInfo = res.data.list
      })

      // 给themeTopYs绑定防抖
      this.themeTopYsFn = debounce(() => {
        // 保存四个组件的offsetTop值
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)
      }, 100)
    },
    methods: {
      /*监听事件*/
      detailImgLoad() {
        // 详情页图片加载完成(这个是通过混入绑定的)
        this.refresh()
        // 计算top值
        this.themeTopYsFn()
      },
      observedScroll(position) {
        let scrollY = position.y
        // 控制显示back按钮
        this.isShowBack = scrollY < -1000
        // 控制nav-bar的显示
        let len = this.themeTopYs.length
        for (let index of this.themeTopYs.keys()) {
          // 如果scrollY已经大于了最后一个值 就直接赋值给currindex 然后break
          if (scrollY < this.themeTopYs[len - 1]) {
            this.$refs.nav.currIndex = len - 1
            break
          } else if (scrollY < this.themeTopYs[index] && scrollY > this.themeTopYs[index + 1]) {
            // 判断scrollY的位置属于哪个阶级
            this.$refs.nav.currIndex = index
            break
          }
        }
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 200)
      }
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
    bottom: 55px;
    overflow: hidden;
  }

</style>
