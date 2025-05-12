<template>
  <div class="container">
    <button @click="goBackToLessons" class="back-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="back-icon">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      Вернуться к урокам
    </button>
    <!-- Заголовок задания -->
    <div class="card">
      <h1 class="title">{{ assignment.config.description }}</h1>
      <div class="details">
        <p v-if="assignment.config.template">
  <strong>Шаблон:</strong> <span v-html="assignment.config.template"></span>
</p>

        <p v-if="assignment.config.vulnerable_url">
          <strong>Уязвимый URL:</strong>
          <a :href="vulnerableUrl" target="_blank" rel="noopener noreferrer">
            {{ assignment.config.vulnerable_url }}
          </a>
        </p>
        <p v-if="assignment.config.hint"><strong>Подсказка:</strong> {{ assignment.config.hint }}</p>
      </div>
    </div>
    <!-- Блок с шаблоном кода -->
    <div v-if="templateCode" class="card code-template">
      <div class="code-header">
        <h3>🛠 Код шаблона</h3>
        <button @click="copyCode(templateCode)" class="copy-button">
          📋 Копировать
        </button>
      </div>
      <pre><code class="language-php">{{ templateCode }}</code></pre>
    </div>
    <!-- Песочница для XSS -->
    <div class="card" v-if="assignment.type === 'attack_simulation'">
      <h2 class="subtitle">🔍 Песочница для тестирования</h2>
      <div class="sandbox-container">
        <!-- Для Reflected XSS -->
        <div v-if="assignment.config.vulnerable_url" class="input-group">
          <label>Введите XSS-пейлоад:</label>
          <input v-model="xssPayload" placeholder='Пример: &lt;script&gt;alert("XSS")&lt;/script&gt;'>
        </div>

        <!-- Для DOM XSS -->
        <div v-if="assignment.config.vulnerable_js" class="input-group">
          <label>Введите payload для параметра:</label>
          <input v-model="xssPayload" placeholder='Пример: &lt;script&gt;alert("XSS")&lt;/script&gt;'>
        </div>

        <!-- Для Stored XSS -->
        <div v-if="assignment.config.storage_file" class="input-group">
          <label>Введите вредоносный комментарий:</label>
          <textarea v-model="xssPayload" rows="3"
            placeholder='Введите &lt;script&gt;alert("XSS")&lt;/script&gt;'></textarea>
        </div>

        <button @click="testXSS" class="test-button">
          Проверить атаку
        </button>

        <div v-if="testResult" class="test-result">
          <h4>Результат теста:</h4>
          <p :class="testResult.success ? 'success' : 'error'">
            {{ testResult.message }}
          </p>
          <div v-if="testResult.success && testResult.url" class="url-container">
            <p>Скопируйте URL для проверки:</p>
            <input type="text" :value="testResult.url" readonly class="url-input">
            <button @click="copyUrl" class="copy-button">Копировать</button>
          </div>
          <div v-if="testResult.success && assignment.config.storage_file" class="code-block">
            <pre><code>{{ xssPayload }}</code></pre>
          </div>
        </div>
      </div>
    </div>
    <div v-if="customAlert.visible" class="custom-alert-overlay" @click.self="customAlert.visible = false">
  <div class="custom-alert-box">
    <p>{{ customAlert.message }}</p>
    <button @click="customAlert.visible = false" class="close-btn">ОК</button>
  </div>
</div>
    <!-- Форма отправки решения -->
    <div class="card">
      <h2 class="subtitle">✏️ Отправить решение</h2>
      <textarea v-model="attackDescription" rows="5"
        placeholder="Опишите, как работает эта уязвимость и как её исправить..."></textarea>
      <button @click="submitSolution" :disabled="submitting" class="submit-button">
        {{ submitting ? 'Отправка...' : 'Отправить решение' }}
      </button>
    </div>

    <!-- Результаты -->
    <div v-if="result" class="card" :class="result.is_correct ? 'result-correct' : 'result-incorrect'">
      <h2 class="subtitle">🎯 Результат</h2>
      <p><strong>✅ Успешно:</strong>
        <span :class="result.is_correct ? 'success' : 'error'">
          {{ result.is_correct ? 'Да' : 'Нет' }}
        </span>
      </p>
      <p>💎 <strong>Очки:</strong> {{ result.score }}</p>
      <div v-if="result.feedback && result.feedback.length" class="feedback">
    <h3>🛠 Подсказки:</h3>
    <ul>
      <li v-for="(hint, index) in result.feedback" :key="index">{{ hint }}</li>
    </ul>
  </div>
