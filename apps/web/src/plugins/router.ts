import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

import { useAuth } from '@/stores/auth'

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/auth.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found.vue'),
    meta: {
      requiresAuth: false,
    },
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuth()

  if (to.meta.requiresAuth && !auth.isSignedIn) {
    return {
      name: 'auth',
      query: { redirect: to.fullPath },
    }
  }
})
