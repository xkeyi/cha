<template>
  <div class="wrap">
    <navbar />

    <div class="container main-content">
      <router-view />
    </div>
    
    <foobar />
  </div>
</template>

<script>
import Navbar from '@/components/layouts/Navbar'
import Foobar from '@/components/layouts/Foobar'
export default {
  name: 'app',
  components: {
    Navbar,
    Foobar
  }
}
</script>

<style>
  html {
    position: relative;
    min-height: 100%;
  }
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #eef0f3;
  }
  #wrap {
    position: relative;
    min-height: 100%;
    overflow: hidden;
  }
  .main-content{
    min-height: 100%;
    padding-bottom: 60px;
  }
</style>
