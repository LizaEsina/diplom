<template>
  <div class="profile-page">
    <div class="profile-container">
      <!-- Профиль -->
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar">{{ userInitials }}</div>
          <div class="user-info">
            <h1>{{ user.login }}</h1>
            <div class="level-badge">Уровень {{ user.level }}</div>
          </div>
        </div>

        <!-- Прогресс -->
        <div class="progress-container">
          <div class="progress-labels">
            <span>Опыт: {{ user.experience }} XP</span>
            <span>{{ progressPercentage.toFixed(1) }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
          </div>
        </div>

        <!-- Статистика -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">{{ stats.completed_lessons }}</div>
            <div class="stat-label">Уроков пройдено</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.categories_completed.sql }}</div>
            <div class="stat-label">SQL инъекций</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.categories_completed.xss }}</div>
            <div class="stat-label">XSS атак</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.categories_completed.csrf }}</div>
            <div class="stat-label">CSRF уязвимостей</div>
          </div>
        </div>
      </div>

      <!-- Достижения -->
      <div class="achievements-section">
        <h2>Ваши достижения</h2>
        <div class="achievements-grid">
          <div v-for="achievement in achievements" :key="achievement.id"
            :class="['achievement-card', { 'earned': achievement.earned }]">
            <div class="achievement-icon">
              {{ achievement.earned ? '🏆' : '🔒' }}
            </div>
            <div class="achievement-details">
              <h3>{{ achievement.name }}</h3>
              <p>{{ achievement.description }}</p>
              <div v-if="achievement.earned" class="achievement-date">
                Получено: {{ formatDate(achievement.earned_at) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Уведомления -->
    <AchievementNotification ref="achievementNotifier" />
  </div>
</template>

<script>
import AchievementNotification from '@/components/AchievementNotification.vue'

export default {
  components: {
    AchievementNotification
  },
  data() {
    return {
      user: {
        id: null,
        login: '',
        experience: 0,
        level: 1
      },
      stats: {
        completed_lessons: 0,
        categories_completed: { sql: 0, xss: 0, csrf: 0 }
      },
      achievements: [],
      xpPerLevel: 1000,
      isLoading: true,
      error: null
    }
  },
  async created() {
    try {
      await this.fetchUserData()

      if (!this.user?.id) throw new Error('Не удалось получить ID пользователя')

      await this.fetchAchievements()
    } catch (error) {
      console.error('Ошибка инициализации:', error)
      this.error = error.message
      this.$router.replace('/login')
    } finally {
      this.isLoading = false
    }
  },
  computed: {
    userInitials() {
      return this.user.login ? this.user.login.charAt(0).toUpperCase() : '?'
    },
    calculatedLevel() {
      return Math.floor(this.user.experience / this.xpPerLevel) + 1
    },
    progressPercentage() {
      const xp = this.user.experience || 0
      const level = this.calculatedLevel
      const baseXP = (level - 1) * this.xpPerLevel
      const levelXP = xp - baseXP
      return Math.min(100, (levelXP / this.xpPerLevel) * 100)
    },
    xpToNextLevel() {
      const xp = this.user.experience || 0
      const nextLevelXP = this.calculatedLevel * this.xpPerLevel
      return nextLevelXP - xp
    }
  },
  methods: {
    getTokenFromCookies() {
      const token = this.$store.state.token
      if (!token) throw new Error('Токен не найден в cookies')
      return token
    },

    async fetchUserData() {
      const token = this.getTokenFromCookies()
      const response = await fetch('http://localhost:9000/api/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`)

      const data = await response.json()
      if (!data?.id) throw new Error('Ответ API не содержит ID пользователя')

      this.user = {
        id: data.id,
        login: data.login || 'Аноним',
        experience: data.experience || 0,
        level: data.level || 1
      }

      this.stats = data.stats || {
        completed_lessons: 0,
        categories_completed: { sql: 0, xss: 0, csrf: 0 }
      }
    },

    async fetchAchievements() {
      const token = this.getTokenFromCookies()
      const response = await fetch('http://localhost:9000/api/achievements.php', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`)

      const result = await response.json()
      if (!result.success) throw new Error(result.error || 'Не удалось получить достижения')

      const newAchievements = []
      const stored = JSON.parse(localStorage.getItem('shown_achievements') || '[]')

      result.data.forEach(ach => {
        if (ach.earned && !stored.includes(ach.id)) {
          newAchievements.push(ach)
          stored.push(ach.id)
        }
      })

      if (newAchievements.length > 0) {
        this.showAchievementNotifications(newAchievements)
        localStorage.setItem('shown_achievements', JSON.stringify(stored))
      }

      this.achievements = result.data
    },

    showAchievementNotifications(achievements) {
      achievements.forEach(achievement => {
        this.$refs.achievementNotifier?.addNotification(achievement)
      })
    },

    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('ru-RU')
    }
  }
}
</script>



<style scoped>
.profile-page {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Карточка профиля */
.profile-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4fd1c5, #438afa);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-right: 2rem;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.user-info h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.75rem;
  letter-spacing: -0.5px;
}

.level-badge {
  display: inline-block;
  background: #E0E7FF;
  color: #4F46E5;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.9375rem;
}

/* Прогресс бар */
.progress-container {
  margin-bottom: 3rem;
  background: #F9FAFB;
  padding: 1.5rem;
  border-radius: 12px;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.9375rem;
  color: #4fd1c5;
  font-weight: 500;
}

.progress-bar {
  height: 10px;
  background: #E5E7EB;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.progress-fill {
  height: 100%;
  min-width: 4px;
  background: linear-gradient(90deg, #4fd1c5, #438afa);
  border-radius: 10px;
  transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
}

/* Статистика */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.75rem;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.03);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.stat-value {
  font-size: 2.25rem;
  font-weight: 800;
  color: #438afa;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #4fd1c5, #438afa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 0.9375rem;
  color: #6B7280;
  font-weight: 500;
}

/* Достижения */
.achievements-section {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  padding: 2.5rem;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.achievements-section h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
  letter-spacing: -0.5px;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.75rem;
}

.achievement-card {
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 1.75rem;
  display: flex;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  background: white;
}

.achievement-card.earned {
  background: linear-gradient(to right, #F9FAFB, white);
  border-color: #D1FAE5;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
}

.achievement-card:not(.earned) {
  opacity: 0.85;
  filter: grayscale(20%);
}

.achievement-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.achievement-icon {
  font-size: 2.5rem;
  margin-right: 1.75rem;
  flex-shrink: 0;
  align-self: center;
}

.achievement-details h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.75rem;
}

.achievement-details p {
  color: #6B7280;
  font-size: 0.9375rem;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.achievement-date {
  font-size: 0.8125rem;
  color: #9CA3AF;
  font-style: italic;
}

/* Адаптивность */
@media (max-width: 768px) {
  .profile-page {
    padding: 1.5rem;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .avatar {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }

  .achievements-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-card, .achievements-section {
    padding: 1.75rem 1.25rem;
  }
}
</style>