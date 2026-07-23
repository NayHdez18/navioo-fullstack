<template>
  <!-- Renderiza la vista que corresponda al usuario -->
  <component :is="currentHomeView" />
</template>

<script setup>
import { ref, computed } from 'vue'
import CompanyHomeView from './company/companyHomeview.vue'
// Aquí importarías PasajeroHomeView y DriverHomeView cuando los crees

const userRole = ref(localStorage.getItem('user_role') || 'empresa')

const currentHomeView = computed(() => {
  if (userRole.value === 'empresa') return CompanyHomeView
  // return DriverHomeView, etc.
  return CompanyHomeView
})
</script>