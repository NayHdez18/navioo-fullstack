import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/landingview.vue'
import LoginView from '../views/loginview.vue'
import HomeView from '../views/homeview.vue'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }, // solo accesible si hay sesión activa
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard: protege /home de accesos sin login.
// Por ahora isLoggedIn es un placeholder fijo en false;
// cuando armemos stores/auth.js lo conectamos al estado real.
router.beforeEach((to, from, next) => {
  const isLoggedIn = false

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router