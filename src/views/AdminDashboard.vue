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
        <h1>Панель администратора</h1>
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
            to="/admin/users" 
            class="nav-item"
            active-class="active"
          >
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </span>
            <span class="nav-text" v-if="!isSidebarCollapsed">Пользователи</span>
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
            <span class="nav-text" v-if="!isSidebarCollapsed">Управление заданиями уроков</span>
          </router-link>
        </nav>
      </div>
    </aside>

    <!-- Основное содержимое -->
    <main class="admin-main" :class="{ 'main-expanded': isSidebarCollapsed }">
      <div class="manage-lessons">
        <div class="content-header">
          <h2>Управление уроками</h2>
          <router-link to="/admin/create-lesson" class="create-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Создать урок
          </router-link>
        </div>

        <!-- Уведомление об успехе -->
        <div v-if="showSuccess" class="notification success">
          Урок успешно обновлён
          <button @click="showSuccess = false" class="close-notification">×</button>
        </div>

        <!-- Уведомление об ошибке -->
        <div v-if="showError" class="notification error">
          {{ errorMessage }}
          <button @click="showError = false" class="close-notification">×</button>
        </div>

        <!-- Диалог редактирования урока -->
        <div v-if="showEditDialog" class="edit-modal" @click.self="closeEditDialog">
          <div class="modal-content">
            <h3>Редактировать урок</h3>
            <form @submit.prevent="submitEdit">
              <div class="form-group">
                <label for="title">Название</label>
                <input type="text" id="title" v-model="editedLesson.title" required />
              </div>
              <div class="form-group">
                <label for="slug">Slug</label>
                <input type="text" id="slug" v-model="editedLesson.slug" required />
              </div>
              <div class="form-group">
                <label for="description">Описание</label>
                <textarea id="description" v-model="editedLesson.description" required></textarea>
              </div>
              <div class="form-group">
                <label for="category">Категория</label>
                <input type="text" id="category" v-model="editedLesson.category" required />
              </div>
              <div class="form-group">
                <label for="difficulty">Сложность</label>
                <select id="difficulty" v-model="editedLesson.difficulty" required>
                  <option value="easy">Легкая</option>
                  <option value="medium">Средняя</option>
                  <option value="hard">Сложная</option>
                </select>
              </div>
              <div class="form-group">
                <label for="theory_content">Теоретическое содержание</label>
                <textarea id="theory_content" v-model="editedLesson.theory_content"></textarea>
              </div>
              <div class="form-group">
                <label for="points">Баллы</label>
                <input type="number" id="points" v-model="editedLesson.points" />
              </div>
              <div class="form-group">
                <label for="vulnerable_code">Уязвимый код</label>
                <textarea id="vulnerable_code" v-model="editedLesson.vulnerable_code"></textarea>
              </div>
              <div class="form-group">
                <label for="secure_code">Безопасный код</label>
                <textarea id="secure_code" v-model="editedLesson.secure_code"></textarea>
              </div>
              <div class="form-group">
                <label for="is_visible">Отображать</label>
                <input type="checkbox" id="is_visible" v-model="editedLesson.is_visible" />
              </div>
              <div class="dialog-buttons">
                <button type="submit" class="confirm-button" :disabled="isSaving">
                  <span v-if="isSaving">Загрузка...</span>
                  <span v-else>Сохранить</span>
                </button>
                <button type="button" @click="closeEditDialog" class="cancel-button">Отмена</button>
              </div>
            </form>
          </div>
        </div>

        <div class="lessons-list">
          <div v-for="lesson in lessons" :key="lesson.id" 
              :class="{'lesson-item': true, 'lesson-deleted': !lesson.is_visible}">
            <div class="lesson-info">
              <h3>{{ lesson.title }}</h3>
              <span class="lesson-meta">
                Категория: {{ lesson.category }} | 
                Сложность: {{ getDifficultyText(lesson.difficulty) }}
              </span>
            </div>
            <div class="lesson-actions">
              <button 
                @click="editLesson(lesson)"
                class="action-button edit-button"
              >
                Редактировать
              </button>
              <button 
                @click="lesson.is_visible ? deleteLesson(lesson.id) : restoreLesson(lesson.id)" 
                class="action-button delete-button"
                :disabled="isDeleting === lesson.id"
              >
                <span v-if="isDeleting === lesson.id">Обработка...</span>
                <span v-else>{{ lesson.is_visible ? 'Удалить' : 'Восстановить' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManageLessons',
  data() {
    return {
      isSidebarCollapsed: false,
      user: {
        login: 'Администратор'
      },
      lessons: [],
      isDeleting: null,
      isSaving: false,
      showSuccess: false,
      showError: false,
      errorMessage: '',
      showEditDialog: false,
      editedLesson: {
        id: null,
        title: '',
        slug: '',
        description: '',
        category: '',
        difficulty: 'easy',
        theory_content: '',
        points: 0,
        vulnerable_code: '',
        secure_code: '',
        is_visible: false
      }
    };
  },
  async created() {
    await this.fetchLessons();
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    async fetchLessons() {
      try {
        const response = await axios.get('http://localhost:9000/api/admin/lessons', { withCredentials: true });
        this.lessons = response.data;
      } catch (error) {
        this.showError = true;
        this.errorMessage = 'Не удалось загрузить список уроков';
        setTimeout(() => this.showError = false, 3000);
      }
    },
    getDifficultyText(difficulty) {
      const difficulties = {
        easy: 'Легкая',
        medium: 'Средняя',
        hard: 'Сложная'
      };
      return difficulties[difficulty] || difficulty;
    },
    async editLesson(lesson) {
      try {
        const response = await axios.get(`http://localhost:9000/api/admin/lessons.php?id=${lesson.id}`, {
          withCredentials: true
        });
        Object.assign(this.editedLesson, response.data);
        this.showEditDialog = true;
        document.body.classList.add('modal-open');
      } catch (error) {
        this.showError = true;
        this.errorMessage = 'Не удалось загрузить данные урока';
        setTimeout(() => this.showError = false, 3000);
      }
    },
    closeEditDialog() {
      this.showEditDialog = false;
      document.body.classList.remove('modal-open');
    },
    async submitEdit() {
      this.isSaving = true;
      try {
        await axios.put(
          `http://localhost:9000/api/admin/lessons?id=${this.editedLesson.id}`, 
          this.editedLesson, 
          { withCredentials: true }
        );
        
        this.showSuccess = true;
        setTimeout(() => this.showSuccess = false, 3000);
        
        await this.fetchLessons();
        this.closeEditDialog();
      } catch (error) {
        this.showError = true;
        this.errorMessage = error.response?.data?.error || 'Не удалось обновить урок';
        setTimeout(() => this.showError = false, 3000);
      } finally {
        this.isSaving = false;
      }
    },
    async deleteLesson(id) {
      this.isDeleting = id;
      try {
        await axios.delete(`http://localhost:9000/api/admin/delete_lesson?id=${id}`, { withCredentials: true });
        
        this.showSuccess = true;
        this.errorMessage = 'Урок успешно удалён';
        setTimeout(() => this.showSuccess = false, 3000);
        
        await this.fetchLessons();
      } catch (error) {
        this.showError = true;
        this.errorMessage = error.response?.data?.error || 'Не удалось удалить урок';
        setTimeout(() => this.showError = false, 3000);
      } finally {
        this.isDeleting = null;
      }
    },
    async restoreLesson(id) {
      this.isDeleting = id;
      try {
        await axios.post(`http://localhost:9000/api/admin/restore_lesson.php?id=${id}`, {}, { withCredentials: true });
        
        this.showSuccess = true;
        setTimeout(() => this.showSuccess = false, 3000);
        
        await this.fetchLessons();
      } catch (error) {
        this.showError = true;
        this.errorMessage = error.response?.data?.error || 'Не удалось восстановить урок';
        setTimeout(() => this.showError = false, 3000);
      } finally {
        this.isDeleting = null;
      }
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
  --table-header-bg: #f9fafb;
  --table-border: #e5e7eb;
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
}

.main-expanded {
  margin-left: calc(-1 * (var(--sidebar-width) - var(--sidebar-collapsed-width)));
}

/* Стили для управления уроками */
.manage-lessons {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.content-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

.create-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.create-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.create-btn svg {
  width: 18px;
  height: 18px;
}

.lessons-list {
  margin-top: 2rem;
}

.lesson-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.lesson-info h3 {
  margin: 0;
  color: #2d3748;
}

.lesson-meta {
  font-size: 0.9rem;
  color: #718096;
}

.lesson-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.edit-button {
  background: #4299e1;
  color: white;
}

.edit-button:hover {
  background: #3182ce;
}

.delete-button {
  background: #f56565;
  color: white;
}

.delete-button:hover:not(:disabled) {
  background: #e53e3e;
}

.delete-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Стили для уведомлений */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem;
  border-radius: 4px;
  color: white;
  display: flex;
  align-items: center;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.notification.success {
  background: #48bb78;
}

.notification.error {
  background: #f56565;
}

.close-notification {
  background: transparent;
  border: none;
  color: white;
  margin-left: 1rem;
  cursor: pointer;
  font-size: 1.2rem;
}

/* Стили для модального окна */
.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  margin: auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input, select, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  position: sticky;
  bottom: 0;
  background: white;
  padding: 10px 0;
}

.confirm-button {
  background: #48bb78;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  min-width: 120px;
}

.confirm-button:hover:not(:disabled) {
  background: #38a169;
}

.cancel-button {
  background: #e2e8f0;
  color: #4a5568;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  min-width: 120px;
}

.cancel-button:hover {
  background: #cbd5e0;
}

.lesson-deleted {
  background-color: #f6c4c4;
  opacity: 0.8;
}

/* Блокировка прокрутки страницы при открытом модальном окне */
.modal-open {
  overflow: hidden;
}

/* Анимации */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
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
  .lesson-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .lesson-actions {
    width: 100%;
    justify-content: flex-end;
  }
  
  .modal-content {
    max-width: 95%;
    padding: 1rem;
  }

  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .create-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .dialog-buttons {
    flex-direction: column;
  }

  .confirm-button, .cancel-button {
    width: 100%;
  }
}
</style>