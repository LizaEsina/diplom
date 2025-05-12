<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Вход в SecureLearn</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="login">Логин</label>
          <input 
            type="text" 
            id="login" 
            v-model="form.login" 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="password">Пароль</label>
          <input 
            type="password" 
            id="password" 
            v-model="form.password" 
            required
          >
        </div>
        
        <button type="submit" :disabled="loading" class="submit-btn">
          {{ loading ? 'Вход...' : 'Войти' }}
        </button>
        
        <div v-if="error" class="error-message">{{ error }}</div>
      </form>
      
      <p class="register-link">
        Нет аккаунта? <router-link to="/register">Зарегистрируйтесь</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        login: '',
        password: ''
      },
      loading: false,
      error: ''
    }
  },
  methods: {
    async handleLogin() {
  try {
    const response = await fetch('http://localhost:9000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.form),
      credentials: 'include'
    })

    if (!response.ok) throw new Error('Ошибка авторизации')

    const data = await response.json()
    this.$store.commit('SET_TOKEN', data.token)
    
    // Обработка redirect параметра
    const redirectPath = this.$route.query.redirect || '/profile'
    this.$router.push(redirectPath).catch(() => this.$router.push('/'))
    
  } catch (error) {
    console.error('Login error:', error)
    this.error = error.message
  }
}
}
}
</script>

<style scoped>
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