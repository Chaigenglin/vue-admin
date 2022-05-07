<template>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }" v-for="item in breadList" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { ArrowRight } from '@element-plus/icons-vue'
export default {
  name: 'bread-crumb',
  components: {
    ArrowRight,
  },
  computed: {
    breadList() {
      return this.$route.matched
    }
  }
}
</script>

<style>

</style>