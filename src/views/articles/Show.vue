<template>
  <div class="offset-md-1 col-md-10 page-home">
    <div class="row" v-if="article" style="padding:30px;">
      <div class="article-box">
        <div class="article-header">
          <div class="article-title">{{ article.title }}</div>
          <div class="article-extra">
            <router-link :to="{ name: 'category', params: { categoryId: article.category.id }}">
              <i class="fa fa-folder"></i> {{ article.category.name }}
            </router-link>

            <el-divider direction="vertical"></el-divider>
            <template v-for="(tag, index) in article.tags.data">
              <span><i class="fa fa-tag"></i> {{ tag.name }}</span>
              <span v-if="index != article.tags.data.length-1" class="count_seperator">/</span>
            </template>

            <el-divider direction="vertical"></el-divider>

            <span><i class="fa fa-clock-o"></i> {{ article.published_at_ago }}</span>
            <span class="count_seperator">/</span>
            <span><i class="fa fa-eye"></i> 211</span>
            <span class="count_seperator">/</span>
            <span><i class="fa fa-heart"></i> 1</span>

            <span v-if="canEdit" class="ml-3">
              (
              <router-link :to="{ name: 'articles.edit', params: { articleId: article.id }}">
                <i class="fa fa-edit"></i> 编辑
              </router-link>
              <span class="count_seperator">|</span>
              <span @click="handleDelete()" style="cursor:pointer;"><i class="fa fa-trash"></i> 删除</span>
              )
            </span>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="article-content">
          <markdown-body v-model="article.content.body"></markdown-body>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownBody from '@/components/MarkdownBody'
import { mapGetters } from 'vuex'

export default {
  name: 'ArticlShow',
  data () {
    return {
      article: null
    }
  },
  components: {
    MarkdownBody
  },
  computed: {
    ...mapGetters(['currentUser']), // 此处的 currentUser 方便直接在模版中使用，判断是不是管理员等
    canEdit () {
      return this.article.user_id === this.$user().id || this.$user().is_admin
    }
  },
  methods: {
    loadArticle () {
      this.$http
        .get(`/articles/${this.$route.params.articleId}?include=category,tags,content`)
        .then(response => {
          this.article = response
        })
        .catch(response => {
          if (response.status === 404) {
            this.$message.error('该文章不存在或已被删除！')
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          }
        })
    },
    handleDelete() {
      this.$confirm('您确定要删除此文章吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(() => {
        this.$http.delete(`/articles/${this.article.id}`)
        .then(() => {
          this.$message.success('已删除！')
          this.$router.go(-1)
        })
      }).catch(() => {
        // 取消
      });
    }
  },
  mounted () {
    this.loadArticle()
  }
}
</script>

<style scoped>
  .article-title {
    line-height: 34px;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .article-extra {
    color: #adb1af;
  }
  .article-extra a {
    color: #adb1af;
  }
  .count_seperator {
    margin: 0 10px;
    color: #bab9bb;
  }
</style>
