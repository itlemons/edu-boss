<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 使用 Form 组件：行内表单 -->
        <el-form
          :inline="true"
          :model="form"
          class="demo-form-inline"
          ref="form"
        >
          <el-form-item label="资源名称" prop="name">
            <el-input
              v-model="form.name"
              placeholder="资源名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input
              v-model="form.url"
              placeholder="资源路径"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select
              v-model="form.categoryId"
              placeholder="资源分类"
              clearable
            >
              <!-- 请求接口进行下拉菜单项设置 -->
              <el-option
                v-for="item in resourceCategories"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="onReset"
            >重置
            </el-button>
            <el-button
              type="primary"
              :disabled="isLoading"
              @click="onSubmit"
            >查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 添加资源组件 -->
      <div class="clearfix">
        <el-form>
          <el-form-item>
            <el-button size="mini" @click="add">添加</el-button>
            <el-button size="mini" @click="ziyuanfenlei">资源分类</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 使用 Table 组件 -->
      <el-table
        :data="resources"
        style="width: 100%"
        v-loading="isLoading"
        border
      >
        <el-table-column
          type="index"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <!-- 设置过滤器需要使用作用域插槽获取数据 -->
        <el-table-column
          label="添加时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              @click="handleDelete(scope.row)"
              type="danger"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件结构 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :page-sizes="[10, 15, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading"
      >
      </el-pagination>
      <!-- 编辑组件 -->
      <el-dialog  :title=" dialogFormVisible ? '编辑资源' : '添加资源' "
                  :visible.sync="dialogFormVisible"
                  width="40%">
        <el-form :model="addform">
          <el-form-item label="资源名称:" :label-width="formLabelWidth">
            <el-input v-model="addform.name" autocomplete="off" style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item label="资源路径:" :label-width="formLabelWidth">
            <el-input v-model="addform.url" autocomplete="off" style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item label="资源分类:" :label-width="formLabelWidth">
            <el-select v-model="addform.categoryId" placeholder="请选择活动区域" style="width: 250px">
              <el-option
                v-for="item in resourceCategories"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述:" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              v-model="addform.description"
              style="min-height: 31px; width: 250px"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSure">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getResourcePages, getResourceCategories, deleteResource, addOrdataResource } from '@/services/resource'
export default {
  name: 'ResourceList',
  data () {
    return {
      // 编辑和添加组件的显示
      dialogFormVisible: false,
      formLabelWidth: '120px',
      // 用于存储资源列表数据
      resources: [],
      // 数据请求体
      form: {
        // 编辑请求数据
        id: '',
        // 当前显示的页号
        current: 1,
        // 每页显示的数据条数
        size: 10,
        // 资源名称
        name: '',
        // 资源路径
        url: '',
        // 资源分类 ID
        categoryId: ''
      },
      // 数据总数
      totalCount: 0,
      // 存储资源分类信息
      resourceCategories: [],
      // 用于保存加载状态
      isLoading: false,
      // 编辑和添加组件的数据
      addform: {
        // 编辑请求数据
        id: '',
        // 资源名称
        name: '',
        // 资源路径
        url: '',
        // 资源分类 ID
        categoryId: ''
      }
    }
  },
  created () {
    // 加载资源数据
    this.loadResources()
    // 加载资源列表
    this.loadResourceCategories()
  },
  methods: {
    add () {
      this.addform = {}
      this.dialogFormVisible = true
    },
    ziyuanfenlei () {
      // 设置跳转
      this.$router.push({
        name: 'resource-category'
      })
    },
    // 重置按钮点击操作
    onReset () {
      this.$refs.form.resetFields()
      this.loadResources()
    },
    // 提交筛选功能
    onSubmit () {
      // 请求数据前，将请求的页数更新为 1
      this.form.current = 1
      this.loadResources()
    },
    // 加载资源列表
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      if (data.code === '000000') {
        this.resourceCategories = data.data
      }
    },
    // 每页显示条数变化时触发
    handleSizeChange (val) {
      this.form.size = val
      // 由于修改了每页显示的条数，应当将页数还原为默认值 1
      this.form.current = 1
      this.loadResources()
    },
    // 页号改变触发
    handleCurrentChange (val) {
      this.form.current = val
      this.loadResources()
    },
    async loadResources () {
      // 开始加载数据
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.totalCount = data.data.total
        // 取消加载状态
        this.isLoading = false
      }
    },
    onSure () {
      this.addDataResource()
      this.dialogFormVisible = false
    },
    async addDataResource () {
      const { data } = await addOrdataResource(this.addform)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.loadResources()
      }
    },
    // 编辑当前数据
    handleEdit (rowData) {
      this.dialogFormVisible = true
      this.addform = rowData
    },
    // 删除当前条数据
    handleDelete (rowData) {
      // 删除的确认提示
      this.$confirm('确认删除吗？', '删除提示')
        .then(async () => {
          // 发送删除请求
          const { data } = await deleteResource(rowData.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            // 更新数据列表
            this.loadResources()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  },
  filters: {
    // 日期过滤器
    dateFormat (date) {
      date = new Date(date)
      return `
        ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 
        ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
      `
    }
  }
}
</script>

<style lang="scss" scoped></style>
