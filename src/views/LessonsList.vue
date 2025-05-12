<template>
  <div class="lessons-container">
    <!-- Фильтры -->
    <div class="filters-panel">
      <div class="filter-group">
        <div class="filter-label">Категория</div>
        <div class="custom-select">
          <select v-model="selectedCategory" @change="filterLessons">
            <option value="">Все категории</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat.toUpperCase() }}</option>
          </select>
          <span class="select-arrow">▼</span>
        </div>
      </div>
      
      <div class="filter-group">
        <div class="filter-label">Сложность</div>
        <div class="custom-select">
          <select v-model="selectedDifficulty" @change="filterLessons">
            <option value="">Любая</option>
            <option v-for="diff in difficulties" :key="diff" :value="diff">{{ diff }}</option>
          </select>
          <span class="select-arrow">▼</span>
        </div>
      </div>
    </div>

    <!-- Состояние загрузки -->
    <div v-if="loading" class="loading-state">
      <div class="pulse-loader">
        <div></div><div></div><div></div>
      </div>
      <div class="loading-text">Загружаем уроки...</div>
    </div>
    
    <!-- Сообщение об ошибке -->
    <div v-if="error" class="error-state">
      <div class="error-icon">!</div>
      <div class="error-message">{{ error }}</div>
    </div>

    <!-- Список уроков -->
    <div v-else class="lessons-grid">
      <div 
        v-for="lesson in filteredLessons" 
        :key="lesson.id" 
        class="lesson-card"
        :class="{ 'premium-card': lesson.is_premium }"
      >
        <div class="card-decoration" :class="lesson.category"></div>
        
        <div class="card-header">
          <div class="badge-group">
            <span class="category-badge" :class="lesson.category">{{ lesson.category.toUpperCase() }}</span>
            <span class="difficulty-badge" :class="lesson.difficulty">{{ lesson.difficulty }}</span>
          </div>
          <span v-if="lesson.is_premium" class="premium-label">
            <span class="premium-star">★</span> PREMIUM
          </span>
        </div>
        
        <div class="card-content">
          <h3 class="lesson-title">{{ lesson.title }}</h3>
          <p class="lesson-description">{{ lesson.description }}</p>
          
          <div class="lesson-stats">
            <div class="stat-item">
              <span class="stat-icon">💎</span>
              <span class="stat-value">{{ lesson.points }} очков</span>
            </div>
          </div>
        </div>

        <button class="start-lesson-btn" @click="startLesson(lesson)">
          <span>Начать</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allLessons: [], // Все уроки
      filteredLessons: [], // Отфильтрованные уроки
      loading: true,
      error: null,
      selectedCategory: '',
      selectedDifficulty: '',
      categories: ['sql', 'xss', 'csrf'],
      difficulties: ['low', 'medium', 'hard']
    }
  },
  async mounted() {
    await this.fetchLessons()
  },
  methods: {
    async fetchLessons() {
      try {
        this.loading = true
        const response = await fetch('/api/lessons')
        
        if (!response.ok) throw new Error('Ошибка загрузки')
        
        const data = await response.json()
        this.allLessons = data.lessons || []
        this.filterLessons() // Применяем фильтры после загрузки
        
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    
    filterLessons() {
      this.filteredLessons = this.allLessons.filter(lesson => {
        // Проверка категории
        const categoryMatch = !this.selectedCategory || 
                            lesson.category.toLowerCase() === this.selectedCategory.toLowerCase()
        
        // Проверка сложности
        const difficultyMatch = !this.selectedDifficulty || 
                              lesson.difficulty.toLowerCase() === this.selectedDifficulty.toLowerCase()
        
        return categoryMatch && difficultyMatch
      })
    },
    
    formatDate(dateString) {
      if (!dateString) return 'Дата не указана';
      
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          throw new Error('Invalid date');
        }
        
        const options = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        };
        return date.toLocaleDateString('ru-RU', options);
      } catch (e) {
        console.error('Date formatting error:', e);
        return dateString;
      }
    },
    
    startLesson(lesson) {
      this.$router.push({
        name: 'LessonDetail',
        params: { id: lesson.id }
      });
    }
  }
}
</script>
  
