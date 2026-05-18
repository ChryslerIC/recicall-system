<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <template v-if="themeId === 'focus-flow'">
      <div :class="sharedClasses.panel" class="rounded-[28px] border border-white/20 bg-white/6" />
      <div :class="sharedClasses.glow" class="rounded-full border border-white/18" />
      <div :class="sharedClasses.dotCluster" class="rounded-full bg-white/14" />
      <div :class="sharedClasses.dotSecondary" class="rounded-full bg-white/12" />
      <div :class="sharedClasses.clip" class="bg-white/12 [clip-path:polygon(100%_0,0_68%,100%_100%)]" />
      <div :class="sharedClasses.accentFrame" class="rounded-[24px] border border-white/20 bg-white/8 backdrop-blur-[1px]" />
    </template>

    <template v-else-if="themeId === 'wonder-mode'">
      <div :class="sharedClasses.panel" class="rounded-full border border-white/18 bg-white/8" />
      <div :class="sharedClasses.glow" class="rounded-full bg-white/10" />
      <div :class="sharedClasses.orbitOuter" class="rounded-full border border-white/18" />
      <div :class="sharedClasses.orbitInner" class="rounded-full border border-white/18" />
      <div :class="sharedClasses.dotCluster" class="rounded-full bg-white/18" />
      <div :class="sharedClasses.dotSecondary" class="rounded-full bg-white/14" />
      <div :class="sharedClasses.accentFrame" class="rounded-full border border-white/18 bg-white/10 backdrop-blur-[1px]" />
    </template>

    <template v-else>
      <div :class="sharedClasses.panel" class="rounded-[32px] bg-white/10" />
      <div :class="sharedClasses.glow" class="rounded-full bg-white/12" />
      <div :class="sharedClasses.clip" class="rounded-[18px] bg-white/12 [clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]" />
      <div :class="sharedClasses.dotCluster" class="rounded-full bg-white/16" />
      <div :class="sharedClasses.dotSecondary" class="rounded-full bg-white/12" />
      <div :class="sharedClasses.accentFrame" class="rounded-[26px] border border-white/18 bg-white/10 backdrop-blur-[1px]" />
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  themeId: {
    type: String,
    default: 'creative-spark',
  },
  variant: {
    type: String,
    default: 'card',
  },
})

const layoutConfig = computed(() => {
  if (props.variant === 'hero') {
    return {
      panel: 'absolute right-[22px] top-[22px] h-[112px] w-[132px]',
      glow: 'absolute bottom-[-24px] right-[38px] h-[126px] w-[126px]',
      clip: 'absolute bottom-[4px] right-[-8px] h-[86px] w-[124px]',
      dotCluster: 'absolute right-[142px] top-[44px] h-[20px] w-[20px]',
      dotSecondary: 'absolute right-[120px] top-[84px] h-[10px] w-[10px]',
      orbitOuter: 'absolute right-[26px] top-[18px] h-[128px] w-[128px]',
      orbitInner: 'absolute right-[44px] top-[36px] h-[92px] w-[92px]',
      accentFrame: 'absolute right-[44px] top-[40px] h-[88px] w-[88px]',
    }
  }

  return {
    panel: 'absolute right-[12px] top-[18px] h-[76px] w-[90px]',
    glow: 'absolute bottom-[-14px] right-[20px] h-[92px] w-[92px]',
    clip: 'absolute bottom-[4px] right-[-8px] h-[58px] w-[94px]',
    dotCluster: 'absolute right-[102px] top-[38px] h-[14px] w-[14px]',
    dotSecondary: 'absolute right-[88px] top-[62px] h-[7px] w-[7px]',
    orbitOuter: 'absolute right-[14px] top-[16px] h-[88px] w-[88px]',
    orbitInner: 'absolute right-[28px] top-[30px] h-[60px] w-[60px]',
    accentFrame: 'absolute right-[26px] top-[32px] h-[58px] w-[58px]',
  }
})

const sharedClasses = computed(() => layoutConfig.value)
</script>
