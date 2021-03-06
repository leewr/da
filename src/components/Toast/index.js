import Vue from 'vue'
import VueToast from './toast'
import { isObj } from '../utils'
const defaultOptions = {
  type: 'text',
  mask: false,
  message: '',
  duration: 3000,
  position: 'middle',
  forbidClick: false,
  overlayStyle: {}
}
const parseOptions = message => isObj(message) ? message : { message }
let queue = []
let singleton = true
let currentOptions = {...defaultOptions}
function createInstance() {
  if (!queue.length || !singleton) {
    const toast = new (Vue.extend(VueToast))({
      el: document.createElement('div')
    })
    document.body.appendChild(toast.$el)
    queue.push(toast)
  }
  return queue[queue.length - 1]
}

// 转换toast options 为 popup props
function transformer(options) {
  options.overlay = options.mask
  if (options.forbidClick && !options.overlay) {
    options.overlay = true
    options.overlayStyle = {background: 'transparent'}
  }
  return options
}

function Toast(options = {}) {
  const toast = createInstance()
  options = {
    ...currentOptions,
    ...parseOptions(options),
    clear() {
      toast.value = false
    }
  }
  Object.assign(toast, transformer(options))
  clearTimeout(toast.timer)
  if (options.duration > 0) {
    toast.timer = setTimeout(() => {
      toast.clear()
    }, options.duration)
  }
  return toast
}
const createMethod = type => options => Toast({
  type, ...parseOptions(options)
});
['loading', 'success', 'fail'].forEach(method => {
  Toast[method] = createMethod(method)
})

Toast.clear = all => {
  if (queue.length) {
    queue.forEach(toast => {
      toast.clear()
    })
    queue = []
  } else if (singleton) {
    queue[0].clear()
  } else {
    queue.shift().clear()
  }
}

Toast.install = () => {
  Vue.use(VueToast)
}

Vue.prototype.$toast = Toast

export default Toast
