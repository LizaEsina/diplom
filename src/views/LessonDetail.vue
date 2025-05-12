<template>
  <div class="lesson-detail-container">
    <!-- Заголовок и мета-информация -->
    <div class="lesson-header">
      <div class="header-content">
        <h1 class="lesson-title">{{ lesson.title }}</h1>
        <div class="lesson-meta">
          <span class="meta-badge category" :class="lesson.category">
            {{ lesson.category.toUpperCase() }}
          </span>
          <span class="meta-badge difficulty" :class="lesson.difficulty">
            {{ lesson.difficulty }}
          </span>
          <span class="points">
            💎 {{ lesson.points }} очков
          </span>
        </div>
      </div>
      <button @click="goBack" class="back-button">
        ← Назад к списку
      </button>
    </div>

    <!-- Основное содержимое -->
    <div class="lesson-content">
      <!-- Теория -->
      <section class="theory-section">
        <h2 class="section-title">📚 Теоретическая часть</h2>
        <div class="theory-content" v-html="lesson.theory_content"></div>
      </section>

      <!-- Пример кода -->
      <section class="practice-section">
        <h2 class="section-title">💻 Пример</h2>

        <div class="code-block vulnerable">
          <div class="code-header">
            <h3>Уязвимый код</h3>
            <span class="danger-icon">⚠️ Опасность</span>
          </div>
          <pre ><code class="language-php">{{ lesson.vulnerable_code }}</code></pre>
        </div>
      </section>
      <div class="completion-section">
            <div class="completion-controls">
              <button v-if="!lessonProgress.is_completed" @click="completeLesson" class="complete-btn"
                :disabled="isCompleting">
                {{ isCompleting ? 'Завершаем...' : 'Завершить урок' }}
              </button>

              <div v-else class="completion-message">
                ✅ Урок завершен!
              </div>
            </div>

            <router-link v-if="lessonProgress.is_completed" :to="`/lessons/${lesson.id}/practice`" class="practice-link">
  Перейти к практике
</router-link>



        <div v-else class="loading-auth">
          Проверка авторизации...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js/lib/core';
import php from 'highlight.js/lib/languages/php';
hljs.registerLanguage('php', php);

export default {
  data() {
    return {
      lesson: {
        title: '',
        category: '',
        difficulty: '',
        is_premium: false,
        points: 0,
        theory_content: '',
        vulnerable_code: '',
        secure_code: ''
      },
      lessonProgress: {
        is_completed: false,
        attempts: 0,
        best_score: 0
      },
      isCompleting: false,
      loading: true,
      error: null,
      showSolution: false,
      isAuthenticated: false,
      authChecked: false // Добавляем флаг проверки авторизации
    }
  },
  async created() {
    await this.checkAuth();
    await this.fetchLesson();

    if (this.isAuthenticated) {
      await this.fetchProgress();
    }
    this.authChecked = true; // Помечаем, что проверка авторизации завершена
  },
  methods: {
    getTokenFromCookies() {
  const token = this.$store.state.token; // или через this.getCookie('token')
  if (!token) {
    throw new Error('Токен не найден в cookies');
  }
  return token;
},

    async checkAuth() {
      const token = this.$store.state.token

      if (!token) {
        throw new Error('Токен не найден в cookies');
      }
      if (token) {
    this.isAuthenticated = true;
    return token;
  } else {
    this.isAuthenticated = false;
    return null;
  }
    },
    async fetchLesson() {
  try {
    this.loading = true;
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`/api/lessons/one.php?id=${this.$route.params.id}`, {
      credentials: 'include',
      headers
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки урока');
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      this.lesson = data.data.lesson;

      if (data.data.user_progress) {
        this.lessonProgress = data.data.user_progress;
        this.isAuthenticated = true;
      }
    } else {
      throw new Error('Неверный формат данных от сервера');
    }
  } catch (err) {
    console.error('Ошибка загрузки урока:', err);
    this.error = err.message;
  } finally {
    this.loading = false;
  }
}
,
    async fetchProgress() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          this.isAuthenticated = false;
          return;
        }

        const response = await fetch(`/api/progress.php?id=${this.$route.params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          this.lessonProgress = data.progress || this.lessonProgress;
        } else if (response.status === 401) {
          this.isAuthenticated = false;
        }
      } catch (err) {
        console.error('Ошибка загрузки прогресса:', err);
      }
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    async completeLesson() {
      this.isCompleting = true;
      try {
        const token = this.getTokenFromCookies();
        if (!token) {
          throw new Error('Не авторизован');
        }

        const response = await fetch(`/api/lessons/complete.php?id=${this.$route.params.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });

        const result = await response.json();

        if (result.success) {
          this.lessonProgress.is_completed = true;
        } else {
          throw new Error(result.error || 'Неизвестная ошибка');
        }
      } catch (err) {
        console.error('Ошибка завершения урока:', err);
        this.$notify({
          title: 'Ошибка',
          text: err.message,
          type: 'error'
        });
      } finally {
        this.isCompleting = false;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    toggleSolution() {
      this.showSolution = !this.showSolution;
    },
  },
}
</script>

