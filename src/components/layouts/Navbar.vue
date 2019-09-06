<template>
  <div class="topnav">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="#">The Cha</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <router-link :to="{ name: 'home' }" class="nav-item">
              <a class="nav-link" href="javascript:void(0);">首页</a>
            </router-link>
            <li class="nav-item">
              <a class="nav-link" href="#">技术</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">健身</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">其他</a>
            </li>
          </ul>

          <!-- Right Side Of Navbar -->
          <ul class="navbar-nav navbar-right">
            <template v-if="isLogged">
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
                  <a href="" class="dropdown-item"><i class="fa fa-sign-out fa-fw mr-2"></i> 退出</a>
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
  }
}
</script>

<style scoped lang="scss">
  .topnav {
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
</style>
