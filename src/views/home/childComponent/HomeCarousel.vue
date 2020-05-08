<template>
  <carousel :elId="1" v-if="this.banners" :autoPlay="true" :interval="3000">
    <carousel-item v-for="item in banners">
      <a :href="item.link" class="carousel-item-box">
        <img :src="item.image" :title="item.title" width="100%">
      </a>
    </carousel-item>
  </carousel>
</template>

<script>
  import {Carousel, CarouselItem} from "components/common/carousel/index"
  export default {
    name: "homeCarousel",
    components:{
      Carousel,
      CarouselItem
    },
    props:{
      banners:{
        type:Array
      }
    }
  }
</script>

<style scoped>

</style>