<style scoped>
.completion-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.complete-btn {
  background: #4CAF50;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.complete-btn:hover:not(:disabled) {
  background: #3e8e41;
}

.complete-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.completion-message {
  color: #4CAF50;
  font-weight: bold;
}

.practice-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background: #2196F3;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;
}

.practice-link:hover {
  background: #0b7dda;
}

.auth-notice {
  color: #666;
  font-size: 0.9rem;
}

.login-link {
  color: #2196F3;
  text-decoration: none;
  font-weight: bold;
}

.login-link:hover {
  text-decoration: underline;
}

.completion-section {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.complete-btn {
  background: #4CAF50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 15px;
}

.practice-link {
  display: inline-block;
  padding: 12px 24px;
  background: #2196F3;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.lesson-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eaeaea;
}

.header-content {
  flex: 1;
}

.lesson-title {
  font-size: 2.2rem;
  margin: 0 0 1rem;
  color: #2c3e50;
}

.lesson-meta {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  flex-wrap: wrap;
}

.meta-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
}

.meta-badge.category {
  background: #e1f5fe;
  color: #0277bd;
}

.meta-badge.category.sql {
  background: #fce4ec;
  color: #ad1457;
}

.meta-badge.category.xss {
  background: #e3f2fd;
  color: #1565c0;
}

.meta-badge.category.csrf {
  background: #e8f5e9;
  color: #2e7d32;
}

.meta-badge.category.idol {
  background: #f3e5f5;
  color: #6a1b9a;
}

.meta-badge.category.broken_auth {
  background: #ede7f6;
  color: #4527a0;
}

.meta-badge.difficulty {
  background: #fff3e0;
  color: #ef6c00;
}

.meta-badge.difficulty.low {
  background: #e8f5e9;
  color: #2e7d32;
}

.meta-badge.difficulty.medium {
  background: #fff8e1;
  color: #ff8f00;
}

.meta-badge.difficulty.hard {
  background: #ffebee;
  color: #c62828;
}

.meta-badge.premium {
  background: linear-gradient(45deg, #ffd54f, #ffa000);
  color: #fff;
}

.points {
  font-size: 0.9rem;
  color: #666;
  margin-left: auto;
}

.back-button {
  background: none;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 1rem;
}

.back-button:hover {
  background: #f5f5f5;
}

.lesson-content {
  margin-top: 2rem;
}

.section-title {
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  font-size: 1.2em;
}

.theory-content {
  line-height: 1.6;
  font-size: 1.1rem;
}

.theory-content :deep(p) {
  margin-bottom: 1rem;
}

.theory-content :deep(h3) {
  margin: 1.5rem 0 1rem;
  color: #2c3e50;
}

.theory-content :deep(code) {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', Courier, monospace;
}

.code-block {
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.code-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.danger-icon {
  color: #d32f2f;
  font-weight: 600;
}

.success-icon {
  color: #388e3c;
  font-weight: 600;
}

pre {
  margin: 0;
  padding: 1rem;
  background: #f8f8f8;
  overflow-x: auto;
}

.code-block.secure {
  max-height: 0;
  opacity: 0;
  transition: all 0.3s ease;
  margin: 0;
}

.code-block.show-solution {
  max-height: 1000px;
  opacity: 1;
  margin: 1.5rem 0;
}

.solution-button {
  background: #3f51b5;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  margin: 1rem 0;
}

.solution-button:hover {
  background: #303f9f;
}

.solution-button.active {
  background: #757de8;
}

.check-form {
  margin-top: 1.5rem;
}

.code-input {
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  font-family: 'Courier New', Courier, monospace;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: vertical;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.check-button {
  background: #4caf50;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.check-button:hover {
  background: #388e3c;
}

.check-result {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 6px;
  font-weight: 500;
}

.check-result.success {
  background: #e8f5e9;
  color: #2e7d32;
}

.check-result.error {
  background: #ffebee;
  color: #c62828;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #c62828;
}</style>