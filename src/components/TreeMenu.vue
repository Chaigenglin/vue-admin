<template>
    <!-- <template v-for="menu in userMenu" >
      <el-sub-menu v-if="menu.children && menu.children.length > 0 &&menu.children[0].menuType == 1" :index="menu.path" :key="menu._id">
        <template #title>
          <el-icon><setting /></el-icon>
          <span>{{menu.menuName}}</span>
        </template>
        <tree-menu :userMenu="menu.children"/>
      </el-sub-menu>
      <el-menu-item v-else-if="menu.menuType == 1" :index="menu.path" :key="menu._id">{{menu.menuName}}</el-menu-item>
    </template> -->
    <el-sub-menu index="1">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="1-1">用户管理</el-menu-item>
      <el-menu-item index="1-2">菜单管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>审批管理</span>
      </template>
      <el-menu-item index="2-1">休假审批</el-menu-item>
      <el-menu-item index="2-2">待我审批</el-menu-item>
    </el-sub-menu>
</template>

<script>
export default {
  name: 'TreeMenu',
  props: {
    userMenu: {
      type: Array,
      default: [],
    }
  }
}
</script>

<style>

</style>