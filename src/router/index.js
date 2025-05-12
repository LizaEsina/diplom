import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import axios from 'axios'
const routes = [
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/lessons',
    name: 'Lessons',
    component: () => import('../views/LessonsList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/lessons1',
    name: 'Lessons1',
    component: () => import('../views/Lesson1.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/test', 
    name: 'TestPage',
    component: () => import('../views/TestPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/lessons/:id',
    name: 'LessonDetail',
    component: () => import('../views/LessonDetail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/lessons/:id/practice',
    name: 'PracticeAssignment',
    component: () => import('../views/PracticeAssignment.vue'),
    meta: { requiresAuth: true }
  },  
  {
    path: '/achievements',
    name: 'Achievements',
    component: () => import('../views/AchievementsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { guestOnly: true }
  },
  // Админские маршруты
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('../views/AdminDashboard.vue'),
    meta: { 
      requiresAuth: true,
      requiresAdmin: true 
    }
  },
  {
    path: '/admin/manage-lessons',
    name: 'ManageLessons',
    component: () => import('../views/ManageLessons.vue'),
    meta: { 
      requiresAuth: true,
      requiresAdmin: true 
    }
  },
  {
    path: '/admin/users',
    name: 'ManageUsers',
    component: () => import('../views/ManageUsersView.vue'),
    meta: { 
      requiresAuth: true,
      requiresAdmin: true 
    }
  },
  
  {
    path: '/admin/create-lesson',
    name: 'CreateLesson',
    component: () => import('../views/CreateLesson.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/admin/create-assignments',
    name: 'CreateAssignments',
    component: () => import('../views/AssignmentsCreate.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  const hasUserData   = !!store.state.user

  // 1) Если есть токен, но user ещё не загружен — подгружаем
  if (isAuthenticated && !hasUserData) {
    try {
      const { data } = await axios.get(
        'http://localhost:9000/api/auth/me.php', // убедитесь, что это ваш фактический URL
      )
      store.commit('SET_USER', data)
    } catch (e) {
      console.error('Auth/me failed:', e.response || e)
      store.commit('CLEAR_TOKEN')
      return next({ name: 'Login' })
    }
  }

  // 2) Только авторизованным
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // 3) Только админам
  if (to.meta.requiresAdmin && !store.getters.isAdmin) {
    return next({ name: 'Home' })
  }

  // 4) Гости не должны видеть guestOnly
  if (to.meta.guestOnly && isAuthenticated) {
    return next('/')
  }

  next()
})

export default router