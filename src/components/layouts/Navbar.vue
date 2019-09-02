<template>
  <div class="topnav">
    <div class="container">
      <Menu mode="horizontal" active-name="1" style="padding-top: 5px;">
        <div class="header-logo"></div>
        <div class="header-nav">
            <MenuItem name="1">
                <Icon type="ios-home" size="16" />
                全部
            </MenuItem>
            <MenuItem name="2">
                <Icon type="ios-bulb" size="16" />
                技术
            </MenuItem>
            <MenuItem name="3">
                <Icon type="ios-body" size="16" />
                健身
            </MenuItem>
            <MenuItem name="4">
                <Icon type="ios-brush" size="16" />
                其他
            </MenuItem>
        </div>
        <div class="header-nav float-right">
          <Submenu name="6">
            <template slot="title">
              <Badge :count="1" class="avatar-badge-count">
                <img class="avatar" src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
              </Badge>
              <span class="auth-name">foobar</span>
            </template>
            <MenuItem name="6-1">
              <Icon type="ios-mail" size="16" /> 我的消息 <Badge :count="1" class="mail-badge-count"></Badge>
            </MenuItem>
            <MenuItem name="6-2">
              <Icon type="ios-heart" size="16" /> 我的收藏
            </MenuItem>
            <MenuItem name="6-3">
              <Icon type="ios-person" size="16" /> 个人中心
            </MenuItem>
            <MenuItem name="6-3">
              <Icon type="ios-settings" size="16" /> 编辑资料
            </MenuItem>
            <MenuItem name="6-3">
              <Icon type="md-log-out" size="16" /> 退出
            </MenuItem>
          </Submenu>
        </div>
      </Menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
  .topnav {
    background-color: #fff;
    box-shadow: 0 1px 11px 2px rgba(42,42,42,.1);
  }
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu {
    height: 55px;
  }
  .ivu-menu-horizontal.ivu-menu-light:after {
    height: 0px;
  }
  .avatar {
    width: 30px;
    height: 30px;
    margin-top: -25px;
    border-radius: 50%;
  }
  .avatar-badge-count {
    height:40px;
    vertical-align:middle;
    display:inline-block;
    margin-right: 8px;
  }
  .mail-badge-count {
    margin-left: 3px;
    height: 16px;
    min-width: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 8px;
  }
</style>