</div>
    <!-- Безопасное решение -->
    <button v-if="failedAttempts >= 2" @click="showSolution = !showSolution" class="solution-button">
  {{ showSolution ? 'Скрыть решение' : 'Показать безопасное решение' }}
</button>
<div v-if="errors.length" class="error-list">
  <p><strong>Ошибки:</strong></p>
  <ul>
    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
  </ul>
</div>

    <div v-if="showSolution" class="secure-solution">
      <h3>🔒 Безопасная реализация</h3>
      <pre><code>{{ secureSolution }}</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {

    return {
      templateCode: '',
      customAlert: {
        visible: false,
        message: '',
      },
      errors: [],
      assignment: {
        id: null,
        type: '',
        config: {
          description: '',
          vulnerable_url: '',
          hint: ''
        },
        validation_rules: {}
      },
      xssPayload: '',
      attackDescription: '',
      testResult: null,
      result: null,
      submitting: false,
      failedAttempts: 0,
      showSolution: false,
      secureSolution: '',
    }
  },
  computed: {
    vulnerableUrl() {
      if (!this.assignment.config.vulnerable_url) return '';
      return this.assignment.config.vulnerable_url + encodeURIComponent(this.xssPayload);
    },
    domXssUrl() {
      if (!this.assignment.config.template) return '';
      return this.assignment.config.template + encodeURIComponent(this.xssPayload);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.highlightCode();
    });
  },
  async created() {
    await this.fetchAssignment();
  },
  methods: {
    goBackToLessons() {
      this.$router.push({ name: 'Lessons' });
    },
    copyCode(code) {
      navigator.clipboard.writeText(code)
        .then(() => {
          this.showToast('Код успешно скопирован!');
        })
        .catch(err => {
          console.error('Ошибка копирования:', err);
          this.showToast('Не удалось скопировать код');
        });
    },

    showToast(message) {
      // Реализация уведомлений
      alert(message); // Временная реализация
    },
    async fetchAssignment() {
      try {
        const token = this.$store.state.token;
        const response = await fetch(`http://localhost:9000/api/lessons/by_lesson.php?lesson_id=${this.$route.params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        this.processAssignmentData(data.assignment);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      }
    },
    decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  },

  async loadTemplate(templateName) {
    // Проверка на допустимость имени шаблона (например, должно заканчиваться на .php или .html)
    if (!templateName || !/^[\w\-\/]+\.php$|\.html$/i.test(templateName)) {
      // Невалидное имя — тихо выходим
      this.templateCode = '';
      return;
    }

    try {
      const token = this.$store.state.token;
      const response = await fetch(`http://localhost:9000/api/templates/load.php?name=${encodeURIComponent(templateName)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        this.templateCode = this.decodeHtml(data.template || '');
      } else {
        // Не показываем ошибку, просто очищаем код
        this.templateCode = '';
      }
    } catch (error) {
      // Тихо ловим ошибку и ничего не делаем
      this.templateCode = '';
    }
  },
extractTemplateName(template) {
  try {
    return template.split('?')[0]; // например, "greeting.php"
  } catch (e) {
    return null;
  }
},

    highlightCode() {
    const codeBlocks = this.$el.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
      const code = block.textContent;
      const highlightedCode = this.syntaxHighlight(code);
      block.innerHTML = highlightedCode;
    });
  },

  syntaxHighlight(code) {
    // Простая подсветка для примера (можно улучшить)
    let highlightedCode = code;

    // Подсветка для PHP
    highlightedCode = highlightedCode.replace(/(\$[a-zA-Z_][a-zA-Z0-9_]*)/g, '<span class="php-variable">$1</span>');
    highlightedCode = highlightedCode.replace(/(echo|if|else|while|function|return)/g, '<span class="php-keyword">$1</span>');
    highlightedCode = highlightedCode.replace(/(\/\*[\s\S]*?\*\/|\/\/.*)/g, '<span class="php-comment">$1</span>');

    // Подсветка для JavaScript (похожим образом можно добавлять другие языки)
    highlightedCode = highlightedCode.replace(/(\b(function|let|const|var|return|if|else|console)\b)/g, '<span class="js-keyword">$1</span>');
    highlightedCode = highlightedCode.replace(/(\/\/[^\n]*)/g, '<span class="js-comment">$1</span>');
    
    return highlightedCode;
  },
  async processAssignmentData(assignment) {
  this.assignment = {
    ...assignment,
    config: typeof assignment.config === 'string' ? JSON.parse(assignment.config) : assignment.config,
    validation_rules: typeof assignment.validation_rules === 'string' ? JSON.parse(assignment.validation_rules) : assignment.validation_rules
  };

  const { config, solution_code, type } = this.assignment;

  // Загружаем шаблон, если указан путь
  if (config.template && typeof config.template === 'string' && !config.template.includes('<')) {
    const templateName = this.extractTemplateName(config.template);
    if (templateName) {
      await this.loadTemplate(templateName);
    } else {
      console.error('Не удалось извлечь имя шаблона');
    }
  }

  // Генерация безопасного решения по шаблону (Reflected, Stored, DOM XSS)
  if (config.template?.includes('greeting.php')) {
    this.secureSolution = '// Защита от Reflected XSS:\necho htmlspecialchars($_GET[\'name\'], ENT_QUOTES, \'UTF-8\');';
  } else if (config.template?.includes('comment_form.php')) {
    this.secureSolution = '// Защита от Stored XSS:\n$comment = htmlspecialchars($_POST[\'comment\'], ENT_QUOTES, \'UTF-8\');\nfile_put_contents(\'comments.txt\', $comment . PHP_EOL, FILE_APPEND);';
  } else if (config.template?.includes('dom_xss.html')) {
    this.secureSolution = '// Защита от DOM XSS:\ndocument.getElementById("message").textContent = params.get("msg");';
  }

  // Безопасный код из solution_code для других типов
  if ((type === 'code' || type === 'vulnerability_fix') && solution_code) {
    this.secureSolution = solution_code;
  }

  // Заглушка, если ничего не сработало
  if (!this.secureSolution) {
    this.secureSolution = 'Безопасное решение не найдено для этого задания.';
  }
},

    testXSS() {
  if (!this.xssPayload) {
    this.testResult = {
      success: false,
      message: 'Введите XSS-пейлоад для тестирования'
    };
    return;
  }


  const success = this.checkXSSPayload(this.xssPayload);


  if (success) {
    this.fakeAlert(); // 🎉 Имитация XSS
  }

  if (this.assignment.config.vulnerable_url) {
    this.testResult = {
      success,
      message: success ? 'Reflected XSS готов! Пример URL:' : 'Неверный payload',
      url: this.vulnerableUrl
    };
  } else if (this.assignment.config.vulnerable_js) {
    this.testResult = {
      success,
      message: success ? 'DOM XSS готов! Пример URL:' : 'Неверный payload',
      url: this.domXssUrl
    };
  } else if (this.assignment.config.storage_file) {
    this.testResult = {
      success,
      message: success ? 'Stored XSS готов! Вставьте в форму:' : 'Неверный payload',
      payload: this.xssPayload
    };
  }
}
,
fakeAlert() {
  const payload = this.xssPayload;
  
  if (/alert\([^)]*\)/.test(payload)) {
    this.customAlert.message = '💥 XSS Сработал! Обнаружен alert()';
    this.customAlert.visible = true;
  }
},
checkXSSPayload(payload) {
  // Проверка на наличие тега <script> с alert
  const scriptAlertPattern = /<script[^>]*>[\s\S]*?alert\([^)]*\)[\s\S]*?<\/script>/i;

  // Проверка на использование обработчиков событий (например, onmouseover, onclick)
  const eventHandlerPattern = /on\w+\s*=\s*['"][^'"]*alert\([^)]*\)/i;

  // Проверка на инъекцию через javascript: URL
  const jsUrlPattern = /javascript:[^"']*alert\([^)]*\)/i;

  // Проверка на элементы с событиями, например <img onerror="alert()">
  const eventInTagPattern = /<[a-z]+[^>]*\son\w+\s*=\s*[^>]*alert\([^)]*\)/i;

  // Проверка на простой тег <script> с alert
  if (scriptAlertPattern.test(payload)) {
    return true;
  }

  // Проверка на обработчики событий
  if (eventHandlerPattern.test(payload)) {
    return true;
  }

  // Проверка на javascript: URL
  if (jsUrlPattern.test(payload)) {
    return true;
  }

  // Проверка на использование событий в элементах
  if (eventInTagPattern.test(payload)) {
    return true;
  }

  return false;
},

    copyUrl() {
      navigator.clipboard.writeText(this.testResult.url)
        .then(() => alert('URL скопирован!'))
        .catch(() => alert('Ошибка копирования'));
    },

    async submitSolution() {
  const type = this.assignment.type;

  if (!this.attackDescription) {
    alert('Пожалуйста, опишите ваше решение');
    return;
  }

  if (type === 'attack_simulation' && !this.xssPayload) {
    alert('Введите XSS payload');
    return;
  }

  this.submitting = true;

  const body = {
    code: this.attackDescription,
    type: type
  };

  if (type === 'attack_simulation') {
    body.payload = this.xssPayload;
  }

  try {
    const token = this.$store.state.token;
    const response = await fetch(`http://localhost:9000/api/lessons/submit.php?id=${this.assignment.id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const textResponse = await response.text();

    try {
      const data = JSON.parse(textResponse);

      this.errors = data.errors || [];
      this.result = data;

      if (!data.is_correct) {
        this.failedAttempts++;
      } else {
        this.failedAttempts = 0;
      }

    } catch (jsonError) {
      // Не получилось распарсить - значит это ошибка сервера
      console.error('Ответ сервера не является JSON:', textResponse);

      this.errors = ['Ошибка сервера. Проверьте консоль.'];
      this.result = {
        is_correct: false,
        feedback: ['Ошибка при обработке запроса.'],
        score: 0
      };
    }

  } catch (error) {
    console.error('Ошибка при отправке:', error);
    this.result = {
      is_correct: false,
      feedback: ['Произошла ошибка при отправке'],
      score: 0
    };
  } finally {
    this.submitting = false;
  }
}

  }
}
</script>

<style scoped>
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #0b7dda, #0267ff9b);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
}

.back-button:hover {
  background: linear-gradient(135deg, #5d7de8, #9666d6);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.back-button:active {
  transform: translateY(0);
}

.back-icon {
  transition: transform 0.3s ease;
}

.back-button:hover .back-icon {
  transform: translateX(-3px);
}
.error-list {
  margin-top: 10px;
  color: #c00;
  background: #ffe0e0;
  padding: 10px;
  border-radius: 5px;
}
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 15px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.test-button {
  background: #3498db;
  color: white;
}

.submit-button {
  background: #2ecc71;
  color: white;
}

.solution-button {
  background: #e67e22;
  color: white;
}

.test-result .success {
  color: #27ae60;
}

.test-result .error {
  color: #e74c3c;
}

.url-container {
  margin-top: 10px;
}

.url-input {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
}

.copy-button {
  background: #9b59b6;
  color: white;
}

.code-block {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
}
.custom-alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.custom-alert-box {
  background: white;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px #0004;
  text-align: center;
  max-width: 400px;
  font-size: 18px;
}

.close-btn {
  margin-top: 15px;
  padding: 8px 16px;
  background: #42b983;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
.feedback {
  margin-top: 1rem;
  background-color: #f8f9fa;
  padding: 1rem;
  border-left: 4px solid #0d6efd;
  border-radius: 4px;
}

.feedback h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #0d6efd;
  font-size: 1.1rem;
}

.feedback ul {
  list-style: none;
  padding-left: 1rem;
  margin: 0;
}

.feedback li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 0.95rem;
}

.feedback li::before {
  content: "💡";
  position: absolute;
  left: 0;
}
.php-variable {
  color: #ff79c6;
}

.php-keyword {
  color: #8be9fd;
  font-weight: bold;
}

.php-comment {
  color: #6272a4;
  font-style: italic;
}

.js-keyword {
  color: #50fa7b;
  font-weight: bold;
}

.js-comment {
  color: #f1fa8c;
  font-style: italic;
}
.code-template {
  margin-top: 2rem;
  border: 1px solid #e1e4e8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eaecef;
}

pre {
  position: relative;
  background: #f6f8fa;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
}

code {
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.copy-button {
  background: none;
  border: 1px solid #0366d6;
  color: #0366d6;
  padding: 6px 12px;
  transition: all 0.2s;
}

.copy-button:hover {
  background: #0366d6;
  color: white;
}

/* Стили для подсветки синтаксиса */
.hljs {
  background: transparent !important;
  padding: 0 !important;
}

.hljs-keyword { color: #d73a49; }
.hljs-built_in { color: #6f42c1; }
.hljs-string { color: #032f62; }
.hljs-comment { color: #6a737d; }
.hljs-function { color: #005cc5; }
.hljs-params { color: #e36209; }
</style>