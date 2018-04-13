import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import pullRefreshdemo from '@/page/index'
import popupdemo from '@/page/overlay'
import swipe from '@/page/swipePage'
import picker from '@/page/picker'
import Toast from '@/page/toast'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pull-refresh-demo',
      name: 'pull-refresh-demo',
      component: pullRefreshdemo
    },
    {
      path: '/popup',
      name: 'popup',
      component: popupdemo
    },
    {
      path: '/swipe',
      name: 'swipe',
      component: swipe
    },
    {
      path: '/picker',
      name: 'picker',
      component: picker
    },
    {
      path: '/Toast',
      name: 'Toast',
      component: Toast
    }
  ]
})
