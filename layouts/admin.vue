<template>
  <el-container>
    {{ routers }}
    <el-header height="45px">Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      routers: {}
    }
  },
  created () {
    this.routers = this.$route
  }
}
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.el-header {background: #FFF; box-shadow: 2px 2px 10px rgba(0,0,0,0.2)}
.el-aside {background: #FFF; border-right: 2px solid #EEE}
.el-aside {min-height: 94vh}
</style>