<style scoped>
:root {
  --primary: #6C5CE7;
  --primary-dark: #5649C0;
  --secondary: #00CEFF;
  --accent: #FD79A8;
  --dark: #2D3436;
  --light: #F5F6FA;
  --gray: #636E72;
  --success: #00B894;
  --warning: #FDCB6E;
  --danger: #E17055;
  --premium-gold: #FFD700;
  --premium-gradient: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
}

.lessons-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
}

/* Фильтры */
.filters-panel {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.filter-group {
  flex: 1;
  min-width: 220px;
}

.filter-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--gray);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.custom-select {
  position: relative;
}

.custom-select select {
  width: 100%;
  padding: 0.85rem 1.25rem;
  background: white;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  color: var(--dark);
  appearance: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.custom-select select:focus {
  outline: none;
  box-shadow: 0 4px 20px rgba(108, 92, 231, 0.2);
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--gray);
  font-size: 0.7rem;
}

/* Состояния */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background: rgba(245, 246, 250, 0.8);
  border-radius: 20px;
  margin-bottom: 2rem;
}

.pulse-loader {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.pulse-loader div {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--primary);
  animation: pulse 1.2s infinite ease-in-out;
}

.pulse-loader div:nth-child(2) {
  animation-delay: 0.2s;
}

.pulse-loader div:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 100% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
}

.loading-text {
  font-size: 1.1rem;
  color: var(--dark);
  font-weight: 500;
}

.error-state {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(225, 112, 85, 0.1);
  border-radius: 16px;
  border-left: 4px solid var(--danger);
}

.error-icon {
  width: 36px;
  height: 36px;
  background: var(--danger);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.error-message {
  color: var(--dark);
  font-weight: 500;
}

/* Карточки уроков */
.lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
}

.lesson-card {
  position: relative;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.lesson-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.card-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  z-index: 2;
}

.card-decoration.sql { background: linear-gradient(90deg, #6C5CE7, #A29BFE); }
.card-decoration.xss { background: linear-gradient(90deg, #00CEFF, #55E6FF); }
.card-decoration.csrf { background: linear-gradient(90deg, #00B894, #55E6C1); }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
  z-index: 1;
}

.badge-group {
  display: flex;
  gap: 0.5rem;
}

.category-badge {
  padding: 0.4rem 0.9rem;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: white;
}

.category-badge.sql { background: rgba(108, 92, 231, 0.2); color: #6C5CE7; }
.category-badge.xss { background: rgba(0, 206, 255, 0.2); color: #00B4D8; }
.category-badge.csrf { background: rgba(0, 184, 148, 0.2); color: #00B894; }

.difficulty-badge {
  padding: 0.4rem 0.9rem;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.difficulty-badge.low { background: rgba(0, 184, 147, 0.295); color: var(--success); }
.difficulty-badge.medium { background: rgba(253, 203, 110, 0.232); color: #E17055; }
.difficulty-badge.hard { background: rgba(255, 51, 0, 0.176); color: var(--danger); }

.premium-label {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.9rem;
  background: var(--premium-gradient);
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.premium-star {
  font-size: 0.8rem;
}

.card-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.lesson-title {
  margin: 0 0 1rem;
  color: var(--dark);
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.4;
}

.lesson-description {
  color: var(--gray);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.lesson-stats {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.stat-icon {
  font-size: 1.1rem;
}

.stat-value {
  font-weight: 600;
  color: var(--dark);
}

.start-lesson-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: calc(100% - 3rem);
  margin: 0 1.5rem 1.5rem;
  padding: 1rem;
  background: var(--primary);
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.start-lesson-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(108, 92, 231, 0.3);
}

.start-lesson-btn svg {
  transition: transform 0.3s ease;
}

.start-lesson-btn:hover svg {
  transform: translateX(3px);
}

/* Премиум карточка */
.premium-card {
  border: 2px solid rgba(255, 215, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.premium-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: var(--premium-gradient);
  opacity: 0.05;
  transform: rotate(30deg);
  z-index: -1;
}

/* Адаптивность */
@media (max-width: 768px) {
  .filters-panel {
    flex-direction: column;
    gap: 1rem;
  }
  
  .lessons-grid {
    grid-template-columns: 1fr;
  }
}
</style>