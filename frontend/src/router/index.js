import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/landingview.vue'
import LoginView from '../views/loginview.vue'
import profileSelectView from '../views/profileselectview.vue'
import RegisterView from '../views/registerview.vue'
import EmpresaHome from '../views/home/empresahome.vue'
import TrabajadorHome from '../views/home/trabajadorhome.vue'
import PasajeroHome from '../views/home/pasajerohome.vue'



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
    path: '/register/:role',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: profileSelectView,
  },
{
  path: '/home',
  redirect: () => {
    const userRole = null // placeholder, luego viene del store de auth
    if (userRole === 'empresa') return { name: 'home-empresa' }
    if (userRole === 'trabajador') return { name: 'home-trabajador' }
    if (userRole === 'pasajero') return { name: 'home-pasajero' }
    return { name: 'login' } // si no hay rol reconocido, a loguearse
  },
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