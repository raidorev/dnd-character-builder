import { createRouter, createWebHashHistory } from 'vue-router'

import { useAuth } from '@/stores/auth'

import { routes } from './routes'

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
