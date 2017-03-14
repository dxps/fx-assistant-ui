
<template>

  <div>

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"><h1>{{ msg }}</h1></div>
        <el-button-group>
          <el-button
              :type="getSectionButtonType('exchange')"
              class="stdfont"
              icon="menu" @click="handleActiveSection('exchange')">&nbsp; EXCHANGE</el-button>
          <el-button
              :type="getSectionButtonType('about')"
              class="stdfont"
              icon="information" @click="handleActiveSection('about')">&nbsp; ABOUT</el-button>
        </el-button-group>
        <br/><br/><br/>
      </el-col>
    </el-row>

    <!-- CURRENCY 1 -->

    <el-row type="flex" justify="center" :gutter="10">
      <el-col :span="6">
        <el-select
           size="large" filterable
           v-model="currency1_label" placeholder="Select Currency"
           @change="handleChangeCurrency1Label(currency1_label)">
          <el-option
            v-for="currency in currencies"
              :label="currency.label"
              :value="currency.value"
              :key="'c1_' + currency.value"
              class="no_inline">
              <span style="float: left">{{ currency.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ currency.desc }}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
         <el-input-number
            v-model="currency1_value" :min="0" :max="10000" size="large"
            @change="handleChangeCurrency1Value"
            :disabled="isCurrency1ValueReadOnly">
         </el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
          <img src="/static/images/updown-2-light-silver.png" class="updown">
      </el-col>
    </el-row>

    <!-- CURRENCY 2 -->

    <el-row type="flex" justify="center" :gutter="10">
      <el-col :span="5">
        <el-select
           size="large"
           v-model="currency2_label" placeholder="Select Currency"
           @change="handleChangeCurrency2Label(currency2_label)">
          <el-option
            v-for="currency in currencies"
              :label="currency.label"
              :value="currency.value"
              :key="'c2_' + currency.value"
              class="no_inline">
              <span style="float: left">{{ currency.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ currency.desc }}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
         <el-input-number
            v-model="currency2_value" :min="0" :max="10000" size="large"
            @change="handleChangeCurrency2Value"
            :disabled="isCurrency2ValueReadOnly">
         </el-input-number>
      </el-col>
    </el-row>

  </div>

</template>

// ____________________________________________________________________________

<script>

import Vue from 'vue'
import { Row, Col, ButtonGroup, Button, InputNumber, Select, Option } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(ButtonGroup.name, ButtonGroup)
Vue.component(Button.name, Button)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)

export default {

  name: 'FxAssistantMain',

  data () {

    let currencies = [
      { value: 'EUR', desc: 'Euro' },
      { value: 'USD', desc: 'US Dollar' },
      { value: 'RON', desc: 'Romanian Leu' }
    ];

    return {
      msg: 'FX Assistant',
      activeSection: 'exchange',
      currencies: currencies,
      currency1_label: '',
      currency1_value: '',
      currency2_label: '',
      currency2_value: ''
    }

  },

  methods: {

        getSectionButtonType(label) {
          return (this.activeSection === label) ? 'primary' : 'default';
        },

        handleActiveSection(section) {
           this.activeSection = section;
        },

        handleChangeCurrency1Label(value) {
           console.log("handleChangeCurrency1Label > value =", value);
        },

        handleChangeCurrency1Value(value) {
           this.currency1_value = value;
           console.log("handleChangeCurrency1Value > value =", value ,
                       "with currency1_label =", this.currency1_label);
        },

        handleChangeCurrency2Label(value) {
           console.log("handleChangeCurrency2Label > value =", value);
        },

        handleChangeCurrency2Value(value) {
           console.log("handleChangeCurrency2Value > value =", value,
                       "with currency2_label =", this.currency2_label);
        }

  },

  computed: {

     isCurrency1ValueReadOnly() {
        return ('' === this.currency1_label);
     },

     isCurrency2ValueReadOnly() {
        return ('' === this.currency2_label);
     },

  }

}

</script>

// ____________________________________________________________________________

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

.no_inline {
  display: block;
}

.updown {
   width: 30px;
   height: 30px;
}

.stdfont {
   font-family: 'Dosis', sans-serif;
}

</style>
