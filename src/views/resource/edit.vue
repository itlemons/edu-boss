<template>
  <div class="resource-edit">
    <!-- 引入并通过 is-edit -->
    <create-or-edit :is-edit="true"></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/CreateOrEdit'
export default {
  name: 'ResourceEdit',
  components: {
    CreateOrEdit
  }
}
</script>

<style lang="scss" scoped></style>
