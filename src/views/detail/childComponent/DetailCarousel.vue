<template>
  <carousel :elId="1" v-if="this.topImages" :interval="4000" :autoPlay="true" :iHeight="'5rem'">
    <carousel-item v-for="item in topImages">
      <img :src="item" width="100%">
    </carousel-item>
  </carousel>
</template>

<script>
  import {Carousel, CarouselItem} from "components/common/carousel";

  export default {
    name: "DetailCarousel",
    components: {
      Carousel,
      CarouselItem
    },
    props: {
      topImages: {
        type: Array,
        default: null
      }
    }
  }
</script>

<style scoped>

</style>
