<template>
  <div class="advert-list">
    <el-card>
      <div slot="header">
        <el-button type="primary">添加广告</el-button>
      </div>
      <!-- 广告展示区域 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AdvertList',
  data () {
    return {
      tableData: null
    }
  },
  methods: {
    async lodingadvert () {}
  }
}
</script>

<style lang="scss" scoped></style>
