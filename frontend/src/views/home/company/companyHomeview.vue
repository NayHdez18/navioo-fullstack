<template>
  <div class="passenger-container">
    <!-- SIDEBAR / BARRA LATERAL -->
    <aside class="sidebar">
        <div class="logo-wrap">
          <img src="../assets/images/NAVIO.svg" alt="Navioo" class="register-logo" />
          <span class="logo-subtitle">Workplace</span>
        </div>

      <div class="user-avatar-card">
        <div class="avatar-placeholder">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#CBD5E1">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </div>
      </div>

      <!-- BOTONES DEL MENÚ -->
      <nav class="sidebar-menu">
        <button class="yellow-btn" :class="{ active: activeTab === 'rastrear' }" @click="changeTab('rastrear')">
          Rastrear unidad
        </button>

        <button class="yellow-btn" :class="{ active: activeTab === 'rutas' }" @click="changeTab('rutas')">
          Tus rutas
        </button>

        <button class="yellow-btn" :class="{ active: activeTab === 'mapa' }" @click="changeTab('mapa')">
          Mapa
        </button>

        <button class="yellow-btn" :class="{ active: activeTab === 'horarios' }" @click="changeTab('horarios')">
          Horarios
        </button>
      </nav>
    </aside>

    <!-- ÁREA PRINCIPAL DERECHA -->
    <main class="main-wrapper">
      <header class="topbar">
        <div class="search-box">
          <input type="text" placeholder="Buscar..." v-model="searchQuery" />
          <button class="search-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F4C5C" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </div>

        <div class="topbar-icons">
          <button class="icon-btn" title="Notificaciones">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>

          <button class="icon-btn" title="Ajustes" @click="showSettings = true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>

          <button class="icon-btn" title="Perfil">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- TARJETA BLANCA PRINCIPAL -->
      <div class="content-card">
        <!-- VISTA DE MAPA Y RASTREO -->
        <div v-show="activeTab === 'mapa' || activeTab === 'rastrear'" class="map-container">
          <div id="passenger-map" class="real-map"></div>
        </div>

        <!-- VISTA TUS RUTAS -->
        <div v-show="activeTab === 'rutas'" class="routes-container">
          <div class="header-action">
            <div>
              <h2 class="section-title">Gestión de Rutas</h2>
              <p class="section-sub">Administra o selecciona una ruta para verla en el mapa:</p>
            </div>
            <button class="btn-create" @click="openCreateModal">➕ Nueva Ruta</button>
          </div>
          
          <div class="routes-list">
            <div 
              v-for="route in filteredRoutes" 
              :key="route._id || route.id"
              class="route-card"
              :class="{ active: selectedRoute?.id === route.id || selectedRoute?._id === route._id }"
            >
              <div class="route-badge" :style="{ backgroundColor: route.color }">
                {{ route.code }}
              </div>
              <div class="route-info">
                <h3>{{ route.name }}</h3>
                <p>📍 <strong>Origen:</strong> {{ route.startName }}</p>
                <p>🏁 <strong>Destino:</strong> {{ route.endName }}</p>
                <p>🚘 <strong>Chófer:</strong> {{ route.driverName }}</p>
              </div>
              
              <div class="card-actions">
                <button class="btn-select-route" @click="drawStreetRoute(route)">Ver 🗺️</button>
                <button class="btn-edit-route" @click="openEditModal(route)">✏️ Editar</button>
                <button class="btn-delete-route" @click="deleteRoute(route._id || route.id)">🗑️</button>
              </div>
            </div>
          </div>
        </div>

        <!-- VISTA HORARIOS -->
        <div v-show="activeTab === 'horarios'" class="feed-container">
          <div class="post-card">
            <h3>⏰ Horarios de Servicio</h3>
            <p>Lunes a Viernes: 06:00 AM - 11:00 PM</p>
            <p>Sábados y Domingos: 07:00 AM - 10:00 PM</p>
          </div>
        </div>
      </div>
    </main>

    <!-- MODAL CREAR / EDITAR -->
    <div v-if="showCrudModal" class="crud-modal-overlay">
      <div class="crud-modal-card">
        <h3>{{ isEditing ? 'Editar Ruta' : 'Crear Nueva Ruta' }}</h3>
        
        <form @submit.prevent="saveRoute" class="crud-form">
          <div class="form-group">
            <label>Código de Ruta:</label>
            <input type="text" v-model="formRoute.code" placeholder="Ej. R-04" required />
          </div>

          <div class="form-group">
            <label>Nombre:</label>
            <input type="text" v-model="formRoute.name" placeholder="Ej. Ruta Centro - Hospital" required />
          </div>

          <div class="form-group">
            <label>Nombre Origen:</label>
            <input type="text" v-model="formRoute.startName" placeholder="Ej. Estación Central" required />
          </div>

          <div class="form-group">
            <label>Nombre Destino:</label>
            <input type="text" v-model="formRoute.endName" placeholder="Ej. Av. Constituyentes" required />
          </div>

          <!-- DESPLEGABLE DE CHÓFER (DISPONIBLE TANTO PARA CREAR COMO EDITAR) -->
          <div class="form-group">
            <label>Chófer Asignado:</label>
            <select v-model="formRoute.driverid" class="select-input">
              <option value="">-- Sin chófer asignado --</option>
              <option v-for="driver in availableDrivers" :key="driver._id" :value="driver._id">
                {{ driver.name }} {{ driver.lastname }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Color en Mapa:</label>
            <input type="color" v-model="formRoute.color" class="color-picker" />
          </div>

          <div class="crud-modal-actions">
            <button type="button" class="btn-cancel" @click="showCrudModal = false">Cancelar</button>
            <button type="submit" class="btn-save">{{ isEditing ? 'Actualizar' : 'Guardar' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- OVERLAY MÁSCARA Y DRAWER AJUSTES -->
    <div v-if="showSettings" class="overlay" @click="closeAll"></div>

    <aside class="settings-drawer" :class="{ open: showSettings }">
      <div class="settings-header">
        <button class="back-circle-btn" @click="showSettings = false" title="Volver">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <h2>Ajustes</h2>
      </div>

      <div class="settings-body">
        <ul class="settings-menu">
          <li><span class="menu-icon">👤</span> Mi Perfil</li>
          <li><span class="menu-icon">🔔</span> Notificaciones</li>
          <li><span class="menu-icon">❓</span> Ayuda y Soporte</li>
          <li class="logout-item" @click="openLogoutModal">
            <span class="menu-icon">🚪</span> Cerrar sesión
          </li>
        </ul>
      </div>
    </aside>

    <!-- MODAL LOGOUT -->
    <div v-if="showLogoutModal" class="logout-modal-overlay">
      <div class="logout-modal-card">
        <div class="modal-icon-circle">🚪</div>
        <h3>¿Deseas cerrar sesión?</h3>
        <p>Tendrás que ingresar nuevamente tus credenciales para continuar.</p>

        <div class="logout-actions">
          <button type="button" class="btn-cancel" @click="showLogoutModal = false">Cancelar</button>
          <button type="button" class="btn-confirm" @click="handleLogout">Cerrar sesión</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const router = useRouter()

const searchQuery = ref('')
const activeTab = ref('mapa')
const showSettings = ref(false)
const showLogoutModal = ref(false)

const API_URL = 'http://localhost:5000/api/rutas'
const USERS_URL = 'http://localhost:5000/api/usuarios'

// VARIABLES CRUD Y MODAL
const showCrudModal = ref(false)
const isEditing = ref(false)
const availableDrivers = ref([])

const formRoute = ref({
  id: null,
  _id: null,
  code: '',
  name: '',
  startName: '',
  endName: '',
  driverid: '',
  color: '#14CBA8',
  startCoords: [20.6314, -87.0728],
  endCoords: [20.6480, -87.0865]
})

let mapInstance = null
let currentRoutingControl = null
const selectedRoute = ref(null)
const availableRoutes = ref([])

// CAMBIO DE PESTAÑA CON RE-CALCULO DEL MAPA
const changeTab = (tabName) => {
  activeTab.value = tabName
  if (tabName === 'mapa' || tabName === 'rastrear') {
    setTimeout(() => {
      if (mapInstance) {
        mapInstance.invalidateSize()
      }
    }, 100)
  }
}

// OBTENER CHOFERES DESDE MONGODB
const fetchDrivers = async () => {
  try {
    const response = await axios.get(`${USERS_URL}?designation=trabajador`)
    availableDrivers.value = response.data
  } catch (error) {
    console.error("Error al obtener chóferes:", error)
  }
}

// OBTENER RUTAS DESDE MONGODB
const fetchRoutes = async () => {
  try {
    const response = await axios.get(API_URL)
    availableRoutes.value = response.data.map(route => {
      // Extrae de forma segura el ID del chófer sea objeto o string
      const driverId = route.driver?._id || route.driverid || (typeof route.driver === 'string' ? route.driver : '')
      const driverName = route.driver && typeof route.driver === 'object' && route.driver.name 
        ? `${route.driver.name} ${route.driver.lastname}`
        : 'Sin asignar'

      return {
        _id: route._id,
        code: route.code || 'R-00',
        name: route.nameroute || route.name,
        startName: route.startName || 'Origen',
        endName: route.endName || 'Destino',
        driverid: driverId,
        driverName: driverName,
        color: route.color || '#14CBA8',
        startCoords: route.startCoords || [20.6314, -87.0728],
        endCoords: route.endCoords || [20.6480, -87.0865]
      }
    })
  } catch (error) {
    console.error("Error al obtener las rutas de la BD:", error)
  }
}

// BUSCADOR FILTRADO
const filteredRoutes = computed(() => {
  if (!searchQuery.value) return availableRoutes.value
  return availableRoutes.value.filter(r => 
    r.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    r.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    r.driverName.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// MÉTODOS CRUD CON AXIOS
const openCreateModal = () => {
  isEditing.value = false
  formRoute.value = {
    id: null,
    _id: null,
    code: '',
    name: '',
    startName: '',
    endName: '',
    driverid: '',
    color: '#14CBA8',
    startCoords: [20.6314, -87.0728],
    endCoords: [20.6480, -87.0865]
  }
  showCrudModal.value = true
}

// PREPARAR DATOS PARA EDITAR (INCLUYENDO CHÓFER)
const openEditModal = (route) => {
  isEditing.value = true
  formRoute.value = { 
    ...route,
    driverid: route.driverid || ''
  }
  showCrudModal.value = true
}

const saveRoute = async () => {
  try {
    const payload = {
      name: formRoute.value.name,
      code: formRoute.value.code,
      color: formRoute.value.color,
      startName: formRoute.value.startName,
      endName: formRoute.value.endName,
      driverid: formRoute.value.driverid || null,
      startCoords: formRoute.value.startCoords,
      endCoords: formRoute.value.endCoords
    }

    if (isEditing.value) {
      await axios.put(`${API_URL}/${formRoute.value._id}`, payload)
    } else {
      await axios.post(API_URL, payload)
    }

    showCrudModal.value = false
    await fetchRoutes() // Recarga rutas y refresca chófer asignado
  } catch (error) {
    console.error("Error al guardar la ruta en MongoDB:", error.response?.data || error)
  }
}

const deleteRoute = async (id) => {
  if (confirm("¿Estás seguro de eliminar esta ruta?")) {
    try {
      await axios.delete(`${API_URL}/${id}`)
      await fetchRoutes()
    } catch (error) {
      console.error("Error al eliminar la ruta:", error)
    }
  }
}

// DIBUJAR EN MAPA
const drawStreetRoute = (route) => {
  selectedRoute.value = route
  changeTab('mapa')

  setTimeout(() => {
    if (!mapInstance) return

    if (currentRoutingControl) {
      mapInstance.removeControl(currentRoutingControl)
      currentRoutingControl = null
    }

    currentRoutingControl = L.Routing.control({
      waypoints: [
        L.latLng(route.startCoords[0], route.startCoords[1]),
        L.latLng(route.endCoords[0], route.endCoords[1])
      ],
      lineOptions: {
        styles: [{ color: route.color, weight: 6, opacity: 0.85 }]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false
    }).addTo(mapInstance)
  }, 150)
}

const openLogoutModal = () => {
  showSettings.value = false
  showLogoutModal.value = true
}

const closeAll = () => {
  showSettings.value = false
  showLogoutModal.value = false
}

const handleLogout = () => {
  localStorage.removeItem('usuario')
  localStorage.removeItem('token')
  showLogoutModal.value = false
  router.push('/login')
}

onMounted(() => {
  mapInstance = L.map('passenger-map').setView([20.6314, -87.0728], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(mapInstance)

  L.marker([20.6314, -87.0728])
    .addTo(mapInstance)
    .bindPopup('<b>Tu posición actual</b>')

  fetchDrivers()
  fetchRoutes()
})
</script>

<style scoped>
/* ESTILOS Y COLORES BASE */
.passenger-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #14CBA8;
  overflow: hidden;
  font-family: system-ui, -apple-system, sans-serif;
}

.sidebar {
  width: 240px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.logo {
  width: 110px;
  margin-bottom: 1.5rem;
}

.user-avatar-card {
  width: 110px;
  height: 110px;
  background: #E2E8F0;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  align-items: center;
}

.yellow-btn {
  width: 100%;
  max-width: 180px;
  background-color: #FAD02C;
  color: #1A202C;
  border: none;
  padding: 0.8rem 1rem;
  border-radius: 25px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, background-color 0.2s;
}

.yellow-btn:hover, .yellow-btn.active {
  background-color: #E0B824;
  transform: translateY(-2px);
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem 1.5rem 0;
  box-sizing: border-box;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.search-box {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 0.4rem 1rem;
  width: 320px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.search-box input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 0.9rem;
}

.search-btn {
  background: transparent;
  border: none;
  cursor: pointer;
}

.topbar-icons {
  display: flex;
  gap: 1.2rem;
}

.icon-btn {
  background: transparent;
  border: none;
  cursor: pointer;
}

.content-card {
  flex: 1;
  background-color: #F8FAFC;
  border-radius: 30px;
  padding: 1.5rem;
  box-sizing: border-box;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.map-container, .real-map {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
}

/* VISTA DE RUTAS DISPONIBLES */
.routes-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.header-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-create {
  background: #14CBA8;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

.section-title {
  color: #0F4C5C;
  margin: 0;
  font-size: 1.4rem;
}

.section-sub {
  color: #64748B;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.routes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.route-card {
  background: white;
  border-radius: 18px;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border: 2px solid transparent;
  transition: all 0.2s;
}

.route-card:hover, .route-card.active {
  border-color: #14CBA8;
  transform: translateX(4px);
}

.route-badge {
  color: white;
  font-weight: 800;
  padding: 0.8rem 1rem;
  border-radius: 14px;
  font-size: 1.1rem;
}

.route-info {
  flex: 1;
  margin: 0 1.5rem;
}

.route-info h3 {
  margin: 0 0 0.4rem 0;
  color: #0F4C5C;
}

.route-info p {
  margin: 0.2rem 0;
  color: #475569;
  font-size: 0.88rem;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-select-route {
  background: #0F4C5C;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
}

.btn-edit-route {
  background: #FAD02C;
  border: none;
  padding: 0.6rem 0.8rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
}

.btn-delete-route {
  background: #E53E3E;
  color: white;
  border: none;
  padding: 0.6rem 0.8rem;
  border-radius: 12px;
  cursor: pointer;
}

/* MODAL DE CRUD */
.crud-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

.crud-modal-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  width: 340px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.crud-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0F4C5C;
}

.form-group input, .select-input {
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #CBD5E1;
  outline: none;
  background-color: white;
}

.color-picker {
  height: 40px;
  padding: 0;
  cursor: pointer;
}

.crud-modal-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn-save {
  flex: 1;
  background: #14CBA8;
  color: white;
  border: none;
  padding: 0.6rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}

/* OVERLAY Y DRAWER */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 76, 92, 0.4);
  backdrop-filter: blur(2px);
  z-index: 1500;
}

.settings-drawer {
  position: fixed;
  right: -340px;
  top: 0;
  width: 310px;
  height: 100vh;
  background: #FFFFFF;
  z-index: 1600;
  transition: transform 0.35s ease;
  display: flex;
  flex-direction: column;
}

.settings-drawer.open {
  transform: translateX(-340px);
}

.settings-header {
  background: linear-gradient(135deg, #14CBA8 0%, #0F4C5C 100%);
  color: white;
  padding: 1.5rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-circle-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.settings-body {
  padding: 1rem 0;
  flex: 1;
}

.settings-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.settings-menu li {
  padding: 1rem 1.5rem;
  font-weight: 600;
  color: #0F4C5C;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.logout-item {
  color: #E53E3E !important;
  margin-top: 1rem;
  border-top: 1px solid #F1F5F9;
}

/* MODAL LOGOUT */
.logout-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

.logout-modal-card {
  background: #FFFFFF;
  padding: 2rem 1.8rem;
  border-radius: 24px;
  width: 90%;
  max-width: 360px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.modal-icon-circle {
  width: 50px;
  height: 50px;
  background-color: #FEF2F2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem auto;
}

.logout-actions {
  display: flex;
  gap: 0.8rem;
  margin-top: 1.2rem;
}

.btn-cancel {
  flex: 1;
  background: #E2E8F0;
  color: #475569;
  border: none;
  padding: 0.75rem;
  border-radius: 14px;
  font-weight: 600;
  cursor: pointer;
}

.btn-confirm {
  flex: 1;
  background: #E53E3E;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 14px;
  font-weight: 600;
  cursor: pointer;
}
</style>