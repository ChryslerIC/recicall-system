<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Recicall</h1>
        <p class="text-gray-500 mt-2">Classroom Participation Monitoring System</p>
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p v-if="errorMessage" class="text-sm text-red-600 text-center">
          {{ errorMessage }}
        </p>
      </form>

      <div class="mt-6 text-center text-sm text-gray-500">
        Teacher  Student  Admin Access
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '../../services/authService'
import { getUserById } from '../../services/userService'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''

  try {
    const userCredential = await loginUser(email.value, password.value)
    const uid = userCredential.user.uid

    const userProfile = await getUserById(uid)

    if (!userProfile) {
      errorMessage.value = 'User profile not found in Firestore.'
      return
    }

    if (userProfile.role === 'teacher') {
      router.push('/teacher')
    } else if (userProfile.role === 'student') {
      router.push('/student')
    } else if (userProfile.role === 'admin') {
      router.push('/admin')
    } else {
      errorMessage.value = 'Invalid user role.'
    }
  } catch (error) {
    errorMessage.value = 'Invalid email or password.'
    console.error(error)
  }
}
</script>
