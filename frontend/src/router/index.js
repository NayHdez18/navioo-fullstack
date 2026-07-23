import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/landingview.vue'
import LoginView from '../views/loginview.vue'
import profileSelectView from '../views/profileselectview.vue'
import RegisterView from '../views/registerview.vue'
import DriverHomeView from '@/views/DriverHomeView.vue'
import companyHomeview from '@/views/companyHomeview.vue'
import manageRoutesView from '@/views/manageRoutesView.vue'
import PassengerHomeView from '@/views/PassengerHomeView.vue'

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
    component: companyHomeview,
    meta: { requiresAuth: true, role: 'empresa' }
  },
  {
    path: '/gestionar-rutas',
    name: 'ManageRoutes',
    component: manageRoutesView,
    meta: { requiresEmpresa: true } 
  },
  {
    path: '/passengerhomeview',
    name: 'passengerhomeview',
    component: PassengerHomeView,
    meta: { requiresAuth: true, role: 'pasajero' }
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
  if (to.meta.role && usuario?.designation !== to.meta.role) {
    // Redirigir a su pantalla correspondiente si intenta acceder a otra
    if (usuario?.designation === 'empresa') return next('/companyhomeview');
    if (usuario?.designation === 'pasajero') return next('/passengerhomeview');
    return next('/login');}
});

export default router