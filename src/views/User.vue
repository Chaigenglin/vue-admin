<template>
  <div class="user-wrapper">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="user">
        <el-form-item prop="userId" label="用户ID">
          <el-input v-model="user.userId" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item prop="userName" label="用户名">
          <el-input v-model="user.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="state" label="状态">
          <el-select v-model="user.state">
              <el-option :value="0" label="所有"></el-option>
              <el-option :value="1" label="在职"></el-option>
              <el-option :value="2" label="离职"></el-option>
              <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
          <el-button type="primary" @click="handleCreate">新增</el-button>
          <el-button type="danger" @click="handlePatchDel">批量删除</el-button>
      </div>
      <el-table :data="userList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="170">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" background layout="prev, pager, next" :total="pager.total" :page-size="pager.pageSize" @current-change="handleCurrentChange" />
    </div>
    <el-dialog v-model="showModal" title="用户新增">
      <el-form ref="userRef" :rules="rules" :model="userForm" label-width="120px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" :disabled="action == 'edit'" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="userForm.userEmail" :disabled="action == 'edit'" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="userForm.job" placeholder="请输入岗位"></el-input>
        </el-form-item>
        <el-form-item prop="state" label="状态">
          <el-select v-model="userForm.state" placeholder="请选择状态">
              <el-option :value="1" label="在职"></el-option>
              <el-option :value="2" label="离职"></el-option>
              <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="roleList" label="系统角色">
          <el-select v-model="userForm.roleList" placeholder="请选择系统角色" multiple style="width: 100%">
              <el-option v-for="item in roleList" :value="item._id" :label="item.roleName" :key="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="deptId" label="所属部门" style="width: 100%">
          <el-cascader v-model="userForm.deptId" placeholder="请选择所属部门" :options="deptList" :props="{checkStrictly: true, value: '_id', label: 'deptName'}" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCencal">取消</el-button>
          <el-button type="primary" @click="handleSubmit"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, reactive, ref, getCurrentInstance, toRaw } from 'vue'
import utils from '../utils/utils'
export default {
  name: 'user',
  setup() {
    onMounted(()=> {
      getUserList()
      getRoleList()
      getDeptList()
    })
    //获取实例
    const { proxy, ctx } = getCurrentInstance()
    console.log(proxy);
    const user = reactive({
      state: 0,
    })
    const userForm = reactive({})
    const pager = reactive({
      pageNum: 1,
      pageSize: 10
    })
    const action = ref('add')
    const checkedUserIds = ref([])
    const userList = ref([])
    const roleList = ref([])
    const deptList = ref([])
    const showModal = ref(false)
    const rules = reactive({
      userName: [
        {
          required: true,
          message: '请输入用户名'
        },
      ],
      email: [
        {
          required: true,
          message: '请输入邮箱'
        },
      ],
      mobile: [
        {
          required: true,
          message: '请输入手机号'
        },
        {
          pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
          message: '输入正确的手机号'
        }
      ],
      deptId: [
        {
          required: true,
          message: '请选择所属部门'
        },
      ]
    })
    // title
    const columns = reactive([
      {
        label: '用户ID',
        prop: 'userId',
      },
      {
        label: '用户名',
        prop: 'userName',
      },
      {
        label: '用户邮箱',
        prop: 'userEmail',
      },
      {
        label: '用户角色',
        prop: 'role',
        formatter(row, column, value) {
          console.log(row, column, value);
          return {
            '0': '管理员',
            '1': '用户',
          }[value]
        }
      },
      {
        label: '用户状态',
        prop: 'state',
        formatter(row, column, value) {
          console.log(row, column, value);
          return {
            '1': '在职',
            '2': '离职',
            '3': '试用期',
          }[value]
        }
      },
      {
        label: '注册时间',
        prop: 'createTime',
        formatter(row, column, value) {
          return utils.formateDate(new Date(value));
        }
      },
      {
        label: '最后登录时间',
        prop: 'lastLoginTime',
        formatter(row, column, value) {
          return utils.formateDate(new Date(value));
        }
      },
    ])
    // 获取用户列表
    const getUserList = async()=> {
      let params = {...user, ...pager}
      const { list, page } = await proxy.$api.getUserList(params)
      userList.value = list
      pager.total = page.total
    }
    //获取部门列表
    const getDeptList = async()=> {
      const list = await proxy.$api.getDeptList()
      deptList.value = list
    }
    //获取角色列表
    const getRoleList = async()=> {
      console.log('获取角色列表');
      const list = await proxy.$api.getRoleList()
      console.log(list);
      roleList.value = list

    }

    // 查询用户列表
    const handleQuery = () => {
      getUserList()
    }
    // 重置
    const handleReset = (form) => {
      ctx.$refs[form].resetFields()
    }

    const handleCurrentChange = (current)=> {
      pager.pageNum = current
      getUserList()
    }
    //选中
    const handleSelectionChange = (list)=> {
      let arr = list.map(item => {
        return item.userId
      })
      checkedUserIds.value = arr
    }
    const handleSubmit = ()=> {
      ctx.$refs.userRef.validate(async (valid)=> {
        if(!valid) return false
        let params = toRaw(userForm)
        params.action = action.value
        let res = await proxy.$api.userSubmit(params)
        if(res) {
          showModal.value = false
          proxy.$message.success('用户创建成功')
          handleReset('userRef')
          getUserList()
        }
      }) 
    }
    const handleCencal = ()=> {
      showModal.value = false
      handleReset('userRef')
    }
    // 单独删除
    const handleDel = async (row)=> {
      const res = await proxy.$api.userDel({
        userIds: [row.userId]
      })
      proxy.$message.success('删除成功')
      getUserList()
    }

    // 批量删除
    const handlePatchDel = async ()=> {
      console.log(checkedUserIds.value);
      if(checkedUserIds.value.length == 0) {
        return proxy.$message.error('请选择要删除的用户')
      }
      const res = await proxy.$api.userDel({
        userIds: checkedUserIds.value
      })
      if(res.nModified > 0) {
        proxy.$message.success('删除成功')
        getUserList()
      }else {

      }
    }

    // 新增 
    const handleCreate = ()=> {
      showModal.value = true
      action.value = 'add'
    }

    // 编辑
    const handleEdit = (row)=> {
      showModal.value = true
      action.value = 'edit'
      //  保障页面开后再给赋值 这样初始值才是空 reset才有效
      ctx.$nextTick(_=> {
        Object.assign(userForm, row)
      })
    }
    return {
      user,
      userList,
      roleList,
      deptList,
      columns,
      pager,
      showModal,
      userForm,
      checkedUserIds,
      rules,
      action,
      getUserList,
      getRoleList,
      getDeptList,
      handleQuery,
      handleReset,
      handleEdit,
      handleCurrentChange,
      handleDel,
      handleCencal,
      handleSubmit,
      handleCreate,
      handleSelectionChange,
      handlePatchDel
    }
  }
}
</script>

<style>

</style>