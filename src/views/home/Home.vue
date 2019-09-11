<template>
  <div class="page-home my-4">
    <div class="row">
      <div class="offset-md-1 col-md-10">
        <div class="article-list">
          <ul class="list-unstyled">
            <li class="media media-li">
              <img class="align-self-center mr-3 article-cover-image" src="https://cdn.pigjian.com/cover/2018/01/07/Mi1Ht9NaSvhGE4jzXozR42xOdAprrjvXrK5Kxuul.png">
              <div class="media-body">
                <h5 class="article-title mt-0 mb-1">List-based media object</h5>
                <div class="meta mt-1 mb-1">
                  <span class="badge badge-secondary">编程</span>
                  <span class="badge-divider">|</span>
                  <span class="badge badge-success mr-1">Success</span>
                  <span class="badge badge-danger mr-1">Danger</span>
                  <span class="badge badge-warning mr-1">Warning</span>
                  <span class="badge badge-info mr-1">Info</span>
                </div>
                <div class="extra mt-1 mb-1">
                  <span><i class="fa fa-cogs fa-fw mr-2"></i> 2年前</span>
                  <span><i class="fa fa-user fa-fw mr-2"></i> 211</span>
                  <span><i class="fa fa-heart fa-fw mr-2"></i> 2</span>
                </div>
                <div class="log-content mt-1">
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </div>
              </div>
            </li>
            <li class="media media-li">
              <img class="align-self-center mr-3 article-cover-image" src="https://cdn.pigjian.com/cover/2018/01/07/Mi1Ht9NaSvhGE4jzXozR42xOdAprrjvXrK5Kxuul.png">
              <div class="media-body">
                <h5 class="article-title mt-0 mb-1">List-based media object</h5>
                <div class="meta">
                  <span class="badge badge-secondary">编程</span> |
                  <span class="badge badge-success">Success</span>
                  <span class="badge badge-danger">Danger</span>
                  <span class="badge badge-warning">Warning</span>
                  <span class="badge badge-info">Info</span>
                </div>
                <div class="extra">
                  <span><i class="fa fa-cogs fa-fw mr-2"></i> 2年前</span>
                  <span><i class="fa fa-user fa-fw mr-2"></i> 211</span>
                  <span><i class="fa fa-heart fa-fw mr-2"></i> 2</span>
                </div>
                <div class="log-content">
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </div>
              </div>
            </li>
            <li class="media media-li">
              <img class="align-self-center mr-3 article-cover-image" src="https://cdn.pigjian.com/cover/2018/01/07/Mi1Ht9NaSvhGE4jzXozR42xOdAprrjvXrK5Kxuul.png">
              <div class="media-body">
                <h5 class="article-title mt-0 mb-1">List-based media object</h5>
                <div class="meta">
                  <span class="badge badge-secondary">编程</span> |
                  <span class="badge badge-success">Success</span>
                  <span class="badge badge-danger">Danger</span>
                  <span class="badge badge-warning">Warning</span>
                  <span class="badge badge-info">Info</span>
                </div>
                <div class="extra">
                  <span><i class="fa fa-cogs fa-fw mr-2"></i> 2年前</span>
                  <span><i class="fa fa-user fa-fw mr-2"></i> 211</span>
                  <span><i class="fa fa-heart fa-fw mr-2"></i> 2</span>
                </div>
                <div class="log-content">
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-10">
        <div class="pagination">这是分页</div>
      </div>
    </div>
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
      paginator: {},
      categoryId: 0,
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
  mounted () {
    this.getArticles()
  },
  methods: {

    getArticles () {
      console.log('getArticles')
      return;
      this.$http.get('/articles?category_id='+this.categoryId+'&include=user,category,tags,content')
        .then(response => {
          console.log(response)
        })
    }
  }
}
</script>
<style scoped>
  .page-home {
    background-color: #fff;
    box-shadow: 0 1px 11px 2px rgba(42,42,42,.1);
  }
  .article-cover-image {
    width: 200px;
    height:auto;
  }
  .media-li {
    padding: 20px 0;
    border-bottom: 1px solid #dcdfe6;
  }
  .badge-divider {
    font-size: 18px;
    color: #666;
    padding: 0 5px;
  }
</style>
