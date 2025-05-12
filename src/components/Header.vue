<template>
  <header class="app-header">
    <div class="header-container">
      <div class="logo" @click="goToHomeOrProfile">
        <span class="logo-icon">🔒</span>
        <span class="logo-text">SecureLearn</span>
      </div>
      
      <button class="menu-button" @click="toggleMenu" aria-label="Toggle menu">
        <div class="hamburger" :class="{ 'active': isMenuOpen }"></div>
      </button>
      
      <nav :class="['nav-links', { 'mobile-open': isMenuOpen }]">
        <template v-if="isAuthenticated">
          <div class="nav-group">
            <router-link to="/lessons" class="nav-link" @click="closeMenu">
              <span class="nav-icon">📚</span>
              <span class="nav-text">Уроки</span>
            </router-link>
            <router-link to="/profile" class="nav-link" @click="closeMenu">
              <span class="nav-icon">👤</span>
              <span class="nav-text">Профиль</span>
            </router-link>
            <router-link to="/test" class="nav-link" @click="closeMenu">
              <span class="nav-icon">🧑‍💻</span>
              <span class="nav-text">Пройти тест</span>
        </router-link>
            <template v-if="isAdmin">
              <router-link to="/admin/dashboard" class="nav-link admin-link" @click="closeMenu">
                <span class="nav-icon">🛡️</span>
                <span class="nav-text">Админ</span>
              </router-link>
            </template>
          </div>

          <button @click="logout" class="auth-button logout-btn">
            <span class="btn-icon">🚪</span>
            <span class="btn-text">Выйти</span>
          </button>
        </template>
        
        <template v-else>
          <div class="auth-group">
            <router-link to="/login" class="auth-button login-btn" @click="closeMenu">
              <span class="btn-icon">🔑</span>
              <span class="btn-text">Войти</span>
            </router-link>
            <router-link to="/register" class="auth-button register-btn" @click="closeMenu">
              <span class="btn-icon">✨</span>
              <span class="btn-text">Регистрация</span>
            </router-link>
          </div>
        </template>
      </nav>
    </div>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  mounted() {
    this.checkAuth();
  },
  computed: {

    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isAdmin() {
      return this.$store.state.user?.role === 'admin';
    }
  },
  watch: {
    '$store.state.user'(newUser) {
      if (newUser) {
        this.$forceUpdate();
      }
    }
  },
  created() {
    this.checkAuth();
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    },
    logout() {
      this.$store.commit('CLEAR_TOKEN');
      this.$router.push('/login');
      this.closeMenu();
    },
    async checkAuth() {
      const token = this.$store.state.token;
      if (token) {
        try {
          const response = await axios.get('http://localhost:9000/api/auth/me', { 
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } catch (error) {
          console.error('Auth check failed:', error);
          this.$store.commit('CLEAR_TOKEN');
        }
      }
    },
    goToHomeOrProfile() {
      if (this.isAuthenticated) {
        this.$router.push('/profile');
      } else {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped>
/* Базовые стили с современными эффектами */
.app-header {
  background: linear-gradient(135deg, #1a2a3a 0%, #0f172a 100%);
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Логотип с анимацией */
.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: #f8fafc;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.logo:hover {
  transform: translateY(-2px);
}

.logo-icon {
  font-size: 1.8rem;
  transition: transform 0.3s ease;
}

.logo:hover .logo-icon {
  transform: rotate(15deg);
}

.logo-text {
  background: linear-gradient(90deg, #4fd1c5 0%, #38b2ac 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Навигация */
.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-group {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.auth-group {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  color: #e2e8f0;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: 0.5rem 1rem;
}

.nav-link:hover {
  color: white;
  background: rgba(79, 209, 197, 0.1);
}

.nav-link.router-link-exact-active {
  color: #4fd1c5;
  font-weight: 600;
}

.nav-link.router-link-exact-active .nav-icon {
  transform: scale(1.1);
}

.nav-icon {
  font-size: 1.2rem;
  transition: transform 0.2s ease;
}

.nav-text {
  transition: transform 0.2s ease;
}

.nav-link:hover .nav-text {
  transform: translateX(3px);
}

.admin-link {
  color: #f6ad55;
}

.admin-link:hover {
  background: rgba(246, 173, 85, 0.1);
}

/* Кнопки авторизации */
.auth-button {
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  border: none;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.login-btn {
  background: linear-gradient(135deg, #4fd1c5 0%, #38b2ac 100%);
  color: #1a202c;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 209, 197, 0.3);
}

.register-btn {
  background: transparent;
  color: #e2e8f0;
  border: 2px solid #4fd1c5;
}

.register-btn:hover {
  background: rgba(79, 209, 197, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 209, 197, 0.2);
}

.logout-btn {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
  color: white;
}

.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(229, 62, 62, 0.3);
}

.btn-icon {
  font-size: 1.2rem;
}

.btn-text {
  transition: transform 0.2s ease;
}

.auth-button:hover .btn-text {
  transform: translateX(3px);
}

/* Анимация гамбургер-меню */
.menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
}

.hamburger {
  width: 30px;
  height: 3px;
  background: #4fd1c5;
  position: relative;
  transition: all 0.3s ease;
}

.hamburger:before,
.hamburger:after {
  content: '';
  position: absolute;
  width: 30px;
  height: 3px;
  background: #4fd1c5;
  transition: all 0.3s ease;
}

.hamburger:before {
  transform: translateY(-8px);
}

.hamburger:after {
  transform: translateY(8px);
}

.hamburger.active {
  background: transparent;
}

.hamburger.active:before {
  transform: rotate(45deg);
  background: #f56565;
}

.hamburger.active:after {
  transform: rotate(-45deg);
  background: #f56565;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .header-container {
    padding: 0.8rem 1.5rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .nav-link, .auth-button {
    padding: 0.5rem 0.8rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .menu-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    flex-direction: column;
    justify-content: flex-start;
    padding: 6rem 1.5rem 2rem;
    gap: 1.5rem;
    transition: right 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .nav-links.mobile-open {
    right: 0;
  }
  
  .nav-group, .auth-group {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
  
  .nav-link {
    width: 100%;
    justify-content: center;
    padding: 1rem;
  }
  
  .auth-button {
    width: 100%;
    justify-content: center;
    margin: 0;
  }
  
  .logo-text {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0.7rem 1rem;
  }
  
  .logo-icon {
    font-size: 1.5rem;
  }
  
  .logo-text {
    font-size: 1.3rem;
  }
  
  .nav-links {
    width: 250px;
  }
}
</style>