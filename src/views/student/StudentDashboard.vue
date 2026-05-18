<template>
  <div class="min-h-screen bg-[#f6f6f6] font-sans text-black">
    <div class="w-full">
      <header class="sticky top-0 z-20 flex items-start justify-between bg-[#f6f6f6]/95 px-4 pb-3 pt-4 backdrop-blur-[10px] sm:px-6 lg:px-[30px] lg:pt-[13px]">
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

        <div class="ml-4 flex items-start sm:gap-5 lg:mr-[34px]">
          <button type="button" class="mt-0 sm:mt-1 lg:mt-[12px]" aria-label="Profile" @click="openStudentSettings">
            <img :src="studentAvatarSrc" alt="" class="h-[48px] w-[49px] rounded-full object-cover sm:h-[56px] sm:w-[57px] lg:h-[63px] lg:w-[64px]" />
          </button>
        </div>
      </header>

      <transition name="fade">
        <div
          v-if="isSidebarExpanded"
          class="fixed inset-0 z-30 bg-[rgba(12,18,28,0.45)] backdrop-blur-[2px] lg:hidden"
          @click.self="isSidebarExpanded = false"
        >
          <aside class="flex h-full w-[272px] max-w-[86vw] flex-col justify-between overflow-y-auto bg-white px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 shadow-[0_18px_44px_rgba(0,0,0,0.18)]">
            <div>
              <div class="flex items-center justify-between">
                <p class="text-[26px] font-black leading-none tracking-[-0.03em]">ReciCall</p>
                <button type="button" class="grid h-10 w-10 place-items-center rounded-full text-[#4a4a4a] transition hover:bg-[#eef4ff] hover:text-[#1188f8]" aria-label="Close sidebar" @click="isSidebarExpanded = false">
                  <AppIcon name="x" :size="20" />
                </button>
              </div>
              <div class="mt-8 space-y-3">
                <div class="flex h-[56px] items-center rounded-[18px] bg-[rgba(46,130,239,0.25)] px-4">
                  <AppIcon name="classes" :size="24" class="text-[#174ca0]" />
                  <span class="ml-4 text-[16px] font-semibold text-[#174ca0]">Classes</span>
                </div>
                <button type="button" class="flex h-[52px] w-full items-center rounded-[18px] px-4 text-left transition hover:bg-[rgba(46,130,239,0.12)]" aria-label="Student ID" @click="isSidebarExpanded = false; router.push('/student/id')">
                  <AppIcon name="badge" :size="22" class="text-[#707070]" />
                  <span class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Student ID</span>
                </button>
              </div>
            </div>
            <div class="space-y-3">
              <button type="button" class="flex h-[52px] w-full items-center rounded-[18px] px-4 text-left transition hover:bg-[rgba(46,130,239,0.12)]" aria-label="Settings" @click="isSidebarExpanded = false; openStudentSettings()">
                <AppIcon name="settings" :size="22" class="text-[#707070]" />
                <span class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Settings</span>
              </button>
              <button type="button" class="flex h-[52px] w-full items-center rounded-[18px] px-4 text-left transition hover:bg-[rgba(255,84,84,0.08)]" aria-label="Logout" @click="isSidebarExpanded = false; openLogoutConfirm()">
                <AppIcon name="logout" :size="22" class="text-[#707070]" />
                <span class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      </transition>

      <div class="flex gap-4 px-4 pb-4 pt-2 sm:px-6 lg:gap-0 lg:px-0">
        <aside
          class="hidden shrink-0 self-start flex-col justify-between pb-[44px] pt-[84px] transition-[width,padding] duration-200 lg:sticky lg:top-[118px] lg:flex lg:h-[650px]"
          :class="isSidebarExpanded ? 'w-[220px] px-[12px]' : 'w-[88px] px-[10px]'"
        >
          <div class="flex flex-col gap-5">
            <div
              class="flex h-[63px] w-full items-center rounded-[17px] bg-[rgba(46,130,239,0.25)]"
              :class="isSidebarExpanded ? 'justify-start px-[18px]' : 'justify-center pl-[4px]'"
            >
              <AppIcon name="classes" :size="26" class="shrink-0 text-[#174ca0]" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-semibold text-[#174ca0]">Classes</span>
            </div>
            <button
              type="button"
              class="flex h-[63px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[18px]' : 'justify-center pl-[4px]'"
              aria-label="Student ID"
              @click="router.push('/student/id')"
            >
              <AppIcon name="badge" :size="24" class="shrink-0 text-[#707070]" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Student ID</span>
            </button>
          </div>

          <div class="flex flex-col gap-5">
            <button
              type="button"
              class="flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center pl-[4px]'"
              aria-label="Settings"
              @click="openStudentSettings"
            >
              <AppIcon name="settings" :size="24" class="shrink-0 text-[#707070]" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Settings</span>
            </button>
            <button
              type="button"
              class="flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(255,84,84,0.08)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center pl-[4px]'"
              aria-label="Logout"
              @click="openLogoutConfirm"
            >
              <AppIcon name="logout" :size="24" class="shrink-0 text-[#707070]" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Logout</span>
            </button>
          </div>
        </aside>

        <main class="min-w-0 flex-1 lg:pl-[28px] lg:pr-[27px] lg:pt-[13px]">
          <section class="min-h-[653px] rounded-[28px] border-2 border-[#2e82ef] bg-white px-4 pb-8 pt-6 sm:px-7 sm:pt-8 lg:rounded-[52px] lg:px-[39px] lg:pb-[36px] lg:pt-[47px]">
            <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 class="text-[32px] leading-none font-bold sm:text-[40px]">My Classes</h1>
                <p class="mt-[8px] text-[18px] leading-tight font-medium sm:text-[20px]">{{ dashboardSubtitle }}</p>
              </div>

              <button type="button" class="mt-[2px] flex h-[72px] w-full max-w-[249px] items-center rounded-[33.5px] bg-[#1188f8] pl-[24px] pr-[18px] sm:h-[78px] sm:pl-[32px] sm:pr-[21px]" @click="openJoinModal">
                <span class="grid h-[42px] w-[46px] place-items-center rounded-full bg-white sm:h-[48px] sm:w-[53px]">
                  <AppIcon name="plus" :size="28" class="text-[#1188f8]" />
                </span>
                <span class="ml-[7px] text-[20px] font-semibold text-white sm:text-[24px]">Join Class</span>
              </button>
            </div>

            <div v-if="isLoading" class="mt-10 text-[18px] font-medium text-[#5d5d5d]">Loading classes...</div>

            <div
              v-else-if="loadError"
              class="mt-10 rounded-[24px] border border-[#f1b5b5] bg-[#fff5f5] px-6 py-8 text-[18px] font-medium text-[#b81717]"
            >
              {{ loadError }}
            </div>

            <div
              v-else-if="classes.length === 0"
              class="mt-10 rounded-[24px] border border-[#d9e8fb] bg-[#fbfdff] px-6 py-8 text-[18px] font-medium text-[#5d5d5d]"
            >
              You have not joined any classes yet.
            </div>

            <div v-else class="mt-[39px] grid grid-cols-1 gap-x-[19px] gap-y-[22px] md:grid-cols-2 xl:flex xl:flex-wrap xl:gap-x-[19px] xl:gap-y-[22px]">
              <article
                v-for="classItem in classes"
                :key="classItem.id"
                class="relative min-h-[292px] w-full cursor-pointer overflow-hidden rounded-[20px] border-2 border-[#bdbdbd] bg-white transition-shadow hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                :style="{ width: classCardWidth(classItem) }"
                @click="openClassroom(classItem.id)"
              >
                <div class="relative mx-[5px] mt-[6px] min-h-[205px] overflow-hidden rounded-[17px]" :style="{ backgroundImage: classItem.gradient }">
                  <div class="absolute inset-x-0 bottom-0 h-[20px]" :style="{ backgroundImage: classItem.gradient }" />
                  <ClassThemeArt :theme-id="classItem.gradientId" variant="card" />

                  <button
                    type="button"
                    class="absolute right-[10px] top-[11px] z-20 grid h-[38px] w-[38px] place-items-center rounded-full bg-black/10 text-white transition hover:bg-black/18"
                    :aria-label="`Open options for ${classItem.subject}`"
                    @click.stop="toggleOptions(classItem.id)"
                  >
                    <AppIcon name="more" :size="22" />
                  </button>

                  <div
                    v-if="openOptionsId === classItem.id"
                    class="absolute right-[10px] top-[42px] z-30 w-[156px] rounded-[14px] border border-[#d8d8d8] bg-white py-2 shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                  >
                    <button
                      type="button"
                      class="block w-full px-4 py-2 text-left text-[14px] font-medium text-[#b81717] hover:bg-[#fff3f3]"
                      @click.stop="handleLeaveClass(classItem.id)"
                    >
                      Leave Class
                    </button>
                  </div>

                  <p class="relative z-10 pl-[16px] pt-[16px] text-[36px] leading-none font-semibold text-white">{{ classItem.subject }}</p>
                  <p class="relative z-10 mt-[10px] pl-[16px] text-[24px] leading-none font-medium text-white">
                    {{ classItem.gradeLevel }} | {{ classItem.classLabel }}
                  </p>
                  <p class="relative z-10 mt-[12px] ml-[15px] inline-flex w-fit rounded-full bg-white/18 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-[1px]">
                    {{ classItem.themeLabel }}
                  </p>
                  <p class="relative z-10 mt-[20px] max-w-[calc(100%-30px)] pr-[74px] pl-[15px] text-[18px] leading-tight font-medium text-white sm:mt-[24px]">
                    {{ classItem.scheduleLabel }} &bull; {{ classItem.time }}
                  </p>
                </div>

                <div class="mt-[10px] px-[10px]">
                  <div class="flex h-[61px] w-full items-start rounded-[11px] bg-[#f6f6f6] px-[10px] py-[9px]">
                    <img :src="classItem.teacherAvatarSrc" alt="" class="h-[40px] w-[38px] shrink-0 rounded-full object-cover" />
                    <div class="ml-[9px] min-w-0">
                      <p class="truncate text-[20px] leading-none font-bold text-black">{{ classItem.teacherName }}</p>
                      <p class="mt-[6px] text-[15px] leading-none font-medium text-black">{{ classItem.teacherRole }}</p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </main>
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

      <AvatarSuggestionModal
        :open="isAvatarPromptOpen"
        title="Pick Your Student Avatar"
        description="Choose the avatar you want your classmates and teacher to see beside your name."
        preview-label="Student avatar preview"
        preview-hint="This will appear on your profile, your class list, and your teacher's class list."
        :preview-src="promptAvatarPreview"
        :options="studentAvatarOptions"
        :selected-key="promptAvatarKey"
        :error="avatarPromptError"
        :saving="isSavingAvatarPrompt"
        @close="dismissAvatarPrompt"
        @later="dismissAvatarPrompt"
        @save="saveAvatarPrompt"
        @update:selected-key="promptAvatarKey = $event"
      />

      <transition name="fade">
        <div
          v-if="isJoinModalOpen"
          class="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(224,224,224,0.44)] px-4 py-8 backdrop-blur-[1px]"
          @click.self="closeJoinModal"
        >
          <div class="w-full max-w-[520px] rounded-[22px] bg-white px-6 py-5 shadow-[0_4px_39.3px_2px_rgba(0,0,0,0.2)]">
            <div class="flex items-start justify-between border-b border-[#d7d7d7] pb-4">
              <div>
                <h2 class="text-[40px] leading-none font-semibold">Join Class</h2>
                <p class="mt-2 text-[20px] font-medium">Enter the class join code below.</p>
              </div>
              <button type="button" class="grid h-10 w-10 place-items-center rounded-full text-[#4a4a4a] transition hover:bg-[#eef4ff] hover:text-[#1188f8]" aria-label="Close modal" @click="closeJoinModal">
                <AppIcon name="x" :size="20" />
              </button>
            </div>

            <form class="space-y-4 pt-5" @submit.prevent="handleJoinClass">
              <label class="block">
                <span class="mb-1 block text-[16px] font-semibold">Join Code</span>
                <input
                  v-model.trim="joinCode"
                  type="text"
                  placeholder="Enter class code"
                  class="h-14 w-full rounded-[15px] border border-black px-4 text-[18px] font-semibold uppercase outline-none placeholder:font-medium placeholder:normal-case placeholder:text-[#777]"
                />
              </label>

              <p v-if="joinError" class="text-sm font-medium text-red-600">{{ joinError }}</p>
              <p v-if="joinSuccess" class="text-sm font-medium text-green-600">{{ joinSuccess }}</p>

              <div class="flex justify-end gap-4 pt-2">
                <button type="button" class="h-[57px] w-[151px] rounded-[33.5px] bg-[#c5c5c5] text-[20px] font-bold" @click="closeJoinModal">
                  Cancel
                </button>
                <button
                  type="submit"
                  class="h-[57px] w-[151px] rounded-[33.5px] bg-[#1188f8] text-[20px] font-bold text-white disabled:opacity-70"
                  :disabled="isJoining"
                >
                  {{ isJoining ? 'Joining...' : 'Join' }}
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '../../components/common/AppIcon.vue'
import ClassThemeArt from '../../components/common/ClassThemeArt.vue'
import ConfirmActionModal from '../../components/common/ConfirmActionModal.vue'
import AvatarSuggestionModal from '../../components/profile/AvatarSuggestionModal.vue'
import { auth } from '../../config/firebase'
import { logoutUser } from '../../services/authService'
import { enrollStudentInClass, findTeacherClassByJoinCode, getStudentClasses, leaveStudentClass, syncStudentProfileAcrossClasses } from '../../services/studentService'
import { getUserById, upsertUserProfile } from '../../services/userService'
import imgStar from '../../assets/icons/recicall-logo.png'
import { decorateClassWithTheme } from '../../utils/classThemes'
import { defaultStudentAvatarKey, resolveStudentAvatar, studentAvatarOptions } from '../../utils/studentAvatarOptions'
import { resolveTeacherAvatar } from '../../utils/teacherAvatarOptions'

const router = useRouter()
const isLoggingOut = ref(false)
const isLogoutConfirmOpen = ref(false)
const isLoading = ref(true)
const isJoinModalOpen = ref(false)
const isJoining = ref(false)
const joinCode = ref('')
const joinError = ref('')
const joinSuccess = ref('')
const loadError = ref('')
const openOptionsId = ref(null)
const isSidebarExpanded = ref(false)
const studentId = ref('')
const studentProfile = ref(null)
const classes = ref([])
const currentDateTime = ref(new Date())
const isAvatarPromptOpen = ref(false)
const isSavingAvatarPrompt = ref(false)
const avatarPromptError = ref('')
const promptAvatarKey = ref(defaultStudentAvatarKey)
let dashboardClockTimer = null

const dashboardGreeting = computed(() => {
  const currentHour = currentDateTime.value.getHours()

  if (currentHour < 12) return 'Good morning'
  if (currentHour < 18) return 'Good afternoon'
  return 'Good evening'
})

const liveDateTimeLabel = computed(() =>
  currentDateTime.value.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }),
)

