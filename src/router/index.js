import { createRouter, createWebHistory } from 'vue-router'
import SwapView from '../views/SwapView.vue'
import PoolView from '../views/PoolView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'swap',
      component: SwapView
    },
    {
      path: '/pool',
      name: 'pool',
      component: PoolView
    }
  ]
})

export default router
