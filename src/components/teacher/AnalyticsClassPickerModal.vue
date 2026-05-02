<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(224,224,224,0.44)] px-4 py-8 backdrop-blur-[1px]"
      @click.self="$emit('close')"
    >
      <div class="w-full max-w-[560px] rounded-[22px] bg-white px-6 py-5 shadow-[0_4px_39.3px_2px_rgba(0,0,0,0.2)]">
        <div class="flex items-start justify-between gap-4 border-b border-[#d7d7d7] pb-4">
          <div>
            <h2 class="text-[34px] leading-none font-semibold sm:text-[40px]">Choose Class</h2>
            <p class="mt-2 text-[16px] font-medium text-[#555] sm:text-[18px]">
              Pick the class that the analytics should use.
            </p>
          </div>
          <button type="button" class="text-[34px] leading-none" aria-label="Close class picker" @click="$emit('close')">
            x
          </button>
        </div>

        <div class="pt-5">
          <div v-if="loading" class="rounded-[18px] bg-[#f6f6f6] px-5 py-6 text-[16px] font-medium text-[#5d5d5d]">
            Loading classes...
          </div>

          <div
            v-else-if="!classes.length"
            class="rounded-[18px] border border-[#d9e8fb] bg-[#fbfdff] px-5 py-6 text-[16px] font-medium text-[#5d5d5d]"
          >
            {{ emptyMessage }}
          </div>

          <div v-else class="space-y-3">
            <button
              v-for="classItem in classes"
              :key="classItem.id"
              type="button"
              class="w-full rounded-[20px] border border-[#d7d7d7] bg-white px-5 py-4 text-left transition hover:border-[#1188f8] hover:bg-[#eef6ff]"
              @click="$emit('select', classItem)"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="min-w-0">
                  <p class="truncate text-[22px] font-bold leading-none text-black">
                    {{ classItem.classLabel || 'Untitled Class' }}
                  </p>
                  <p class="mt-2 truncate text-[16px] font-medium text-[#333]">
                    {{ classItem.gradeLevel || 'No grade level' }} | {{ classItem.subject || 'No subject' }}
                  </p>
                  <p class="mt-3 text-[14px] font-medium text-[#666]">
                    {{ classItem.scheduleLabel || 'No schedule set' }}<span v-if="classItem.time"> &bull; {{ classItem.time }}</span>
                  </p>
                </div>

                <span class="shrink-0 rounded-full bg-[#1188f8] px-4 py-2 text-[14px] font-semibold text-white">
                  Open
                </span>
              </div>
            </button>
          </div>
        </div>

        <div class="mt-5 flex justify-end">
          <button
            type="button"
            class="h-[52px] min-w-[138px] rounded-[28px] bg-[#c5c5c5] px-6 text-[18px] font-semibold text-black"
            @click="$emit('close')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  emptyMessage: {
    type: String,
    default: 'No classes available yet.',
  },
})

defineEmits(['close', 'select'])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
