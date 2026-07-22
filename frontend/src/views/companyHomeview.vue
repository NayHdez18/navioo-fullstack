<template>
  <div class="company-layout">
    <!-- Sidebar / Barra Lateral -->
    <aside class="sidebar">
      <!-- LOGO CENTRADO (Oculto en vista chófer para dar lugar al botón verde si se prefiere, o visible arriba) -->
      <div v-if="viewMode !== 'chofer'" class="brand">
        <img src="../assets/images/NAVIO.svg" alt="Navioo" class="sidebar-logo" />
        <span class="workplace-text">Workplace</span>
      </div>

      <!-- VISTA 1: Menú Principal de Empresa -->
      <nav v-if="viewMode === 'main'" class="sidebar-menu">
        <div class="company-avatar-card">
          <div class="avatar-placeholder">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="3"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        </div>

        <button class="nav-btn" @click="viewMode = 'rutas'">
          Sus Rutas
        </button>

        <button class="nav-btn" @click="viewMode = 'chofer'">
          Chófer
        </button>

        <button class="nav-btn" @click="viewMode = 'comunidad'">
          Comunidad
        </button>
      </nav>

      <!-- VISTA 2: Panel de "Sus Rutas" (Cuadrícula Amarilla) -->
      <div v-else-if="viewMode === 'rutas'" class="rutas-panel">
        <button class="back-circle-btn yellow" @click="viewMode = 'main'" title="Volver">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>

        <div class="rastrear-badge">
          Rastrear
        </div>

        <div class="routes-grid">
          <button 
            v-for="routeNum in 12" 
            :key="routeNum" 
            class="route-btn"
            :class="{ selected: selectedRoute === routeNum }"
            @click="selectRoute(routeNum)"
          >
            {{ routeNum }}
          </button>
        </div>

        <button class="scroll-down-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <polyline points="19 12 12 19 5 12"/>
          </svg>
        </button>
      </div>

      <!-- VISTA 3: Panel de "Chófer" -->
      <div v-else-if="viewMode === 'chofer'" class="chofer-panel">
        <h2 class="chofer-title">Chófer</h2>

        <div class="chofer-avatar-card">
          <svg width="70" height="70" viewBox="0 0 24 24" fill="#14CBA8">
            <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 14c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z"/>
          </svg>
        </div>

        <div class="chofer-actions">
          <button class="nav-btn">Nombre...</button>
          <button class="nav-btn">Ruta asignada</button>
          <button class="nav-btn">Chat</button>
        </div>
      </div>
    </aside>

    <!-- Área Principal -->
    <main class="main-content">
      <!-- Topbar / Encabezado Superior -->
      <header class="topbar">
        <!-- Botón verde de regresar cuando se está en la vista de Chófer -->
        <div class="topbar-left">
          <button v-if="viewMode === 'chofer'" class="back-circle-btn green" @click="viewMode = 'main'" title="Volver al inicio">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>

          <div class="search-box">
            <input type="text" placeholder="Buscar..." v-model="searchQuery" />
            <button class="search-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F4C5C" stroke-width="2.5">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="topbar-actions">
          <button class="icon-btn" title="Notificaciones">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>

          <button class="icon-btn" title="Ajustes">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>

          <button class="icon-btn" title="Perfil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- Breadcrumb Dinámico -->
      <div class="breadcrumb">
        <span>Home</span>
        <span v-if="viewMode === 'rutas'"> &gt; Sus rutas</span>
        <span v-else-if="viewMode === 'chofer'"> &gt; Chófer</span>
      </div>

      <!-- Contenedor del Mapa -->
      <div class="map-wrapper">
        <div id="map" class="real-map"></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const searchQuery = ref('')
const viewMode = ref('main') // 'main' | 'rutas' | 'chofer'
const selectedRoute = ref(null)

const selectRoute = (num) => {
  selectedRoute.value = num
}

onMounted(() => {
  const map = L.map('map').setView([20.6314, -87.0728], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map)

  L.marker([20.6314, -87.0728])
    .addTo(map)
    .bindPopup('<b>Navioo Workplace</b><br>Base Central.')
})
</script>

<style scoped>
/* Layout Base */
.company-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #EEF2F3;
  font-family: system-ui, -apple-system, sans-serif;
  overflow: hidden;
}

/* SIDEBAR */
.sidebar {
  width: 260px;
  background-color: #EEF2F3;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.2rem;
  box-sizing: border-box;
  align-items: center;
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 1.5rem;
}

.sidebar-logo {
  height: 85px;
  width: auto;
  object-fit: contain;
}

.workplace-text {
  font-size: 0.8rem;
  color: #14CBA8;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-top: -18px;
  margin-left: 20px;
}

/* MENÚ PRINCIPAL */
.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  align-items: center;
}

.company-avatar-card {
  width: 110px;
  height: 95px;
  background-color: #E2E8F0;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.nav-btn {
  width: 100%;
  max-width: 180px;
  background-color: #14CBA8;
  color: #0F4C5C;
  border: none;
  padding: 0.9rem 1.5rem;
  border-radius: 30px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(20, 203, 168, 0.22);
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background-color: #10B394;
  transform: translateY(-2px);
}

/* BOTÓN VOLVER (Compartido) */
.back-circle-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  transition: transform 0.2s;
}

.back-circle-btn.yellow {
  background: linear-gradient(135deg, #F3D053 0%, #E2B235 100%);
}

.back-circle-btn.green {
  background: #14CBA8;
  margin-right: 1rem;
}

.back-circle-btn:hover {
  transform: scale(1.08);
}

/* PANEL RUTAS */
.rutas-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
}

.rastrear-badge {
  background: linear-gradient(135deg, #F5D35C 0%, #E5B838 100%);
  color: #1A365D;
  font-weight: 800;
  font-size: 0.95rem;
  padding: 0.6rem 2.2rem;
  border-radius: 20px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.12);
}

.routes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem 1rem;
  width: 100%;
  max-width: 190px;
}

.route-btn {
  background: linear-gradient(135deg, #F5D35C 0%, #E5B838 100%);
  color: #1A365D;
  border: none;
  border-radius: 20px;
  padding: 0.55rem 0;
  font-weight: 800;
  font-size: 1.15rem;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  transition: all 0.2s;
}

.route-btn.selected {
  background: #0F4C5C;
  color: #FFFFFF;
}

.scroll-down-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #F3D053 0%, #E2B235 100%);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

/* PANEL CHÓFER */
.chofer-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.2rem;
  margin-top: 1rem;
}

.chofer-title {
  color: #1E293B;
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0;
}

.chofer-avatar-card {
  width: 150px;
  height: 140px;
  background-color: #FFFFFF;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #E2E8F0;
}

.chofer-actions {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  align-items: center;
}

/* MAIN CONTENT */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.topbar-left {
  display: flex;
  align-items: center;
}

.search-box {
  position: relative;
  width: 320px;
}

.search-box input {
  width: 100%;
  padding: 0.6rem 2.5rem 0.6rem 1.2rem;
  border-radius: 20px;
  border: 1px solid #CBD5E1;
  outline: none;
  font-size: 0.9rem;
  background: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
}

.search-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}

.topbar-actions {
  display: flex;
  gap: 0.8rem;
}

.icon-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #14CBA8;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.breadcrumb {
  margin-bottom: 0.8rem;
  font-weight: 600;
  color: #334155;
  font-size: 0.95rem;
}

/* MAPA */
.map-wrapper {
  flex: 1;
  border-radius: 20px;
  border: 2px solid #14CBA8;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.real-map {
  width: 100%;
  height: 100%;
}
</style>