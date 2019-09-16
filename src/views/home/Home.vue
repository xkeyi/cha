<template>
  <div class="page-home">
    <div class="row">
      <div class="offset-md-1 col-md-10">
        <div class="article-list">
          <ul class="list-unstyled">
            <li class="media media-li"
                v-for="article in articles"
                :key="article.id"
            >
              <img class="align-self-center mr-3 article-cover-image" :src="article.cover_image">
              <div class="media-body">
                <h5 class="article-title mt-0 mb-1">{{ article.title }}</h5>
                <div class="meta mt-1 mb-1">
                  <a href="javascript:void(0);" class="badge badge-secondary">{{ article.category.name }}</a>
                  <span class="badge-divider" v-if="article.tags.data.length > 0">|</span>
                  <span v-for="tag in article.tags.data"
                        :key="tag.id"
                        class="badge mr-1"
                        :class="tag.badge"
                  >{{ tag.name }}</span>
                </div>
                <div class="extra mt-1 mb-1">
                  <span><i class="fa fa-heart"></i> 1</span>
                  <span class="count_seperator">/</span>
                  <span><i class="fa fa-eye"></i> 211</span>
                  <span class="count_seperator">|</span>
                  <span>{{ article.published_at_ago }}</span>
                </div>
                <div class="log-content mt-1" v-html="article.content.activity_log_content"></div>
              </div>
            </li>

            <li class="media media-li"
                v-if="articles.length == 0"
            >
              该分类下无相关讨论哦~
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-12 mb-5">
        <paginator :meta="meta" @change="handleChange"></paginator>
      </div>
    </div>
  </div>
</template>

<script>
import Paginator from '@/components/paginator'

export default {
  name: 'Home',
  components: {
    Paginator
  },
  data () {
    return {
      articles: [],
      meta: {},
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
  mounted () {
    this.getArticles()
  },
  methods: {
    async getArticles (page = 1) {
      let category_id = this.categoryId
      if (category_id == undefined || category_id == 'undefined') {
        category_id = 0
      }

      await this.$http.get('/articles?category_id='+category_id+'&include=user,category,tags,content&page='+page)
        .then(response => {
          console.log(response)
          this.articles = response.data
          this.meta = response.meta.pagination
          console.log(this.meta)
        })
    },
    handleChange (page) {
      this.getArticles(page)
    }
  }
}
</script>
<style scoped>
  .page-home {
    border-radio: 5px;
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
    color: #bab9bb;
    padding: 0 8px;
  }
  .extra {
    font-size: 14px;
    color: #999;
  }
  .count_seperator {
    margin: 0 10px;
    color: #bab9bb;
  }
</style>
