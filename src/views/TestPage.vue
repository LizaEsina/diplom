<template>
    <div class="test-container">
        <div class="header">
            <h1 class="title">📝 Проверка знаний</h1>
            <div v-if="loading" class="loader-wrapper">
                <div class="loader"></div>
                <span class="loading-text">Загружаем вопросы...</span>
            </div>
        </div>

        <div v-if="!loading" class="content">
            <transition-group name="question-fade">
                <div v-for="(question, index) in questions" :key="question.id" class="question-card">
                    <div class="question-header">
                        <span class="question-number">Вопрос #{{ index + 1 }}</span>
                        <span class="question-status" :class="{ answered: answers[question.id] }">
                            {{ answers[question.id] ? '✓ Отвечено' : '◯ Не отвечено' }}
                        </span>
                    </div>

                    <p class="question-text">{{ question.question }}</p>

                    <div class="options-grid">
                        <label v-for="(option, optionIndex) in JSON.parse(question.options)" :key="optionIndex"
                            class="option" :class="{ selected: answers[question.id] === option }">
                            <input type="radio" :name="`question-${question.id}`" :value="option"
                                v-model="answers[question.id]" class="option-input" />
                            <span class="custom-radio"></span>
                            <span class="option-text">{{ option }}</span>
                        </label>
                    </div>
                </div>
            </transition-group>

            <button @click="submitTest" :disabled="isSubmitting || !allQuestionsAnswered" class="submit-btn">
                <span v-if="!isSubmitting">✅ Завершить тест</span>
                <span v-else>⏳ Отправляем...</span>
            </button>
        </div>

        <transition name="result-slide">
            <div v-if="result" class="result-card">
                <div class="result-header" :class="resultClass">
                    <h2>{{ resultTitle }}</h2>
                    <div class="score-circle">
                        {{ Math.round(result.score) }}%
                    </div>
                </div>

                <div class="result-body">
                    <div class="stats">
                        <div class="stat correct">
                            <span class="stat-value">{{ result.correct_answers }}</span>
                            <span class="stat-label">Правильно</span>
                        </div>
                        <div class="stat total">
                            <span class="stat-value">{{ result.total_questions }}</span>
                            <span class="stat-label">Всего вопросов</span>
                        </div>
                        <div class="stat experience">
                            <span class="stat-value">100</span>
                            <span class="stat-label">Опыта</span>
                        </div>
                    </div>

                    <div class="review-section" :class="{ warning: shouldReview }">
                        <h3 v-if="shouldReview">⚠️ Внимание!</h3>
                        <h3 v-else>📚 Рекомендуем повторить:</h3>

                        <p v-if="shouldReview">
                            Вы набрали {{ Math.round(result.score) }}% - это хороший результат,
                            но рекомендуем повторить теорию для закрепления знаний.
                        </p>

                        <div v-if="result.lessons_to_review?.length" class="lessons-list">
                            <div v-for="(lesson, idx) in result.lessons_to_review" :key="idx" class="lesson-tag">
                                {{ lesson }}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </transition>
    </div>
</template>
  
<script>
import { getTestQuestions, submitTestAnswers } from '../api/api';

export default {
    data() {
        return {
            questions: [],
            answers: {},
            loading: true,
            isSubmitting: false,
            result: null,
        };
    },
    computed: {
        allQuestionsAnswered() {
            return this.questions.every(q => this.answers[q.id]);
        },
        shouldReview() {
            return this.result && Math.round(this.result.score) === 80;
        },
        resultClass() {
            if (!this.result) return '';
            return this.result.score >= 70 ? 'success' : 'fail';
        },
        resultTitle() {
            if (!this.result) return '';
            if (this.result.score >= 90) return 'Отличный результат!';
            if (this.result.score >= 70) return 'Тест пройден!';
            if (this.result.score >= 50) return 'Можно лучше';
            return 'Попробуйте еще раз';
        }
    },
    async created() {
        try {
            this.questions = await getTestQuestions();
        } catch (error) {
            console.error('Ошибка загрузки теста:', error);
        } finally {
            this.loading = false;
        }
    },
    methods: {
        async submitTest() {
            this.isSubmitting = true;
            try {
                this.result = await submitTestAnswers(this.answers);
            } catch (error) {
                console.error('Ошибка при отправке теста:', error);
            } finally {
                this.isSubmitting = false;
            }
        },
    },
};
</script>
  
