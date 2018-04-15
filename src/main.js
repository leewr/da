// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueToast from '@/components/Toast'

Vue.config.productionTip = false

const components = [
  VueToast
]

const install = Vue => {
  components.forEach(Compontent => {
    Vue.use(Compontent)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
