<template>
  <div id="category">
    <category-nav-bar/>
    <div class="category-core">
      <scroll class="list-box">
        <Category-desc-list :categoryDesc="categoryDesc" class="list" @cateDescSwitch="cateDescSwitch"/>
      </scroll>
      <scroll class="content-box">
        <category-content class="content" :subCategory="subCategory"/>
      </scroll>
    </div>

  </div>
</template>

<script>
  import CategoryNavBar from "./childComponent/CategoryNavBar";
  import CategoryDescList from "./childComponent/CategoryDescList";
  import CategoryContent from "./childComponent/CategoryContent";

  import Scroll from "components/common/scroll/Scroll";


  import {getCategory, getSubCategory} from "network/category";

  export default {
    name: "Category",
    components: {
      CategoryNavBar,
      CategoryDescList,
      CategoryContent,

      Scroll,
    },
    data() {
      return {
        categoryDesc: {},
        subCategory: {}
      }
    },
    created() {
      /*获取分类栏的数据*/
      getCategory().then(res => {
        this.categoryDesc = res.data.category
        return getSubCategory(this.categoryDesc.list[0].maitKey)
      }).then(res => {
        /*获取小商品的数据*/
        this.subCategory = res.data
      })


      /*获取推荐商品的数据*/
    },
    methods: {
      /*
      * 事件监听
      *
      * */
      // 选择分类
      cateDescSwitch(maitKey) {
        console.log(111)
        getSubCategory(maitKey).then(res => {
          this.subCategory = res.data
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>
  #category {
    position: relative;
  }

  .category-core {
    display: flex;
  }

  .list-box, .content-box {
    height: calc(100vh - 49px - 44px);
    overflow: hidden;
  }

  .list-box {
    flex: 1 1 30%;
  }

  .content-box {
    flex: 1 1 70%;
  }
</style>
