<template>
  <div class="min-h-screen bg-[#f6f6f6] font-sans text-black">
    <section class="relative min-h-[78vh] overflow-hidden">
      <img
        :src="heroVisual"
        alt="Teacher guiding a classroom while students participate"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,20,43,0.76)_0%,rgba(8,20,43,0.58)_45%,rgba(8,20,43,0.42)_100%)]" />

      <header class="relative z-10 px-4 pt-4 sm:px-6 lg:px-10 lg:pt-6">
        <div class="mx-auto flex w-full max-w-[1240px] items-center justify-between">
          <RouterLink to="/" class="flex items-center gap-3">
            <img :src="imgLogo" alt="" class="h-[48px] w-[48px] object-contain sm:h-[56px] sm:w-[56px]" />
            <span class="text-[28px] font-black leading-none text-white sm:text-[34px]">ReciCall</span>
          </RouterLink>

          <div class="flex items-center gap-3">
            <RouterLink
              to="/login"
              class="flex h-[44px] items-center justify-center rounded-full border border-white/60 px-5 text-[15px] font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Log In
            </RouterLink>
            <RouterLink
              to="/signup"
              class="flex h-[44px] items-center justify-center rounded-full bg-[#1188f8] px-5 text-[15px] font-semibold text-white transition hover:bg-[#0c78dd]"
            >
              Create Account
            </RouterLink>
          </div>
        </div>
      </header>

      <div class="relative z-10 px-4 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20 lg:pt-28">
        <div class="mx-auto flex w-full max-w-[1240px] items-end">
          <div class="max-w-[680px]">
            <p class="text-[14px] font-semibold uppercase tracking-[0.16em] text-[#d7e9ff]">
              Intelligent QR Monitoring and Recitation System
            </p>
            <h1 class="mt-4 text-[44px] font-black leading-[0.94] text-white sm:text-[58px] lg:text-[76px]">
              ReciCall
            </h1>
            <p class="mt-5 max-w-[560px] text-[18px] leading-[1.5] text-white/92 sm:text-[20px]">
              Streamline classroom participation with QR-based attendance, fair student selection,
              and analytics that help teachers see engagement patterns in real time.
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <RouterLink
                to="/signup"
                class="flex h-[54px] min-w-[180px] items-center justify-center rounded-full bg-[#1188f8] px-7 text-[17px] font-bold text-white transition hover:bg-[#0c78dd]"
              >
                Start With ReciCall
              </RouterLink>
              <RouterLink
                to="/login"
                class="flex h-[54px] min-w-[180px] items-center justify-center rounded-full border border-white/70 px-7 text-[17px] font-bold text-white transition hover:bg-white/10"
              >
                Continue to Login
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-b border-[#dbe8f7] bg-white px-4 py-8 sm:px-6 lg:px-10">
      <div class="mx-auto grid w-full max-w-[1240px] gap-4 md:grid-cols-3">
        <article
          v-for="metric in headlineMetrics"
          :key="metric.title"
          class="rounded-[18px] border border-[#d6e6fa] bg-[#fbfdff] px-5 py-5"
        >
          <p class="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#5d7493]">
            {{ metric.title }}
          </p>
          <p class="mt-3 text-[26px] font-bold leading-none text-[#1188f8]">
            {{ metric.value }}
          </p>
          <p class="mt-3 text-[15px] leading-[1.45] text-[#344054]">
            {{ metric.description }}
          </p>
        </article>
      </div>
    </section>

    <section class="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div class="mx-auto w-full max-w-[1240px]">
        <div class="max-w-[640px]">
          <p class="text-[14px] font-semibold uppercase tracking-[0.14em] text-[#1188f8]">
            Core Experience
          </p>
          <h2 class="mt-4 text-[34px] font-bold leading-[1.02] sm:text-[42px]">
            One flow for attendance, recitation, and classroom visibility.
          </h2>
          <p class="mt-4 text-[18px] leading-[1.6] text-[#475467]">
            ReciCall gives teachers a cleaner session workflow while helping students understand
            where they stand through participation history and class-facing feedback.
          </p>
        </div>

        <div class="mt-10 grid gap-5 lg:grid-cols-3">
          <article
            v-for="feature in featureHighlights"
            :key="feature.title"
            class="rounded-[18px] border border-[#d6e6fa] bg-white px-5 py-6 shadow-[0_12px_30px_rgba(17,136,248,0.06)]"
          >
            <div class="flex h-[52px] w-[52px] items-center justify-center rounded-[16px] bg-[#eef6ff]">
              <AppIcon :name="feature.icon" :size="28" class="text-[#1188f8]" />
            </div>
            <h3 class="mt-5 text-[22px] font-bold leading-[1.1]">{{ feature.title }}</h3>
            <p class="mt-3 text-[16px] leading-[1.55] text-[#475467]">
              {{ feature.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-white px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div class="mx-auto grid w-full max-w-[1240px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p class="text-[14px] font-semibold uppercase tracking-[0.14em] text-[#1188f8]">
            Built for Daily Use
          </p>
          <h2 class="mt-4 text-[34px] font-bold leading-[1.04] sm:text-[42px]">
            Teachers stay in control while students stay visible.
          </h2>
          <div class="mt-8 space-y-5">
            <div
              v-for="step in workflowSteps"
              :key="step.title"
              class="rounded-[18px] border border-[#d6e6fa] bg-[#fbfdff] px-5 py-5"
            >
              <p class="text-[15px] font-semibold uppercase tracking-[0.08em] text-[#1188f8]">
                {{ step.label }}
              </p>
              <h3 class="mt-2 text-[23px] font-bold leading-[1.1]">{{ step.title }}</h3>
              <p class="mt-3 text-[16px] leading-[1.55] text-[#475467]">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-center lg:justify-end">
          <div class="grid w-full max-w-[560px] gap-4">
            <figure class="overflow-hidden rounded-[24px] border border-[#d6e6fa] bg-[#eef6ff] shadow-[0_18px_42px_rgba(17,136,248,0.12)]">
              <img
                :src="collaborationVisual"
                alt="Teacher assisting students during collaborative classroom work"
                class="h-auto w-full object-cover"
              />
              <figcaption class="px-5 py-4 text-[15px] font-medium leading-[1.5] text-[#344054]">
                Guide group discussions, monitor engagement, and keep classroom participation moving
                with structure.
              </figcaption>
            </figure>

            <figure class="overflow-hidden rounded-[24px] border border-[#d6e6fa] bg-white shadow-[0_18px_42px_rgba(17,136,248,0.08)]">
              <img
                :src="digitalClassroomVisual"
                alt="Students participating in a digitally supported classroom presentation"
                class="h-auto w-full object-cover"
              />
              <figcaption class="px-5 py-4 text-[15px] font-medium leading-[1.5] text-[#344054]">
                Connect recitation, analytics, and class progress into one visible classroom flow.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div class="mx-auto w-full max-w-[1240px] rounded-[28px] bg-[#1188f8] px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
        <div class="max-w-[760px]">
          <p class="text-[14px] font-semibold uppercase tracking-[0.14em] text-white/80">
            Ready to Enter
          </p>
          <h2 class="mt-4 text-[34px] font-bold leading-[1.02] sm:text-[44px]">
            Open your learning space and start the next class session with less friction.
          </h2>
          <p class="mt-4 text-[18px] leading-[1.6] text-white/90">
            Sign in if you already have an account, or create one and choose the role that fits
            your classroom workflow.
          </p>
        </div>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <RouterLink
            to="/login"
            class="flex h-[54px] min-w-[180px] items-center justify-center rounded-full bg-white px-7 text-[17px] font-bold text-[#1188f8] transition hover:bg-[#edf6ff]"
          >
            Log In
          </RouterLink>
          <RouterLink
            to="/signup"
            class="flex h-[54px] min-w-[180px] items-center justify-center rounded-full border border-white/70 px-7 text-[17px] font-bold text-white transition hover:bg-white/10"
          >
            Create Account
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import AppIcon from '../components/common/AppIcon.vue'
import imgLogo from '../assets/icons/recicall-logo.png'
import collaborationVisual from '../assets/landing/landing-collaboration-classroom.png'
import digitalClassroomVisual from '../assets/landing/landing-digital-classroom.png'
import heroVisual from '../assets/landing/landing-hero-classroom.png'

const headlineMetrics = [
  {
    title: 'Session Tracking',
    value: 'QR-Based Check-In',
    description: 'Move attendance and participation capture into one structured classroom routine.',
  },
  {
    title: 'Student Selection',
    value: 'Priority Queue Logic',
    description: 'Support fair recitation opportunities using participation history and classroom context.',
  },
  {
    title: 'Teacher Insight',
    value: 'Real-Time Analytics',
    description: 'Review engagement, participation timing, and class-level activity without extra paperwork.',
  },
]

const featureHighlights = [
  {
    title: 'Classroom Control',
    description: 'Manage classes, start sessions, and keep recitation flow organized from one teacher dashboard.',
    icon: 'classes',
  },
  {
    title: 'Participation Analytics',
    description: 'Surface trends, recent activity, and visibility into which students need more speaking opportunities.',
    icon: 'insights',
  },
  {
    title: 'Student Identity',
    description: 'Give students a clear profile, QR-backed ID, and a simple way to see their classroom standing.',
    icon: 'badge',
  },
]

const workflowSteps = [
  {
    label: 'Step 1',
    title: 'Create and schedule classes',
    description: 'Set up sections, times, and recurring class details so students always join the right space.',
  },
  {
    label: 'Step 2',
    title: 'Run recitation and participation sessions',
    description: 'Use QR scans and structured participation tools to keep classroom interactions organized and consistent.',
  },
  {
    label: 'Step 3',
    title: 'Review engagement after every session',
    description: 'Use analytics, rankings, and history views to guide the next discussion with better context.',
  },
]
</script>
