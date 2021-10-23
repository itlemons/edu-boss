<template>
  <div class="resource-edit">
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
  </div>
</template>

<script>
export default {
  name: 'ResourceEdit',
  props: ['dialogFormVisible'],
  data () {
    return {
      addform: {
        // 编辑请求数据
        id: '',
        // 资源名称
        name: '',
        // 资源路径
        url: '',
        // 资源分类 ID
        categoryId: ''
      },
      dialogFormVisibles: this.dialogFormVisible,
      formLabelWidth: '120px'
    }
  }
}
</script>

<style lang="scss" scoped></style>
