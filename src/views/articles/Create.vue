<template>
  <div class="row justify-content-end">
    <div class="col-11 page-home">
      <div class="article-page">
        <h3 class="text-center" style="font-weight: 400;color: #636b6f;">
          <i class="fa fa-paint-brush"></i>
          创作文章
        </h3>
        <hr>
        <template v-if="canEdit">
          <form>
            <div class="form-group">
              <select class="form-control">
                <option disabled selected>-- 分类 --</option>
                <option value="1">编程</option>
                <option value="2">健身</option>
                <option value="3">其他</option>
              </select>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="标题">
            </div>
            <div class="form-group">
              <textarea id="editor"></textarea>
            </div>

            <div v-for="tag in tags" :key="tag.id" class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" :value="tag.id" :id="'tagCheckbox'+tag.id">
              <label class="form-check-label" :for="'tagCheckbox'+tag.id">{{ tag.name }}</label>
            </div>

            <div class="form-group">
              <button class="btn btn-primary" type="submit" @click="">发 布</button>
            </div>
          </form>
        </template>
        <template v-else>
          <div class="text-center">您还没有权限创作文章哦！</div>
        </template>
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
      tags: []
    }
  },
  components: {
  },
  computed: {
    canEdit () {
      return this.$user().is_admin
    }
  },
  methods: {
    getTags () {
      this.$http.get('/tags')
        .then(response => {
          this.tags = response.data
        })
    }
  },
  mounted () {
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

    this.getTags()
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
