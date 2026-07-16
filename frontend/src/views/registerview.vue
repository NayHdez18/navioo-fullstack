<template>
  <div class="register-view">
    <div class="register-left">
      <RouterLink to="/" class="back-btn" aria-label="Volver">←</RouterLink>

      <div class="register-content">
        <div class="logo-wrap">
          <img src="../assets/images/NAVIO.svg" alt="Navioo" class="register-logo" />
          <span class="logo-subtitle">Workplace</span>
        </div>

        <h1>Crear una cuenta</h1>

        <form class="register-form" @submit.prevent="handleSubmit">
          <label>
            Nombre de empresa
            <input type="text" v-model="form.companyName" required />
          </label>

          <label>
            RFC
            <input type="text" v-model="form.rfc" required />
          </label>

          <label>
            Correo electrónico
            <input type="email" v-model="form.email" required />
          </label>

          <label>
            Contraseña
            <div class="password-wrap">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                required
              />
              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </label>

          <button type="submit" class="btn btn-accent">Crear</button>
        </form>

        <p class="login-hint">
          ¿Ya tienes una cuenta?
          <RouterLink to="/login">Iniciar sesión aquí</RouterLink>
        </p>
      </div>
    </div>

    <!-- Columna derecha: imagen -->
    <div class="register-right"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showPassword = ref(false)

const form = ref({
  companyName: '',
  rfc: '',
  email: '',
  password: '',
})

function handleSubmit() {
  // Aquí luego conectamos con services/api.js (axios) para el registro real
  console.log('Formulario de registro:', form.value)
}
</script>

<style scoped>
.register-view {
  display: flex;
  min-height: 100vh;
}

/* ---- Columna izquierda ---- */
.register-left {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.back-btn {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: var(--shadow-sm);
}

.register-content {
  width: 100%;
  max-width: 320px;
}

.logo-wrap {
  text-align: center;
  margin-bottom: 2rem;
}

.register-logo {
  height: 70px;
}

.logo-subtitle {
  display: block;
  color: var(--color-primary);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: -6px;
}

h1 {
  font-size: 1.4rem;
  color: var(--color-navy);
  margin-bottom: 1.5rem;
  text-align: center;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.register-form label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-navy);
}

.register-form input {
  padding: 0.65rem 0.75rem;
  border: 1.5px solid var(--color-primary-light);
  border-radius: 8px;
  background-color: var(--color-bg-soft);
  font-size: 0.95rem;
}

.register-form input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.password-wrap {
  position: relative;
  display: flex;
}

.password-wrap input {
  width: 100%;
  padding-right: 2.5rem;
}

.toggle-password {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  font-size: 1rem;
}

.register-form .btn {
  margin-top: 0.5rem;
}

.login-hint {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--color-gray-text);
}

.login-hint a {
  color: var(--color-primary);
  font-weight: 600;
}

/* ---- Columna derecha ---- */
.register-right {
  flex: 1;
  background-image: url('../assets/images/register-bg.jpg');
  background-size: cover;
  background-position: center;
}

/* En pantallas chicas ocultamos la imagen y centramos el formulario */
@media (max-width: 768px) {
  .register-right {
    display: none;
  }
}
</style>