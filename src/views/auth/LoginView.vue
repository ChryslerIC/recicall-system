<template>
  <AuthShell
    v-model="selectedRole"
    title="Welcome Back"
    subtitle="Step into your digital learning space."
    prompt-text="Don't have an account?"
    prompt-action="Sign up"
    prompt-link="/signup"
    :frame-background-src="loginFrameBackground"
    :google-disabled="isSubmitting"
    :student-illustration-src="studentIllustration"
    @google="handleGoogleAuth"
  >
    <form class="space-y-4" @submit.prevent="handleLogin">
      <label class="block">
        <span class="sr-only">Email or Username</span>
        <div class="flex h-14 items-center rounded-[15px] border border-black px-4">
          <AppIcon name="mail" :size="20" class="mr-3 text-[#777]" />
          <input
            v-model.trim="email"
            type="email"
            placeholder="Email or Username"
            class="w-full bg-transparent text-[16px] font-medium text-black outline-none placeholder:text-[#777]"
          />
        </div>
      </label>

      <label class="block">
        <span class="sr-only">Password</span>
        <div class="flex h-14 items-center rounded-[15px] border border-black px-4">
          <AppIcon name="lock" :size="20" class="mr-3 text-[#777]" />
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            class="w-full bg-transparent text-[16px] font-medium text-black outline-none placeholder:text-[#777]"
          />
          <button type="button" class="ml-3 text-[#777]" @click="showPassword = !showPassword">
            <AppIcon :name="showPassword ? 'eye-off' : 'eye'" :size="20" />
          </button>
        </div>
      </label>

      <div class="flex items-center justify-between gap-4 pt-1">
        <label class="flex items-center gap-2 text-[14px] font-medium text-black">
          <input v-model="rememberMe" type="checkbox" class="h-4 w-4 rounded-full border-black text-[#1188f8]" />
          <span>Remember me</span>
        </label>

        <button
          type="button"
          class="text-[14px] font-medium text-[#3abef6] disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isSendingPasswordReset"
          @click="handleForgotPassword"
        >
          {{ isSendingPasswordReset ? 'Sending reset...' : 'Forgot Password?' }}
        </button>
      </div>

      <p v-if="passwordResetMessage" class="text-sm font-medium text-[#1188f8]">
        {{ passwordResetMessage }}
      </p>

      <p v-if="visibleErrorMessage" class="text-sm font-medium text-red-600">
        {{ visibleErrorMessage }}
      </p>

      <button
        type="submit"
        class="mt-2 flex h-[61px] w-full items-center justify-center rounded-full bg-[#1188f8] text-[20px] font-extrabold text-white shadow-[0_9px_8.8px_0_rgba(17,136,248,0.3)] transition hover:bg-[#0c78dd] disabled:cursor-not-allowed disabled:opacity-70"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Logging in...' : 'Log In' }}
      </button>
    </form>
  </AuthShell>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthShell from '../../components/auth/AuthShell.vue'
import AppIcon from '../../components/common/AppIcon.vue'
import loginFrameBackground from '../../assets/figma/images/login-school-supplies-frame.png'
import studentIllustration from '../../assets/figma/images/student-raising-hand-online-lesson.png'
import { loginUser, logoutUser, requestPasswordReset, signInWithGoogle } from '../../services/authService'
import { getUserById, upsertUserProfile } from '../../services/userService'
import { defaultStudentAvatarKey } from '../../utils/studentAvatarOptions'
import { defaultTeacherAvatarKey } from '../../utils/teacherAvatarOptions'

const router = useRouter()
const route = useRoute()

const PROFILE_ACCESS_ERROR = 'profile-access'
const PROFILE_ACCESS_ERROR_MESSAGE =
  'Your account signed in, but we could not load your profile. Please check Firestore access and try again.'

const email = ref('')
const password = ref('')
const selectedRole = ref('teacher')
const rememberMe = ref(false)
const showPassword = ref(false)
const isSubmitting = ref(false)
const isSendingPasswordReset = ref(false)
const errorMessage = ref('')
const passwordResetMessage = ref('')

const routeErrorMessage = computed(() =>
  route.query.error === PROFILE_ACCESS_ERROR ? PROFILE_ACCESS_ERROR_MESSAGE : '',
)
const visibleErrorMessage = computed(() => errorMessage.value || routeErrorMessage.value)

