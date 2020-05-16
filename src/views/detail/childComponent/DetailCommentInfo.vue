<template>
  <div class="detail-comment-box">
    <!--描述-->
    <div class="box-desc">
      <span>用户评论</span>
      <span>更多 <img src="~assets/img/common/back.svg"></span>
    </div>
    <!--用户信息-->
    <div class="user-info">
      <img :src="commentInfo.uhead" alt="">
      <span>{{commentInfo.uname}}</span>
    </div>
    <!--评论-->
    <p class="comment">{{commentInfo.content}}</p>
    <!--时间-->
    <div class="other-info">
      <span class="time">{{formatDate(commentInfo.date)}}</span>
      <span class="goods-info">{{commentInfo.style}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      formatDate(millise) {
        let date = new Date(millise),
            year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate(),
            formatDate = year + '-' + month + '-' + day
        return formatDate
      }
    }
  }
</script>

<style scoped>
  .detail-comment-box {
    padding: 0 10px;
  }

  .box-desc > span:nth-of-type(1) {
    font-size: 15px;
  }

  .box-desc > span:nth-of-type(2) {
    font-size: 13px;
  }
  .box-desc > span:nth-of-type(2)>img{
    width: 10px;
    height: 10px;
    transform: rotate(180deg);
  }
</style>
