<template>
  <div class="admin-layout">
    <!-- Хедер -->
    <header class="admin-header">
      <div class="header-content">
        <button class="menu-toggle" @click="toggleSidebar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
          </svg>
        </button>
        <h1>Статистика пользователей</h1>
        <div class="user-menu">
          <span class="username">{{ user.login || 'Администратор' }}</span>
          <div class="avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </header>

    <!-- Боковое меню -->
    <aside class="admin-sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <div class="sidebar-content">
        <div class="sidebar-header">
          <div class="admin-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
            <span v-if="!isSidebarCollapsed">SecurityEdu</span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <router-link 
            to="/admin/create-lesson" 
            class="nav-item"
            active-class="active"
          >
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                <path d="M7 12h2v5H7zm4-7h2v12h-2zm4 4h2v8h-2z"/>
              </svg>
            </span>
            <span class="nav-text" v-if="!isSidebarCollapsed">Создание урока</span>
          </router-link>
          <router-link 
            to="/admin/create-assignments" 
            class="nav-item"
            active-class="active"
          >
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                <path d="M7 12h2v5H7zm4-7h2v12h-2zm4 4h2v8h-2z"/>
              </svg>
            </span>
            <span class="nav-text" v-if="!isSidebarCollapsed">Создание практических заданий </span>
          </router-link>
          <router-link 
            to="/admin/dashboard" 
            class="nav-item"
            active-class="active"
          >
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"/>
              </svg>
            </span>
            <span class="nav-text" v-if="!isSidebarCollapsed">Управление уроками</span>
          </router-link>

          <router-link 
            to="/admin/manage-lessons" 
            class="nav-item"
            active-class="active"
          >
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z"/>
              </svg>
            </span>
            <span class="nav-text" v-if="!isSidebarCollapsed">Создание заданий к урокам</span>
          </router-link>
        </nav>
      </div>
    </aside>

    <!-- Основное содержимое -->
    <main class="admin-main" :class="{ 'main-expanded': isSidebarCollapsed }">
      <div class="stats-container">
        <!-- Общая статистика -->
        <div class="stats-section">
          <h2>Общая статистика</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div class="stat-info">
                <div class="stat-value">{{ stats.total_user }}</div>
                <div class="stat-label">Всего пользователей</div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon success">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div class="stat-info">
                <div class="stat-value">{{ Math.round(stats.avg_experience) }}</div>
                <div class="stat-label">Средний опыт</div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon warning">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
              </div>
              <div class="stat-info">
                <div class="stat-value">{{ stats.total_experience }}</div>
                <div class="stat-label">Общий опыт</div>
              </div>
            </div>
          </div>
        </div>

        <!-- График активности -->
        <div class="stats-section">
          <h2>Активность пользователей</h2>
          <div class="chart-container">
            <canvas ref="activityChart"></canvas>
          </div>
        </div>

        <!-- Статистика по урокам -->
        <div class="stats-section">
          <h2>Статистика по урокам</h2>
          <div class="lessons-stats">
            <div v-for="lesson in lessons" :key="lesson.category" class="lesson-stat">
              <div class="lesson-category">{{ lesson.category.toUpperCase() }}</div>
              <div class="lesson-progress">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: getCompletionPercentage(lesson) + '%' }"></div>
                </div>
                <div class="lesson-numbers">
                  <span>Завершено: {{ lesson.completed }}</span>
                  <span>Средний балл: {{ Math.round(lesson.avg_score) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Детальная статистика по пользователям -->
        <div class="stats-section">
          <h2>Детальная статистика пользователей</h2>
          <div class="users-table-container">
            <table class="users-table">
              <thead>
                <tr>
                  <th>Пользователь</th>
                  <th>Опыт</th>
                  <th>Завершено уроков</th>
                  <th>Средний балл</th>
                  <th>Достижения</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.login }}</td>
                  <td>{{ user.experience }}</td>
                  <td>{{ user.completed_lessons }}</td>
                  <td>{{ user.avg_score }}</td>
                  <td>{{ user.achievements }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'UserStatistics',
  data() {
    return {
      isSidebarCollapsed: false,
      user: {
        login: 'Администратор'
      },
      stats: {
        total_user: 0,
        total_experience: 0,
        avg_experience: 0
      },
      activity: [],
      lessons: [],
      users: [],
      activityChart: null
    };
  },
  async mounted() {
    await this.fetchStatistics();
    this.renderChart();
  },
  beforeUnmount() {
    if (this.activityChart) {
      this.activityChart.destroy();
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    async fetchStatistics() {
      try {
        const token = this.$store.state.token;
        const response = await fetch('http://localhost:9000/api/admin/users_stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (data.success) {
          this.stats = data.stats;
          this.activity = data.activity.reverse();
          this.lessons = data.lessons;
          this.users = data.users;
        } else {
          console.error('Ошибка загрузки статистики:', data.error);
        }
      } catch (error) {
        console.error('Ошибка при загрузке статистики:', error);
      }
    },
    renderChart() {
      if (!this.activity || this.activity.length === 0) return;
      
      const ctx = this.$refs.activityChart.getContext('2d');
      
      if (this.activityChart) {
        this.activityChart.destroy();
      }
      
      this.activityChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.activity.map(item => item.date),
          datasets: [
            {
              label: 'Регистрации',
              data: this.activity.map(item => item.registrations),
              backgroundColor: '#4f46e5',
              borderColor: '#4f46e5',
              borderWidth: 1
            },
            {
              label: 'Активные пользователи',
              data: this.activity.map(item => item.active_user),
              backgroundColor: '#10b981',
              borderColor: '#10b981',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    },
    getCompletionPercentage(lesson) {
      if (!this.stats.total_user) return 0;
      return Math.round((lesson.completed / this.stats.total_user) * 100);
    }
  }
}
</script>

<style scoped>
/* Общие стили админ-панели */
.admin-layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: auto 1fr;
  grid-template-rows: var(--header-height) 1fr var(--footer-height);
  min-height: 100vh;
}

:root {
  --sidebar-width: 250px;
  --sidebar-collapsed-width: 70px;
  --header-height: 60px;
  --footer-height: 50px;
  --primary-color: #4f46e5;
  --primary-hover: #4338ca;
  --danger-color: #ef4444;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --text-color: #1f2937;
  --text-light: #6b7280;
  --border-color: #e5e7eb;
  --bg-color: #f9fafb;
  --sidebar-bg: #ffffff;
  --sidebar-text: #1f2937;
  --sidebar-hover: #f3f4f6;
}

/* Хедер */
.admin-header {
  grid-area: header;
  background: white;
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 1.5rem;
}

.menu-toggle {
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.menu-toggle:hover {
  background: var(--sidebar-hover);
}

.menu-toggle svg {
  width: 20px;
  height: 20px;
  color: var(--text-color);
}

.admin-header h1 {
  font-size: 1.25rem;
  font-weight: 600;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.username {
  font-weight: 500;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar svg {
  width: 18px;
  height: 18px;
  color: var(--primary-color);
}

/* Боковое меню */
.admin-sidebar {
  grid-area: sidebar;
  width: var(--sidebar-width);
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border-color);
  height: calc(100vh - var(--header-height) - var(--footer-height));
  position: sticky;
  top: var(--header-height);
  transition: width 0.3s ease;
  overflow: hidden;
}

.sidebar-collapsed {
  width: var(--sidebar-collapsed-width);
}

.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.sidebar-header {
  padding: 0 1rem 1rem;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1rem;
}

.admin-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  font-size: 1.1rem;
  white-space: nowrap;
}

.admin-logo svg {
  width: 24px;
  height: 24px;
  color: var(--primary-color);
  flex-shrink: 0;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 0 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 0.25rem;
  text-decoration: none;
  color: var(--sidebar-text);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-item:hover {
  background: var(--sidebar-hover);
}

.nav-item.active {
  background: var(--primary-color);
  color: white;
}

.nav-item.active .nav-icon {
  background: rgba(255, 255, 255, 0.2);
}

.nav-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.nav-icon svg {
  width: 18px;
  height: 18px;
}

.nav-text {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Основное содержимое */
.admin-main {
  grid-area: main;
  background: var(--bg-color);
  padding: 1.5rem;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  overflow-y: auto;
}

.main-expanded {
  margin-left: calc(-1 * (var(--sidebar-width) - var(--sidebar-collapsed-width)));
}

/* Стили для статистики */
.stats-container {
  max-width: 1200px;
  margin: 0 auto;
}

.stats-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.stats-section h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  color: var(--text-color);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: #f8fafc;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-icon.primary {
  background: #eef2ff;
  color: var(--primary-color);
}

.stat-icon.success {
  background: #ecfdf5;
  color: var(--success-color);
}

.stat-icon.warning {
  background: #fffbeb;
  color: var(--warning-color);
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-light);
}

/* График активности */
.chart-container {
  margin-top: 1rem;
  height: 300px;
  position: relative;
}

/* Статистика по урокам */
.lessons-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.lesson-stat {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.lesson-category {
  font-weight: 600;
  color: var(--text-color);
}

.lesson-progress {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.lesson-numbers {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--text-light);
}

/* Таблица пользователей */
.users-table-container {
  overflow-x: auto;
  margin-top: 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
}

.users-table th, 
.users-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.users-table th {
  background: #f8fafc;
  font-weight: 600;
  color: var(--text-color);
  text-transform: uppercase;
  font-size: 0.8125rem;
  letter-spacing: 0.5px;
}

.users-table tr:hover {
  background: #f8fafc;
}

.users-table tr:last-child td {
  border-bottom: none;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .admin-sidebar {
    position: fixed;
    top: var(--header-height);
    left: 0;
    z-index: 20;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .admin-sidebar.sidebar-collapsed {
    transform: translateX(-100%);
  }

  .admin-sidebar.open {
    transform: translateX(0);
  }

  .admin-main {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-container {
    height: 250px;
  }

  .users-table th, 
  .users-table td {
    padding: 0.75rem;
  }
}

@media (max-width: 576px) {
  .admin-header h1 {
    font-size: 1rem;
  }
  
  .stats-section {
    padding: 1rem;
  }

  .users-table {
    font-size: 0.875rem;
  }

  .users-table th, 
  .users-table td {
    padding: 0.5rem;
  }
}
</style>