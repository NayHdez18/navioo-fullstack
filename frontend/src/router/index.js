import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/landingview.vue'
import LoginView from '../views/loginview.vue'
import HomeView from '../views/homeview.vue'
import RegisterView from '../views/registerview.vue'
import DriverHomeView from '@/views/DriverHomeView.vue'
import companyHomeview from '@/views/companyHomeview.vue'

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
  {
    path: '/registerview',
    name: 'registerview',
    component: RegisterView,
  },
  {
    path: '/driverhomeview',
    name: 'driverhomeview',
    component: DriverHomeView
  },
  {
     path: '/companyhomeview',
    name: 'companyhomeview',
    component: companyHomeview
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard: protege /home de accesos sin login.
// Por ahora isLoggedIn es un placeholder fijo en false;
// cuando armemos stores/auth.js lo conectamos al estado real.
router.beforeEach((to, from, next) => {
  const isLoggedIn = true

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router