const dashboardSubtitle = computed(() => `${dashboardGreeting.value} | ${liveDateTimeLabel.value}`)
const studentAvatarSrc = computed(() =>
  resolveStudentAvatar(
    studentProfile.value?.avatarKey,
    studentProfile.value?.photoURL || '',
  ),
)
const promptAvatarPreview = computed(() =>
  resolveStudentAvatar(promptAvatarKey.value, studentProfile.value?.photoURL || ''),
)

const mapClassToCard = (classItem) => {
  const themedClass = decorateClassWithTheme(classItem)

  return {
    ...themedClass,
    teacherName: themedClass.teacherName || 'Maam. Anderson',
    teacherRole: themedClass.teacherRole || 'High School Teacher',
    teacherAvatarSrc: resolveTeacherAvatar(themedClass.teacherAvatarKey, ''),
    width: 400,
  }
}

const classCardWidth = (classItem) => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) return '100%'
  if (typeof window !== 'undefined' && window.innerWidth < 1280) return '100%'
  return `${classItem.width}px`
}

const startDashboardClock = () => {
  currentDateTime.value = new Date()
  dashboardClockTimer = window.setInterval(() => {
    currentDateTime.value = new Date()
  }, 1000)
}

const stopDashboardClock = () => {
  if (!dashboardClockTimer) return

  window.clearInterval(dashboardClockTimer)
  dashboardClockTimer = null
}

