import { createWebHistory, createRouter } from 'vue-router'
import LoginTemplate from '../templates/LoginTemplate.vue'
import HomeTemplate from '../templates/HomeTemplate.vue'
import NotFound from '../templates/NotFoundTemplate.vue'

const routes = [
  { path: '/login', component: LoginTemplate },
  { path: '/', component: HomeTemplate },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})