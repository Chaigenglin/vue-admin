<template>
  <div class="welcome">
    <div class="content">
      <div class="sub-title">欢迎体验</div>
      <div class="title">通用后台管理系统</div>
      <div class="desc">- 基于Vue3.0 + ElementPlus + Node + Koa2 + MongoDB打造的后台管理系统</div>
    </div>
    <div class="img">
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcome'
}
</script>

<style lang="scss">
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .content{
    position: relative;
    bottom: 40px;
    .sub-title {
      font-size: 30px;
      color: #333;
      line-height: 42px;
    }
    .title {
      font-size: 40px;
      color: #409eff;
      line-height: 62px;
    }
    .desc {
      text-align: right;
      font-size: 14px;
      color: #999;
    }
  }
  .img {
    width: 371px;
    height: 438px;
    background-image: url('../assets/images/welcome.png');
    margin-left: 40px;
  }
}
</style>