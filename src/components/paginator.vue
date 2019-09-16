<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :current-page="meta.current_page"
    :total="meta.total"
    :page-size="meta.per_page"
    @current-change="change">
  </el-pagination>
</template>

<script>
export default {
  name: 'paginator',
  props: {
    meta: {
      type: Object,
      default () {
        return {
          total: 0,
          per_page: 10,
          current_page: 1
        }
      }
    }
  },
  methods: {
    change (page) {
      console.log(`当前页: ${page}`);

      this.meta.current_page = page
      this.$emit('change', page)
    }
  }
}
</script>

<style scoped>
.el-pagination {
  text-align: center;
}
</style>
