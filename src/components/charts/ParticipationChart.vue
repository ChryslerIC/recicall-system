<template>
  <div class="relative min-h-[220px]">
    <component :is="chartComponent" :data="data" :options="mergedOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Bar, Doughnut, Line } from 'vue-chartjs'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
)

const props = defineProps({
  type: {
    type: String,
    default: 'line',
  },
  data: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
})

const chartComponent = computed(() => {
  if (props.type === 'bar') return Bar
  if (props.type === 'doughnut') return Doughnut
  return Line
})

const mergedOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  ...props.options,
}))
</script>
