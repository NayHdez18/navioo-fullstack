<template>
  <div class="profile-view">
    <!-- Columna izquierda: selección -->
    <div class="profile-left">

      <div class="profile-content">
        <div class="logo-wrap">
          <img src="../assets/images/NAVIO.svg" alt="Navioo" class="profile-logo" />
        </div>

        <h1>¡Bienvenido!</h1>
        <p class="subtitle">¿Cuál es su perfil?</p>

        <div class="profile-options">
          <RouterLink :to="{ name: 'register', params: { role: 'empresa' } }" class="btn-perfil empresa">
            Empresa
          </RouterLink>
          <RouterLink :to="{ name: 'register', params: { role: 'trabajador' } }" class="btn-perfil trabajador">
            Trabajador
          </RouterLink>
          <RouterLink :to="{ name: 'register', params: { role: 'pasajero' } }" class="btn-perfil pasajero">
            Pasajero
          </RouterLink>
        </div>

        <p class="login-hint">
          ¿Ya tienes una cuenta?
          <RouterLink to="/login">Inicia sesión aquí</RouterLink>
        </p>
      </div>
    </div>

    <!-- Columna derecha: imagen -->
    <div class="profile-right"></div>
    <img src="../assets/images/2.jpg" alt="Imagen de perfil" class="profile-image" />
  </div>
</template>

<script setup>
</script>

<style scoped>
.profile-view {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* ---- Columna izquierda ---- */
.profile-left {
  flex: 0 0 50%;
  max-width: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: var(--color-white);
}

.profile-content {
  width: 100%;
  max-width: 320px;
  text-align: center;
}

.logo-wrap {
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;

}

.profile-logo {
  height: 150px;
  margin-bottom: -3rem;
}

h1 {
  font-size: 1.6rem;
  color: var(--color-navy);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--color-primary);
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.profile-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-perfil {
  display: block;
  padding: 0.85rem 1.5rem;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn-perfil:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-perfil.empresa {
  background: var(--gradient-primary);
  color: var(--color-white);
}

.btn-perfil.trabajador {
  background-color: var(--color-primary-light);
  color: var(--color-white);
}

.btn-perfil.pasajero {
  background-color: var(--color-accent);
  color: var(--color-navy);
}

.login-hint {
  margin-top: 2rem;
  font-size: 0.85rem;
  color: var(--color-gray-text);
}

.login-hint a {
  color: var(--color-primary);
  font-weight: 600;
}

/* ---- Columna derecha: imagen ---- */
.profile-right {
  flex: 0 0 50%;
  max-width: 50%;
  background-image: url('../assets/images/2.jpg'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media (max-width: 768px) {
  .profile-right {
    display: none;
  }

  .profile-left {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>