<template>
  <div class="login-view">
    <!-- Columna izquierda: imagen -->
    <div class="login-left">
       
    </div>

    <!-- Columna derecha: formulario -->
    <div class="login-right">
      <RouterLink to="/" class="back-btn" aria-label="Volver">
        <ArrowLeft :size="20" />
      </RouterLink>

      <div class="login-content">
        <div class="logo-wrap">
          <img src="../assets/images/NAVIO.svg" alt="Navioo" class="login-logo" />
        </div>

        <h1>Iniciar sesión</h1>

        <form class="login-form" @submit.prevent="handleSubmit">
          <label>
            Email
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
                <Eye v-if="showPassword" :size="18" />
                <EyeOff v-else :size="18" />
              </button>
            </div>
          </label>

          <button type="submit" class="btn btn-primary">Entrar</button>
        </form>

        <p class="register-hint">
          ¿No tienes cuenta?
          <RouterLink to="/registerview">Regístrate aquí</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'
import { ArrowLeft, Eye, EyeOff } from 'lucide-vue-next'

const router = useRouter()
const showPassword = ref(false)
const loading = ref(false)
const errorMessage =ref('')

const form = ref({
  email: '',
  password: '',
})

 async function handleSubmit() {
  loading.value=true
  try {
    const response = await axios.post('http://localhost:5000/api/usuarios/login', {
    email: form.value.email,
    password: form.value.password
  });

  console.log ('login exitoso:', response.data);

  localStorage.setItem('usuario', JSON.stringify(response.data));

  const rolusuario = response.data.designation;
  if (rolusuario === 'empresa') {
      router.push('/companyhomeview'); 
    } else if (rolusuario === 'trabajador') {
      router.push('/driverhomeview');
    } else if (rolusuario==='pasajero'){
      router.push('/passengerhomeview');
    }else {
      router.push('/home');
    }
}catch (error){
  console.error ('error al inicar sesion:' ,error);
  if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'No se pudo conectar con el servidor. Inténtalo más tarde.';
    }
  } finally {
    loading.value = false

} 

}
</script>

<style scoped>
.login-view {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* ---- Columna izquierda: imagen ---- */
.login-left {
  flex: 0 0 50%;
  max-width: 50%;
  background-image: url('../assets/images/2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* ---- Columna derecha: formulario ---- */
.login-right {
  flex: 0 0 50%;
  max-width: 50%;
  box-sizing: border-box;
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
  box-shadow: var(--shadow-sm);
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
}

.back-btn:hover {
  background: var(--color-accent);
  color: var(--color-navy);
  transform: scale(1.08);
}

.login-content {
  width: 100%;
  max-width: 320px;
}

.logo-wrap {
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
}

.login-logo {
  height: 70px;
}

h1 {
  font-size: 1.4rem;
  color: var(--color-navy);
  margin-bottom: 1.5rem;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-form label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-navy);
}

.login-form input {
  padding: 0.65rem 0.75rem;
  border: 1.5px solid var(--color-primary-light);
  border-radius: 8px;
  background-color: var(--color-bg-soft);
  font-size: 0.95rem;
}

.login-form input:focus {
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
  color: var(--color-gray-text);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form .btn {
  margin-top: 0.5rem;
  width: 100%;
  text-align: center;
}

.register-hint {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--color-gray-text);
}

.register-hint a {
  color: var(--color-primary);
  font-weight: 600;
}

/* En pantallas chicas ocultamos la imagen y centramos el formulario */
@media (max-width: 768px) {
  .login-left {
    display: none;
  }

  .login-right {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>