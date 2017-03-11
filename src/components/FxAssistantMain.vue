<template>

  <div>

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"><h1>{{ msg }}</h1></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="20" :offset="2">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="User" name="first">User</el-tab-pane>
            <el-tab-pane label="Config" name="second">Config</el-tab-pane>
            <el-tab-pane label="Role" name="third">Role</el-tab-pane>
            <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-button type="primary">Primary Button</el-button>
  </div>

</template>



<script>

import Vue from 'vue'
import { Row, Col, Tabs, TabPane, Button, Select } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)

export default {

  name: 'hello',

  data () {
    return {
      msg: 'FX Assistant',
      activeName: 'first'
    }
  },

  methods: {

        handleClick(tab, event) {
          console.log(tab, event);
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
