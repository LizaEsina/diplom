<template>
  <div class="landing-page">
    <!-- Hero секция с анимацией -->
    <section class="hero-section">
      <div class="particles" id="particles-js"></div>
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="gradient-text">Освойте кибербезопасность</span><br>
            через практические испытания
          </h1>
          <p class="hero-subtitle">
            Интерактивная платформа для реалистичного обучения веб-безопасности. 
            Изучайте уязвимости, эксплуатируйте их и учитесь защищаться.
          </p>
          <div class="hero-cta">
            <router-link to="/login" class="cta-button primary">
              <span class="button-icon">🚀</span>
              Начать обучение
            </router-link>
            <router-link to="/login" class="cta-button secondary">
              <span class="button-icon">🔐</span>
              Войти в систему
            </router-link>
          </div>
        </div>
        <div class="hero-visual">
          <div class="interactive-terminal">
            <div class="terminal-header">
              <div class="terminal-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <div class="terminal-title">securelearn@demo:~</div>
            </div>
            <div class="terminal-content">
              <p class="code-line"><span class="prompt">$</span> scan --vulnerabilities</p>
              <p class="code-line"><span class="output">[✓] SQL Injection detected</span></p>
              <p class="code-line"><span class="output">[✓] XSS vulnerabilities found</span></p>
              <p class="code-line"><span class="output">[!] CSRF protection missing</span></p>
              <p class="code-line"><span class="prompt">$</span> <span class="cursor">|</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Секция преимуществ -->
    <section class="benefits-section">
      <div class="section-container">
        <h2 class="section-title">Почему выбирают SecureLearn</h2>
        <p class="section-subtitle">Современный подход к обучению безопасности</p>
        
        <div class="benefits-grid">
          <div class="benefit-card" v-for="(benefit, index) in benefits" :key="index">
            <div class="benefit-icon" :class="`icon-${index+1}`">
              {{ benefit.icon }}
            </div>
            <h3 class="benefit-title">{{ benefit.title }}</h3>
            <p class="benefit-description">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Популярные курсы -->
    <section class="courses-section">
      <div class="section-container">
        <h2 class="section-title">Популярные направления</h2>
        <p class="section-subtitle">Начните с самых востребованных тем</p>
        
        <div class="courses-grid">
          <div class="course-card" v-for="course in courses" :key="course.id" 
               :style="{ '--hue': course.hue }">
            <div class="course-badge">{{ course.category }}</div>
            <h3 class="course-title">{{ course.title }}</h3>
            <p class="course-description">{{ course.description }}</p>
            <div class="course-stats">
              <div class="stat">
                <span class="stat-icon">📊</span>
                <span class="stat-value">{{ course.level }}</span>
              </div>
            </div>
            <router-link to="/login" class="course-button">
              Изучить <span class="arrow">→</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA секция -->
    <section class="final-cta">
      <div class="section-container">
        <h2 class="cta-title">Готовы начать своё путешествие в кибербезопасность?</h2>
        <p class="cta-subtitle">Присоединяйтесь к нам.</p>
        <router-link to="/login" class="cta-button large">
          <span class="button-icon">🔓</span>
          Начать сейчас - бесплатно
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      benefits: [
        {
          icon: "🛡️",
          title: "Реальные сценарии",
          description: "Практикуйтесь на реалистичных уязвимых приложениях"
        },
        {
          icon: "💻",
          title: "Интерактивная среда",
          description: "Полноценные лаборатории прямо в браузере"
        },
        {
          icon: "📈",
          title: "Прогресс и аналитика",
          description: "Отслеживайте свои успехи"
        },
        {
          icon: "🏆",
          title: "Система достижений",
          description: "Зарабатывайте бейджи и повышайте уровень"
        }
      ],
      courses: [
        {
          id: 1,
          category: "Web",
          title: "SQL-инъекции",
          description: "Изучите эксплуатацию и защиту от SQL-инъекций",
          level: "Средний",
          duration: "2 часа",
          hue: 20
        },
        {
          id: 2,
          category: "Web",
          title: "XSS атаки",
          description: "Межсайтовый скриптинг и методы защиты",
          level: "Начальный",
          duration: "1.5 часа",
          hue: 160
        },
        {
          id: 3,
          category: "Web",
          title: "CSRF защита",
          description: "Подделка межсайтовых запросов и защита",
          level: "Начальный",
          duration: "1 час",
          hue: 260
        }
      ]
    }
  },
  mounted() {
    // Инициализация частиц для фона hero-секции
    if (typeof window !== 'undefined' && window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#4fd1c5" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: "#4fd1c5", opacity: 0.4, width: 1 },
          move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" }
          }
        }
      });
    }
  }
}
</script>

