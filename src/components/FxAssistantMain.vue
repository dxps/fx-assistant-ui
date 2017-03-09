<template>

  <div>
    <div class="hello">
      <h1>{{ msg }}</h1>
    </div>

    <el-button type="primary">Primary Button</el-button>
  </div>

</template>



<script>

import Vue from 'vue'
import { Button, Select } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)

export default {
  name: 'hello',
  data () {
    return {
      msg: 'FX Assistant'
    }
  }
}

</script>



<style scoped>

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
