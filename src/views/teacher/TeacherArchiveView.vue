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
            <img :src="imgRectangle13" alt="" class="block h-full w-full" />
          </button>
          <img :src="imgStar1" alt="" class="ml-4 mt-1 h-[40px] w-[44px] sm:ml-6 sm:mt-2 sm:h-[48px] sm:w-[53px] lg:ml-[31px] lg:mt-[15px] lg:h-[55px] lg:w-[61px]" />
          <p class="ml-3 mt-1 text-[28px] leading-none font-black tracking-[-0.03em] sm:ml-4 sm:mt-2 sm:text-[34px] lg:ml-[22px] lg:mt-[18px] lg:text-[40px]">ReciCall</p>
        </div>

        <button type="button" class="ml-4 flex items-start gap-2 sm:gap-[9px] lg:mr-[34px]" aria-label="Edit profile" @click="openProfileModal">
          <div class="pt-1 text-right sm:pt-2 lg:pt-[18px]">
            <p class="text-[14px] leading-none font-bold sm:text-[16px] lg:text-[20px]">{{ teacherName }}</p>
            <p class="mt-[2px] text-[11px] leading-none font-medium sm:text-[13px] lg:mt-[4px] lg:text-[15px]">{{ teacherRole }}</p>
          </div>
          <img :src="teacherPhoto" alt="" class="h-[52px] w-[52px] rounded-full object-cover sm:h-[62px] sm:w-[62px] lg:h-[78px] lg:w-[78px]" />
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
              <img :src="imgRectangle14" alt="" class="h-[36px] w-[45px] shrink-0" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Classes</span>
            </button>
            <button
              type="button"
              class="flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Predictive analytics"
            >
              <img :src="imgRectangle15" alt="" class="h-[40px] w-[38px] shrink-0" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[15px] font-medium text-[#3a3a3a]">Predictive Analytics</span>
            </button>
            <div
              class="flex h-[63px] w-full items-center rounded-[17px] bg-[rgba(46,130,239,0.25)]"
              :class="isSidebarExpanded ? 'justify-start px-[18px]' : 'justify-center'"
            >
              <img :src="imgRectangle16" alt="" class="h-[40px] w-[38px] shrink-0" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-semibold text-[#174ca0]">Archive</span>
            </div>
          </div>

          <div class="flex flex-col gap-[18px]">
            <button
              type="button"
              class="flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Settings"
            >
              <img :src="imgRectangle18" alt="" class="h-[40px] w-[38px] shrink-0" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Settings</span>
            </button>
            <button
              type="button"
              class="flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(255,84,84,0.08)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Logout"
              @click="handleLogout"
            >
              <img :src="imgRectangle17" alt="" class="h-[40px] w-[38px] shrink-0" />
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
                    <img :src="imgPolygon4" alt="" class="absolute right-[28px] top-[67px] h-[91px] w-[34px]" />
                    <img :src="imgPolygon5" alt="" class="absolute right-[15px] top-[121px] h-[61px] w-[20px]" />
                    <img :src="imgPolygon6" alt="" class="absolute right-[15px] top-[138px] h-[46px] w-[6px]" />
                    <img :src="imgPolygon7" alt="" class="absolute right-[5px] top-[72px] h-[81px] w-[15px]" />
                  </template>
                  <template v-else-if="classItem.gradientId === 'green'">
                    <img :src="imgVector1" alt="" class="absolute right-[-1px] top-[80px] h-[71px] w-[112px]" />
                    <img :src="imgVector2" alt="" class="absolute right-[1px] top-[114px] h-[38px] w-[118px]" />
                    <img :src="imgVector3" alt="" class="absolute right-[59px] top-[117px] h-[35px] w-[71px]" />
                  </template>
                  <template v-else>
                    <img :src="imgGroup9" alt="" class="absolute right-[-30px] top-[66px] h-[133px] w-[160px]" />
                  </template>

                  <button
                    type="button"
                    class="absolute right-[8px] top-[11px] z-20"
                    :aria-label="`Open options for ${classItem.classLabel}`"
                    @click.stop="toggleOptions(classItem.id)"
                  >
                    <img :src="classItem.ellipsisAsset" alt="" class="h-[39px] w-[35px]" />
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
                    {{ classItem.scheduleLabel }} • {{ classItem.time }}
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
            <img :src="imgRectangle14" alt="" class="h-[24px] w-[30px]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Predictive analytics">
            <img :src="imgRectangle15" alt="" class="h-[28px] w-[26px]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center rounded-[12px] bg-[rgba(46,130,239,0.25)]" aria-label="Archive">
            <img :src="imgRectangle16" alt="" class="h-[28px] w-[26px]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Settings">
            <img :src="imgRectangle18" alt="" class="h-[28px] w-[26px]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Logout" @click="handleLogout">
            <img :src="imgRectangle17" alt="" class="h-[28px] w-[26px]" />
          </button>
        </div>
      </div>

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
                <p class="mt-2 text-[20px] font-medium">Update your display name and profile picture.</p>
              </div>
              <button type="button" class="text-[34px] leading-none" aria-label="Close profile modal" @click="closeProfileModal">x</button>
            </div>

            <form class="space-y-4 pt-5" @submit.prevent="saveProfileChanges">
              <div class="flex items-center gap-4">
                <img :src="profilePreviewUrl || teacherPhoto" alt="" class="h-[88px] w-[88px] rounded-full border border-[#d7d7d7] object-cover" />
                <label class="inline-flex h-[48px] cursor-pointer items-center rounded-[24px] bg-[#1188f8] px-5 text-[16px] font-semibold text-white">
                  Upload Photo
                  <input type="file" accept="image/*" class="hidden" @change="handleProfileImageChange" />
                </label>
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
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../../config/firebase'
import { logoutUser, updateCurrentUserAccount } from '../../services/authService'
import {
  getTeacherClasses,
  permanentlyDeleteTeacherClass,
  restoreTeacherClass,
} from '../../services/teacherService'
import { getUserById, upsertUserProfile } from '../../services/userService'

const imgRectangle15 = 'https://www.figma.com/api/mcp/asset/df7b5442-a853-4bd6-bec2-b0a6ba5fb15b'
const imgRectangle16 = 'https://www.figma.com/api/mcp/asset/522713bb-6825-496b-ab34-8e0eabdc4c1e'
const imgRectangle17 = 'https://www.figma.com/api/mcp/asset/baa30f51-4cc3-4864-b3aa-5408485c374e'
const imgRectangle18 = 'https://www.figma.com/api/mcp/asset/2b1b1c20-903a-4546-a524-9824522a11ad'
const imgProfile = 'https://www.figma.com/api/mcp/asset/dfa0d238-70e4-44c2-84ee-3602f12c86e8'
const imgRectangle13 = 'https://www.figma.com/api/mcp/asset/222edfa1-d9d2-4ebf-8ce7-30458f9c9917'
const imgRectangle14 = 'https://www.figma.com/api/mcp/asset/92b4af93-7a63-4ee9-905b-af2e55eefccd'
const imgRectangle39 = 'https://www.figma.com/api/mcp/asset/4fe4b9af-60f8-4513-957b-679facc7dc51'
const imgRectangle25 = 'https://www.figma.com/api/mcp/asset/895af646-bc7f-425a-8c59-8482fe1aefad'
const imgRectangle26 = 'https://www.figma.com/api/mcp/asset/56f13170-2366-4af1-b31d-9d54661462bd'
const imgStar1 = 'https://www.figma.com/api/mcp/asset/048facac-2585-4879-9736-a9225fbd7404'
const imgPolygon4 = 'https://www.figma.com/api/mcp/asset/19c7b1ca-b4bb-4061-b21b-07239b5ea14e'
const imgPolygon5 = 'https://www.figma.com/api/mcp/asset/dc5f99b5-f878-4528-a61e-4a07c7c0f7ec'
const imgPolygon6 = 'https://www.figma.com/api/mcp/asset/a2b6e496-d96c-4e62-9d8b-a48447a1cf52'
const imgPolygon7 = 'https://www.figma.com/api/mcp/asset/3e8b338c-f9b2-420c-afaf-603b456d1afe'
const imgVector1 = 'https://www.figma.com/api/mcp/asset/dee16b01-b5f8-4529-b523-e84c3cc100fa'
const imgVector2 = 'https://www.figma.com/api/mcp/asset/d88a3308-7632-4b61-947d-d6fab4ee370d'
const imgVector3 = 'https://www.figma.com/api/mcp/asset/5a866683-4a62-4558-be89-3e05ee8958d4'
const imgGroup9 = 'https://www.figma.com/api/mcp/asset/3e5b546e-9946-4ce2-8abe-39392c4ec512'

const router = useRouter()

const gradientConfig = {
  blue: {
    gradient: 'linear-gradient(90deg, rgb(37, 122, 255) 0%, rgb(36, 118, 247) 44.712%, rgb(29, 96, 201) 90.385%, rgb(22, 73, 153) 100%)',
    ellipsisAsset: imgRectangle25,
  },
  green: {
    gradient: 'linear-gradient(90deg, rgb(29, 201, 49) 0%, rgb(6, 196, 28) 15.865%, rgb(89, 234, 99) 87.019%, rgb(85, 232, 96) 92.308%)',
    ellipsisAsset: imgRectangle26,
  },
  yellow: {
    gradient: 'linear-gradient(90deg, rgb(228, 206, 40) 0%, rgb(253, 228, 66) 36.058%, rgb(255, 238, 47) 76.442%, rgb(237, 211, 42) 100%)',
    ellipsisAsset: imgRectangle26,
  },
}

const teacherName = ref('Maam. Anderson')
const teacherRole = ref('High School Teacher')
const teacherPhoto = ref(imgProfile)
const isLoading = ref(true)
const isLoggingOut = ref(false)
const isSidebarExpanded = ref(false)
const isProfileModalOpen = ref(false)
const isSavingProfile = ref(false)
const profileError = ref('')
const profileSuccess = ref('')
const profileName = ref('')
const profilePhotoFile = ref(null)
const profilePreviewUrl = ref('')
const openOptionsId = ref(null)
const teacherId = ref('')
const classes = ref([])

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
    ellipsisAsset: config.ellipsisAsset,
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

const toggleOptions = (classId) => {
  openOptionsId.value = openOptionsId.value === classId ? null : classId
}

const openProfileModal = () => {
  profileError.value = ''
  profileSuccess.value = ''
  profileName.value = teacherName.value
  profilePhotoFile.value = null
  profilePreviewUrl.value = ''
  isProfileModalOpen.value = true
}

const closeProfileModal = () => {
  isProfileModalOpen.value = false
  profileError.value = ''
  profileSuccess.value = ''
  profilePhotoFile.value = null
  profilePreviewUrl.value = ''
}

const handleProfileImageChange = (event) => {
  const [file] = event.target.files || []
  if (!file) return

  profilePhotoFile.value = file
  profilePreviewUrl.value = URL.createObjectURL(file)
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
      photoFile: profilePhotoFile.value,
    })

    await upsertUserProfile(teacherId.value, {
      displayName: updatedProfile.displayName,
      photoURL: updatedProfile.photoURL,
    })

    teacherName.value = updatedProfile.displayName || teacherName.value
    teacherPhoto.value = updatedProfile.photoURL || imgProfile
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
  if (profile?.photoURL) teacherPhoto.value = profile.photoURL
  else if (user.photoURL) teacherPhoto.value = user.photoURL
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
