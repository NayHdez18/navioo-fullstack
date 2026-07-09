<template>
  <div class="landing">
    <NavBar />

    <!-- HERO -->
    <section class="hero">
      <div class="container hero-inner">
        <h1>
          Gestiona tu transporte público con
          <span class="highlight">Navioo</span>
        </h1>
        <p class="hero-subtitle">
          La plataforma que administra tiempo, calidad, área administrativa
          y experiencia del usuario para empresas de transporte público.
        </p>
        <div class="hero-actions">
          <RouterLink to="/login" class="btn btn-primary">
            Comenzar ahora
          </RouterLink>
          <a href="#funcionalidades" class="btn btn-outline">
            Conocer más
          </a>
        </div>
      </div>
    </section>

    <!-- FUNCIONALIDADES -->
    <section id="funcionalidades" class="features">
      <div class="container">
        <h2>Todo lo que tu empresa necesita</h2>
        <div class="features-grid">
          <article class="feature-card">
            <span class="feature-icon">⏱️</span>
            <h3>Gestión de tiempo</h3>
            <p>Control de rutas, horarios y tiempos de recorrido en tiempo real.</p>
          </article>
          <article class="feature-card">
            <span class="feature-icon">✅</span>
            <h3>Calidad de servicio</h3>
            <p>Monitoreo y métricas para asegurar un servicio consistente.</p>
          </article>
          <article class="feature-card">
            <span class="feature-icon">🗂️</span>
            <h3>Área administrativa</h3>
            <p>Gestión de personal, unidades y documentación en un solo lugar.</p>
          </article>
          <article class="feature-card">
            <span class="feature-icon">😊</span>
            <h3>Experiencia del usuario</h3>
            <p>Una app pensada para empresas, trabajadores y usuarios finales.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- NOSOTROS (placeholder simple) -->
    <section id="nosotros" class="about">
      <div class="container">
        <h2>Sobre Navioo</h2>
        <p>
          Navioo nace como proyecto para transformar la administración del
          transporte público, conectando empresas, trabajadores y usuarios
          en una sola plataforma.
        </p>
      </div>
    </section>

    <!-- CONTACTO (placeholder simple) -->
    <section id="contacto" class="contact">
      <div class="container">
        <h2>Contacto</h2>
        <p>¿Tienes dudas? Escríbenos a contacto@navioo.com</p>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <p>&copy; {{ currentYear }} Navioo. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import NavBar from '../components/layout/navbar.vue'

const currentYear = new Date().getFullYear()
</script>

<style scoped>
.hero {
  padding: 5rem 0;
  background: linear-gradient(180deg, var(--color-bg-soft) 0%, var(--color-white) 100%);
}

.hero-inner {
  text-align: center;
  max-width: 720px;
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-navy);
  margin-bottom: 1.25rem;
  line-height: 1.2;
}

.highlight {
  color: var(--color-primary);
}

.hero-subtitle {
  font-size: 1.1rem;
  color: var(--color-gray-text);
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.features,
.about,
.contact {
  padding: 4rem 0;
}

.features h2,
.about h2,
.contact h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2.5rem;
  color: var(--color-navy);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: 1.75rem;
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: transform 0.15s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.75rem;
}

.feature-card h3 {
  color: var(--color-navy);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.feature-card p {
  color: var(--color-gray-text);
  font-size: 0.95rem;
}

.about,
.contact {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.footer {
  background-color: var(--color-navy);
  color: var(--color-white);
  padding: 1.5rem 0;
  text-align: center;
  font-size: 0.9rem;
}
</style>