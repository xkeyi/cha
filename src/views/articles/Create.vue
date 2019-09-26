<template>
  <div class="row justify-content-end">
    <div class="col-11 page-home">
      <div class="article-page">
        <h3 class="text-center" style="font-weight: 400;color: #636b6f;">
          <i class="fa fa-paint-brush"></i>
          创作文章
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
            <textarea id="editor"></textarea>
          </div>

          <div v-for="tag in tags" :key="tag.id" class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" :value="tag.id" :id="'tagCheckbox'+tag.id">
            <label class="form-check-label" :for="'tagCheckbox'+tag.id">{{ tag.name }}</label>
          </div>
          <hr>
          <div class="form-group">
            <button type="button" class="btn btn-primary"><i class="fa fa-send mr-2"></i>立即发布</button>
            <span class="mr-2 ml-2">or</span>
            <button type="button" class="btn btn-secondary"><i class="fa fa-save mr-2"></i>保存草稿</button>
          </div>
        </form>
        <div v-show="!canEdit" class="text-center">您还没有权限创作文章哦！</div>
      </div>
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
      categories: [],
      form: {
        category_id: null,
        is_draft: true, // 草稿
        title: '',
      }
    }
  },
  components: {
  },
  computed: {
    canEdit () {
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
    }
  },
  methods: {
   getTags () {
      this.$http.get('/categories?include=tags')
        .then(response => {
          this.categories = response.data
        })
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
