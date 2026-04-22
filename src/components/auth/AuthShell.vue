<template>
  <div class="min-h-screen bg-[#515151] px-4 py-8 sm:px-6 lg:flex lg:items-center lg:justify-center">
    <div
      class="mx-auto flex w-full max-w-[1087px] overflow-hidden rounded-[40px] bg-[#f6f6f6] shadow-[0_4px_98.4px_-24px_rgba(0,0,0,0.25)] lg:min-h-[746px] lg:rounded-[60px]"
    >
      <section class="hidden flex-1 items-center justify-center px-12 py-16 lg:flex">
        <img
          :src="illustrationSrc"
          alt="Teacher explaining study material"
          class="h-auto w-full max-w-[456px] object-contain"
        />
      </section>

      <section
        class="relative flex w-full flex-col justify-center border-2 border-[#2e82ef] bg-white px-6 py-10 sm:px-10 lg:w-[512px] lg:rounded-[61px] lg:px-8 lg:py-12"
      >
        <div class="mx-auto flex w-full max-w-[439px] flex-col items-center">
          <div class="mb-5 text-[#1188f8]">
            <svg width="40" height="33" viewBox="0 0 40 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 0L23.2763 12.7237L36 16L23.2763 19.2763L20 32L16.7237 19.2763L4 16L16.7237 12.7237L20 0Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <h1 class="text-center text-[36px] leading-none font-black text-black">
            {{ title }}
          </h1>
          <p class="mt-3 text-center text-[14px] font-semibold text-black">
            {{ subtitle }}
          </p>

          <div class="mt-5 flex h-[61px] w-[350px] max-w-full rounded-full bg-[#f6f6f6] p-[7px]">
            <button
              v-for="option in roleOptions"
              :key="option.value"
              type="button"
              class="flex-1 rounded-full text-[16px] font-semibold transition"
              :class="
                modelValue === option.value
                  ? 'bg-white text-[#1188f8] shadow-[0_4px_6.1px_-4px_rgba(0,0,0,0.25)]'
                  : 'text-[#8d8d8d]'
              "
              @click="$emit('update:modelValue', option.value)"
            >
              {{ option.label }}
            </button>
          </div>

          <div class="mt-5 w-full">
            <slot />
          </div>

          <div class="mt-9 flex w-full items-center gap-[9px]">
            <span class="h-px flex-1 bg-[#d5d5d5]" />
            <span class="text-[13px] font-semibold text-[#777]">OR CONTINUE WITH</span>
            <span class="h-px flex-1 bg-[#d5d5d5]" />
          </div>

          <button
            type="button"
            class="mt-6 flex h-[45px] w-[281px] max-w-full items-center justify-center gap-2 rounded-full bg-[#f6f6f6] px-6 text-[20px] font-bold text-black"
            :disabled="googleDisabled"
            :class="{ 'cursor-not-allowed opacity-70': googleDisabled }"
            @click="$emit('google')"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#EA4335"
                d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.8-6-6.2s2.7-6.2 6-6.2c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 2.9 14.6 2 12 2 6.9 2 2.8 6.3 2.8 11.5S6.9 21 12 21c6.9 0 8.6-4.9 8.6-7.4 0-.5 0-.9-.1-1.3H12Z"
              />
              <path
                fill="#34A853"
                d="M2.8 7.3l3.2 2.3C6.8 7.9 9.1 6.4 12 6.4c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 2.9 14.6 2 12 2 8.4 2 5.2 4.1 3.7 7.3Z"
              />
              <path
                fill="#FBBC05"
                d="M12 21c2.5 0 4.6-.8 6.1-2.3l-2.8-2.3c-.8.6-1.9 1.1-3.3 1.1-3.9 0-5.2-2.6-5.5-3.9l-3.2 2.4C4.8 18.9 8.1 21 12 21Z"
              />
              <path
                fill="#4285F4"
                d="M20.6 13.6c0-.5 0-.9-.1-1.3H12v3.9h5.5c-.3 1.2-1.1 2.1-2.2 2.9l2.8 2.3c1.7-1.6 2.5-4.1 2.5-7.8Z"
              />
            </svg>
            <span>Google</span>
          </button>

          <p class="mt-12 text-center text-[15px] font-medium text-[#575757]">
            {{ promptText }}
            <RouterLink :to="promptLink" class="ml-1 font-bold text-[#3abef6]">
              {{ promptAction }}
            </RouterLink>
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  promptText: {
    type: String,
    required: true,
  },
  promptAction: {
    type: String,
    required: true,
  },
  promptLink: {
    type: String,
    required: true,
  },
  illustrationSrc: {
    type: String,
    default: 'https://www.figma.com/api/mcp/asset/21ad59c0-6226-44fe-ae67-da5fdb2f3e59',
  },
  googleDisabled: {
    type: Boolean,
    default: false,
  },
})

const roleOptions = [
  { label: 'Teacher', value: 'teacher' },
  { label: 'Student', value: 'student' },
]

defineEmits(['update:modelValue', 'google'])
</script>
