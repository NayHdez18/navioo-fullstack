<template>
  <header class="navbar">
    <div class="navbar-inner container">
      <!-- Logo / marca -->
      <RouterLink to="/" class="brand">
        <img src="@/assets/images/NAVIO.svg" alt="Navioo Logo" class="brand-icon" />
      </RouterLink>

      <!-- Links de navegación (anclas dentro de la landing) -->
      <nav class="nav-links">
        <a href="#nosotros">Nosotros</a>
        <a href="#funcionalidades">Funcionalidades</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <!-- CTA de login -->
      <RouterLink to="/login" class="btn btn-primary login-btn">
        Iniciar sesión
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import logo from '../../assets/images/NAVIO.svg'
</script>

<style scoped>
.navbar {
  width: 100%;
  border-bottom: 3px solid var(--color-primary-light);
  background-color: var(--color-white);
  position: sticky;
  top: 0;
  z-index: 50;
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-icon {
  height: 80px;
  width: auto;
}

.brand-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-navy);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--color-navy);
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.15s ease;
}

.nav-links a:hover {
  color: var(--color-primary);
}

.login-btn {
  padding: 0.6rem 1.6rem;
  font-size: 0.95rem;
}

/* Responsive: ocultamos links secundarios en pantallas chicas */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>