<template>
  <li class="goods-item">
    <a href="">
      <div class="goods-img-box">
        <img :src="goodsItem.show.img" width="100%" height="100%">
      </div>
      <p class="goods-item-title">{{goodsItem.title}}</p>
      <p class="goods-item-info">
        <span class="price">{{goodsItem.price}}￥</span>
        <span class="collect">☆ {{goodsItem.cfav}}</span>
      </p>
    </a>
  </li>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    float: left;
    flex-shrink: 1;
    width: 50%;
    overflow: hidden;
    box-sizing: border-box;
    padding: .06rem;
  }

  .goods-item > a {
    display: block;
    width: 100%;
  }

  .goods-img-box {
    overflow: hidden;
    height: 4.12rem;
    border-radius: 4px;
  }

  .goods-img-box > img {
    vertical-align: top;
  }

  .goods-item-title {
    padding: 3px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
  }

  .goods-item-info {
    width: 100%;
    text-align: center;
  }

  .goods-item-info > .price {
    padding-right: 3px;
    color: var(--color-high-text);
  }
</style>
