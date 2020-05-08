<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    mounted() {
      // 1.创建一个BScroll
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })
      // 2.实时监听滚动
      this.scroll.on('scroll', (position)=> {
        this.$emit('contentScroll',position)
      })
      // 3.上拉加载更多
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(left, top, time = 300) {
        this.scroll.scrollTo(left, top, time)
      },
      finishPullUp(){
        this.scroll.finishPullUp();
      }
    }
  }
</script>

<style scoped>

</style>
