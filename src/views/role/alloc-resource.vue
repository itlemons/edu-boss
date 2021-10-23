<template>
  <div class="alloc-resource">
    <el-form ref="form" v-model="allocateRoleResourceForm">
      <el-form-item>
        <el-card
          class="box-card"
          shadow="never"
          v-for="(item, index) in allocateRoleResourceForm"
          :key="item.id"
        >
          <div slot="header" class="clearfix">
            <el-checkbox
              :indeterminate="item.isIndeterminate"
              v-model="item.selected"
              :data-category="item.id"
              @change="checkAll(index, $event)"
              >{{ item.name }}</el-checkbox
            >
          </div>
          <el-row :gutter="20">
            <el-checkbox-group v-model="resourceIdList" @change="handleCheckedChange(index, $event)">
              <el-col :span="6" v-for="c in item.resourceList" :key="c.id">
                <!-- <el-checkbox @change="handleCheckedChange(index, $event)" v-model="c.selected" :checked="c.checked">{{ c.name }}</el-checkbox> -->
                <el-checkbox :label="c.id">{{ c.name }}</el-checkbox>
              </el-col>
            </el-checkbox-group>
          </el-row>
        </el-card>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="resetForm">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// allocateRoleResources
import { getRoleResources, allocateRoleResources } from '@/services/resource'
export default {
  name: 'AllocResource',
  props: {
    roleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      // 列表项数据
      allocateRoleResourceForm: [],
      // 储存勾选复选框的id
      resourceIdList: []
    }
  },
  created () {
    this.loadRoleResources()
  },
  methods: {
    // 全选和全不选
    checkAll (index, value) {
      this.allocateRoleResourceForm[index].isIndeterminate = false
      if (value) {
        // 全选框选上就把当前的所有框的id放入
        this.allocateRoleResourceForm[index].resourceList.map(item => {
          this.resourceIdList = [...this.resourceIdList, item.id]
        })
      } else {
        // 当前这个没有选上就把之前储存勾选的剔除
        this.allocateRoleResourceForm[index].resourceList.map(item => {
          var index = this.resourceIdList.indexOf(item.id)
          if (index > -1) {
            this.resourceIdList.splice(index, 1)
          }
        })
      }
    },
    // 当前一小块的复选框处理函数
    handleCheckedChange (index, value) {
      // const checkedCount = this.allocateRoleResourceForm[index].resourceList.length
      var selectedCount = 0
      const arrlength = this.allocateRoleResourceForm[index].resourceList.length
      this.allocateRoleResourceForm[index].resourceList.map(item => {
        if (this.resourceIdList.indexOf(item.id) > -1) {
          selectedCount++
        }
      })
      // console.log(arrlength, selectedCount, value)
      this.allocateRoleResourceForm[index].selected = selectedCount === arrlength
      this.allocateRoleResourceForm[index].isIndeterminate = selectedCount > 0 && selectedCount < arrlength
    },
    // 展示列表项
    async loadRoleResources () {
      const { data } = await getRoleResources(this.roleId)
      if (data.code === '000000') {
        this.allocateRoleResourceForm = data.data
        this.allocateRoleResourceForm.map(r => {
          // 给每一条数据加上一条属性，这条属性通过vue.set是实时更新的,这个属性是选框不确定状态
          this.$set(r, 'isIndeterminate', true)
          // 遍历数据把勾选的挑出来展示
          if (r.resourceList) {
            r.resourceList.map(item => {
              if (item.selected) {
                this.resourceIdList = [...this.resourceIdList, item.id]
              }
            })
          }
        })
      }
    },
    // 提交
    async onSubmit () {
      const { data } = await allocateRoleResources({
        roleId: this.roleId,
        resourceIdList: this.resourceIdList
      })
      if (data.code === '000000') {
        this.$message.success('资源分配成功！')
        this.$router.push({
          name: 'role'
        })
      }
    },
    // 重置
    resetForm () {
      this.resourceIdList = []
      this.allocateRoleResourceForm.map(item => {
        if (item.resourceList) {
          item.selected = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-card {
    ~ .el-card {
      margin-top: 15px;
    }
    .el-col {
      padding: 5px 0;
    }
  }
</style>
