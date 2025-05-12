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
          <h1>Создание заданий урока</h1>
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
              to="/admin/dashboard" 
              class="nav-item"
              active-class="active"
            >
              <span class="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                  <path d="M7 12h2v5H7zm4-7h2v12h-2zm4 4h2v8h-2z"/>
                </svg>
              </span>
              <span class="nav-text" v-if="!isSidebarCollapsed">Уроки</span>
            </router-link>
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
            <span class="nav-text" v-if="!isSidebarCollapsed">Создание заданий к урокам</span>
          </router-link>
          </nav>
        </div>
      </aside>
  
      <!-- Основное содержимое -->
      <main class="admin-main" :class="{ 'main-expanded': isSidebarCollapsed }">
      <div class="form-container">
        <form @submit.prevent="createAssignment" class="assignment-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="lesson_id">Урок</label>
              <select 
                v-model="assignment.lesson_id" 
                id="lesson_id" 
                required 
                class="styled-select"
                @change="loadLessonDetails"
              >
                <option disabled value="">Выберите урок</option>
                <option 
                  v-for="lesson in lessons" 
                  :key="lesson.id" 
                  :value="lesson.id"
                >
                  {{ lesson.title }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="type">Тип задания</label>
              <select 
                v-model="assignment.type" 
                id="type" 
                required 
                class="styled-select"
              >
                <option disabled value="">Выберите тип</option>
                <option value="code">Код</option>
                <option value="quiz">Тест</option>
                <option value="text">Текстовый ответ</option>
              </select>
            </div>

            <div class="form-group">
              <label for="difficulty_level">Сложность</label>
              <select 
                v-model="assignment.difficulty_level" 
                id="difficulty_level" 
                required 
                class="styled-select"
              >
                <option disabled value="">Выберите сложность</option>
                <option value="easy">Легкая</option>
                <option value="medium">Средняя</option>
                <option value="hard">Сложная</option>
              </select>
            </div>
          </div>

          <!-- Конфигурация задания -->
          <div class="form-group">
            <label>Конфигурация задания</label>
            <div class="code-container">
              <textarea 
                v-model="assignment.configJson" 
                rows="10" 
                class="code-textarea"
                placeholder='Пример для типа "code": {"instructions": "Исправьте уязвимость XSS", "hint": "Используйте htmlspecialchars()"}'
              ></textarea>
            </div>
          </div>

          <!-- Решение (для кодовых заданий) -->
          <div class="form-group" v-if="assignment.type === 'code'">
            <label>Решение (код)</label>
            <div class="code-container">
              <textarea 
                v-model="assignment.solution_code" 
                rows="10" 
                class="code-textarea"
              ></textarea>
            </div>
          </div>

          <!-- Правила валидации -->
          <div class="form-group">
            <label>Правила валидации (JSON)</label>
            <div class="code-container">
              <textarea 
                v-model="assignment.validation_rules" 
                rows="10" 
                class="code-textarea"
                placeholder='Пример: {"required_functions": ["htmlspecialchars"], "forbidden_patterns": ["<script>"]}'
              ></textarea>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="isSubmitting">
                <svg class="spinner" viewBox="0 0 50 50">
                  <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                </svg>
                Создание...
              </span>
              <span v-else>Создать задание</span>
            </button>
            <button type="button" @click="resetForm" class="cancel-btn">Очистить форму</button>
          </div>
        </form>

        <div v-if="successMessage" class="alert success">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
          </svg>
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="alert error">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          {{ errorMessage }}
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'CreateAssignment',
  data() {
    return {
      isSidebarCollapsed: false,
      isSubmitting: false,
      user: {
        login: 'Администратор'
      },
      lessons: [], // Список уроков для выбора
      assignment: {
        lesson_id: '',
        type: '',
        difficulty_level: '',
        configJson: '{}', // Храним как строку JSON
        solution_code: '',
        validation_rules: '{}' // Храним как строку JSON
      },
      successMessage: '',
      errorMessage: ''
    }
  },
  async created() {
    await this.loadLessons();
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    
    // Загрузка списка уроков
    async loadLessons() {
      try {
        const token = this.$store.state.token;
        const response = await this.$axios.get('http://localhost:9000/api/admin/assignments', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        this.lessons = response.data.lessons || [];
      } catch (error) {
        console.error('Ошибка загрузки уроков:', error);
        this.errorMessage = 'Не удалось загрузить список уроков';
      }
    },
    
    // Загрузка деталей урока при выборе
    async loadLessonDetails() {
      if (!this.assignment.lesson_id) return;
      
      try {
        const token = this.$store.state.token;
        const response = await this.$axios.get(`http://localhost:9000/api/admin/lessons.php?id=${this.assignment.lesson_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Можно использовать данные урока для предзаполнения полей
        console.log('Данные урока:', response.data);
      } catch (error) {
        console.error('Ошибка загрузки урока:', error);
      }
    },
    
    // Создание задания
    async createAssignment() {
      this.isSubmitting = true;
      this.successMessage = '';
      this.errorMessage = '';
      
      try {
        const token = this.$store.state.token;
        if (!token) {
          throw new Error('Требуется авторизация');
        }

        // Преобразуем JSON-строки в объекты
        let config, validationRules;
        try {
          config = JSON.parse(this.assignment.configJson);
          validationRules = JSON.parse(this.assignment.validation_rules);
        } catch (e) {
          throw new Error('Невалидный JSON в конфигурации или правилах валидации');
        }

        const payload = {
          lesson_id: this.assignment.lesson_id,
          type: this.assignment.type,
          difficulty_level: this.assignment.difficulty_level,
          config: config,
          solution_code: this.assignment.solution_code || null,
          validation_rules: validationRules
        };

        const response = await this.$axios.post(
          'http://localhost:9000/api/admin/assignments',
          payload,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        this.successMessage = 'Задание успешно создано! ID: ' + response.data.id;
        this.resetForm();
      } catch (error) {
        this.errorMessage = error.response?.data?.error || error.message || 'Ошибка при создании задания';
        console.error('Ошибка:', error);
      } finally {
        this.isSubmitting = false;
      }
    },
    
    resetForm() {
      this.assignment = {
        lesson_id: '',
        type: '',
        difficulty_level: '',
        configJson: '{}',
        solution_code: '',
        validation_rules: '{}'
      };
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
  

  .alert {
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 500;
  }
  
  .alert svg {
    width: 20px;
    height: 20px;
  }
  
  .alert.success {
    background: #ecfdf5;
    color: var(--success-color);
    border: 1px solid #a7f3d0;
  }
  
  .alert.error {
    background: #fef2f2;
    color: var(--danger-color);
    border: 1px solid #fecaca;
  }
  
  /* Спиннер для кнопки */
  .spinner {
    animation: rotate 2s linear infinite;
    width: 20px;
    height: 20px;
  }
  
  .spinner .path {
    stroke: white;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
  
  .form-container {
  max-width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
}

.lesson-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

label {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

/* Стили для инпутов */
.styled-input {
  padding: 0.875rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9375rem;
  transition: all 0.25s ease;
  background-color: #f8fafc;
  color: #1a202c;
}

.styled-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  background-color: #ffffff;
}

/* Стили для селектов */
.styled-select {
  padding: 0.875rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9375rem;
  transition: all 0.25s ease;
  background-color: #f8fafc;
  color: #1a202c;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234a5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}

.styled-select:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  background-color: #ffffff;
}

/* Стили для текстовых областей */
.styled-textarea {
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9375rem;
  transition: all 0.25s ease;
  background-color: #f8fafc;
  color: #1a202c;
  min-height: 150px;
  resize: vertical;
  line-height: 1.5;
}

.styled-textarea:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  background-color: #ffffff;
}

/* Стили для редакторов кода */
.code-editors {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1rem;
}

.code-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.code-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.code-textarea {
  width: 98.5%;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #334155;
  border: 2px solid #334155;
  border-radius: 8px;
  min-height: 250px;
  resize: vertical;
  tab-size: 2;
}

.code-textarea:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

/* Кнопки */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.submit-btn {
  padding: 0.875rem 2rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 2px 5px rgba(79, 70, 229, 0.2);
}

.submit-btn:hover:not(:disabled) {
  background: #4338ca;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(79, 70, 229, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.cancel-btn {
  padding: 0.875rem 2rem;
  background: white;
  color: #4f46e5;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.cancel-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .code-editors {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .submit-btn, .cancel-btn {
    width: 100%;
    justify-content: center;
  }
}

/* Анимации */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.form-group {
  animation: fadeIn 0.3s ease-out forwards;
}

.form-group:nth-child(1) { animation-delay: 0.1s; }
.form-group:nth-child(2) { animation-delay: 0.15s; }
.form-group:nth-child(3) { animation-delay: 0.2s; }
.form-group:nth-child(4) { animation-delay: 0.25s; }
.form-group:nth-child(5) { animation-delay: 0.3s; }
  
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
    .form-grid {
      grid-template-columns: 1fr;
    }
  
    .code-editors {
      grid-template-columns: 1fr;
    }
  
    .form-actions {
      flex-direction: column;
    }
  
    .submit-btn, .cancel-btn {
      width: 100%;
    }
  
    .content-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  
    .back-btn {
      width: 100%;
      justify-content: center;
    }
  }
  
  @media (max-width: 576px) {
    .admin-header h1 {
      font-size: 1rem;
    }
    
    .lesson-form {
      padding: 1rem;
    }
  }
  </style>