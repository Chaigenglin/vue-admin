<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="userForm" :model="user" status-icon :rules="rules">
        <div class="title">后台管理系统</div>
        <el-form-item prop="userName">
          <el-input type="text" v-model="user.userName">
            <template #prefix>
              <el-icon class="el-input__icon"><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input type="password" v-model="user.userPwd">
            <template #prefix>
              <el-icon class="el-input__icon"><View /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { User, View } from '@element-plus/icons-vue'
export default {
  name: 'login',
  data() {
    return {
      user: {
        userName: '',
        userPwd: ''
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        userPwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],

      }
    }
  },
  components: {
    User,
    View 
  },
  methods: {
    login() {
      this.$refs.userForm.validate((valid)=>{
        if(valid) {
          this.$api.login(this.user).then(res=> {
            this.$store.commit('saveUserInfo',res)
            this.$router.push('./welcome')
          })
  
        }else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9fcff;
    width: 100vw;
    height: 100vh;
    .modal {
      width: 500px;
      padding: 50px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0px 0px 10px 3px #c9cbcb4d;
      .title {
        font-size: 50px;
        text-align: center;
        line-height: 1.5;
        margin-bottom: 30px;
      }
      .login-btn {
        width: 100%;
      }
    }
  }
</style>