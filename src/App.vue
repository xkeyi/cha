<template>
  <div class="wrap">
    <navbar />

    <div class="container main-content mt-4">
      <router-view />
    </div>

    <foobar />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Foobar from '@/components/Foobar'
export default {
  name: 'app',
  components: {
    Navbar,
    Foobar
  }
}
</script>

<style lang="scss">
</style>
