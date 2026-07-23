<template>
  <div class="manage-routes-container">
    <!-- BARRA SUPERIOR / ENCABEZADO -->
    <header class="page-header">
      <div class="header-left">
        <button class="back-btn" @click="goHome" title="Volver al panel principal">
          ← Volver
        </button>
        <h1>Gestión de Rutas</h1>
      </div>
      <button class="btn-primary" @click="openModalCreate">+ Nueva Ruta</button>
    </header>

    <!-- LISTADO / TABLA DE RUTAS -->
    <main class="content-body">
      <div v-if="loading" class="state-message">Cargando rutas...</div>
      
      <table v-else-if="rutas.length > 0" class="crud-table">
        <thead>
          <tr>
            <th>Nombre de Ruta</th>
            <th>Chófer Asignado</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ruta in rutas" :key="ruta._id">
            <td><strong>{{ ruta.nameroute }}</strong></td>
            <td>
              {{ ruta.driver ? `${ruta.driver.name} ${ruta.driver.lastname || ''}` : 'Sin Asignar' }}
            </td>
            <td>
              <span class="status-badge" :class="ruta.status ? 'active' : 'inactive'">
                {{ ruta.status ? 'Activa' : 'Inactiva' }}
              </span>
            </td>
            <td class="actions-cell">
              <button class="btn-action edit" @click="openModalEdit(ruta)">✏️ Editar</button>
              <button class="btn-action delete" @click="handleDelete(ruta._id)">🗑️ Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="state-message">No hay rutas registradas actualmente.</div>
    </main>

    <!-- MODAL / FORMULARIO (CREAR O EDITAR) -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-card">
        <h3>{{ isEditing ? 'Editar Ruta' : 'Crear Nueva Ruta' }}</h3>

        <form @submit.prevent="handleSubmit" class="modal-form">
          <label>
            Nombre de la Ruta:
            <input type="text" v-model="form.name" required placeholder="Ej. Ruta 01 - Centro" />
          </label>

          <label>
            Chófer Asignado:
            <select v-model="form.driverid" required class="select-input">
              <option value="" disabled>Selecciona un chófer</option>
              <option v-for="chofer in choferes" :key="chofer._id" :value="chofer._id">
                {{ chofer.name }} {{ chofer.lastname }}
              </option>
            </select>
          </label>

          <label class="checkbox-label">
            <input type="checkbox" v-model="form.status" />
            Ruta Activa
          </label>

          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="closeModal">Cancelar</button>
            <button type="submit" class="btn-primary" :disabled="saving">
              {{ saving ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// Estados
const rutas = ref([])
const choferes = ref([])
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const isEditing = ref(false)
const selectedRutaId = ref(null)

const form = ref({
  name: '',
  driverid: '',
  status: true
})

// Cargar Choferes (Usuarios con rol 'trabajador')
const fetchChoferes = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/usuarios?designation=trabajador')
    choferes.value = res.data
  } catch (error) {
    console.error('Error al cargar chóferes:', error)
  }
}

// Cargar Rutas
const fetchRutas = async () => {
  loading.value = true
  try {
    const res = await axios.get('http://localhost:5000/api/rutas')
    rutas.value = res.data
  } catch (error) {
    console.error('Error al cargar rutas:', error)
  } finally {
    loading.value = false
  }
}

const openModalCreate = () => {
  isEditing.value = false
  selectedRutaId.value = null
  form.value = { name: '', driverid: '', status: true }
  showModal.value = true
}

const openModalEdit = (ruta) => {
  isEditing.value = true
  selectedRutaId.value = ruta._id
  form.value = {
    name: ruta.nameroute,
    driverid: ruta.driver?._id || '',
    status: ruta.status
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

// Guardar / Actualizar Ruta
const handleSubmit = async () => {
  saving.value = true
  try {
    if (isEditing.value) {
      await axios.put(`http://localhost:5000/api/rutas/${selectedRutaId.value}`, {
        nameroute: form.value.name,
        driver: form.value.driverid,
        status: form.value.status
      })
    } else {
      await axios.post('http://localhost:5000/api/rutas', form.value)
    }
    closeModal()
    fetchRutas()
  } catch (error) {
    alert(error.response?.data?.message || 'Error al guardar la ruta')
  } finally {
    saving.value = false
  }
}

// Eliminar Ruta
const handleDelete = async (id) => {
  if (!confirm('¿Deseas eliminar esta ruta?')) return
  try {
    await axios.delete(`http://localhost:5000/api/rutas/${id}`)
    fetchRutas()
  } catch (error) {
    alert('Error al eliminar la ruta')
  }
}

const goHome = () => {
  router.push('/companyhomeview')
}

onMounted(() => {
  fetchRutas()
  fetchChoferes()
})
</script>

<style scoped>
.manage-routes-container {
  padding: 2rem;
  background-color: #EEF2F3;
  min-height: 100vh;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, sans-serif;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-left h1 {
  color: #0F4C5C;
  margin: 0;
  font-size: 1.8rem;
}

.back-btn {
  background: #0F4C5C;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary {
  background: #14CBA8;
  color: #0F4C5C;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(20, 203, 168, 0.2);
}

.crud-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.crud-table th, .crud-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #E2E8F0;
}

.crud-table th {
  background: #F8FAFC;
  color: #0F4C5C;
  font-weight: 700;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
}

.status-badge.active {
  background: #D1FAE5;
  color: #065F46;
}

.status-badge.inactive {
  background: #FEE2E2;
  color: #991B1B;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
}

.btn-action {
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-action.edit {
  background: #FEF3C7;
  color: #92400E;
}

.btn-action.delete {
  background: #FEE2E2;
  color: #991B1B;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1rem;
}

.modal-form label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-weight: 600;
  color: #0F4C5C;
}

.modal-form input[type="text"], .select-input {
  padding: 0.7rem;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  font-size: 0.95rem;
}

.checkbox-label {
  flex-direction: row !important;
  align-items: center;
  gap: 0.5rem !important;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-secondary {
  background: #E2E8F0;
  color: #475569;
  border: none;
  padding: 0.75rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.state-message {
  text-align: center;
  padding: 3rem;
  color: #64748B;
  font-weight: 600;
}
</style>