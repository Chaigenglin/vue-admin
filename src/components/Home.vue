<template>
  <div class="basic-layout">
    <div :class="['nav-side', isCollapse ? 'fold': 'unfold']">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
        <span v-if="!isCollapse">我的后台管理</span>
      </div>
      <el-menu
        background-color="#001529"
        class="nav-menu"
        :default-active="activeMenu"
        text-color="#fff"
        router
        :collapse="isCollapse"
      >
        <tree-menu :userMenu="userMenu" />
        <!-- <el-sub-menu index="1">
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
        </el-sub-menu> -->
      </el-menu>
    </div>
    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-fold" @click="toggle">
            <el-icon><fold /></el-icon>
          </div>
          <!-- <div class="bread">面包屑</div> -->
          <bread-crumb />
        </div>
        <div class="nav-right">
          <el-badge class="notice" :value="noticeCount" type="danger">
            <el-icon><bell /></el-icon>
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{userInfo.userName}}
              <el-icon><right /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">{{
                  userInfo.userEmail
                }}</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Setting,
  Bell,
  Fold,
  Right
} from '@element-plus/icons-vue'
import TreeMenu from './TreeMenu.vue'
import BreadCrumb from './BreadCrumb.vue'
export default {
  name: 'home',
  components: {
    Setting,
    Bell,
    Fold,
    Right,
    TreeMenu,
    BreadCrumb
  },
  data() {
    return {
      isCollapse: false,
      userInfo: this.$store.state.userInfo,
      noticeCount: 0,
      userMenu: [],
      activeMenu: location.hash,
    }
  },
  mounted() {
    this.getNoticeCount()
  },
  methods: {
    toggle() {
      this.isCollapse = !this.isCollapse
    },
    handleLogout(key) {
      console.log(key);
      if(key === 'email') return
      if(key === 'logout') {
        this.$store.commit('saveUserInfo', '')
        this.userInfo = null
        this.$router.push('/login')
      }
    },
    async getNoticeCount() {
      try {
        const res = await this.$api.getNoticeCount()
        this.noticeCount = res
      } catch (error) {
        console.error(error)
      }
    },
    async getMenuList() {
      try {
        const res = await this.$api.getMenuList()
        this.userMenu = res
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss">
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001925;
    color: #fff;
    overflow-y: auto;
    transition: width .5s;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        width: 32px;
        height: 32px;
        margin: 0 16px;
      }
    }
    .nav-menu {
      // height: calc(100vh - 50px);
      border-right: none;
    }
    &.fold {
      width: 64px;
    }
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    margin-left: 200px;
    &.fold {
      margin-left: 64px;
    }
    &.unfold {
      margin-left: 200px;
    }
    .nav-top {
      height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      align-items: center;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          margin-right: 15px;
          font-size: 18px;
        }
      }
      .nav-right {
        display: flex;
        align-items: center;
        .notice {
          line-height: 30px;
          margin-right: 15px;
        }
        .user-link {
          cursor: pointer;
          color: #409fff;
          display: flex;
          align-items: center;
        }
      }
    }
    .wrapper {
      background-color: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        height: 100%;
        background-color: #fff;
      }
    }
  }
}

</style>