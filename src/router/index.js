import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import pullRefreshdemo from '@/page/index'

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
    }
  ]
})
