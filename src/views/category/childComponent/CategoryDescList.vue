<template>

  <ul class="category-desc-list">
    <li v-for="(item,index) in categoryDesc.list" class="desc-list-item" :class="{active:currentIndex===index}"
        @click="cateClick(index)">
      {{item.title}}
    </li>
  </ul>
</template>

<script>
  export default {
    name: "CategoryDescList",
    props: {
      categoryDesc: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      cateClick(index) {
        this.currentIndex = index
        this.$emit('cateDescSwitch',this.categoryDesc.list[index].maitKey)
      }
    }
  }
</script>

<style scoped>
  .desc-list-item {
    text-align: center;
    height: .8rem;
    line-height: .8rem;
    background: #eee;
    color: #999;
  }

  .active {
    border-left: 3px solid var(--color-tint);
    background: #fff;
  }
</style>
