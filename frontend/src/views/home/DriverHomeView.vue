<template>
  <div class="driver-layout">
    <!-- PANEL IZQUIERDO: PERFIL Y RUTA -->
    <aside class="driver-sidebar">
      <div class="brand">
        <img src="../assets/images/NAVIO.svg" alt="Navioo" class="sidebar-logo" />
        <span class="workplace-text">Chofer</span>
      </div>

      <div class="driver-card">
        <div class="avatar-circle">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="#14CBA8">
            <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 14c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z"/>
          </svg>
        </div>
        <h3>{{ usuario.name }} {{ usuario.lastname }}</h3>
        <p class="company-tag">{{ usuario.companyName || 'Unidad de Transporte' }}</p>
      </div>

      <div class="status-box">
        <span>Estado de Unidad:</span>
        <button 
          class="status-toggle-btn" 
          :class="{ active: isOnline }" 
          @click="isOnline = !isOnline"
        >
          {{ isOnline ? 'En Ruta (Activo)' : 'Fuera de Servicio' }}
        </button>
      </div>

      <button class="btn-logout" @click="handleLogout">Cerrar Sesión</button>
    </aside>

    <!-- ÁREA CENTRAL: MAPA Y NAVEGACIÓN -->
    <main class="driver-main">
      <header class="driver-topbar">
        <h2>Panel de Navegación del Conductor</h2>
      </header>

      <div class="map-wrapper">
        <div id="driver-map" class="real-map"></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const router = useRouter()
const isOnline = ref(true)
const usuario = ref(JSON.parse(localStorage.getItem('usuario') || '{}'))

const handleLogout = () => {
  localStorage.removeItem('usuario')
  router.push('/login')
}

onMounted(() => {
  const map = L.map('driver-map').setView([20.6314, -87.0728], 14)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map)

  L.marker([20.6314, -87.0728])
    .addTo(map)
    .bindPopup('<b>Unidad en servicio</b><br>Ubicación GPS en tiempo real.')
})
</script>

<style scoped>
.driver-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #EEF2F3;
  font-family: system-ui, -apple-system, sans-serif;
}

.driver-sidebar {
  width: 280px;
  background: #EEF2F3;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar-logo {
  height: 75px;
}

.workplace-text {
  font-size: 0.8rem;
  color: #14CBA8;
  font-weight: 800;
  margin-top: -15px;
}

.driver-card {
  background: white;
  width: 100%;
  border-radius: 20px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #E2E8F0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.8rem;
}

.driver-card h3 {
  margin: 0;
  color: #0F4C5C;
  font-size: 1.1rem;
}

.company-tag {
  color: #64748B;
  font-size: 0.85rem;
  margin-top: 0.2rem;
}

.status-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 700;
  color: #0F4C5C;
}

.status-toggle-btn {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 12px;
  background: #CBD5E1;
  color: #475569;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;
}

.status-toggle-btn.active {
  background: #14CBA8;
  color: white;
}

.btn-logout {
  margin-top: auto;
  width: 100%;
  padding: 0.8rem;
  background: #2D4A58;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

.driver-main {
  flex: 1;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
}

.driver-topbar h2 {
  color: #0F4C5C;
  margin: 0 0 1rem 0;
}

.map-wrapper {
  flex: 1;
  border-radius: 20px;
  border: 2px solid #14CBA8;
  overflow: hidden;
}

.real-map {
  width: 100%;
  height: 100%;
}
</style>