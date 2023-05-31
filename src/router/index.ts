import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   redirect: '/SellerPage'
    // },
    {
      path: '/SellerPage',
      name: 'SellerPage',
      component: () => import('@/views/SellerPage.vue')
    },
    {
      path: '/TrendPage',
      name: 'TrendPage',
      component: () => import('@/views/TrendPage.vue')
    },
    {
      path: '/MapPage',
      name: 'MapPage',
      component: () => import('@/views/MapPage.vue')
    }
  ]
})

export default router
