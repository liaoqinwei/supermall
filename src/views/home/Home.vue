<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        购物街
      </template>
    </nav-bar>

    <scroll class="scroll-content"
            ref="scrollContent"
            :probe-type="3"
            @contentScroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-carousel :banners="banners"></home-carousel>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>

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
        isShowBack: false
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
    methods: {
      /*
      * 事件监听相关的方法
      * */
      tabClick(index) {
        let goodsCategory = ['pop', 'new', 'sell']
        this.currType = goodsCategory[index]
      },
      backClick() {
        this.$refs.scrollContent.scrollTo(0, 0)
      },
      contentScroll(options) {
        let curTop = options.y
        this.isShowBack = curTop <= -1000
      },
      loadMore() {
        this.getHomeGoods(this.currType)
        setTimeout(()=> {
          this.$refs.scrollContent.finishPullUp()
        }, 2000)
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

  .tab-control {
    position: sticky;
    background: #fff;
    top: 44px;
  }

  .scroll-content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
