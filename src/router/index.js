import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'
import { getUserById } from '../services/userService'
import LoginView from '../views/auth/LoginView.vue'
import SignUpView from '../views/auth/SignUpView.vue'
import TeacherDashboard from '../views/teacher/TeacherDashboard.vue'
import TeacherArchiveView from '../views/teacher/TeacherArchiveView.vue'
import TeacherClassroomView from '../views/teacher/TeacherClassroomView.vue'
import StudentDashboard from '../views/student/StudentDashboard.vue'
import StudentIdView from '../views/student/StudentIdView.vue'

const routes = [
  { path: '/', name: 'login', component: LoginView, meta: { guestOnly: true } },
  { path: '/signup', name: 'signup', component: SignUpView, meta: { guestOnly: true } },
  { path: '/teacher', name: 'teacher', component: TeacherDashboard, meta: { requiresAuth: true, role: 'teacher' } },
  { path: '/teacher/class/:classId', name: 'teacher-classroom', component: TeacherClassroomView, meta: { requiresAuth: true, role: 'teacher' } },
  { path: '/teacher/archive', name: 'teacher-archive', component: TeacherArchiveView, meta: { requiresAuth: true, role: 'teacher' } },
  { path: '/student', name: 'student', component: StudentDashboard, meta: { requiresAuth: true, role: 'student' } },
  { path: '/student/id', name: 'student-id', component: StudentIdView, meta: { requiresAuth: true, role: 'student' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })

router.beforeEach(async (to) => {
  const user = await getCurrentUser()

  if (to.meta.guestOnly && user) {
    const userProfile = await getUserById(user.uid)

    if (userProfile?.role) {
      return `/${userProfile.role}`
    }
  }

  if (!to.meta.requiresAuth) {
    return true
  }

  if (!user) {
    return '/'
  }

  const userProfile = await getUserById(user.uid)

  if (!userProfile || !userProfile.role) {
    return '/'
  }

  if (to.meta.role && userProfile.role !== to.meta.role) {
    return `/${userProfile.role}`
  }

  return true
})

export default router
