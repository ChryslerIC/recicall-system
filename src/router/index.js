import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import TeacherDashboard from '../views/teacher/TeacherDashboard.vue'
import StudentDashboard from '../views/student/StudentDashboard.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'

const routes = [
  { path: '/', name: 'login', component: LoginView },
  { path: '/teacher', name: 'teacher', component: TeacherDashboard },
  { path: '/student', name: 'student', component: StudentDashboard },
  { path: '/admin', name: 'admin', component: AdminDashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router