const routeByRole = (role) => {
  if (role === 'teacher') {
    router.push('/teacher')
    return
  }

  if (role === 'student') {
    router.push('/student')
    return
  }

  errorMessage.value = 'Invalid user role.'
}

const buildRoleProfileDefaults = (role) => ({
  avatarPromptSeen: false,
  photoURL: '',
  avatarKey: role === 'student' ? defaultStudentAvatarKey : defaultTeacherAvatarKey,
})

const clearRouteError = async () => {
  if (!route.query.error) return

  await router.replace({
    path: route.path,
    query: {},
  })
}

const buildLoginErrorMessage = (error) => {
  if (error?.code === 'permission-denied') {
    return PROFILE_ACCESS_ERROR_MESSAGE
  }

  if (
    error?.code === 'auth/invalid-credential' ||
    error?.code === 'auth/wrong-password' ||
    error?.code === 'auth/user-not-found' ||
    error?.code === 'auth/invalid-email'
  ) {
    return 'Invalid email or password.'
  }

  if (error?.code === 'auth/too-many-requests') {
    return 'Too many login attempts. Please wait a moment and try again.'
  }

  return 'Unable to log in right now. Please try again.'
}

const handleLogin = async () => {
  await clearRouteError()
  errorMessage.value = ''
  passwordResetMessage.value = ''
  isSubmitting.value = true

  try {
    const userCredential = await loginUser(email.value, password.value)
    const uid = userCredential.user.uid
    const userProfile = await getUserById(uid)

    if (!userProfile) {
      errorMessage.value = 'User profile not found in Firestore.'
      return
    }

    if (userProfile.role !== selectedRole.value) {
      errorMessage.value = `This account is registered as a ${userProfile.role}.`
      return
    }

    routeByRole(userProfile.role)
  } catch (error) {
    if (error?.code === 'permission-denied') {
      await logoutUser().catch(() => {})
    }

    errorMessage.value = buildLoginErrorMessage(error)
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}

const handleForgotPassword = async () => {
  await clearRouteError()
  errorMessage.value = ''
  passwordResetMessage.value = ''

  if (!email.value) {
    errorMessage.value = 'Enter your email first so we can send a password reset link.'
    return
  }

  isSendingPasswordReset.value = true

  try {
    await requestPasswordReset(email.value)
    passwordResetMessage.value =
      'If that email is registered, a password reset link has been sent.'
  } catch (error) {
    if (error?.code === 'auth/invalid-email') {
      errorMessage.value = 'Enter a valid email address to reset your password.'
    } else if (error?.code === 'auth/too-many-requests') {
      errorMessage.value = 'Too many reset attempts. Please wait a moment and try again.'
    } else {
      errorMessage.value = 'We could not send a reset email right now. Please try again.'
    }

    console.error(error)
  } finally {
    isSendingPasswordReset.value = false
  }
}

const handleGoogleAuth = async () => {
  await clearRouteError()
  errorMessage.value = ''
  passwordResetMessage.value = ''
  isSubmitting.value = true

  try {
    const userCredential = await signInWithGoogle()
    const user = userCredential.user
    const existingProfile = await getUserById(user.uid)

    if (existingProfile?.role) {
      if (existingProfile.role !== selectedRole.value) {
        await logoutUser()
        errorMessage.value = `This Google account is registered as a ${existingProfile.role}.`
        return
      }

      routeByRole(existingProfile.role)
      return
    }

    const [firstName = '', ...rest] = (user.displayName || '').trim().split(/\s+/)
    const lastName = rest.join(' ')

    await upsertUserProfile(user.uid, {
      firstName,
      lastName,
      email: user.email || '',
      role: selectedRole.value,
      displayName: user.displayName || `${firstName} ${lastName}`.trim(),
      createdAt: new Date().toISOString(),
      ...buildRoleProfileDefaults(selectedRole.value),
    })

    routeByRole(selectedRole.value)
  } catch (error) {
    if (error?.code === 'permission-denied') {
      await logoutUser().catch(() => {})
      errorMessage.value = PROFILE_ACCESS_ERROR_MESSAGE
    } else {
      errorMessage.value = 'Google sign-in was not completed.'
    }

    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
