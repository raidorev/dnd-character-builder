import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue'),
  },
  {
    path: '/:pathMathch(.*)*',
    name: 'not-found',
    component: () => import('../views/not-found.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