const loadStudentClasses = async () => {
  if (!studentId.value) return

  isLoading.value = true
  loadError.value = ''

  try {
    const enrolledClasses = await getStudentClasses(studentId.value)
    classes.value = await Promise.all(
      enrolledClasses.map(async (classItem) => {
        if (!classItem.teacherId) {
          return mapClassToCard(classItem)
        }

        const latestTeacherProfile = await getUserById(classItem.teacherId)

        return mapClassToCard({
          ...classItem,
          teacherName: latestTeacherProfile?.displayName || classItem.teacherName,
          teacherRole:
            latestTeacherProfile?.roleLabel ||
            (latestTeacherProfile?.role === 'teacher' ? 'High School Teacher' : latestTeacherProfile?.role) ||
            classItem.teacherRole,
          teacherAvatarKey: latestTeacherProfile?.avatarKey || classItem.teacherAvatarKey,
          teacherPhotoURL: latestTeacherProfile?.photoURL || classItem.teacherPhotoURL,
        })
      }),
    )

    return true
  } catch (error) {
    console.error(error)
    classes.value = []
    loadError.value = 'We could not load your classes right now. Please refresh and try again.'
    return false
  } finally {
    isLoading.value = false
  }
}

const closeAvatarPrompt = () => {
  isAvatarPromptOpen.value = false
  avatarPromptError.value = ''
}

