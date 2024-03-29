import Vue from 'vue'
import Router from 'vue-router'
import SignUpForm from '@/components/Auth/SignUpForm'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      component: SignUpForm
    }
  ]
})

export default router
