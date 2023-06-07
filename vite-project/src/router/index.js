import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from "../supabase";
import { useSessionStore } from '../stores/session'

async function getOldSession() {
  const sessionStore = useSessionStore()
  await supabase.auth.getSession().then(({ data }) => {
    sessionStore.session.value = data.session;
  });
  await supabase.auth.onAuthStateChange((_, _session) => {
    sessionStore.session.value = _session;
  });
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LogInView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'resister',
      component: () => import('../views/RegisterView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: () => import('../views/ConfirmView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('../views/PostView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import('../views/AccountView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/people',
      name: 'people',
      component: () => import('../views/PeopleView.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach(async (to, from) => {
  await getOldSession();
  const sessionStore = useSessionStore()
  if (to.meta.requiresAuth && !sessionStore.session.value) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
})

export default router
