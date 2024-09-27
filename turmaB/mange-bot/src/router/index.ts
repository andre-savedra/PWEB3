import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BuildView from '@/views/BuildView.vue'
import CartView from '@/views/CartView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/build',
      name: 'build',
      component: BuildView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    },
  ]
})

export default router
