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
          <svg class="mr-3 h-5 w-5 text-[#777]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              d="M2.5 4.5A2.5 2.5 0 0 1 5 2h10a2.5 2.5 0 0 1 2.5 2.5v11A2.5 2.5 0 0 1 15 18H5a2.5 2.5 0 0 1-2.5-2.5v-11Zm2.5-.5a.5.5 0 0 0-.5.5v.217l5.5 4.278 5.5-4.278V4.5a.5.5 0 0 0-.5-.5H5Zm10.5 2.985-4.886 3.8a1 1 0 0 1-1.228 0L4.5 6.985V15.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V6.985Z"
            />
          </svg>
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
          <svg class="mr-3 h-5 w-5 text-[#777]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M6 8V6a4 4 0 1 1 8 0v2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Zm2-2a2 2 0 1 1 4 0v2H8V6Zm2 4a1.25 1.25 0 0 0-.75 2.25V14a.75.75 0 0 0 1.5 0v-1.75A1.25 1.25 0 0 0 10 10Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            class="w-full bg-transparent text-[16px] font-medium text-black outline-none placeholder:text-[#777]"
          />
          <button type="button" class="ml-3 text-[#777]" @click="showPassword = !showPassword">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                d="M10 4.5c4.363 0 7.446 3.145 8.675 5.044a.84.84 0 0 1 0 .912C17.446 12.355 14.363 15.5 10 15.5S2.554 12.355 1.325 10.456a.84.84 0 0 1 0-.912C2.554 7.645 5.637 4.5 10 4.5Zm0 2c-3.174 0-5.625 2.19-6.792 3.5C4.375 11.31 6.826 13.5 10 13.5s5.625-2.19 6.792-3.5C15.625 8.69 13.174 6.5 10 6.5Zm0 1.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"
              />
            </svg>
          </button>
        </div>
      </label>

      <div class="flex items-center justify-between gap-4 pt-1">
        <label class="flex items-center gap-2 text-[14px] font-medium text-black">
          <input v-model="rememberMe" type="checkbox" class="h-4 w-4 rounded-full border-black text-[#1188f8]" />
          <span>Remember me</span>
        </label>

        <button type="button" class="text-[14px] font-medium text-[#3abef6]">
          Forgot Password?
        </button>
      </div>

      <p v-if="errorMessage" class="text-sm font-medium text-red-600">
        {{ errorMessage }}
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthShell from '../../components/auth/AuthShell.vue'
import loginFrameBackground from '../../assets/figma/images/login-school-supplies-frame.png'
import studentIllustration from '../../assets/figma/images/student-raising-hand-online-lesson.png'
import { loginUser, logoutUser, signInWithGoogle } from '../../services/authService'
import { getUserById, upsertUserProfile } from '../../services/userService'
import { defaultStudentAvatarKey } from '../../utils/studentAvatarOptions'
import { defaultTeacherAvatarKey } from '../../utils/teacherAvatarOptions'

const router = useRouter()

const email = ref('')
const password = ref('')
const selectedRole = ref('teacher')
const rememberMe = ref(false)
const showPassword = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')

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

const handleLogin = async () => {
  errorMessage.value = ''
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
    errorMessage.value = 'Invalid email or password.'
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}

const handleGoogleAuth = async () => {
  errorMessage.value = ''
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
    errorMessage.value = 'Google sign-in was not completed.'
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
