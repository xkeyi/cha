<template>
  <div class="offset-md-1 col-md-10 page-home">
    <div class="article-page">
      <h3 class="text-center" style="font-weight: 400;color: #636b6f;">
        <i class="fa fa-paint-brush"></i>
        {{ articleId ? '编辑文章' : '创作文章' }}
      </h3>
      <hr>
      <form v-show="canEdit">
        <div class="form-group">
          <select class="form-control" v-model="form.category_id">
            <option disabled selected value="null">-- 分类 --</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model.trim="form.title" placeholder="标题">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model.trim="form.cover_image" placeholder="封面图">
        </div>
        <div class="form-group">
          <textarea id="editor"></textarea>
        </div>

        <div v-for="tag in tags" :key="tag.id" class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" :value="tag.id" :id="'tagCheckbox'+tag.id" v-model="form.tags">
          <label class="form-check-label" :for="'tagCheckbox'+tag.id">{{ tag.name }}</label>
        </div>
        <hr>
        <div class="form-group" v-if="articleId && articlePublished">
          <button type="button" class="btn btn-primary" :disabled="!formReady" @click="submit(false)"><i class="fa fa-send mr-2"></i>保存</button>
        </div>
        <div class="form-group" v-else>
          <button type="button" class="btn btn-primary" :disabled="!formReady" @click="submit(false)"><i class="fa fa-send mr-2"></i>立即发布</button>
          <span class="mr-2 ml-2">or</span>
          <button type="button" class="btn btn-secondary" :disabled="!formReady" @click="submit(true)"><i class="fa fa-save mr-2"></i>保存草稿</button>
        </div>
      </form>
      <div v-show="!canEdit" class="text-center mt-5" style="font-size: 20px;color:#606266;">您没有权限访问当前页面！</div>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
import 'simplemde/dist/simplemde.min.css';
import { mapGetters } from 'vuex'

// 添加全局变量
window.hljs = hljs

export default {
  name: 'ArticlCreate',
  data () {
    return {
      articleId: undefined, // 文章ID
      articleUserId: undefined, // 文章作者ID
      articlePublished: false,
      categories: [],
      busing: false,
      form: {
        category_id: null,
        cover_image: '',
        is_draft: true, // 草稿
        type: 'markdown',
        title: '',
        tags: [],
        content: {
          markdown: '',
          body: ''
        },
      }
    }
  },
  components: {
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 确认渲染组件的对应路由时，设置 articleId
      vm.setArticleId(vm.$route.params.articleId)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.clearData()
    next()
  },
  watch: {
    categoryId () {
      this.form.tags = []
    },
    /**
     * 我们可以通过监听 '$route' 来得知路由参数的变化，我们通常会在两个路由都渲染相同的组件时监听 '$route'，这是因为 Vue 会复用组件实例，以导致组件内的部分钩子不再被调用。举例来说，我们的『编辑文章』和 『创作文章』都使用 Create.vue 组件，当我们从『编辑文章』导航到『创作文章』时（在编辑文章页面点击创作文章按钮），beforeRouteEnter 就不会被调用，所以我们需要监听 '$route'，以响应路由参数的变化。
     */
    // 监听路由参数的变化
    '$route'(to) {
      // 设置 articleId
      this.setArticleId(to.params.articleId)
    }
  },
  computed: {
    categoryId () {
      return this.form.category_id
    },
    canEdit () {
      if (this.articleId) {
        return this.$user().is_admin || this.$user().id === this.articleUserId
      }

      return this.$user().is_admin
    },
    tags () {
      if (!this.form.category_id) {
        return []
      }

      let cTags = []

      this.categories.forEach((category) => {
        if (category.id === this.form.category_id) {
          cTags = category.tags.data
          return false
        }
      })

      return cTags
    },
    formReady () {
      return (
        !this.busing &&
        this.form.cover_image &&
        this.form.title.length >= 5 &&
        this.form.category_id > 0 &&
        this.form.content.markdown &&
        this.form.content.markdown.length >= 30
      )
    }
  },
  methods: {
    setArticleId(articleId) {
      // 设置当前实例的 articleId
      this.articleId = articleId
      if (this.articleId) {
        // 加载文章内容
        this.loadArticle(this.articleId)
      }
    },
    getTags () {
      this.busing = true

      return this.$http
        .get('/categories?include=tags')
        .then(response => {
          this.categories = response.data
          this.busing = false
        })
        .finally(() => {
          this.busing = false
        })
    },
    loadArticle (articleId) {
      this.$http
        .get(`/articles/${articleId}?include=category,tags,content`)
        .then(response => {
          this.articleUserId = response.user_id

          if (response.published_at_ago) {
            this.articlePublished = true
          }

          this.form.category_id = response.category_id
          this.form.cover_image = response.cover_image
          this.form.title = response.title

          this.simplemde.value(response.content.markdown)

          this.$nextTick(() => {
            response.tags.data.forEach((item) => {
              this.form.tags.push(item.id)
            })
          })
        })
    },
    submit (is_draft = true) {
      this.form.is_draft = is_draft

      this.busing = true

      let promise = null

      if (this.articleId) {
        promise = this.$http.patch(`/articles/${this.articleId}`, this.form)
      } else {
        promise = this.$http.post('/articles', this.form)
      }

      promise
        .then(response => {
          this.$message.success('内容已发布（保存）成功！')
          this.$router.replace({
            name: 'articles.show',
            params: { articleId: response.id }
          })

          this.clearData()
        })
        .finally(() => {
          this.busing = false
        })
    },
    clearData () {
      // 清除编辑的内容
      this.simplemde.value('')
      // 清除编辑器自动保存的内容
      this.simplemde.clearAutosavedValue()
    }
  },
  mounted () {
    this.getTags()

    this.$nextTick(() => {
      const simplemde = new SimpleMDE({
        element: document.querySelector('#editor'),
        placeholder: '请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。',
        spellChecker: false, // 禁用拼写检查
        autoDownloadFontAwesome: false, // 不用自动下载 FontAwesome，因为我们刚好有使用 FontAwesome，所以不用自动下载
        autosave: { // 启用自动保存，uniqueId 是一个用于区别于其他站点的标识
          enabled: true,
          uniqueId: 'vuejs-cha'
        },
        renderingConfig: { // 启用代码高亮，需要引入 highlight.js
          codeSyntaxHighlighting: true
        }
      })

      // 初始值
      this.form.content.markdown = simplemde.value()

      // 监听编辑器的 change 事件
      simplemde.codemirror.on('change', () => {
        // 将改变后的值赋给文章内容
        this.form.content.markdown = simplemde.value()
      })

      // 将 simplemde 添加到当前实例，以在其他地方调用
      this.simplemde = simplemde
    })
  }
}
</script>

<style scoped>
  .article-page {
    padding: 30px 50px;
  }
  .form-check-inline {
    margin-right: 20px;
    height: 30px;
    line-height: 30px;
  }
  .form-check-inline .form-check-input {
    cursor: pointer;
  }
  .form-check-label {
    cursor: pointer;
  }
</style>
