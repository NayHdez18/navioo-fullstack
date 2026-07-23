<template>
  <div class="passenger-container">
    <!-- SIDEBAR / BARRA LATERAL (TURQUESA) -->
    <aside class="sidebar">
      <div class="brand">
        <img src="../assets/images/NAVIO.svg" alt="Navioo" class="logo" />
      </div>

      <!-- Tarjeta de Foto/Avatar -->
      <div class="user-avatar-card">
        <div class="avatar-placeholder">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#CBD5E1">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </div>
      </div>

      <!-- Botones Amarillos Ovalados -->
      <nav class="sidebar-menu">
        <button class="yellow-btn" @click="activeTab = 'rastrear'">
          Rastrear unidad
        </button>

        <button class="yellow-btn" @click="activeTab = 'rutas'">
          Tus rutas
        </button>

        <button class="yellow-btn" @click="activeTab = 'mapa'">
          Mapa
        </button>

        <button class="yellow-btn" @click="activeTab = 'horarios'">
          Horarios
        </button>
      </nav>
    </aside>

    <!-- ÁREA PRINCIPAL DERECHA -->
    <main class="main-wrapper">
      <!-- TOPBAR SUPERIOR -->
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

          <!-- Icono de Engrane (Ajustes) -->
          <button class="icon-btn" title="Ajustes" @click="showSettings = true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>

          <!-- Icono Perfil -->
          <button class="icon-btn" title="Perfil">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- TARJETA BLANCA PRINCIPAL CURVEADA -->
      <div class="content-card">
        <!-- VISTA DE MAPA / RASTREO -->
        <div v-show="activeTab === 'mapa' || activeTab === 'rastrear'" class="map-container">
          <div id="passenger-map" class="real-map"></div>
        </div>

        <!-- VISTA COMUNIDAD / AVISOS (SEMEJANTE A LA IMAGEN) -->
        <div v-show="activeTab === 'rutas' || activeTab === 'horarios'" class="feed-container">
          <div class="post-input-box">
            <div class="user-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 14c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z"/>
              </svg>
            </div>
            <input type="text" placeholder="¿Algo importante que debas comentar?" />
          </div>

          <div class="post-card">
            <div class="post-header">
              <div class="user-circle flex-shrink">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 14c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z"/>
                </svg>
              </div>
              <div class="post-title">
                <strong>Tráfico por lluvias hoy</strong>
                <span class="post-sub">Por: Ramón • Hace 15 min</span>
              </div>
            </div>

            <div class="post-image-placeholder">
              <span>📷 Imagen de reporte de tráfico</span>
            </div>

            <div class="post-actions">
              <button>👍 Me gusta</button>
              <button>💬 Comentar</button>
              <button>↗️ Compartir</button>
            </div>
          </div>
        </div>
      </div>
    </main>

   <!-- OVERLAY (MÁSCARA DE FONDO) -->
    <div v-if="showSettings || showLogoutModal" class="overlay" @click="closeAll"></div>

    <!-- DRAWER DE CONFIGURACIÓN Y AJUSTES -->
    <aside class="settings-drawer" :class="{ open: showSettings }">
      <!-- Encabezado Estilizado con Botón Circular Integrado -->
      <div class="settings-header">
        <button class="back-circle-btn" @click="showSettings = false" title="Volver">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <h2>Ajustes</h2>
      </div>

      <div class="settings-body">
        <ul class="settings-menu">
          <li>
            <span class="menu-icon">👤</span> 
            <span>Mi Perfil</span>
          </li>
          <li>
            <span class="menu-icon">🔔</span> 
            <span>Notificaciones</span>
          </li>
          <li>
            <span class="menu-icon">❓</span> 
            <span>Ayuda y Soporte</span>
          </li>
          <li class="logout-item" @click="openLogoutModal">
            <span class="menu-icon">🚪</span> 
            <span>Cerrar sesión</span>
          </li>
        </ul>
      </div>
    </aside>
    
    <!-- MODAL DE LOGOUT -->
    <div v-if="showLogoutModal" class="logout-modal-overlay">
      <div class="logout-modal-card">
        <div class="modal-icon-circle">
          🚪
        </div>
        <h3>¿Deseas cerrar sesión?</h3>
        <p>Tendrás que ingresar nuevamente tus credenciales para continuar.</p>
        
        <div class="logout-actions">
          <button type="button" class="btn-cancel" @click="showLogoutModal = false">
            Cancelar
          </button>
          <button type="button" class="btn-confirm" @click="handleLogout">
            Cerrar sesión
          </button>
        </div>
      </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const router = useRouter()

