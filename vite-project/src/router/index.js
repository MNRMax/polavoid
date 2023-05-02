import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LogInView.vue')
    },
    {
      path: '/register',
      name: 'resister',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: () => import('../views/ConfirmView.vue')
    }
  ]
})

export default router
