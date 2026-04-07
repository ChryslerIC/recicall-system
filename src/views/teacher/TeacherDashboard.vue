<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p class="text-sm text-gray-500">Welcome to Recicall</p>
        </div>
        <button
          @click="handleLogout"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-white rounded-2xl shadow p-6">
          <h2 class="text-sm font-medium text-gray-500">Total Students</h2>
          <p class="text-3xl font-bold text-gray-900 mt-2">45</p>
        </div>

        <div class="bg-white rounded-2xl shadow p-6">
          <h2 class="text-sm font-medium text-gray-500">Present Today</h2>
          <p class="text-3xl font-bold text-green-600 mt-2">38</p>
        </div>

        <div class="bg-white rounded-2xl shadow p-6">
          <h2 class="text-sm font-medium text-gray-500">Participation Logs</h2>
          <p class="text-3xl font-bold text-blue-600 mt-2">120</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-2xl shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div class="space-y-3">
            <button class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
              Scan QR Code
            </button>
            <button class="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300">
              View Participation Report
            </button>
            <button class="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300">
              Open Analytics
            </button>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <ul class="space-y-3 text-sm text-gray-600">
            <li class="border-b pb-2">John Dela Cruz scanned attendance QR.</li>
            <li class="border-b pb-2">Maria Santos was marked present.</li>
            <li class="border-b pb-2">Participation analytics updated.</li>
            <li>New classroom session started.</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  router.push('/')
}
</script>