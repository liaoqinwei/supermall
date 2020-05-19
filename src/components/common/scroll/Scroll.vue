<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  import {throttle} from "common/utils";

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null,
      }
    },
    computed: {
      // 节流封装发送事件
      /*throttleF(position) {
        return throttle((position) => {
          this.$emit('contentScroll', position)
        }, 50)
      }*/
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      // 1.创建一个BScroll
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 2.实时监听滚动
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('contentScroll', position)
        })
        // 通过节流，增加性能
        /*this.scroll.on('scroll', (position) => {
          this.throttleF(position)
        })*/
      }
      // 3.上拉加载更多
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(left, top, time = 300) {
        this.scroll && this.scroll.scrollTo(left, top, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp();
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll && this.scroll.y
      }
    }
  }
</script>

<style scoped>

</style>