const dismissAvatarPrompt = async () => {
  if (isSavingAvatarPrompt.value || !studentId.value) return

  isSavingAvatarPrompt.value = true
  avatarPromptError.value = ''

  try {
    await upsertUserProfile(studentId.value, { avatarPromptSeen: true })
    studentProfile.value = {
      ...(studentProfile.value || {}),
      avatarPromptSeen: true,
    }
    closeAvatarPrompt()
  } catch (error) {
    console.error(error)
    avatarPromptError.value = 'Unable to dismiss the avatar suggestion right now.'
  } finally {
    isSavingAvatarPrompt.value = false
  }
}

const saveAvatarPrompt = async () => {
  if (isSavingAvatarPrompt.value || !studentId.value) return

  isSavingAvatarPrompt.value = true
  avatarPromptError.value = ''

  try {
    await upsertUserProfile(studentId.value, {
      avatarKey: promptAvatarKey.value,
      avatarPromptSeen: true,
    })

    const nextProfile = {
      ...(studentProfile.value || {}),
      avatarKey: promptAvatarKey.value,
      avatarPromptSeen: true,
    }

    await syncStudentProfileAcrossClasses(studentId.value, {
      displayName: nextProfile.displayName || auth.currentUser?.displayName || 'Student',
      photoURL: nextProfile.photoURL || '',
      avatarKey: promptAvatarKey.value,
      email: nextProfile.email || auth.currentUser?.email || '',
      gradeLevel: nextProfile.gradeLevel,
      studentNumber: nextProfile.studentNumber,
    })

    studentProfile.value = nextProfile
    closeAvatarPrompt()
  } catch (error) {
    console.error(error)
    avatarPromptError.value = 'Unable to save your avatar right now.'
  } finally {
    isSavingAvatarPrompt.value = false
  }
}

