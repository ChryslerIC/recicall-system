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
            <AppIcon name="menu" class="h-full w-full text-[#111]" />
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
              <AppIcon name="classes" :size="26" class="shrink-0 text-[#707070]" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Classes</span>
            </button>
            <button
              type="button"
              class="flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Predictive analytics"
              @click="openPredictiveAnalytics"
            >
              <AppIcon name="insights" :size="24" class="shrink-0 text-[#707070]" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[15px] font-medium text-[#3a3a3a]">Predictive Analytics</span>
            </button>
            <div
              class="flex h-[63px] w-full items-center rounded-[17px] bg-[rgba(46,130,239,0.25)]"
              :class="isSidebarExpanded ? 'justify-start px-[18px]' : 'justify-center'"
            >
              <AppIcon name="archive" :size="24" class="shrink-0 text-[#174ca0]" />
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
              <AppIcon name="settings" :size="24" class="shrink-0 text-[#707070]" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Settings</span>
            </button>
            <button
              type="button"
              class="flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(255,84,84,0.08)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Logout"
              @click="openLogoutConfirm"
            >
              <AppIcon name="logout" :size="24" class="shrink-0 text-[#707070]" />
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
                  <AppIcon name="back" :size="24" />
                </span>
                <span class="ml-[10px] text-[24px] font-semibold text-white">Back to Classes</span>
              </button>
            </div>

            <div v-if="isLoading" class="mt-10 text-[18px] font-medium text-[#5d5d5d]">Loading archived classes...</div>

            <div
              v-else-if="loadError"
              class="mt-10 rounded-[24px] border border-[#ffd0d0] bg-[#fff8f8] px-6 py-8 text-[18px] font-medium text-[#b81717]"
            >
              {{ loadError }}
            </div>

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

                  <ClassThemeArt :theme-id="classItem.gradientId" variant="card" />

                  <button
                    type="button"
                    class="absolute right-[10px] top-[11px] z-20 grid h-[38px] w-[38px] place-items-center rounded-full bg-black/10 text-white transition hover:bg-black/18"
                    :aria-label="`Open options for ${classItem.classLabel}`"
                    @click.stop="toggleOptions(classItem.id)"
                  >
                    <AppIcon name="more" :size="22" />
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
                  <p class="relative z-10 mt-[12px] ml-[15px] inline-flex w-fit rounded-full bg-white/18 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-[1px]">
                    {{ classItem.themeLabel }}
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
            <AppIcon name="classes" :size="22" class="text-[#707070]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Predictive analytics" @click="openPredictiveAnalytics">
            <AppIcon name="insights" :size="22" class="text-[#707070]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center rounded-[12px] bg-[rgba(46,130,239,0.25)]" aria-label="Archive">
            <AppIcon name="archive" :size="22" class="text-[#174ca0]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Settings" @click="openProfileModal">
            <AppIcon name="settings" :size="22" class="text-[#707070]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Logout" @click="openLogoutConfirm">
            <AppIcon name="logout" :size="22" class="text-[#707070]" />
          </button>
        </div>
      </div>

      <ConfirmActionModal
        :open="isLogoutConfirmOpen"
        title="Log out?"
        message="Are you sure you want to log out?"
        confirm-text="Log out"
        loading-text="Logging out..."
        :loading="isLoggingOut"
        @cancel="closeLogoutConfirm"
        @confirm="handleLogout"
      />

      <ConfirmActionModal
        :open="isDeleteAccountConfirmOpen"
        title="Delete Account?"
        message="This will permanently delete your teacher account, classes, join codes, mirrored student enrollments, and profile data. This action cannot be restored."
        confirm-text="Delete Forever"
        loading-text="Deleting..."
        :loading="isDeletingAccount"
        @cancel="closeDeleteAccountConfirm"
        @confirm="handleDeleteAccount"
      />

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
              <button type="button" class="grid h-10 w-10 place-items-center rounded-full text-[#4a4a4a] transition hover:bg-[#eef4ff] hover:text-[#1188f8]" aria-label="Close profile modal" @click="closeProfileModal">
                <AppIcon name="x" :size="20" />
              </button>
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

              <div class="rounded-[20px] border border-[#ffd6d6] bg-[#fff7f7] px-4 py-4">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p class="text-[16px] font-bold text-[#b81717]">Delete Account</p>
                    <p class="mt-1 text-[14px] leading-[1.4] text-[#6b1d1d]">
                      Permanently remove this teacher account and all of its class data. This cannot be undone.
                    </p>
                  </div>
                  <button
                    type="button"
                    class="h-[46px] min-w-[148px] rounded-[18px] bg-[#b81717] px-5 text-[16px] font-semibold text-white transition hover:bg-[#9f1111] disabled:cursor-not-allowed disabled:opacity-70"
                    :disabled="isSavingProfile || isDeletingAccount"
                    @click="openDeleteAccountConfirm"
                  >
                    Delete Account
                  </button>
                </div>
              </div>

              <p v-if="profileError" class="text-sm font-medium text-red-600">{{ profileError }}</p>
              <p v-if="profileSuccess" class="text-sm font-medium text-green-600">{{ profileSuccess }}</p>
              <p v-if="deleteAccountError" class="text-sm font-medium text-red-600">{{ deleteAccountError }}</p>

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
import AppIcon from '../../components/common/AppIcon.vue'
import ClassThemeArt from '../../components/common/ClassThemeArt.vue'
import ConfirmActionModal from '../../components/common/ConfirmActionModal.vue'
import AnalyticsClassPickerModal from '../../components/teacher/AnalyticsClassPickerModal.vue'
import { auth } from '../../config/firebase'
import { logoutUser, updateCurrentUserAccount } from '../../services/authService'
import {
  deleteTeacherAccount,
  getDeleteAccountErrorMessage,
} from '../../services/accountService'
import {
  getTeacherClasses,
  permanentlyDeleteTeacherClass,
  restoreTeacherClass,
} from '../../services/teacherService'
import { getUserById, upsertUserProfile } from '../../services/userService'
import imgProfile from '../../assets/icons/recicall-profile.svg'
import imgStar from '../../assets/icons/recicall-logo.png'
import { decorateClassWithTheme, getClassTheme } from '../../utils/classThemes'
import { defaultTeacherAvatarKey, resolveTeacherAvatar, sanitizeTeacherAvatarKey, teacherAvatarOptions } from '../../utils/teacherAvatarOptions'

const router = useRouter()

const teacherName = ref('Maam. Anderson')
const teacherRole = ref('High School Teacher')
const teacherAvatarKey = ref(defaultTeacherAvatarKey)
const isLoading = ref(true)
const isLoggingOut = ref(false)
const isLogoutConfirmOpen = ref(false)
const isSidebarExpanded = ref(false)
const isAnalyticsClassPickerOpen = ref(false)
const isLoadingAnalyticsClasses = ref(false)
const isProfileModalOpen = ref(false)
const isSavingProfile = ref(false)
const isDeleteAccountConfirmOpen = ref(false)
const isDeletingAccount = ref(false)
const profileError = ref('')
const profileSuccess = ref('')
const deleteAccountError = ref('')
const profileName = ref('')
const profileAvatarKey = ref(defaultTeacherAvatarKey)
const openOptionsId = ref(null)
const teacherId = ref('')
const classes = ref([])
const analyticsClasses = ref([])
const loadError = ref('')
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
  const themedClass = decorateClassWithTheme(classItem)
  const theme = getClassTheme(themedClass)

  return {
    ...themedClass,
    students: themedClass.students ?? 0,
    engagement: themedClass.engagement || theme.engagementFallback,
    width: 400,
    statsWidth: 142.391,
    engagementWidth: 141.304,
  }
}

