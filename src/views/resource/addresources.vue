<template>
  <!-- // 资源分类组件 -->
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="编号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      >
    </el-table-column>
    <el-table-column
      label="创建时间"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.updatedTime | dateFormat }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="sort"
      label="排序"
      >
    </el-table-column>
    <el-table-column
      label="操作">
      <el-button
        type="text"
        @click="handleEdit(scope.row)"
      >编辑</el-button>
      <el-button
        type="text"
        @click="handleDelete(scope.row)"
      >删除</el-button>
    </el-table-column>
  </el-table>
</template>

<script>
import { getResourceCategories } from '@/services/resource'
export default {
  name: 'ResourceFenlei',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getresource()
  },
  methods: {
    async getresource () {
      const { data } = await getResourceCategories()
      if (data.code === '000000') {
        this.tableData = data.data
      }
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
