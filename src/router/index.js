import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { getUserById } from '../services/userService'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/auth/LoginView.vue'
import SignUpView from '../views/auth/SignUpView.vue'
import PrivacyView from '../views/legal/PrivacyView.vue'
import TermsView from '../views/legal/TermsView.vue'
import TeacherDashboard from '../views/teacher/TeacherDashboard.vue'
import TeacherArchiveView from '../views/teacher/TeacherArchiveView.vue'
import TeacherClassroomView from '../views/teacher/TeacherClassroomView.vue'
import StudentDashboard from '../views/student/StudentDashboard.vue'
import StudentClassroomView from '../views/student/StudentClassroomView.vue'
import StudentIdView from '../views/student/StudentIdView.vue'

const routes = [
  { path: '/', name: 'landing', component: LandingView, meta: { redirectIfAuth: true } },
  { path: '/login', name: 'login', component: LoginView, meta: { guestOnly: true, redirectIfAuth: true } },
  { path: '/signup', name: 'signup', component: SignUpView, meta: { guestOnly: true, redirectIfAuth: true } },
  { path: '/terms', name: 'terms', component: TermsView },
  { path: '/privacy', name: 'privacy', component: PrivacyView },
  { path: '/teacher', name: 'teacher', component: TeacherDashboard, meta: { requiresAuth: true, role: 'teacher' } },
  { path: '/teacher/class/:classId', name: 'teacher-classroom', component: TeacherClassroomView, meta: { requiresAuth: true, role: 'teacher' } },
  { path: '/teacher/archive', name: 'teacher-archive', component: TeacherArchiveView, meta: { requiresAuth: true, role: 'teacher' } },
  { path: '/student', name: 'student', component: StudentDashboard, meta: { requiresAuth: true, role: 'student' } },
  { path: '/student/class/:classId', name: 'student-classroom', component: StudentClassroomView, meta: { requiresAuth: true, role: 'student' } },
  { path: '/student/id', name: 'student-id', component: StudentIdView, meta: { requiresAuth: true, role: 'student' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const PROFILE_ACCESS_ERROR = 'profile-access'

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

const buildLoginRecoveryLocation = () => ({
  path: '/login',
  query: { error: PROFILE_ACCESS_ERROR },
})

const recoverFromProfileAccessFailure = async (error) => {
  console.error('Unable to load the authenticated user profile.', error)

  try {
    await signOut(auth)
  } catch (signOutError) {
    console.error('Unable to sign out after a profile access failure.', signOutError)
  }

  return buildLoginRecoveryLocation()
}

router.beforeEach(async (to) => {
  const user = await getCurrentUser()

  if (to.meta.redirectIfAuth && user) {
    try {
      const userProfile = await getUserById(user.uid)

      if (userProfile?.role) {
        return `/${userProfile.role}`
      }
    } catch (error) {
      return recoverFromProfileAccessFailure(error)
    }

    return recoverFromProfileAccessFailure(new Error('Authenticated user profile is missing a role.'))
  }

  if (!to.meta.requiresAuth) {
    return true
  }

  if (!user) {
    return '/login'
  }

  let userProfile = null

  try {
    userProfile = await getUserById(user.uid)
  } catch (error) {
    return recoverFromProfileAccessFailure(error)
  }

  if (!userProfile || !userProfile.role) {
    return recoverFromProfileAccessFailure(new Error('Authenticated user profile is missing a role.'))
  }

  if (to.meta.role && userProfile.role !== to.meta.role) {
    return `/${userProfile.role}`
  }

  return true
})

export default router