<style scoped>
.main-content{
  padding: none;
}
/* Базовые стили */
.landing-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1a202c;
  line-height: 1.6;
  overflow-x: hidden;
}

/* Hero секция */
.hero-section {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  overflow: hidden;
  padding: 0 2rem;
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.hero-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
  padding: 4rem 0;
}

.hero-content {
  max-width: 600px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.gradient-text {
  background: linear-gradient(90deg, #4fd1c5 0%, #38b2ac 50%, #4299e1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #cbd5e0;
  margin-bottom: 2.5rem;
  max-width: 90%;
}

.hero-cta {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.8rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  font-size: 1.05rem;
}

.cta-button.primary {
  background: linear-gradient(135deg, #4fd1c5 0%, #4299e1 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(66, 153, 225, 0.3);
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(66, 153, 225, 0.4);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.button-icon {
  margin-right: 0.7rem;
  font-size: 1.2rem;
}

.hero-visual {
  position: relative;
}

.interactive-terminal {
  background: #1a202c;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: perspective(1000px) rotateY(-5deg);
  transition: transform 0.5s ease;
}

.interactive-terminal:hover {
  transform: perspective(1000px) rotateY(0deg);
}

.terminal-header {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  background: #2d3748;
  border-bottom: 1px solid #4a5568;
}

.terminal-dots {
  display: flex;
  gap: 0.5rem;
  margin-right: 1rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #f56565; }
.dot.yellow { background: #f6ad55; }
.dot.green { background: #68d391; }

.terminal-title {
  color: #a0aec0;
  font-size: 0.85rem;
  font-family: 'Fira Code', monospace;
}

.terminal-content {
  padding: 1.5rem;
  font-family: 'Fira Code', monospace;
  min-height: 250px;
}

.code-line {
  margin-bottom: 0.8rem;
  color: #e2e8f0;
}

.prompt {
  color: #68d391;
  margin-right: 0.5rem;
}

.output {
  color: #e2e8f0;
}

.output:before {
  content: "> ";
  color: #a0aec0;
}

.cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Секции */
.section-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 6rem 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  color: #1a202c;
}

.section-subtitle {
  font-size: 1.25rem;
  color: #4a5568;
  text-align: center;
  margin-bottom: 4rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Преимущества */
.benefits-section {
  background: white;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.benefit-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  border: 1px solid #edf2f7;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: #e2e8f0;
}

.benefit-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(79, 209, 197, 0.1);
}

.icon-1 { background: rgba(246, 173, 85, 0.1); color: #f6ad55; }
.icon-2 { background: rgba(104, 211, 145, 0.1); color: #68d391; }
.icon-3 { background: rgba(159, 122, 234, 0.1); color: #9f7aea; }
.icon-4 { background: rgba(237, 137, 54, 0.1); color: #ed8936; }

.benefit-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2d3748;
}

.benefit-description {
  color: #4a5568;
  line-height: 1.7;
}

/* Курсы */
.courses-section {
  background: #f7fafc;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.course-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.course-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: hsl(var(--hue), 89%, 78%);
  color: hsl(var(--hue), 50%, 30%);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.course-card:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: hsl(var(--hue), 89%, 60%);
}

.course-content {
  padding: 2rem;
}

.course-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2d3748;
  padding-top: 1rem;
  margin-left: 20px;
}

.course-description {
  color: #4a5568;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  margin-left: 10px;
}

.course-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.stat {
  display: flex;
  align-items: center;
  color: #4a5568;
}

.stat-icon {
  margin-right: 0.5rem;
  font-size: 1.1rem;
  margin-left: 20px;
}

.course-button {
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  background: hsl(var(--hue), 89%, 96%);
  color: hsl(var(--hue), 50%, 40%);
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.course-button:hover {
  background: hsl(var(--hue), 89%, 92%);
  color: hsl(var(--hue), 50%, 30%);
}

.arrow {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.course-button:hover .arrow {
  transform: translateX(3px);
}

/* Финальный CTA */
.final-cta {
  background: linear-gradient(135deg, #2b6cb0 0%, #4c51bf 100%);
  color: white;
  text-align: center;
  padding: 6rem 2rem;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto 3rem;
  opacity: 0.9;
}

.cta-button.large {
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
  background: white;
  color: #2b6cb0;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.cta-button.large:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

/* Адаптивность */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .hero-content {
    max-width: 100%;
    margin: 0 auto;
  }
  
  .hero-subtitle {
    max-width: 100%;
  }
  
  .hero-cta {
    justify-content: center;
  }
  
  .interactive-terminal {
    max-width: 600px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-container {
    padding: 4rem 1.5rem;
  }
  
  .hero-cta {
    flex-direction: column;
    gap: 1rem;
  }
  
  .cta-button {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
  
  .benefits-grid, .courses-grid {
    grid-template-columns: 1fr;
  }
}
</style>