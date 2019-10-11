<template>
  <div class="topnav">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link :to="{ name: 'home' }" class="nav-item">
          <a class="navbar-brand" href="javascript:void(0);">The Cha</a>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <router-link :to="{ name: 'home' }" class="nav-item">
              <a class="nav-link" href="javascript:void(0);">首页</a>
            </router-link>
            <router-link :to="{ name: 'category', params: { categoryId: 1 }}" class="nav-item">
              <a class="nav-link" href="javascript:void(0);">编程</a>
            </router-link>
            <router-link :to="{ name: 'category', params: { categoryId: 2 } }" class="nav-item">
              <a class="nav-link" href="javascript:void(0);">健身</a>
            </router-link>
            <router-link :to="{ name: 'category', params: { categoryId: 3 } }" class="nav-item">
              <a class="nav-link" href="javascript:void(0);">其他</a>
            </router-link>
          </ul>

          <!-- Right Side Of Navbar -->
          <ul class="navbar-nav navbar-right">
            <template v-if="isLogged">
              <li class="nav-item" v-if="currentUser.is_admin">
                <router-link :to="{ name: 'articles.create' }" class="create-article_btn">
                  <i class="fa fa-plus"></i>
                </router-link>
              </li>

              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="https://i.loli.net/2017/08/21/599a521472424.jpg" class="img-fluid rounded-circle navbar-avatar"><span class="badge badge-danger nabvar-notification-count">2</span>
                  {{ currentUser.username }}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a href="" class="dropdown-item"><i class="fa fa-envelope fa-fw mr-2"></i> 我的消息 <span class="badge badge-danger">2</span></a>
                  <a href="" class="dropdown-item"><i class="fa fa-heart fa-fw mr-2"></i> 我的收藏</a>
                  <a href="" class="dropdown-item"><i class="fa fa-user fa-fw mr-2"></i> 个人中心</a>
                  <a href="" class="dropdown-item"><i class="fa fa-cogs fa-fw mr-2"></i> 编辑资料</a>
                  <a href="javascript:void(0);" @click="confirmLogout" class="dropdown-item"><i class="fa fa-sign-out fa-fw mr-2"></i> 退出</a>
                </div>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link :to="{ name: 'auth.login' }" class="nav-link">登录</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'auth.register' }" class="nav-link">注册</router-link>
              </li>
            </template>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['isLogged', 'currentUser'])
  },
  methods: {
    ...mapActions(['logout']),
    confirmLogout() {
      this.$confirm('您确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.logout()
        this.$message('记得要回来哦~')
      }).catch(() => {
        // 取消
      });
    }
  }
}
</script>

<style scoped lang="scss">
  .topnav {
    border-top: 3px solid #f4645f;
    background-color: #fff;
    box-shadow: 0 1px 11px 2px rgba(42,42,42,.1);
  }
  .navbar-avatar {
    width: 30px;
    height: 30px;
  }
  .nabvar-notification-count {
    width: 20px;
    line-height: 20px;
    margin-left: -10px;
    margin-top: -10px;
    vertical-align: top;
    height: 20px;
    padding: 0px;
    border-radius: 50%;
  }
  .dropdown-item {
    color: #777;
    padding: 0.82rem 1.5rem;
  }
  a.create-article_btn {
    color: #b3b3b3;
    font-size: 18px;
    margin-top: 5px;
    display: block;
    margin-right: 5px;
    padding: 5px
  }
  a.create-article_btn:hover {
    color: #212529;
  }
</style>
