import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home-view.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