const searchQuery = ref('')
const activeTab = ref('mapa')
const showSettings = ref(false)
const showLogoutModal = ref(false)

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
  const map = L.map('passenger-map').setView([20.6314, -87.0728], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map)

  L.marker([20.6314, -87.0728])
    .addTo(map)
    .bindPopup('<b>Tu posición actual</b>')
})
</script>

<style scoped>
.passenger-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #14CBA8; /* Turquesa vibrante */
  overflow: hidden;
  font-family: system-ui, -apple-system, sans-serif;
}

/* SIDEBAR IZQUIERDA */
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

/* BOTONES AMARILLOS OVALADOS */
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

.yellow-btn:hover {
  background-color: #E0B824;
  transform: translateY(-2px);
}

/* ÁREA PRINCIPAL DERECHA */
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem 1.5rem 0;
  box-sizing: border-box;
}

/* TOPBAR */
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

/* CONTENEDOR PRINCIPAL BLANCO */
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

/* PUBLICACIONES / AVISOS */
.feed-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.post-input-box {
  background: white;
  width: 100%;
  max-width: 500px;
  padding: 0.6rem 1rem;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border: 1px solid #CBD5E1;
}

.post-input-box input {
  border: none;
  outline: none;
  width: 100%;
}

.user-circle {
  width: 36px;
  height: 36px;
  background-color: #14CBA8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-card {
  background: white;
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
}

.post-title strong {
  display: block;
  color: #0F4C5C;
}

.post-sub {
  font-size: 0.75rem;
  color: #64748B;
}

.post-image-placeholder {
  width: 100%;
  height: 180px;
  background: #E2E8F0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748B;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.post-actions {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #F1F5F9;
  padding-top: 0.5rem;
}

.post-actions button {
  background: transparent;
  border: none;
  color: #64748B;
  font-weight: 600;
  cursor: pointer;
}

/* OVERLAY PARA DRAWER AJUSTES */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 76, 92, 0.4);
  backdrop-filter: blur(2px);
  z-index: 1500;
  pointer-events: auto;
}

/* DRAWER DE AJUSTES */
.settings-drawer {
  position: fixed;
  right: -340px;
  top: 0;
  width: 310px;
  height: 100vh;
  background: #FFFFFF;
  z-index: 1600;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
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
  border-bottom-left-radius: 20px;
}

.settings-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.5px;
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
  transition: all 0.2s ease;
}

.back-circle-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: scale(1.08);
}

.back-circle-btn:active {
  transform: scale(0.95);
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
  font-size: 0.95rem;
  color: #0F4C5C;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease, padding-left 0.2s ease;
}

.settings-menu li:hover {
  background-color: #F0FDF4;
  padding-left: 1.8rem;
}

.menu-icon {
  font-size: 1.2rem;
}

.logout-item {
  color: #E53E3E !important;
  margin-top: 1rem;
  border-top: 1px solid #F1F5F9;
}

.logout-item:hover {
  background-color: #FEF2F2 !important;
}

/* MODAL DE LOGOUT (SUPERIOR Y CENTRADO) */
.logout-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000; /* Prioridad absoluta */
  pointer-events: auto;
}

.logout-modal-card {
  background: #FFFFFF;
  padding: 2rem 1.8rem;
  border-radius: 24px;
  width: 90%;
  max-width: 360px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  animation: modalPop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 3001;
}

@keyframes modalPop {
  0% { transform: scale(0.85); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
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

.logout-modal-card h3 {
  color: #0F4C5C;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 700;
}

.logout-modal-card p {
  color: #64748B;
  font-size: 0.88rem;
  margin: 0 0 1.5rem 0;
  line-height: 1.4;
}

.logout-actions {
  display: flex;
  gap: 0.8rem;
  margin-top: 1.2rem;
  justify-content: center;
}

.btn-cancel {
  flex: 1;
  background: #E2E8F0;
  color: #475569;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-cancel:hover {
  background: #CBD5E1;
}

.btn-confirm {
  flex: 1;
  background: #E53E3E;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(229, 62, 62, 0.3);
  transition: transform 0.2s, background-color 0.2s;
}

.btn-confirm:hover {
  background: #C53030;
  transform: translateY(-1px);
}
</style>