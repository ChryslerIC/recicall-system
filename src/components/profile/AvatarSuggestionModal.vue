<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(0,0,0,0.35)] px-4 py-6"
      @click.self="$emit('close')"
    >
      <div class="w-full max-w-[640px] rounded-[28px] bg-white px-5 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:px-7 sm:py-6">
        <div class="flex items-start justify-between gap-4 border-b border-[#e5e5e5] pb-4">
          <div>
            <h2 class="text-[28px] leading-none font-bold sm:text-[34px]">{{ title }}</h2>
            <p class="mt-3 text-[15px] leading-[1.45] text-[#4b4b4b] sm:text-[16px]">
              {{ description }}
            </p>
          </div>

          <button type="button" class="text-[28px] leading-none text-[#555]" aria-label="Close" @click="$emit('close')">
            x
          </button>
        </div>

        <div class="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-[16px] font-semibold text-black">{{ previewLabel }}</p>
            <p class="mt-2 text-[13px] text-[#666]">{{ previewHint }}</p>
          </div>
          <img :src="previewSrc" alt="" class="h-[88px] w-[88px] rounded-full border border-[#d7d7d7] object-cover sm:h-[98px] sm:w-[98px]" />
        </div>

        <div class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <button
            v-for="avatar in options"
            :key="avatar.key"
            type="button"
            class="rounded-[18px] border px-3 py-3 text-center transition"
            :class="selectedKey === avatar.key ? 'border-[#1188f8] bg-[#eef6ff] shadow-[0_0_0_2px_rgba(17,136,248,0.12)]' : 'border-[#d7d7d7] bg-[#fafafa] hover:border-[#1188f8]'"
            :disabled="saving"
            @click="$emit('update:selectedKey', avatar.key)"
          >
            <img :src="avatar.src" :alt="avatar.label" class="mx-auto h-[74px] w-[74px] rounded-full object-cover" />
            <p class="mt-3 text-[13px] font-semibold text-black">{{ avatar.label }}</p>
          </button>
        </div>

        <p v-if="error" class="mt-4 text-[15px] font-medium text-red-600">{{ error }}</p>

        <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            v-if="showLater"
            type="button"
            class="h-[52px] w-full rounded-[22px] bg-[#d9d9d9] px-6 text-[17px] font-semibold sm:w-auto sm:min-w-[140px]"
            :disabled="saving"
            @click="$emit('later')"
          >
            {{ laterLabel }}
          </button>
          <button
            type="button"
            class="h-[52px] w-full rounded-[22px] bg-[#1188f8] px-6 text-[17px] font-semibold text-white disabled:opacity-60 sm:w-auto sm:min-w-[172px]"
            :disabled="saving"
            @click="$emit('save')"
          >
            {{ saving ? savingLabel : saveLabel }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Choose Your Avatar' },
  description: { type: String, default: 'Pick an avatar you want to use in ReciCall.' },
  previewLabel: { type: String, default: 'Current preview' },
  previewHint: { type: String, default: 'This avatar will appear anywhere your profile is shown.' },
  previewSrc: { type: String, required: true },
  options: { type: Array, default: () => [] },
  selectedKey: { type: String, default: '' },
  error: { type: String, default: '' },
  showLater: { type: Boolean, default: true },
  laterLabel: { type: String, default: 'Maybe later' },
  saveLabel: { type: String, default: 'Save Avatar' },
  savingLabel: { type: String, default: 'Saving...' },
  saving: { type: Boolean, default: false },
})

defineEmits(['close', 'later', 'save', 'update:selectedKey'])
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
