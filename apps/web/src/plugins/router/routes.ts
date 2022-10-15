import { RouterOptions } from 'vue-router'

export const routes: RouterOptions['routes'] = [
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