const loadArchivedClasses = async () => {
  if (!teacherId.value) return
  isLoading.value = true
  loadError.value = ''

  try {
    const archivedClasses = await getTeacherClasses(teacherId.value, { archived: true })
    classes.value = archivedClasses.map(mapClassToCard)
  } catch (error) {
    console.error(error)
    classes.value = []
    loadError.value = 'We could not load archived classes right now. Please refresh and try again.'
  } finally {
    isLoading.value = false
  }
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
  deleteAccountError.value = ''
}

const openDeleteAccountConfirm = () => {
  if (isSavingProfile.value || isDeletingAccount.value) return

  deleteAccountError.value = ''
  isDeleteAccountConfirmOpen.value = true
}

const closeDeleteAccountConfirm = () => {
  if (isDeletingAccount.value) return
  isDeleteAccountConfirmOpen.value = false
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

const handleDeleteAccount = async () => {
  if (!teacherId.value || isDeletingAccount.value) return

  isDeletingAccount.value = true
  deleteAccountError.value = ''

  try {
    await deleteTeacherAccount(teacherId.value)
    isDeleteAccountConfirmOpen.value = false
    isProfileModalOpen.value = false
    await router.replace('/')
  } catch (error) {
    console.error(error)
    deleteAccountError.value = getDeleteAccountErrorMessage(error, 'teacher account')
  } finally {
    isDeletingAccount.value = false
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

const openLogoutConfirm = () => {
  if (isLoggingOut.value) return
  isLogoutConfirmOpen.value = true
}

const closeLogoutConfirm = () => {
  if (isLoggingOut.value) return
  isLogoutConfirmOpen.value = false
}

const handleLogout = async () => {
  if (isLoggingOut.value) return

  isLoggingOut.value = true
  try {
    await logoutUser()
    router.push('/')
  } finally {
    isLoggingOut.value = false
    isLogoutConfirmOpen.value = false
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
