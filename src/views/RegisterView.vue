<template>
    <div class="login-page">
        <div class="login-container">
      <h1>Регистрация в SecureLearn</h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="login">Логин</label>
          <input type="text" id="login" v-model="login" required />
        </div>
  
        <div class="form-group">
          <label for="password">Пароль</label>
          <input type="password" id="password" v-model="password" required />
        </div>
  
          <button type="submit" :disabled="loading" class="submit-btn">
            {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
          </button>
  
        <p v-if="error" class="error-message">{{ error }}</p>
        <p v-if="success" class="success-message">Регистрация прошла успешно! Вы можете <router-link to="/login">войти</router-link>.</p>
      </form>
      <p class="register-link">
        Есить аккаунт? <router-link to="/login">Войдите</router-link>
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
  .register-page {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-actions {
    margin-top: 1rem;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    background: #42b983;
    border: none;
    color: white;
    cursor: pointer;
  }
  
  button[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .error-message {
    color: red;
    margin-top: 1rem;
  }
  
  .success-message {
    color: green;
    margin-top: 1rem;
  }
  .login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7fafc;
}

.login-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  color: #2d3748;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #4299e1;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #3182ce;
}

.submit-btn:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

.error-message {
  color: #e53e3e;
  margin-top: 1rem;
  text-align: center;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
  color: #4a5568;
}

.register-link a {
  color: #4299e1;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
  </style>
  