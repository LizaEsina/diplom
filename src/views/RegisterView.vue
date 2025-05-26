<template>
  <div class="login-page">
    <div class="login-card">
      <h2 class="title">Зарегистрироваться в <span>SecureLearn</span></h2>
      <form @submit.prevent="register" class="login-form">
        <div class="form-field">
          <label for="login">Логин</label>
          <input
            type="text"
            id="login"
            v-model="login"
            placeholder="Введите логин"
            required
          />
        </div>

        <div class="form-field">
          <label for="password">Пароль</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Введите пароль"
            required
          />
        </div>

        <button type="submit" :disabled="loading" class="login-button">
          {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">
          Регистрация прошла успешно! Вы можете <router-link to="/login">войти</router-link>.
        </p>
      </form>

      <p class="register-text">
        Есть аккаунт? <router-link to="/login">Войдите</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const login = ref('')
const password = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)

const register = async () => {
  error.value = ''
  success.value = false
  loading.value = true

  try {
    const response = await axios.post('http://localhost:9000/api/auth/register.php', {
      login: login.value,
      password: password.value
    })

    if (response.data.success) {
      success.value = true
      login.value = ''
      password.value = ''
    } else {
      error.value = response.data.error || 'Ошибка регистрации'
    }
  } catch (err) {
    error.value = err.response?.data?.error || 'Ошибка подключения к серверу'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #93abef5e, #03236dd4);
  padding: 1rem;
}

.login-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 1.25rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  animation: fadeIn 0.5s ease;
}

.title {
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #1e293b;
}

.title span {
  color: #0ea5e9;
}

.form-field {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #475569;
  font-weight: 500;
}

input {
  width: 95%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  transition: all 0.2s;
  font-size: 1rem;
  background: #f9fafb;
}

input:focus {
  border-color: #0ea5e9;
  outline: none;
  background: white;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background: #0ea5e9;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.login-button:hover {
  background: #0284c7;
}

.login-button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.error {
  color: #dc2626;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
}

.success {
  color: #16a34a;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
}

.success a {
  color: #0ea5e9;
  text-decoration: none;
}

.success a:hover {
  text-decoration: underline;
}

.register-text {
  text-align: center;
  margin-top: 2rem;
  color: #64748b;
}

.register-text a {
  color: #0ea5e9;
  font-weight: 500;
  text-decoration: none;
}

.register-text a:hover {
  text-decoration: underline;
}

@keyframes fadeIn {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}

</style>