<style scoped>
.stat.experience {
    background: #f3e5f5;
    color: #9c27b0;
}

.review-section.warning {
    background: #fff3e0;
    border-left: 4px solid #ff9800;
    margin-bottom: 1rem;
}

.review-section.warning h3 {
    color: #ff9800;
}

.test-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.title {
    font-size: 2.2rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-weight: 600;
}

.loader-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.loader {
    width: 30px;
    height: 30px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.question-card {
    background: #f8f9fa;
    border-radius: 15px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease;
}

.question-card:hover {
    transform: translateY(-3px);
}

.question-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 0.9em;
    color: #7f8c8d;
}

.question-status.answered {
    color: #27ae60;
    font-weight: 500;
}

.question-text {
    font-size: 1.1rem;
    color: #2c3e50;
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.options-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.option {
    position: relative;
    display: flex;
    align-items: center;
    padding: 1rem;
    background: white;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid #e0e0e0;
}

.option:hover {
    border-color: #3498db;
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
}

.option.selected {
    border-color: #27ae60;
    background: #e8f5e9;
}

.option-input {
    opacity: 0;
    position: absolute;
}

.custom-radio {
    width: 20px;
    height: 20px;
    border: 2px solid #bdc3c7;
    border-radius: 50%;
    margin-right: 1rem;
    position: relative;
}

.option.selected .custom-radio {
    border-color: #27ae60;
    background: #27ae60;
}

.option.selected .custom-radio::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 10px;
    height: 10px;
    background: white;
    border-radius: 50%;
}

.submit-btn {
    width: 100%;
    padding: 1.2rem;
    background: linear-gradient(135deg, #3498db, #2ecc71);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.submit-btn:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
}

.submit-btn:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.result-card {
    margin-top: 2rem;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.result-header {
    padding: 2rem;
    text-align: center;
    color: white;
}

.result-header.success {
    background: linear-gradient(135deg, #2ecc71, #27ae60);
}

.result-header.fail {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.result-header h2 {
    margin: 0;
    font-size: 1.8rem;
}

.score-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 1rem auto;
}

.stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    padding: 2rem;
}

.stat {
    text-align: center;
    padding: 1rem;
    border-radius: 10px;
    min-width: 120px;
}

.stat.correct {
    background: #e8f5e9;
    color: #27ae60;
}

.stat.total {
    background: #e3f2fd;
    color: #3498db;
}

.stat-value {
    display: block;
    font-size: 2rem;
    font-weight: bold;
}

.stat-label {
    font-size: 0.9rem;
    color: #7f8c8d;
}

.review-section {
    padding: 2rem;
    background: #fff9e6;
    margin: 1rem;
    border-radius: 15px;
}

.lessons-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1rem;
}

.lesson-tag {
    background: #fff3cd;
    color: #856404;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
}

/* Анимации */
.question-fade-enter-active,
.question-fade-leave-active {
    transition: opacity 0.5s, transform 0.5s;
}

.question-fade-enter,
.question-fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.result-slide-enter-active,
.result-slide-leave-active {
    transition: all 0.5s ease;
}

.result-slide-enter,
.result-slide-leave-to {
    opacity: 0;
    transform: translateY(50px);
}

@media (max-width: 768px) {
    .options-grid {
        grid-template-columns: 1fr;
    }

    .test-container {
        margin: 1rem;
        padding: 1rem;
    }

    .title {
        font-size: 1.8rem;
    }
}
</style>