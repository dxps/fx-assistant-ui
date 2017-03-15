
<template>

  <div>

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"><h1>{{ msg }}</h1></div>
        <br/><br/>
      </el-col>
    </el-row>

    <!-- CURRENCY 1 -->

    <el-row type="flex" justify="center" :gutter="10">
      <el-col :span="5">
        <el-select
           size="large" filterable
           v-model="currency1Label" placeholder="Select Currency"
           @change="handleChangeCurrency1Label(currency1Label)">
          <el-option
            v-for="currency in currencies"
              :label="currency.symbol"
              :value="currency.symbol"
              :key="'c1_' + currency.value"
              class="no_inline">
              <span style="float: left">{{ currency.symbol }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ currency.label }}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
         <el-input-number
            v-model="currency1Value"
            :min="0" :max="10000" size="large"
            :controls="!isCurrency1ValueReadOnly"
            @change="handleChangeCurrency1Value">
         </el-input-number>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" class="paddingtopbottom20px">
         <el-button-group>
           <el-button
               :type="getOperationButtonType('buy')"
               class="stdfont"
               @click="setOperation('buy')">&nbsp; BUY</el-button>
           <el-button
               :type="getOperationButtonType('sell')"
               class="stdfont"
               @click="setOperation('sell')">&nbsp; SELL</el-button>
         </el-button-group>
      </el-col>
    </el-row>

    <!-- CURRENCY 2 -->

    <el-row type="flex" justify="center" :gutter="10">
      <el-col :span="5">
        <el-select
           size="large" filterable
           v-model="currency2Label"
           placeholder="Select Currency"
           @change="handleChangeCurrency2Label(currency2Label)">
          <el-option
            v-for="currency in currencies"
              :label="currency.symbol"
              :value="currency.symbol"
              :key="'c2_' + currency.value"
              class="no_inline">
              <span style="float: left">{{ currency.symbol }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ currency.label }}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
         <el-input-number
            :value="currency2Value"
            :controls="false" size="large"
            @change="handleChangeCurrency2Value">
         </el-input-number>
      </el-col>
    </el-row>

  </div>

</template>


// ____________________________________________________________________________


<script>

import Vue from 'vue'
import { Row, Col, ButtonGroup, Button, Input, InputNumber, Select, Option } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import axios from 'axios'

locale.use(lang)

Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(ButtonGroup.name, ButtonGroup)
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)

export default {

  name: 'FxAssistantMain',

  data () {

    return {
      msg: 'FX Assistant',
      operation: 'buy',
      currencies: [],
      currency1Label: '',
      currency1Value: 0,
      currency2Label: '',
      currency2Value: 0,
      apiUrl: 'http://localhost:8080'
    }

  },

  mounted() {

     console.log("mounted > First, let's fetch the currencies.");
     axios.defaults.baseURL = this.apiUrl;
     this.fetchCurrencies();
     console.log("mounted > isCurrency1ValueReadOnly is", this.isCurrency1ValueReadOnly);
  },

  methods: {

        getOperationButtonType(label) {
          return (this.operation === label) ? 'primary' : 'default';
        },

        setOperation(section) {
           this.operation = section;
           console.log("Operation is", this.operation);
           this.exchange();
        },

        handleChangeCurrency1Label(value) {
           console.log("handleChangeCurrency1Label > value =", value);
           this.exchange();
        },

        handleChangeCurrency1Value(value) {
           this.currency1Value = value;
           console.log("handleChangeCurrency1Value > Currency 1 is", value);
           this.exchange();
        },

        handleChangeCurrency2Label(value) {
           console.log("handleChangeCurrency2Label > value =", value);
           this.exchange();
        },

        handleChangeCurrency2Value(value) {
           console.log("handleChangeCurrency2Value > value =", value);
           this.exchange();
        },

        fetchCurrencies() {
           axios.get('/exchangeRates/today')
              .then(response => {
                 let currencies = [];
                 response.data.forEach(item => {
                    currencies.push({ symbol: item.currency.symbol, label: item.currency.label });
                 });
                 this.currencies = currencies;
                 console.log('mounted >', this.currencies.length, "currencies were fetched.");
              });
        },

        exchange() {
           // check if both currencies were chosen
           if ( ('' !== this.currency1Label) && ('' !== this.currency2Label)
                && ( this.currency1Value > 0)) {
           let actionUrl = '/' + this.operation + '/' + this.currency1Label
                         + '/' + this.currency2Label + '/' + this.currency1Value;
           console.log('(exchange) actionUrl:', actionUrl);
           axios.get(actionUrl)
                .then(response => {
                    console.log('(exchange) response.data.resultInOnline :', response.data.resultInOnline);
                    this.currency2Value = response.data.resultInOnline;
                });
           }
        }

  },

  computed: {

     isCurrency1ValueReadOnly() {
        return ('' === this.currency1Label);
     },

     isCurrency2ValueReadOnly() {
        return ('' === this.currency2Label);
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

.alignright {
   position: absolute;
   right: 0px;
}

.paddingtopbottom20px {
   padding: 20px 0;
}

.readonly {
   background-color: white !important;
   border-color: #8391a5;
   color: #1f2d3d;
}

</style>
