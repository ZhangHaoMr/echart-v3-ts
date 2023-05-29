import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/SellerPage'
    },
    {
      path: '/SellerPage',
      name: 'SellerPage',
      component: () => import('@/views/SellerPage.vue')
    }
  ]
})

export default router
