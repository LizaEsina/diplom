<template>
  <div class="admin-layout">
    <!-- Хедер -->
    <header class="admin-header">
      <div class="header-content">
        <button class="menu-toggle" @click="toggleSidebar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clip-rule="evenodd" />
          </svg>
        </button>
        <h1>Управление заданиями уроков</h1>
        <div class="user-menu">
          <span class="username">{{ user.login || 'Администратор' }}</span>
          <div class="avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clip-rule="evenodd" />
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
              <path fill-rule="evenodd"
                d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clip-rule="evenodd" />
            </svg>
            <span v-if="!isSidebarCollapsed">SecurityEdu</span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <router-link to="/admin/dashboard" class="nav-item" active-class="active">
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                <path d="M7 12h2v5H7zm4-7h2v12h-2zm4 4h2v8h-2z" />
              </svg>
            </span>
            <span class="nav-text" v-if="!isSidebarCollapsed">Уроки</span>
          </router-link>
          
          <router-link to="/admin/create-lesson" class="nav-item" active-class="active">
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                <path d="M7 12h2v5H7zm4-7h2v12h-2zm4 4h2v8h-2z" />
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
            <span class="nav-text" v-if="!isSidebarCollapsed">Управление заданиями уроков </span>
          </router-link>
          <router-link to="/admin/users" class="nav-item" active-class="active">
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </span>
            <span class="nav-text" v-if="!isSidebarCollapsed">Пользователи</span>
          </router-link>
          <router-link to="/admin/manage-lessons" class="nav-item" active-class="active">
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z" />
              </svg>
            </span>
            <span class="nav-text" v-if="!isSidebarCollapsed">Создание заданий к урокам</span>
          </router-link>
          
        </nav>
      </div>
    </aside>

    <!-- Основное содержимое -->
    <main class="admin-main" :class="{ 'main-expanded': isSidebarCollapsed }">
      <div class="assignments-container">
        <!-- Уведомление об успехе -->
        <div v-if="showSuccess" class="notification success">
          {{ successMessage }}
          <button @click="showSuccess = false" class="close-notification">×</button>
        </div>

        <!-- Уведомление об ошибке -->
        <div v-if="showError" class="notification error">
          {{ errorMessage }}
          <button @click="showError = false" class="close-notification">×</button>
        </div>

        <!-- Кнопка создания нового задания -->
        <div class="actions-header">
          <button @click="showCreateDialog = true" class="create-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Создать задание
          </button>
        </div>

        <!-- Диалог создания/редактирования задания -->
        <div v-if="showEditDialog || showCreateDialog" class="edit-modal" @click.self="closeEditDialog">
          <div class="modal-content">
            <h3>{{ isEditing ? 'Редактировать задание' : 'Создать новое задание' }}</h3>
            <form @submit.prevent="submitAssignment">
              <div class="form-grid">
                <div class="form-group">
                  <label for="lesson_id">Урок</label>
                  <select id="lesson_id" v-model="editedAssignment.lesson_id" required>
                    <option disabled value="">Выберите урок</option>
                    <option v-for="lesson in lessons" :key="lesson.id" :value="lesson.id">
                      {{ lesson.title }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="type">Тип задания</label>
                  <select id="type" v-model="editedAssignment.type" required>
                    <option value="code">code</option>
                    <option value="quiz">quiz</option>
                    <option value="text">vulnerability_fix</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="difficulty_level">Уровень сложности</label>
                  <select id="difficulty_level" v-model="editedAssignment.difficulty_level" required>
                    <option value="low">Лёгкий</option>
                    <option value="medium">Средний</option>
                    <option value="hard">Сложный</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="config">Конфигурация (JSON)</label>
                <textarea id="config" v-model="editedAssignment.config" rows="6" required
                  placeholder='Пример для теста: {"question": "Вопрос", "options": ["Вариант 1", "Вариант 2"], "correct": 0}'></textarea>
              </div>

              <div class="form-group">
                <label for="solution_code">Решение (код)</label>
                <textarea id="solution_code" v-model="editedAssignment.solution_code" rows="6"
                  placeholder="Введите решение, если это код"></textarea>
              </div>

              <div class="form-group">
                <label for="validation_rules">Правила валидации (JSON)</label>
                <textarea id="validation_rules" v-model="editedAssignment.validation_rules" rows="4"
                  placeholder='Пример: {"min_length": 10, "max_length": 500}'></textarea>
              </div>

              <div class="dialog-buttons">
                <button type="submit" class="confirm-button" :disabled="isSaving">
                  <span v-if="isSaving">Сохранение...</span>
                  <span v-else>{{ isEditing ? 'Сохранить' : 'Создать' }}</span>
                </button>
                <button type="button" @click="closeEditDialog" class="cancel-button">Отмена</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Список заданий -->
        <div class="assignments-list">
          <div class="assignment-filters">
            <div class="filter-group">
              <label for="filter-lesson">Фильтр по уроку:</label>
              <select id="filter-lesson" v-model="filterLessonId">
                <option value="">Все уроки</option>
                <option v-for="lesson in lessons" :key="lesson.id" :value="lesson.id">
                  {{ lesson.title }}
                </option>
              </select>
            </div>

            <div class="filter-group">
              <label for="filter-type">Фильтр по типу:</label>
              <select id="filter-type" v-model="filterType">
                <option value="">Все типы</option>
                <option value="code">Код</option>
                <option value="quiz">Тест</option>
                <option value="text">Текст</option>
              </select>
            </div>
          </div>

          <div v-if="filteredAssignments.length === 0" class="no-results">
            Задания не найдены
          </div>

          <div v-for="assignment in filteredAssignments" :key="assignment.id" class="assignment-item">
            <div class="assignment-info">
              <h3>{{ getAssignmentTitle(assignment) }}</h3>
              <div class="assignment-meta">
                <span class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                  {{ getLessonTitle(assignment.lesson_id) }}
                </span>
                <span class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V8z" />
                  </svg>
                  {{ getTypeText(assignment.type) }}
                </span>
                <span class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                  {{ getDifficultyText(assignment.difficulty_level) }}
                </span>
              </div>
            </div>
            <div class="assignment-actions">
              <button @click="editAssignment(assignment)" class="action-button edit-button">
                Редактировать
              </button>
            </div>
          </div>
        </div>

        <!-- Диалог подтверждения удаления -->
        <div v-if="showDeleteConfirm" class="confirm-modal" @click.self="showDeleteConfirm = false">
          <div class="modal-content">
            <h3>Подтверждение удаления</h3>
            <p>Вы уверены, что хотите удалить это задание?</p>
            <div class="dialog-buttons">
              <button @click="deleteAssignment" class="confirm-button danger">Удалить</button>
              <button @click="showDeleteConfirm = false" class="cancel-button">Отмена</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ManageAssignments',
  data() {
    return {
      isSidebarCollapsed: false,
      user: {
        login: 'Администратор'
      },
      assignments: [],
      lessons: [],
      showSuccess: false,
      showError: false,
      successMessage: '',
      errorMessage: '',
      showEditDialog: false,
      showCreateDialog: false,
      showDeleteConfirm: false,
      isSaving: false,
      isDeleting: false,
      assignmentToDelete: null,
      filterLessonId: '',
      filterType: '',
      editedAssignment: {
        id: null,
        lesson_id: '',
        type: 'code',
        difficulty_level: 'low',
        config: '{}',
        solution_code: '',
        validation_rules: '{}'
      }
    };
  },
  computed: {
    filteredAssignments() {
      let filtered = this.assignments;

      if (this.filterLessonId) {
        filtered = filtered.filter(a => a.lesson_id == this.filterLessonId);
      }

      if (this.filterType) {
        filtered = filtered.filter(a => a.type === this.filterType);
      }

      return filtered;
    },
    isEditing() {
      return !!this.editedAssignment.id;
    }
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    async fetchData() {
      try {
        const token = this.$store.state.token;
        const response = await fetch('http://localhost:9000/api/admin/assignments', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Ошибка загрузки данных');

        const data = await response.json();
        this.assignments = data.assignments;
        this.lessons = data.lessons;
      } catch (error) {
        this.showError = true;
        this.errorMessage = error.message;
        setTimeout(() => this.showError = false, 3000);
      }
    },
    getTypeText(type) {
      const types = {
        code: 'Код',
        quiz: 'Тест',
        text: 'Текст'
      };
      return types[type] || type;
    },
    getDifficultyText(difficulty) {
      const difficulties = {
        easy: 'Легкий',
        medium: 'Средний',
        hard: 'Сложный'
      };
      return difficulties[difficulty] || difficulty;
    },
    getLessonTitle(lessonId) {
      const lesson = this.lessons.find(l => l.id == lessonId);
      return lesson ? lesson.title : 'Неизвестный урок';
    },
    getAssignmentTitle(assignment) {
      try {
        const config = JSON.parse(assignment.config);
        return config.question || `Задание #${assignment.id}`;
      } catch {
        return `Задание #${assignment.id}`;
      }
    },
    editAssignment(assignment) {
      this.editedAssignment = {
        id: assignment.id,
        lesson_id: assignment.lesson_id,
        type: assignment.type,
        difficulty_level: assignment.difficulty_level,
        config: JSON.stringify(assignment.config, null, 2),
        solution_code: assignment.solution_code || '',
        validation_rules: assignment.validation_rules ? JSON.stringify(assignment.validation_rules, null, 2) : '{}'
      };
      this.showEditDialog = true;
    },
    closeEditDialog() {
      this.showEditDialog = false;
      this.showCreateDialog = false;
      this.editedAssignment = {
        id: null,
        lesson_id: '',
        type: 'code',
        difficulty_level: 'easy',
        config: '{}',
        solution_code: '',
        validation_rules: '{}'
      };
    },
    async submitAssignment() {
      this.isSaving = true;

      try {
        const token = this.$store.state.token;
        const assignmentData = {
          lesson_id: this.editedAssignment.lesson_id,
          type: this.editedAssignment.type,
          difficulty_level: this.editedAssignment.difficulty_level,
          config: JSON.parse(this.editedAssignment.config),
          solution_code: this.editedAssignment.solution_code,
          validation_rules: this.editedAssignment.validation_rules ? JSON.parse(this.editedAssignment.validation_rules) : null
        };

        let response;
        if (this.isEditing) {
          response = await fetch(`http://localhost:9000/api/admin/assignments?id=${this.editedAssignment.id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(assignmentData)
          });
        } else {
          response = await fetch('http://localhost:9000/api/admin/assignments', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(assignmentData)
          });
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Ошибка сохранения');
        }

        this.showSuccess = true;
        this.successMessage = this.isEditing ? 'Задание успешно обновлено' : 'Задание успешно создано';
        setTimeout(() => this.showSuccess = false, 3000);

        await this.fetchData();
        this.closeEditDialog();
      } catch (error) {
        this.showError = true;
        this.errorMessage = error.message;
        setTimeout(() => this.showError = false, 3000);
      } finally {
        this.isSaving = false;
      }
    },
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

.assignments-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.actions-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}

.create-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.create-button:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.create-button svg {
  width: 18px;
  height: 18px;
}

.assignments-list {
  margin-top: 1rem;
}

.assignment-filters {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-group label {
  font-weight: 500;
  font-size: 0.9375rem;
}

.filter-group select {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: white;
}

.assignment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  margin-bottom: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.assignment-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.assignment-info h3 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
  font-size: 1.125rem;
}

.assignment-meta {
  display: flex;
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-light);
}

.meta-item svg {
  width: 16px;
  height: 16px;
}

.assignment-actions {
  display: flex;
  gap: 0.75rem;
}

.action-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
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

.delete-button:hover {
  background: #e53e3e;
}

.no-results {
  padding: 2rem;
  text-align: center;
  color: var(--text-light);
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* Модальные окна */
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
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  margin: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.modal-content h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #2d3748;
  font-weight: 600;
  padding-bottom: 1rem;
  border-bottom: 1px solid #edf2f7;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 500;
  color: #4a5568;
  font-size: 0.9375rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.875rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  background-color: #f8fafc;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #edf2f7;
}

.confirm-button {
  padding: 0.875rem 1.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  box-shadow: 0 2px 5px rgba(102, 126, 234, 0.2);
}

.confirm-button:hover:not(:disabled) {
  background: #5a67d8;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.confirm-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

.cancel-button {
  padding: 0.875rem 1.75rem;
  background: white;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.cancel-button:hover {
  background: #f7fafc;
  border-color: #cbd5e0;
  color: #2d3748;
}

/* Анимации */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .modal-content {
    padding: 1.5rem;
    border-radius: 0;
    max-height: 100vh;
    height: 100%;
  }

  .dialog-buttons {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    margin: 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}

/* Уведомления */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.notification.success {
  background: var(--success-color);
}

.notification.error {
  background: var(--danger-color);
}

.close-notification {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  margin-left: 0.5rem;
}

/* Анимации */
@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Адаптивность */
@media (max-width: 1024px) {
  .assignment-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .assignment-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .modal-content {
    max-width: 95%;
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .assignment-filters {
    flex-direction: column;
    gap: 1rem;
  }

  .assignment-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .dialog-buttons {
    flex-direction: column;
  }

  .confirm-button,
  .cancel-button {
    width: 100%;
  }
}
</style>