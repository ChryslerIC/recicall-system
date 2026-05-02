<template>
  <div class="min-h-screen bg-[#f6f6f6] font-sans text-black">
    <div class="w-full">
      <header class="flex items-start justify-between px-4 pt-4 sm:px-6 lg:px-[30px] lg:pt-[13px]">
        <div class="flex items-start">
          <button
            type="button"
            class="mt-2 h-[32px] w-[34px] sm:mt-4 sm:h-[36px] sm:w-[38px] lg:mt-[22px] lg:h-[41px] lg:w-[43px]"
            aria-label="Toggle sidebar"
            @click="isSidebarExpanded = !isSidebarExpanded"
          >
            <img :src="imgMenu" alt="" class="block h-full w-full" />
          </button>
          <img :src="imgStar" alt="" class="ml-4 mt-1 h-[40px] w-[44px] object-contain sm:ml-6 sm:mt-2 sm:h-[48px] sm:w-[53px] lg:ml-[31px] lg:mt-[15px] lg:h-[55px] lg:w-[61px]" />
          <p class="ml-3 mt-1 text-[28px] leading-none font-black tracking-[-0.03em] sm:ml-4 sm:mt-2 sm:text-[34px] lg:ml-[22px] lg:mt-[18px] lg:text-[40px]">ReciCall</p>
        </div>

        <button type="button" class="ml-4 flex items-start gap-2 sm:gap-[9px] lg:mr-[34px]" aria-label="Edit profile" @click="openProfileModal">
          <div class="pt-1 text-right sm:pt-2 lg:pt-[18px]">
            <p class="text-[14px] leading-none font-bold sm:text-[16px] lg:text-[20px]">{{ teacherName }}</p>
            <p class="mt-[2px] text-[11px] leading-none font-medium sm:text-[13px] lg:mt-[4px] lg:text-[15px]">{{ teacherRole }}</p>
          </div>
          <img :src="teacherPhoto" alt="" class="h-[52px] w-[52px] rounded-full object-cover sm:h-[62px] sm:w-[62px] lg:h-[78px] lg:w-[78px]" @error="ensureProfileFallback" />
        </button>
      </header>

      <div class="flex gap-4 px-4 pb-4 pt-2 sm:px-6 lg:gap-0 lg:px-0">
        <aside
          class="hidden shrink-0 flex-col justify-between pb-[40px] pt-[77px] transition-[width,padding] duration-200 lg:ml-[7px] lg:flex lg:h-[650px]"
          :class="isSidebarExpanded ? 'w-[220px] px-[12px]' : 'w-[72px]'"
        >
          <div class="flex flex-col gap-[18px]">
            <button
              type="button"
              class="flex h-[63px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[18px]' : 'justify-center'"
              aria-label="Classes"
              @click="router.push('/teacher')"
            >
              <img :src="imgClasses" alt="" class="h-[36px] w-[45px] shrink-0" :style="inactiveNavIconStyle" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Classes</span>
            </button>
            <button
              type="button"
              class="flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Predictive analytics"
              @click="openPredictiveAnalytics"
            >
              <img :src="imgAnalytics" alt="" class="h-[40px] w-[38px] shrink-0" :style="inactiveNavIconStyle" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[15px] font-medium text-[#3a3a3a]">Predictive Analytics</span>
            </button>
            <div
              class="flex h-[63px] w-full items-center rounded-[17px] bg-[rgba(46,130,239,0.25)]"
              :class="isSidebarExpanded ? 'justify-start px-[18px]' : 'justify-center'"
            >
              <img :src="imgArchive" alt="" class="h-[40px] w-[38px] shrink-0" :style="activeNavIconStyle" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-semibold text-[#174ca0]">Archive</span>
            </div>
          </div>

          <div class="flex flex-col gap-[18px]">
            <button
              type="button"
              class="flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Settings"
              @click="openProfileModal"
            >
              <img :src="imgSettings" alt="" class="h-[40px] w-[38px] shrink-0" :style="inactiveNavIconStyle" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Settings</span>
            </button>
            <button
              type="button"
              class="flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(255,84,84,0.08)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Logout"
              @click="handleLogout"
            >
              <img :src="imgLogout" alt="" class="h-[40px] w-[38px] shrink-0" :style="inactiveNavIconStyle" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Logout</span>
            </button>
          </div>
        </aside>

        <main class="min-w-0 flex-1 lg:pl-[28px] lg:pr-[27px] lg:pt-[13px]">
          <section class="min-h-[653px] rounded-[28px] border-2 border-[#2e82ef] bg-white px-5 pb-8 pt-6 sm:px-7 sm:pt-8 lg:rounded-[52px] lg:px-[39px] lg:pb-[36px] lg:pt-[47px]">
            <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 class="text-[40px] leading-none font-bold">Archived Classes</h1>
                <p class="mt-[8px] text-[20px] leading-none font-medium">Archived classes are stored here first.</p>
              </div>

              <button type="button" class="mt-[2px] flex h-[78px] w-[250px] items-center rounded-[33.5px] bg-[#1188f8] pl-[32px] pr-[21px]" @click="router.push('/teacher')">
                <span class="grid h-[48px] w-[48px] place-items-center rounded-full bg-white text-[#1188f8]">
                  <svg class="h-[26px] w-[26px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M10.25 6.75 5 12l5.25 5.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4" />
                    <path d="M19 12H5.5" stroke="currentColor" stroke-linecap="round" stroke-width="2.4" />
                  </svg>
                </span>
                <span class="ml-[10px] text-[24px] font-semibold text-white">Back to Classes</span>
              </button>
            </div>

            <div v-if="isLoading" class="mt-10 text-[18px] font-medium text-[#5d5d5d]">Loading archived classes...</div>

            <div v-else-if="classes.length === 0" class="mt-10 rounded-[24px] border border-[#d9e8fb] bg-[#fbfdff] px-6 py-8 text-[18px] font-medium text-[#5d5d5d]">
              No archived classes yet.
            </div>

            <div v-else class="mt-[39px] grid justify-items-start gap-x-[19px] gap-y-[22px] md:grid-cols-2 xl:flex xl:flex-wrap xl:gap-x-[19px] xl:gap-y-[22px]">
              <article
                v-for="classItem in classes"
                :key="classItem.id"
                class="relative h-[260px] w-full overflow-hidden rounded-[20px] border-2 border-[#bdbdbd] bg-white opacity-95"
                :style="{ width: classCardWidth(classItem) }"
              >
                <div class="relative mx-[5px] mt-[6px] h-[173px] overflow-hidden rounded-[17px]" :style="{ backgroundImage: classItem.gradient }">
                  <div class="absolute inset-x-0 bottom-0 h-[20px]" :style="{ backgroundImage: classItem.gradient }" />

                  <template v-if="classItem.gradientId === 'blue'">
                    <div class="absolute right-[28px] top-[67px] h-[91px] w-[34px] bg-[rgba(19,67,145,0.72)] [clip-path:polygon(100%_0,0_82%,100%_100%)]" />
                    <div class="absolute right-[15px] top-[121px] h-[61px] w-[20px] bg-[rgba(22,92,182,0.8)] [clip-path:polygon(100%_0,0_66%,100%_100%)]" />
                    <div class="absolute right-[15px] top-[138px] h-[46px] w-[6px] bg-[rgba(13,73,165,0.85)] [clip-path:polygon(100%_0,0_100%,100%_100%)]" />
                    <div class="absolute right-[5px] top-[72px] h-[81px] w-[15px] bg-[rgba(18,86,173,0.78)] [clip-path:polygon(100%_0,0_100%,100%_84%)]" />
                  </template>
                  <template v-else-if="classItem.gradientId === 'green'">
                    <div class="absolute right-[0px] top-[80px] h-[71px] w-[112px] bg-[rgba(33,170,41,0.48)] [clip-path:polygon(100%_4%,100%_100%,0_100%,26%_64%,39%_67%,51%_47%,62%_49%,79%_17%,89%_22%)]" />
                    <div class="absolute right-[1px] top-[116px] h-[38px] w-[118px] bg-[rgba(44,192,55,0.58)] [clip-path:polygon(100%_8%,100%_100%,0_100%,18%_42%,30%_40%,52%_68%,76%_24%,89%_35%)]" />
                    <div class="absolute right-[30px] top-[119px] h-[35px] w-[71px] bg-[rgba(35,155,44,0.65)] [clip-path:polygon(100%_0,100%_100%,0_100%,28%_28%,44%_40%,63%_0)]" />
                  </template>
                  <template v-else>
                    <div class="absolute right-[4px] top-[86px] h-[88px] w-[96px]">
                      <div class="absolute right-[26px] top-[0] h-[46px] w-[46px] rounded-full bg-[rgba(255,243,97,0.22)]" />
                      <div class="absolute right-[66px] top-[18px] h-[14px] w-[14px] rounded-full bg-[rgba(255,243,97,0.28)]" />
                      <div class="absolute right-[58px] top-[39px] h-[8px] w-[8px] rounded-full bg-[rgba(255,243,97,0.28)]" />
                      <div class="absolute right-[0px] top-[40px] h-[50px] w-[80px] bg-[rgba(242,214,34,0.34)] [clip-path:polygon(100%_0,100%_100%,0_100%,20%_44%)]" />
                    </div>
                  </template>

                  <button
                    type="button"
                    class="absolute right-[8px] top-[11px] z-20"
                    :aria-label="`Open options for ${classItem.classLabel}`"
                    @click.stop="toggleOptions(classItem.id)"
                  >
                    <img :src="imgEllipsisWhite" alt="" class="h-[39px] w-[35px]" />
                  </button>

                  <div
                    v-if="openOptionsId === classItem.id"
                    class="absolute right-[14px] top-[48px] z-30 w-[176px] rounded-[14px] border border-[#d8d8d8] bg-white py-2 shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                  >
                    <button
                      type="button"
                      class="block w-full px-4 py-2 text-left text-[15px] font-medium text-black hover:bg-[#f6f6f6]"
                      @click.stop="restoreClass(classItem.id)"
                    >
                      Restore Class
                    </button>
                    <button
                      type="button"
                      class="block w-full px-4 py-2 text-left text-[15px] font-medium text-[#b81717] hover:bg-[#fff3f3]"
                      @click.stop="permanentlyDeleteClass(classItem.id)"
                    >
                      Delete Permanently
                    </button>
                  </div>

                  <p class="relative z-10 pl-[16px] pt-[16px] text-[36px] leading-none font-semibold text-white">{{ classItem.classLabel }}</p>
                  <p class="relative z-10 mt-[10px] pl-[16px] text-[24px] leading-none font-medium text-white">
                    {{ classItem.gradeLevel }} | {{ classItem.subject }}
                  </p>
                  <p class="relative z-10 mt-[24px] pl-[15px] text-[18px] leading-none font-medium text-white">
                    {{ classItem.scheduleLabel }} &bull; {{ classItem.time }}
                  </p>
                </div>

                <div class="mt-[10px] flex gap-[13px] px-[10px]">
                  <div class="h-[58px] rounded-[11px] bg-[#f6f6f6] px-[11px] py-[5px]" :style="{ width: `${classItem.statsWidth}px` }">
                    <p class="text-[20px] leading-none font-medium text-[#161616]">Students</p>
                    <p class="mt-[8px] text-[20px] leading-none font-semibold text-[#1188f8]">{{ classItem.students }}</p>
                  </div>
                  <div class="h-[58px] rounded-[11px] bg-[#f6f6f6] px-[11px] py-[5px]" :style="{ width: `${classItem.engagementWidth}px` }">
                    <p class="text-[18px] leading-none font-medium text-[#161616]">Engagement</p>
                    <p class="mt-[8px] text-[20px] leading-none font-semibold" :class="engagementClass(classItem.engagement)">{{ classItem.engagement }}</p>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </main>
      </div>

      <div class="px-4 pb-6 sm:px-6 lg:hidden">
        <div class="flex items-center justify-center gap-8 rounded-[20px] border border-[#d9e8fb] bg-white px-4 py-3 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Classes" @click="router.push('/teacher')">
            <img :src="imgClasses" alt="" class="h-[24px] w-[30px]" :style="inactiveNavIconStyle" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Predictive analytics" @click="openPredictiveAnalytics">
            <img :src="imgAnalytics" alt="" class="h-[28px] w-[26px]" :style="inactiveNavIconStyle" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center rounded-[12px] bg-[rgba(46,130,239,0.25)]" aria-label="Archive">
            <img :src="imgArchive" alt="" class="h-[28px] w-[26px]" :style="activeNavIconStyle" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Settings" @click="openProfileModal">
            <img :src="imgSettings" alt="" class="h-[28px] w-[26px]" :style="inactiveNavIconStyle" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Logout" @click="handleLogout">
            <img :src="imgLogout" alt="" class="h-[28px] w-[26px]" :style="inactiveNavIconStyle" />
          </button>
        </div>
      </div>

      <AnalyticsClassPickerModal
        :open="isAnalyticsClassPickerOpen"
        :classes="analyticsClasses"
        :loading="isLoadingAnalyticsClasses"
        empty-message="No active classes available. Restore or create a class first before opening analytics."
        @close="closeAnalyticsClassPicker"
        @select="handleAnalyticsClassSelect"
      />

      <transition name="fade">
        <div
          v-if="isProfileModalOpen"
          class="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(224,224,224,0.44)] px-4 py-8 backdrop-blur-[1px]"
          @click.self="closeProfileModal"
        >
          <div class="w-full max-w-[540px] rounded-[22px] bg-white px-6 py-5 shadow-[0_4px_39.3px_2px_rgba(0,0,0,0.2)]">
            <div class="flex items-start justify-between border-b border-[#d7d7d7] pb-4">
              <div>
                <h2 class="text-[40px] leading-none font-semibold">Edit Profile</h2>
                <p class="mt-2 text-[20px] font-medium">Update your display name and choose a preset avatar.</p>
              </div>
              <button type="button" class="text-[34px] leading-none" aria-label="Close profile modal" @click="closeProfileModal">x</button>
            </div>

            <form class="space-y-4 pt-5" @submit.prevent="saveProfileChanges">
              <div class="flex items-center gap-4">
                <img :src="profilePreviewSrc" alt="" class="h-[88px] w-[88px] rounded-full border border-[#d7d7d7] object-cover" />
              </div>

              <label class="block">
                <span class="mb-1 block text-[16px] font-semibold">Display Name</span>
                <input
                  v-model.trim="profileName"
                  type="text"
                  placeholder="Enter your name"
                  class="h-14 w-full rounded-[15px] border border-black px-4 text-[16px] font-medium outline-none placeholder:text-[#777]"
                />
              </label>

              <div>
                <div class="flex items-center justify-between gap-4">
                  <p class="text-[16px] font-semibold">Preset Avatars</p>
                  <p class="text-[13px] text-[#666]">Choose one avatar to use across the app.</p>
                </div>
                <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <button
                    v-for="avatar in teacherAvatarOptions"
                    :key="avatar.key"
                    type="button"
                    class="rounded-[18px] border px-3 py-3 text-center transition"
                    :class="profileAvatarKey === avatar.key ? 'border-[#1188f8] bg-[#eef6ff] shadow-[0_0_0_2px_rgba(17,136,248,0.12)]' : 'border-[#d7d7d7] bg-[#fafafa] hover:border-[#1188f8]'"
                    :disabled="isSavingProfile"
                    @click="selectTeacherAvatarPreset(avatar.key)"
                  >
                    <img :src="avatar.src" :alt="avatar.label" class="mx-auto h-[64px] w-[64px] rounded-full object-cover" />
                    <p class="mt-3 text-[13px] font-semibold text-black">{{ avatar.label }}</p>
                  </button>
                </div>
              </div>

              <p v-if="profileError" class="text-sm font-medium text-red-600">{{ profileError }}</p>
              <p v-if="profileSuccess" class="text-sm font-medium text-green-600">{{ profileSuccess }}</p>

              <div class="flex justify-end gap-4 pt-2">
                <button type="button" class="h-[57px] w-[151px] rounded-[33.5px] bg-[#c5c5c5] text-[20px] font-bold" @click="closeProfileModal">
                  Cancel
                </button>
                <button type="submit" class="h-[57px] w-[151px] rounded-[33.5px] bg-[#1188f8] text-[20px] font-bold text-white disabled:opacity-70" :disabled="isSavingProfile">
                  {{ isSavingProfile ? 'Saving...' : 'Save' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AnalyticsClassPickerModal from '../../components/teacher/AnalyticsClassPickerModal.vue'
import { auth } from '../../config/firebase'
import { logoutUser, updateCurrentUserAccount } from '../../services/authService'
import {
  getTeacherClasses,
  permanentlyDeleteTeacherClass,
  restoreTeacherClass,
} from '../../services/teacherService'
import { getUserById, upsertUserProfile } from '../../services/userService'
import imgAnalytics from '../../assets/icons/recicall-analytics.svg'
import imgArchive from '../../assets/icons/recicall-archive.svg'
import imgClasses from '../../assets/icons/recicall-classes.svg'
import imgEllipsisWhite from '../../assets/icons/recicall-ellipsis-white.svg'
import imgLogout from '../../assets/icons/recicall-logout.svg'
import imgMenu from '../../assets/icons/recicall-menu.svg'
import imgProfile from '../../assets/icons/recicall-profile.svg'
import imgSettings from '../../assets/icons/recicall-settings.svg'
import imgStar from '../../assets/icons/recicall-logo.png'
import { activeNavIconStyle, inactiveNavIconStyle } from '../../utils/navIconStyles'
import { defaultTeacherAvatarKey, resolveTeacherAvatar, sanitizeTeacherAvatarKey, teacherAvatarOptions } from '../../utils/teacherAvatarOptions'

const router = useRouter()

const gradientConfig = {
  blue: {
    gradient: 'linear-gradient(90deg, rgb(37, 122, 255) 0%, rgb(36, 118, 247) 44.712%, rgb(29, 96, 201) 90.385%, rgb(22, 73, 153) 100%)',
  },
  green: {
    gradient: 'linear-gradient(90deg, rgb(29, 201, 49) 0%, rgb(6, 196, 28) 15.865%, rgb(89, 234, 99) 87.019%, rgb(85, 232, 96) 92.308%)',
  },
  yellow: {
    gradient: 'linear-gradient(90deg, rgb(228, 206, 40) 0%, rgb(253, 228, 66) 36.058%, rgb(255, 238, 47) 76.442%, rgb(237, 211, 42) 100%)',
  },
}

const teacherName = ref('Maam. Anderson')
const teacherRole = ref('High School Teacher')
const teacherAvatarKey = ref(defaultTeacherAvatarKey)
const isLoading = ref(true)
const isLoggingOut = ref(false)
const isSidebarExpanded = ref(false)
const isAnalyticsClassPickerOpen = ref(false)
const isLoadingAnalyticsClasses = ref(false)
const isProfileModalOpen = ref(false)
const isSavingProfile = ref(false)
const profileError = ref('')
const profileSuccess = ref('')
const profileName = ref('')
const profileAvatarKey = ref(defaultTeacherAvatarKey)
const openOptionsId = ref(null)
const teacherId = ref('')
const classes = ref([])
const analyticsClasses = ref([])
const teacherPhoto = computed(() =>
  resolveTeacherAvatar(teacherAvatarKey.value, ''),
)
const profilePreviewSrc = computed(() =>
  resolveTeacherAvatar(profileAvatarKey.value || defaultTeacherAvatarKey, ''),
)

const ensureProfileFallback = (event) => {
  event.target.src = imgProfile
}

const engagementClass = (engagement) => {
  if (engagement === 'High') return 'text-[#1188f8]'
  if (engagement === 'Moderate') return 'text-[#4fb817]'
  return 'text-[#b81717]'
}

const classCardWidth = (classItem) => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) return '100%'
  if (typeof window !== 'undefined' && window.innerWidth < 1280) return 'min(100%, 400px)'
  return `${classItem.width}px`
}

const mapClassToCard = (classItem) => {
  const config = gradientConfig[classItem.gradientId] || gradientConfig.blue

  return {
    ...classItem,
    students: classItem.students ?? 35,
    gradient: config.gradient,
    width: classItem.gradientId === 'blue' ? 396.347 : 400,
    statsWidth: classItem.gradientId === 'blue' ? 140.482 : 142.391,
    engagementWidth: classItem.gradientId === 'blue' ? 139.41 : 141.304,
  }
}

const loadArchivedClasses = async () => {
  if (!teacherId.value) return
  isLoading.value = true
  const archivedClasses = await getTeacherClasses(teacherId.value, { archived: true })
  classes.value = archivedClasses.map(mapClassToCard)
  isLoading.value = false
}

const loadActiveAnalyticsClasses = async () => {
  if (!teacherId.value) return

  isLoadingAnalyticsClasses.value = true
  try {
    const activeClasses = await getTeacherClasses(teacherId.value, { archived: false })
    analyticsClasses.value = activeClasses.map(mapClassToCard)
  } finally {
    isLoadingAnalyticsClasses.value = false
  }
}

const toggleOptions = (classId) => {
  openOptionsId.value = openOptionsId.value === classId ? null : classId
}

const openProfileModal = () => {
  profileError.value = ''
  profileSuccess.value = ''
  profileName.value = teacherName.value
  profileAvatarKey.value = teacherAvatarKey.value || defaultTeacherAvatarKey
  isProfileModalOpen.value = true
}

const closeProfileModal = () => {
  isProfileModalOpen.value = false
  profileError.value = ''
  profileSuccess.value = ''
}

const openPredictiveAnalytics = async () => {
  isAnalyticsClassPickerOpen.value = true
  await loadActiveAnalyticsClasses()
}

const closeAnalyticsClassPicker = () => {
  isAnalyticsClassPickerOpen.value = false
}

const handleAnalyticsClassSelect = (classItem) => {
  if (!classItem?.id) return

  closeAnalyticsClassPicker()
  router.push({
    path: `/teacher/class/${classItem.id}`,
    query: { tab: 'analytics' },
  })
}

const selectTeacherAvatarPreset = (avatarKey) => {
  profileAvatarKey.value = avatarKey
}

const saveProfileChanges = async () => {
  profileError.value = ''
  profileSuccess.value = ''

  if (!profileName.value.trim()) {
    profileError.value = 'Enter a display name first.'
    return
  }

  isSavingProfile.value = true

  try {
    const updatedProfile = await updateCurrentUserAccount({
      displayName: profileName.value.trim(),
      photoURL: '',
    })

    const nextAvatarKey = sanitizeTeacherAvatarKey(profileAvatarKey.value)
    await upsertUserProfile(teacherId.value, {
      displayName: updatedProfile.displayName,
      avatarKey: nextAvatarKey,
      photoURL: '',
      avatarPromptSeen: true,
    })

    teacherName.value = updatedProfile.displayName || teacherName.value
    teacherAvatarKey.value = nextAvatarKey
    profileSuccess.value = updatedProfile.photoUploadError
      ? 'Display name updated. Photo upload did not complete.'
      : 'Profile updated successfully.'
    profileError.value = updatedProfile.photoUploadError

    window.setTimeout(() => {
      closeProfileModal()
    }, updatedProfile.photoUploadError ? 1800 : 700)
  } catch (error) {
    console.error(error)
    profileError.value = error?.message || 'Unable to update your profile right now.'
  } finally {
    isSavingProfile.value = false
  }
}

const restoreClass = async (classId) => {
  await restoreTeacherClass(teacherId.value, classId)
  openOptionsId.value = null
  await loadArchivedClasses()
}

const permanentlyDeleteClass = async (classId) => {
  await permanentlyDeleteTeacherClass(teacherId.value, classId)
  openOptionsId.value = null
  await loadArchivedClasses()
}

const handleLogout = async () => {
  if (isLoggingOut.value) return

  isLoggingOut.value = true
  try {
    await logoutUser()
    router.push('/')
  } finally {
    isLoggingOut.value = false
  }
}

onMounted(async () => {
  const user = auth.currentUser
  if (!user) return

  teacherId.value = user.uid
  const profile = await getUserById(user.uid)
  if (profile?.displayName) teacherName.value = profile.displayName
  else if (user.displayName) teacherName.value = user.displayName
  teacherAvatarKey.value = sanitizeTeacherAvatarKey(profile?.avatarKey)
  profileName.value = teacherName.value

  await loadArchivedClasses()
})
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
