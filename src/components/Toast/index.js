import Vue from 'vue'
import VueToast from './toast'
Toast.install = () => {
  Vue.use(VueToast)
}

Vue.prototype.$toast = Toast

export default Toast