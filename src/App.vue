
<template>

  <div id="app">
    <router-view></router-view>
  </div>

</template>

// ____________________________________________________________________________

<script>

export default {
  name: 'app'
}

</script>

// ____________________________________________________________________________

<style>

html, .el-input__inner {
  font-family: 'Dosis',sans-serif;
}

#app {
  font-family: 'Dosis', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}

</style>
