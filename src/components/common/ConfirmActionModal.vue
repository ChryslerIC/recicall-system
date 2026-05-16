<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(224,224,224,0.44)] px-4 py-8 backdrop-blur-[1px]"
      @click.self="$emit('cancel')"
    >
      <div class="w-full max-w-[460px] rounded-[24px] bg-white px-6 py-6 shadow-[0_4px_39.3px_2px_rgba(0,0,0,0.2)]">
        <h2 class="text-[28px] leading-none font-bold text-black">{{ title }}</h2>
        <p class="mt-4 text-[17px] leading-[1.35] font-medium text-[#5b5b5b]">
          {{ message }}
        </p>

        <div class="mt-8 flex justify-end gap-3">
          <button
            type="button"
            class="min-w-[120px] rounded-[24px] border border-[#d0d0d0] px-5 py-3 text-[16px] font-semibold text-[#4a4a4a] transition hover:bg-[#f6f6f6]"
            :disabled="loading"
            @click="$emit('cancel')"
          >
            {{ cancelText }}
          </button>
          <button
            type="button"
            class="min-w-[120px] rounded-[24px] bg-[#1188f8] px-5 py-3 text-[16px] font-semibold text-white transition hover:bg-[#0c78dd] disabled:cursor-not-allowed disabled:opacity-70"
            :disabled="loading"
            @click="$emit('confirm')"
          >
            {{ loading ? loadingText : confirmText }}
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
  title: {
    type: String,
    default: 'Are you sure?',
  },
  message: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: 'Confirm',
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  loadingText: {
    type: String,
    default: 'Loading...',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['confirm', 'cancel'])
</script>
