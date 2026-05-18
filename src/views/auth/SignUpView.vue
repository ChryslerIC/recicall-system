<template>
  <AuthShell
    v-model="selectedRole"
    title="Welcome"
    subtitle="Create your digital learning space."
    prompt-text="Already have an account?"
    prompt-action="Log in"
    prompt-link="/login"
    :frame-background-src="loginFrameBackground"
    :google-disabled="isSubmitting"
    :student-illustration-src="studentIllustration"
    @google="handleGoogleAuth"
  >
    <form class="space-y-3 sm:space-y-4" @submit.prevent="handleSignUp">
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label class="block">
          <span class="sr-only">First Name</span>
          <input
            v-model.trim="firstName"
            type="text"
            placeholder="First Name"
            class="h-12 w-full rounded-[15px] border border-black px-4 text-[15px] font-medium text-black outline-none transition placeholder:text-[#777] focus:border-[#1188f8] sm:h-14 sm:text-[16px]"
          />
        </label>

        <label class="block">
          <span class="sr-only">Last Name</span>
          <input
            v-model.trim="lastName"
            type="text"
            placeholder="Last Name"
            class="h-12 w-full rounded-[15px] border border-black px-4 text-[15px] font-medium text-black outline-none transition placeholder:text-[#777] focus:border-[#1188f8] sm:h-14 sm:text-[16px]"
          />
        </label>
      </div>

      <label class="block">
        <span class="sr-only">Email or Username</span>
        <div class="flex h-12 items-center rounded-[15px] border border-black px-4 sm:h-14">
          <AppIcon name="mail" :size="20" class="mr-3 text-[#777]" />
          <input
            v-model.trim="email"
            type="email"
            placeholder="Email or Username"
            class="w-full bg-transparent text-[15px] font-medium text-black outline-none placeholder:text-[#777] sm:text-[16px]"
          />
        </div>
      </label>

      <label class="block">
        <span class="sr-only">Password</span>
        <div class="flex h-12 items-center rounded-[15px] border border-black px-4 sm:h-14">
          <AppIcon name="lock" :size="20" class="mr-3 text-[#777]" />
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            class="w-full bg-transparent text-[15px] font-medium text-black outline-none placeholder:text-[#777] sm:text-[16px]"
          />
          <button type="button" class="ml-3 text-[#777]" @click="showPassword = !showPassword">
            <AppIcon :name="showPassword ? 'eye-off' : 'eye'" :size="20" />
          </button>
        </div>
      </label>

      <div class="space-y-3 rounded-[18px] bg-[#f6f9ff] px-4 py-3 text-[13px] leading-[1.45] text-[#334155] sm:py-4 sm:text-[14px]">
        <label class="flex items-start gap-3">
          <input
            v-model="acceptedTerms"
            type="checkbox"
            class="mt-1 h-4 w-4 rounded border-black text-[#1188f8]"
          />
          <span>
            I agree to the
            <RouterLink to="/terms" class="font-semibold text-[#1188f8] hover:underline">
              Terms of Service
            </RouterLink>.
          </span>
        </label>

        <label class="flex items-start gap-3">
          <input
            v-model="acceptedPrivacy"
            type="checkbox"
            class="mt-1 h-4 w-4 rounded border-black text-[#1188f8]"
          />
          <span>
            I agree to the
            <RouterLink to="/privacy" class="font-semibold text-[#1188f8] hover:underline">
              Privacy Policy
            </RouterLink>.
          </span>
        </label>
      </div>

      <p v-if="errorMessage" class="text-sm font-medium text-red-600">
        {{ errorMessage }}
      </p>

      <button
        type="submit"
        class="mt-1 flex h-[54px] w-full items-center justify-center rounded-full bg-[#1188f8] text-[18px] font-extrabold text-white shadow-[0_9px_8.8px_0_rgba(17,136,248,0.3)] transition hover:bg-[#0c78dd] disabled:cursor-not-allowed disabled:opacity-70 sm:mt-2 sm:h-[61px] sm:text-[20px]"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Creating account...' : 'Sign up' }}
      </button>
    </form>
  </AuthShell>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthShell from '../../components/auth/AuthShell.vue'
import AppIcon from '../../components/common/AppIcon.vue'
import loginFrameBackground from '../../assets/figma/images/login-school-supplies-frame.png'
import studentIllustration from '../../assets/figma/images/student-raising-hand-online-lesson.png'
import { logoutUser, registerUser, signInWithGoogle } from '../../services/authService'
import { createUserProfile, getUserById, upsertUserProfile } from '../../services/userService'
import { defaultStudentAvatarKey } from '../../utils/studentAvatarOptions'
import { defaultTeacherAvatarKey } from '../../utils/teacherAvatarOptions'

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const selectedRole = ref('teacher')
const showPassword = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')
const acceptedTerms = ref(false)
const acceptedPrivacy = ref(false)

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

const buildLegalAcceptanceFields = () => {
  const acceptedAt = new Date().toISOString()

  return {
    acceptedTermsAt: acceptedAt,
    acceptedPrivacyAt: acceptedAt,
    acceptedLegalVersion: '2026-05-12',
  }
}

const handleSignUp = async () => {
  errorMessage.value = ''

  if (!firstName.value || !lastName.value || !email.value || !password.value) {
    errorMessage.value = 'Complete all fields before creating an account.'
    return
  }

  if (!acceptedTerms.value || !acceptedPrivacy.value) {
    errorMessage.value = 'You need to agree to both the Terms of Service and Privacy Policy to continue.'
    return
  }

  isSubmitting.value = true

  try {
    const userCredential = await registerUser(email.value, password.value)
    const uid = userCredential.user.uid

    await createUserProfile(uid, {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      role: selectedRole.value,
      displayName: `${firstName.value} ${lastName.value}`.trim(),
      createdAt: new Date().toISOString(),
      ...buildRoleProfileDefaults(selectedRole.value),
      ...buildLegalAcceptanceFields(),
    })

    routeByRole(selectedRole.value)
  } catch (error) {
    errorMessage.value = 'Unable to create account. Check your details and try again.'
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}

const handleGoogleAuth = async () => {
  errorMessage.value = ''

  if (!acceptedTerms.value || !acceptedPrivacy.value) {
    errorMessage.value = 'Please agree to both the Terms of Service and Privacy Policy before signing up with Google.'
    return
  }

  isSubmitting.value = true

  try {
    const userCredential = await signInWithGoogle()
    const user = userCredential.user
    const existingProfile = await getUserById(user.uid)

    if (existingProfile?.role) {
      if (existingProfile.role !== selectedRole.value) {
        await logoutUser()
        errorMessage.value = `This Google account is already registered as a ${existingProfile.role}.`
        return
      }

      routeByRole(existingProfile.role)
      return
    }

    const [first = '', ...rest] = (user.displayName || '').trim().split(/\s+/)
    const derivedFirstName = firstName.value || first
    const derivedLastName = lastName.value || rest.join(' ')

    await upsertUserProfile(user.uid, {
      firstName: derivedFirstName,
      lastName: derivedLastName,
      email: user.email || email.value,
      role: selectedRole.value,
      displayName: user.displayName || `${derivedFirstName} ${derivedLastName}`.trim(),
      createdAt: new Date().toISOString(),
      ...buildRoleProfileDefaults(selectedRole.value),
      ...buildLegalAcceptanceFields(),
    })

    routeByRole(selectedRole.value)
  } catch (error) {
    errorMessage.value = 'Google sign-up was not completed.'
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
