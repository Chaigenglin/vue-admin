<template>
  <h1>欢迎登录</h1>
  <el-button>回到首页</el-button>
</template>

<script>
export default {
  name: 'login',
  mounted() {
    this.$request.get('/login', {
      name: 'sp'
    }).then(res=> {
      console.log(res);
    })
  }
}
</script>

<style>

</style>