<template>
  <div class="user-wrapper">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item prop="menuName" label="菜单名称">
          <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item prop="menuState" label="状态">
          <el-select v-model="queryForm.menuState" placeholder="请选择状态">
              <el-option :value="1" label="正常"></el-option>
              <el-option :value="2" label="停用"></el-option>
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
          <el-button type="primary" @click="handleCreate">创建</el-button>
      </div>
      <el-table 
      row-key="_id"
      :data="menuList">
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template #default="scope">
            <el-button @click="handleAdd(2, scope.row)">新增</el-button>
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDel(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" background layout="prev, pager, next" :total="pager.total" :page-size="pager.pageSize" @current-change="handleCurrentChange" />
    </div>
    <el-dialog v-model="showModal" title="用户新增">
      <el-form ref="menuRef" :rules="rules" :model="menuForm" label-width="120px">
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader v-model="menuForm.parentId" placeholder="请选择所属部门" :options="menuList" :props="{checkStrictly: true, value: '_id', label: 'menuName'}" clearable />
          <span>不选，则直接创建一级菜单</span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuForm.menuType" placeholder="请选择菜单类型">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon" v-show="menuForm.menuType == 1">
          <el-input v-model="menuForm.icon" placeholder="请输入菜单图标"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="menuCode" v-show="menuForm.menuType == 2">
          <el-input v-model="menuForm.menuCode" placeholder="请输入权限标识"></el-input>
        </el-form-item>
        <el-form-item label="路由地址" prop="path" v-show="menuForm.menuType == 1">
          <el-input v-model="menuForm.path" placeholder="请输入路由地址"></el-input>
        </el-form-item>
        <el-form-item label="组件路径" prop="component" v-show="menuForm.menuType == 1">
          <el-input v-model="menuForm.component" placeholder="请输入组件路径"></el-input>
        </el-form-item>
        <el-form-item prop="menuState" label="菜单状态" v-show="menuForm.menuType == 1">
          <el-radio-group v-model="menuForm.menuState" placeholder="请选择菜单类型">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item prop="roleList" label="系统角色">
          <el-select v-model="menuForm.roleList" placeholder="请选择系统角色" multiple style="width: 100%">
              <el-option v-for="item in roleList" :value="item._id" :label="item.roleName" :key="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="deptId" label="所属部门" style="width: 100%">
          <el-cascader v-model="menuForm.deptId" placeholder="请选择所属部门" :options="deptList" :props="{checkStrictly: true, value: '_id', label: 'deptName'}" clearable />
        </el-form-item> -->
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
import utils from '../utils/utils'
export default {
  name: 'menu',
  data() {
    return {
      pager: {
        pageNum: 1,
        pageSize: 10
      },
      showModal: false,
      queryForm: {
        menuState: 1
      },
      menuForm: {
        menuType: 1
      },
      menuList: [],
      action: 'add',
      rules: {
        menuName: [
          {
            required: true,
            message: '请输入菜单名'
          },
          {
            min: 2,
            max: 10,
            message: '输入2-10字'
          }
        ],
      },

      columns: [
        {
          label: '菜单名称',
          prop: 'menuName',
        },
        {
          label: '图标',
          prop: 'icon',
        },
        {
          label: '菜单类型',
          prop: 'menuType',
          formatter(row, column, value) {
            console.log(row, column, value);
            return {
              '1': '菜单',
              '2': '按钮',
            }[value]
          }
        },
        {
          label: '权限标识',
          prop: 'menuCode',
          // formatter(row, column, value) {
          //   console.log(row, column, value);
          //   return {
          //     '0': '管理员',
          //     '1': '用户',
          //   }[value]
          // }
        },
        {
          label: '路由地址',
          prop: 'path',
        },
        {
          label: '组件地址',
          prop: 'component',
        },
        {
          label: '菜单状态',
          prop: 'menuState',
          formatter(row, column, value) {
            console.log(row, column, value);
            return {
              '1': '正常',
              '2': '停用',
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
      ]
    }
  },
  mounted() {
    this.getMenuList()
  },
  methods: {
    async getMenuList() {
      let list = await this.$api.getMenuList(this.queryForm)
      this.menuList = list
    },
    handleQuery() {},
    handleReset(form) {
      this.$refs[form].resetFields()
    },
    handleCreate() {
      // this.showModal = true
      // this.action = 'add'
      this.handleAdd(1)
    },
    handleAdd(type, row) {
      this.showModal = true
      this.action = 'add'
      if(type == 2) {
        this.menuForm.parentId = [...row.parentId, row._id].filter(item=> item)
      }
    },
    handleEdit(row) {
      this.showModal = true
      this.action = 'edit'
      //弹框显示后在赋值 否则初始化有问题
      this.$nextTick(_=> {
        Object.assign(this.menuForm, row)
      })
    },
    async handleDel(id) {
      let res = await this.$api.menuSubmit({_id: id, action: 'delete'})
      if(res.code == 200) {
        this.$message.success('删除成功')
      }
    },
    handleCencal() {
      this.showModal = false
      this.handleReset('menuRef')
    },
    handleSubmit() {
      this.$refs.menuRef.validate(async (valid) => {
        let { action, menuForm } = this
        let params = { ...menuForm, action }
        let res = await this.$api.menuSubmit(params)
        if(res) {
          this.showModal = false
          this.$message.success('操作成功')
          this.handleReset('menuRef')
          this.getMenuList()
        }
      })
    },
    handleCurrentChange() {}
  }
}
</script>

<style>

</style>