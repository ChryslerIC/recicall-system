<template>
  <div
    class="relative min-h-dvh overflow-hidden px-3 py-3 sm:px-6 sm:py-8 lg:flex lg:min-h-screen lg:items-center lg:justify-center"
    :class="frameBackgroundSrc ? 'bg-[#fbfbfb]' : 'bg-[#515151]'"
  >
    <img
      v-if="frameBackgroundSrc"
      :src="frameBackgroundSrc"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full object-cover object-bottom"
    />

    <div
      v-if="frameBackgroundSrc"
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),rgba(255,255,255,0.86)_42%,rgba(255,255,255,0.72)_72%,rgba(255,255,255,0.18)_100%)]"
    />

    <div
      class="relative z-10 mx-auto flex w-full max-w-[1087px] overflow-hidden rounded-[28px] bg-[#f6f6f6] shadow-[0_4px_98.4px_-24px_rgba(0,0,0,0.25)] sm:rounded-[40px] lg:min-h-[746px] lg:rounded-[60px]"
    >
      <section class="relative z-10 hidden flex-1 items-center justify-center px-12 py-16 lg:flex">
        <img
          :src="activeIllustrationSrc"
          :alt="activeIllustrationAlt"
          class="h-auto w-full max-w-[456px] object-contain"
        />
      </section>

      <section
        class="relative z-10 flex w-full flex-col justify-center border-2 border-[#2e82ef] bg-white/95 px-5 py-5 backdrop-blur-[1px] sm:px-10 sm:py-10 lg:w-[512px] lg:rounded-[61px] lg:px-8 lg:py-12"
      >
        <div class="mx-auto flex w-full max-w-[439px] flex-col items-center">
          <div class="flex w-full justify-start">
            <RouterLink to="/" class="text-[14px] font-semibold text-[#1188f8]">
              Back to home
            </RouterLink>
          </div>

          <div class="mb-3 sm:mb-6">
            <img :src="imgLogo" alt="" class="h-[56px] w-[56px] object-contain sm:h-[80px] sm:w-[80px]" />
          </div>

          <h1 class="text-center text-[30px] leading-none font-black text-black sm:text-[36px]">
            {{ title }}
          </h1>
          <p class="mt-2 text-center text-[13px] font-semibold text-black sm:mt-3 sm:text-[14px]">
            {{ subtitle }}
          </p>

          <div class="mt-4 flex h-[54px] w-full max-w-[350px] rounded-full bg-[#f6f6f6] p-[6px] sm:mt-5 sm:h-[61px] sm:p-[7px]">
            <button
              v-for="option in roleOptions"
              :key="option.value"
              type="button"
              class="flex-1 rounded-full text-[15px] font-semibold transition sm:text-[16px]"
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

          <div class="mt-4 w-full sm:mt-5">
            <slot />
          </div>

          <div class="mt-6 flex w-full items-center gap-[9px] sm:mt-9">
            <span class="h-px flex-1 bg-[#d5d5d5]" />
            <span class="text-[11px] font-semibold text-[#777] sm:text-[13px]">OR CONTINUE WITH</span>
            <span class="h-px flex-1 bg-[#d5d5d5]" />
          </div>

          <button
            type="button"
            class="mt-4 flex h-[44px] w-full max-w-[281px] items-center justify-center gap-2 rounded-full bg-[#f6f6f6] px-6 text-[18px] font-bold text-black sm:mt-6 sm:h-[45px] sm:text-[20px]"
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

          <p class="mt-6 text-center text-[14px] font-medium text-[#575757] sm:mt-12 sm:text-[15px]">
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
import { computed } from 'vue'
import defaultIllustration from '../../assets/figma/svg-images/Teacher explaining study material.svg'
import imgLogo from '../../assets/icons/recicall-logo.png'

const props = defineProps({
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
    default: defaultIllustration,
  },
  studentIllustrationSrc: {
    type: String,
    default: '',
  },
  frameBackgroundSrc: {
    type: String,
    default: '',
  },
  googleDisabled: {
    type: Boolean,
    default: false,
  },
})

const activeIllustrationSrc = computed(() => {
  if (props.modelValue === 'student' && props.studentIllustrationSrc) {
    return props.studentIllustrationSrc
  }

  return props.illustrationSrc
})

const activeIllustrationAlt = computed(() => {
  if (props.modelValue === 'student' && props.studentIllustrationSrc) {
    return 'Student raising hand during online lesson'
  }

  return 'Teacher explaining study material'
})

const roleOptions = [
  { label: 'Teacher', value: 'teacher' },
  { label: 'Student', value: 'student' },
]

defineEmits(['update:modelValue', 'google'])
</script>
