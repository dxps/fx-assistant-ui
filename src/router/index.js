import Vue from 'vue'
import Router from 'vue-router'
import FxAssistantMain from '@/components/FxAssistantMain'

Vue.use(Router);

export default new Router({
  
  mode: 'history',
  
  routes: [
    
    {
      path: '/',
      name: 'FxAssistantMain',
      component: FxAssistantMain
    },
  
  ]
  
})
