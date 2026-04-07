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

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Login As</label>
          <select
            v-model="role"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-500">
        Teacher • Student • Admin Access
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const role = ref('teacher')

const handleLogin = () => {
  if (role.value === 'teacher') {
    router.push('/teacher')
  } else if (role.value === 'student') {
    router.push('/student')
  } else if (role.value === 'admin') {
    router.push('/admin')
  }
}
</script>