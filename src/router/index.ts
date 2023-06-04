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
    },
    {
      path: '/RankPage',
      name: 'RankPage',
      component: () => import('@/views/RankPage.vue')
    },
    {
      path: '/HotPage',
      name: 'HotPage',
      component: () => import('@/views/HotPage.vue')
    },
    {
      path: '/StockPage',
      name: 'StockPage',
      component: () => import('@/views/StockPage.vue')
    }
  ]
})

export default router
