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
          <RouterLink to="/registerview" class="btn btn-primary">
            Registrate ahora
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
        <form class="contact-form">
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Correo electrónico" required />
          <textarea placeholder="Mensaje" required></textarea>
          <button type="submit" class="btn btn-primary">Enviar</button>
        </form>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <h2>¿Listo para comenzar?</h2>
        <RouterLink to="/registerview" class="btn btn-primary">
          Registrate ahora
        </RouterLink>
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

.cta {
  background: linear-gradient(180deg, var(--color-white) 0%, var(--color-bg-soft) 100%);
  padding: 3rem 0;
  text-align: center;
}
.cta h2 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: var(--color-navy);
}
.cta h2:hover {
  color: var(--color-primary);
  transition: color 0.15s ease;
}
.cta .btn {
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
}
.features {
    position: relative;        /* necesario para que el overlay se posicione dentro de esta sección */
  padding: 4rem 0;
  background-image: url('../assets/images/1.jpg');
  background-size: cover;
  background-position: center;
  overflow: hidden;          /* evita que el overlay se salga de la sección */
}
.features::before {
  content: '';
  position: absolute;
  inset: 0;                  /* equivale a top:0; right:0; bottom:0; left:0; */
  background-color: rgba(255, 255, 255, 0.5); /* ajusta opacidad a gusto */
  z-index: 1;
}
.features .container {
  position: relative;
  z-index: 2;
}

.features h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2.5rem;
  color: var(--color-navy);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  border-radius: var(--radius-md);
  padding: 1.5rem;
}
.contact-form input,
.contact-form textarea {
  padding: 0.75rem;
  border: 1px solid var(--color-navy);
  border-radius: 10px;
  font-size: 1rem;
}
.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(0, 255, 200, 0.25);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

</style>