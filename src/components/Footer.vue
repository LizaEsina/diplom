<template>
  <footer class="app-footer">
    <div class="footer-wave"></div>
    
    <div class="footer-container">
      <div class="footer-main">
        <div class="footer-brand">
          <router-link to="/" class="logo">
            <span class="logo-icon">🔒</span>
            <span class="logo-text">SecureLearn</span>
          </router-link>
          <p class="tagline">Платформа для обучения кибербезопасности нового поколения</p>
          
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Twitter">
              <span class="social-icon">🐦</span>
            </a>
            <a href="#" class="social-link" aria-label="GitHub">
              <span class="social-icon">💻</span>
            </a>
            <a href="#" class="social-link" aria-label="Telegram">
              <span class="social-icon">📨</span>
            </a>
          </div>
        </div>
        
        <div class="footer-grid">
          <div class="footer-section">
            <h4 class="section-title">Навигация</h4>
            <ul class="footer-links">
              <li><router-link to="/lessons" class="footer-link">Уроки</router-link></li>
              <li><router-link to="/profile" class="footer-link">Профиль</router-link></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="section-title">Ресурсы</h4>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">Документация</a></li>
              <li><a href="#" class="footer-link">API</a></li>
              <li><a href="#" class="footer-link">Статус</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="section-title">Контакты</h4>
            <ul class="footer-links">
              <li class="contact-item">
                <span class="contact-icon">✉️</span>
                <a href="mailto:support@securelearn.edu" class="footer-link">support@securelearn.edu</a>
              </li>
              <li class="contact-item">
                <span class="contact-icon">🌐</span>
                <a href="#" class="footer-link">securelearn.edu</a>
              </li>
              <li class="contact-item">
                <span class="contact-icon">📍</span>
                <span>Санкт-Петербург, ул. Кибербезопасности, 42</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="copyright">
          © 2025 SecureLearn. Все права защищены.
        </div>
        
        <div class="legal-links">
          <a href="#" class="legal-link">Политика конфиденциальности</a>
          <a href="#" class="legal-link">Условия использования</a>
          <a href="#" class="legal-link">Cookie</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
/* Основные стили */
.app-footer {
  background: linear-gradient(135deg, #1a2a3a 0%, #0f172a 100%);
  color: #f8fafc;
  position: relative;
  padding-top: 2rem;
}

.footer-wave {
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  height: 50px;
  background-size: cover;
  background-repeat: no-repeat;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  padding-bottom: 3rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.8rem;
  font-weight: 700;
  color: #f8fafc;
  text-decoration: none;
  margin-bottom: 1.5rem;
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  background: linear-gradient(90deg, #4fd1c5 0%, #38b2ac 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tagline {
  color: #a0aec0;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(79, 209, 197, 0.2);
  transform: translateY(-3px);
}

.social-icon {
  font-size: 1.2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #f8fafc;
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #4fd1c5 0%, #38b2ac 100%);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.footer-link {
  color: #a0aec0;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-link:hover {
  color: #4fd1c5;
  transform: translateX(5px);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a0aec0;
}

.contact-icon {
  font-size: 1.1rem;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  color: #718096;
  font-size: 0.9rem;
}

.legal-links {
  display: flex;
  gap: 1.5rem;
}

.legal-link {
  color: #718096;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s ease;
}

.legal-link:hover {
  color: #4fd1c5;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr;
  }
  
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 0 1.5rem;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .legal-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: 0 1rem;
  }
  
  .logo {
    font-size: 1.6rem;
  }
  
  .logo-icon {
    font-size: 1.8rem;
  }
}
</style>