<template>
  <div>
    Home<br><br><br><i class="fa fa-search"></i>
    <br>
    <i class="fa fa-sign-out"></i>
      <br>
    <i class="fa fa-heart"></i>
    <i class="fa fa-user"></i>
     Home<br><br><br><i class="fa fa-search"></i>
    <br>
    <i class="fa fa-sign-out"></i>
      <br>
    <i class="fa fa-heart"></i>
    <i class="fa fa-user"></i>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      articles: {},
      categoryId: undefined,
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 获取文章
      vm.categoryId = vm.$route.params.categoryId
    })
  },
  watch: {
    /**
     * 我们可以通过监听 '$route' 来得知路由参数的变化，我们通常会在两个路由都渲染相同的组件时监听 '$route'，这是因为 Vue 会复用组件实例，以导致组件内的部分钩子不再被调用。举例来说，我们的『编辑文章』和 『创作文章』都使用 Create.vue 组件，当我们从『编辑文章』导航到『创作文章』时（在编辑文章页面点击创作文章按钮），beforeRouteEnter 就不会被调用，所以我们需要监听 '$route'，以响应路由参数的变化。此处的分类切换也如此。或者可以使用 beforeRouteUpdate
     */
    // 监听路由参数的变化
    '$route'(to) {
      // 设置 articleId
      this.categoryId = to.params.categoryId
    },
    categoryId () {
      this.getArticles()
    }
  },
  methods: {
    getArticles () {
      console.log(this.categoryId)
    }
  },
  mounted () {
    this.getArticles()
  }
}
</script>

<style scoped>

</style>
