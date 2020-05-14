<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        购物街
      </template>
    </nav-bar>

    <tab-control
      class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"></tab-control>

    <scroll class="scroll-content"
            ref="scrollContent"
            :probe-type="3"
            @contentScroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-carousel :banners="banners" @swiperImageLoad="swiperImageLoad"></home-carousel>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"></tab-control>

      <goods-list :goods="goods[currType].list"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
  import HomeCarousel from "./childComponent/HomeCarousel";
  import RecommendView from "./childComponent/RecommendView";
  import FeatureView from "./childComponent/FeatureView";


  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultiData, getHomeGoods} from "network/home";
  import {debounce} from "common/utils";

  export default {
    name: "Home",
    components: {
      HomeCarousel,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: null,
        recommends: null,
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currType: 'pop',
        isShowBack: false,
        tabOffsetTop: 0,
        isTabFixed: false
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultiData()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // 1.图片加载完成的事件监听
      const refresh = debounce(this.$refs.scrollContent.refresh, 100)
      this.$bus.$on('itemImgDown', () => {
        refresh()
      });
    },
    methods: {
      /*
      * 事件监听相关的方法
      * */
      tabClick(index) {
        let goodsCategory = ['pop', 'new', 'sell']
        this.currType = goodsCategory[index]

        this.$refs.tabControl1.currIndex = index
        this.$refs.tabControl2.currIndex = index
      },
      backClick() {
        this.$refs.scrollContent.scrollTo(0, 0)
      },
      contentScroll(position) {
        // 1.判断backTop是否显示
        let curTop = position.y
        this.isShowBack = curTop <= -1000

        // 2.决定tabContraol是否吸顶(position:fixed)
        this.isTabFixed = curTop <= -this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currType)
        setTimeout(() => {
          this.$refs.scrollContent.finishPullUp()
        }, 2000)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /*
      * 网络请求相关的方法
      * */
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        let page = ++this.goods[type].page
        getHomeGoods(type, page).then(res => {
          let curGoods = this.goods[type]
          /*方法一：通过apply方法
          curGoods.list.push.apply(curGoods.list, res.data.list);
          方法二：通过扩展运算符es6*/
          curGoods.list.push(...res.data.list)
        })
      },
    },
    activated() {
      if (this.saveY) {
        this.$refs.scrollContent.refresh()
        this.$refs.scrollContent.scrollTo(0, this.saveY, 0)
        this.$refs.scrollContent.refresh()
      }
    },
    deactivated() {
      // 1.离开的时候记录一下滚动的值
      this.saveY = this.$refs.scrollContent.getScrollY()
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background: var(--color-tint);
    color: #fff;
    font-weight: 500;
  }

  .scroll-content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .tab-control {
    position: relative;
    background: #fff;
    z-index: 1000;
  }

</style>