const openJoinModal = () => {
  openOptionsId.value = null
  joinError.value = ''
  joinSuccess.value = ''
  joinCode.value = ''
  isJoinModalOpen.value = true
}

const closeJoinModal = () => {
  isJoinModalOpen.value = false
  joinError.value = ''
  joinSuccess.value = ''
  joinCode.value = ''
}

const toggleOptions = (classId) => {
  openOptionsId.value = openOptionsId.value === classId ? null : classId
}

const handleLeaveClass = async (classId) => {
  try {
    await leaveStudentClass(studentId.value, classId)
    openOptionsId.value = null
    await loadStudentClasses()
  } catch (error) {
    console.error(error)
  }
}

const openClassroom = (classId) => {
  router.push(`/student/class/${classId}`)
}

const openStudentSettings = () => {
  router.push('/student/id')
}

const handleJoinClass = async () => {
  if (isJoining.value) return

  joinError.value = ''
  joinSuccess.value = ''
  isJoining.value = true

  try {
    if (!joinCode.value.trim()) {
      joinError.value = 'Enter a join code first.'
      return
    }

    const matchedClass = await findTeacherClassByJoinCode(joinCode.value)

    if (!matchedClass) {
      joinError.value = 'No active class matches that code.'
      return
    }

    const teacherProfile = await getUserById(matchedClass.teacherId)
    const result = await enrollStudentInClass(studentId.value, {
      id: matchedClass.id,
      teacherId: matchedClass.teacherId,
      teacherName: teacherProfile?.displayName || 'Maam. Anderson',
      teacherRole: 'High School Teacher',
      subject: matchedClass.subject,
      gradeLevel: matchedClass.gradeLevel,
      classLabel: matchedClass.classLabel,
      scheduleLabel: matchedClass.scheduleLabel,
      time: matchedClass.time,
      gradientId: matchedClass.gradientId,
      gradient: matchedClass.gradient,
      joinCode: matchedClass.joinCode,
    }, {
      displayName: studentProfile.value?.displayName || auth.currentUser?.displayName || 'Student',
      photoURL: studentProfile.value?.photoURL || '',
      avatarKey:
        studentProfile.value?.avatarKey ||
        (studentProfile.value?.photoURL ? undefined : defaultStudentAvatarKey),
      email: auth.currentUser?.email || '',
      gradeLevel: studentProfile.value?.gradeLevel,
      studentNumber: studentProfile.value?.studentNumber,
    })

    if (result.alreadyJoined) {
      joinError.value = 'You already joined this class.'
      return
    }

    const didRefreshClasses = await loadStudentClasses()
    joinSuccess.value = didRefreshClasses
      ? 'Class joined successfully.'
      : 'Class joined successfully. Refresh the page if it does not appear right away.'
    setTimeout(() => {
      closeJoinModal()
    }, 700)
  } catch (error) {
    console.error(error)
    const errorMessage = error?.code || error?.message
    joinError.value = errorMessage
      ? `Unable to join the class right now. ${errorMessage}`
      : 'Unable to join the class right now. Please try again.'
  } finally {
    isJoining.value = false
  }
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
  } catch (error) {
    console.error(error)
  } finally {
    isLoggingOut.value = false
    isLogoutConfirmOpen.value = false
  }
}

onMounted(async () => {
  startDashboardClock()

  const user = auth.currentUser
  if (!user) return
  studentId.value = user.uid
  studentProfile.value = await getUserById(user.uid)
  promptAvatarKey.value = studentProfile.value?.avatarKey || defaultStudentAvatarKey
  if (studentProfile.value?.avatarPromptSeen === false) {
    isAvatarPromptOpen.value = true
  }
  await loadStudentClasses()
})

onBeforeUnmount(() => {
  stopDashboardClock()
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
