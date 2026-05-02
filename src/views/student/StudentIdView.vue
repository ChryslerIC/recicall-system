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
          <p
            class="ml-3 mt-1 text-[28px] leading-none font-black tracking-[-0.03em] sm:ml-4 sm:mt-2 sm:text-[34px] lg:ml-[22px] lg:mt-[18px] lg:text-[40px]"
          >
            ReciCall
          </p>
        </div>

        <div class="ml-4 flex items-start gap-4 sm:gap-5 lg:mr-[34px] lg:gap-[24px]">
          <button type="button" class="mt-1 sm:mt-2 lg:mt-[18px]" aria-label="Notifications">
            <img
              :src="imgBell"
              alt=""
              class="block h-[52px] w-[40px] object-contain sm:h-[56px] sm:w-[44px] lg:h-[55px] lg:w-[70px]"
            />
          </button>
          <button type="button" class="mt-0 sm:mt-1 lg:mt-[12px]" aria-label="Profile" @click="openEditModal">
            <img
              :src="studentAvatarSrc"
              alt=""
              class="h-[48px] w-[49px] rounded-full object-cover sm:h-[56px] sm:w-[57px] lg:h-[63px] lg:w-[64px]"
            />
          </button>
        </div>
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
              aria-label="Dashboard"
              @click="router.push('/student')"
            >
              <img :src="imgRectangle14" alt="" class="h-[36px] w-[45px] shrink-0" :style="inactiveNavIconStyle" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Classes</span>
            </button>
            <div
              class="flex h-[63px] w-full items-center rounded-[17px] bg-[rgba(46,130,239,0.25)]"
              :class="isSidebarExpanded ? 'justify-start px-[18px]' : 'justify-center'"
            >
              <img :src="imgRectangle77Active" alt="" class="h-[54px] w-[42px] shrink-0" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-semibold text-[#174ca0]">Student ID</span>
            </div>
          </div>

          <div class="flex flex-col gap-[18px]">
            <button
              type="button"
              class="flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Settings"
              @click="openEditModal"
            >
              <img :src="imgRectangle18" alt="" class="h-[40px] w-[38px] shrink-0" :style="inactiveNavIconStyle" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Settings</span>
            </button>
            <button
              type="button"
              class="flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(255,84,84,0.08)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Logout"
              @click="handleLogout"
            >
              <img :src="imgRectangle17" alt="" class="h-[40px] w-[38px] shrink-0" :style="inactiveNavIconStyle" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Logout</span>
            </button>
          </div>
        </aside>

        <main class="min-w-0 flex-1 lg:pl-[28px] lg:pr-[27px] lg:pt-[13px]">
          <section
            class="min-h-[653px] rounded-[28px] border-2 border-[#2e82ef] bg-white px-4 pb-8 pt-6 sm:px-7 sm:pt-8 lg:rounded-[52px] lg:px-[39px] lg:pb-[36px] lg:pt-[47px]"
          >
            <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 class="text-[32px] leading-none font-bold sm:text-[40px]">Your Id</h1>
              </div>

              <button
                type="button"
                style="
                  margin-top: 6px;
                  width: min(100%, 116px);
                  height: 42px;
                  border-radius: 20px;
                  background: #1188f8;
                  display: flex;
                  align-items: center;
                  padding-left: 14px;
                  padding-right: 14px;
                  box-sizing: border-box;
                "
              >
                <span class="block h-[24px] w-[24px] shrink-0 bg-white" :style="saveMaskStyle" />
                <span
                  style="
                    margin-left: 7px;
                    font-size: 13px;
                    font-weight: 600;
                    color: white;
                    line-height: 1;
                  "
                  >Save Id</span
                >
              </button>
            </div>

            <div class="mt-[34px] hidden sm:flex sm:justify-center">
              <div class="mx-auto flex w-full max-w-[860px] flex-col items-center">
                <div
                  class="relative overflow-hidden border-2 border-black"
                  style="
                    width: 640px;
                    height: 365px;
                    max-width: 100%;
                    border-radius: 36px;
                    background: linear-gradient(135deg, #dce8fb 0%, #c7d9f8 46%, #2e82ef 100%);
                  "
                >
                  <div
                    style="
                      position: absolute;
                      left: 30px;
                      top: 24px;
                      display: flex;
                      align-items: center;
                      gap: 12px;
                    "
                  >
                    <svg
                      viewBox="0 0 52 47"
                      aria-hidden="true"
                      style="width: 40px; height: 36px; display: block"
                    >
                      <path
                        d="M26 0L31.5 17.5L52 23.5L31.5 29.5L26 47L20.5 29.5L0 23.5L20.5 17.5L26 0Z"
                        fill="#1f88f5"
                      />
                    </svg>
                    <p style="margin: 0; font-size: 20px; font-weight: 700; line-height: 1">
                      ReciCall
                    </p>
                  </div>

                  <img
                    :src="studentAvatarSrc"
                    alt=""
                    style="
                      position: absolute;
                      left: 86px;
                      top: 98px;
                      width: 108px;
                      height: 108px;
                      display: block;
                      border-radius: 9999px;
                      object-fit: cover;
                    "
                  />

                  <div
                    style="
                      position: absolute;
                      right: 26px;
                      top: 18px;
                      width: 282px;
                      height: 282px;
                      background: white;
                      padding: 14px;
                      box-sizing: border-box;
                    "
                  >
                    <img
                      :src="qrImageUrl"
                      alt="Student QR Code"
                      style="width: 100%; height: 100%; object-fit: contain; display: block"
                    />
                  </div>

                  <div style="position: absolute; left: 42px; top: 228px">
                    <p style="margin: 0; font-size: 15px; font-weight: 500; line-height: 1">
                      Last Name:
                    </p>
                    <p style="margin: 6px 0 0; font-size: 24px; font-weight: 700; line-height: 1.05">
                      {{ lastNameValue }}
                    </p>
                  </div>

                  <div style="position: absolute; left: 42px; top: 286px; width: 255px">
                    <p style="margin: 0; font-size: 15px; font-weight: 500; line-height: 1">
                      First Name:
                    </p>
                    <p style="margin: 6px 0 0; font-size: 24px; font-weight: 700; line-height: 1.05">
                      {{ firstNameValue }}
                    </p>
                  </div>

                  <p
                    style="
                      position: absolute;
                      left: 346px;
                      bottom: 18px;
                      margin: 0;
                      font-size: 16px;
                      font-weight: 700;
                      line-height: 1;
                    "
                  >
                    ID NUMBER: {{ studentNumber }}
                  </p>
                </div>

                <div class="mt-[24px] flex justify-center">
                  <button
                    type="button"
                    style="
                      width: 262px;
                      height: 58px;
                      border-radius: 24px;
                      background: #1188f8;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      gap: 12px;
                    "
                    @click="openEditModal"
                  >
                    <img :src="imgEdit" alt="" style="width: 30px; height: 30px; display: block" />
                    <span style="font-size: 19px; font-weight: 700; color: white; line-height: 1"
                      >Edit Id</span
                    >
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-10 sm:hidden">
              <div class="mx-auto w-full max-w-[360px] overflow-hidden rounded-[34px] border-2 border-black bg-[linear-gradient(135deg,#dce8fb_0%,#c7d9f8_46%,#2e82ef_100%)] px-3 py-4">
                <div class="flex items-center gap-2">
                  <svg viewBox="0 0 52 47" aria-hidden="true" class="h-[26px] w-[28px] shrink-0">
                    <path
                      d="M26 0L31.5 17.5L52 23.5L31.5 29.5L26 47L20.5 29.5L0 23.5L20.5 17.5L26 0Z"
                      fill="#1f88f5"
                    />
                  </svg>
                  <p class="text-[16px] leading-none font-bold">ReciCall</p>
                </div>

                <div class="mt-4 grid grid-cols-[minmax(0,1fr)_136px] gap-3">
                  <div class="min-w-0">
                    <img :src="studentAvatarSrc" alt="" class="mx-auto h-[64px] w-[64px] rounded-full object-cover" />

                    <div class="mt-4">
                      <p class="text-[12px] leading-none font-medium">Last Name:</p>
                      <p class="mt-1 break-words text-[13px] leading-tight font-bold">{{ lastNameValue }}</p>
                    </div>

                    <div class="mt-4">
                      <p class="text-[12px] leading-none font-medium">First Name:</p>
                      <p class="mt-1 break-words text-[13px] leading-tight font-bold">{{ firstNameValue }}</p>
                    </div>
                  </div>

                  <div class="min-w-0">
                    <div class="bg-white p-2">
                      <img :src="qrImageUrl" alt="Student QR Code" class="block h-full w-full object-contain" />
                    </div>
                    <p class="mt-2 text-[11px] leading-tight font-bold">
                      ID NUMBER:<br />{{ studentNumber }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 flex justify-center sm:hidden">
              <button
                type="button"
                style="
                  width: min(100%, 188px);
                  height: 42px;
                  border-radius: 18px;
                  background: #1188f8;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 7px;
                "
                @click="openEditModal"
              >
                <img :src="imgEdit" alt="" style="width: 22px; height: 22px; display: block" />
                <span style="font-size: 16px; font-weight: 700; color: white; line-height: 1"
                  >Edit Id</span
                >
              </button>
            </div>
          </section>
        </main>
      </div>

      <div class="px-4 pb-6 sm:px-6 lg:hidden">
        <div
          class="flex items-center justify-center gap-8 rounded-[20px] border border-[#d9e8fb] bg-white px-4 py-3 shadow-[0_4px_18px_rgba(0,0,0,0.04)]"
        >
          <button
            type="button"
            class="grid h-10 w-10 place-items-center"
            aria-label="Dashboard"
            @click="router.push('/student')"
          >
            <img :src="imgRectangle14" alt="" class="h-[24px] w-[30px]" :style="inactiveNavIconStyle" />
          </button>
          <button
            type="button"
            class="grid h-10 w-10 place-items-center rounded-[12px] bg-[rgba(46,130,239,0.25)]"
            aria-label="Student ID"
          >
            <img :src="imgRectangle77Active" alt="" class="h-[26px] w-[20px]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Settings" @click="openEditModal">
            <img :src="imgRectangle18" alt="" class="h-[24px] w-[24px]" :style="inactiveNavIconStyle" />
          </button>
          <button
            type="button"
            class="grid h-10 w-10 place-items-center"
            aria-label="Logout"
            @click="handleLogout"
          >
            <img :src="imgRectangle17" alt="" class="h-[24px] w-[24px]" :style="inactiveNavIconStyle" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="isEditModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.35)] px-4"
  >
    <div class="w-full max-w-[460px] rounded-[28px] bg-white px-6 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-[34px] leading-none font-bold">Edit Id</h2>
          <p class="mt-3 text-[16px] leading-[1.35] text-[#444]">
            Update your full name and choose a student avatar. Name changes are limited to
            {{ maxNameChanges }} for the lifetime of the account.
          </p>
        </div>

        <button
          type="button"
          class="text-[26px] leading-none"
          aria-label="Close"
          @click="closeEditModal"
        >
          x
        </button>
      </div>

      <div class="mt-6">
        <label class="text-[16px] font-medium" for="student-id-name">Full Name</label>
        <input
          id="student-id-name"
          v-model="editNameValue"
          type="text"
          class="mt-3 w-full rounded-[16px] border-2 border-black px-4 py-3 text-[20px] outline-none"
          :disabled="isSavingName || !canEditName"
          maxlength="60"
        />
        <p class="mt-3 text-[14px] text-[#666]">
          Remaining lifetime changes: {{ remainingNameChanges }}
        </p>
      </div>

      <div class="mt-6">
        <div class="flex items-center justify-between gap-4">
          <p class="text-[16px] font-medium">Student Avatar</p>
          <img :src="editAvatarPreview" alt="" class="h-[56px] w-[56px] rounded-full border border-[#d7d7d7] object-cover" />
        </div>
        <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          <button
            v-for="avatar in studentAvatarOptions"
            :key="avatar.key"
            type="button"
            class="rounded-[18px] border px-3 py-3 text-center transition"
            :class="editAvatarKey === avatar.key ? 'border-[#1188f8] bg-[#eef6ff] shadow-[0_0_0_2px_rgba(17,136,248,0.12)]' : 'border-[#d7d7d7] bg-[#fafafa] hover:border-[#1188f8]'"
            :disabled="isSavingName"
            @click="editAvatarKey = avatar.key"
          >
            <img :src="avatar.src" :alt="avatar.label" class="mx-auto h-[70px] w-[70px] rounded-full object-cover" />
            <p class="mt-3 text-[13px] font-semibold text-black">{{ avatar.label }}</p>
          </button>
        </div>
        <p class="mt-3 text-[14px] text-[#666]">
          Your selected avatar will appear on your ID, your class list, and your teacher's class
          list.
        </p>
        <p v-if="editError" class="mt-3 text-[15px] font-medium text-red-600">
          {{ editError }}
        </p>
      </div>

      <div class="mt-8 flex justify-end gap-4">
        <button
          type="button"
          class="h-[52px] min-w-[130px] rounded-[22px] bg-[#d9d9d9] px-6 text-[18px] font-semibold"
          :disabled="isSavingName"
          @click="closeEditModal"
        >
          Cancel
        </button>
        <button
          type="button"
          class="h-[52px] min-w-[148px] rounded-[22px] bg-[#1188f8] px-6 text-[18px] font-semibold text-white disabled:opacity-60"
          :disabled="isSavingName || !hasProfileChanges"
          @click="saveProfileChanges"
        >
          {{ isSavingName ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../../config/firebase'
import { logoutUser, updateCurrentUserAccount } from '../../services/authService'
import { syncStudentProfileAcrossClasses } from '../../services/studentService'
import { getUserById, upsertUserProfile } from '../../services/userService'
import imgRectangle17 from '../../assets/icons/recicall-logout.svg'
import imgRectangle18 from '../../assets/icons/recicall-settings.svg'
import imgRectangle14 from '../../assets/icons/recicall-classes.svg'
import imgRectangle77Active from '../../assets/icons/recicall-student-id-active.svg'
import imgMenu from '../../assets/icons/recicall-menu.svg'
import imgStar from '../../assets/icons/recicall-logo.png'
import imgBell from '../../assets/icons/notification-bell-svgrepo-com.svg'
import { inactiveNavIconStyle } from '../../utils/navIconStyles'
import {
  defaultStudentAvatarKey,
  resolveStudentAvatar,
  studentAvatarOptions,
} from '../../utils/studentAvatarOptions'

const svgDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`
const imgRectangle78 = svgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <path d="M12 4v11" stroke="black" stroke-width="2.3" stroke-linecap="round"/>
    <path d="m7.5 11.5 4.5 4.5 4.5-4.5" stroke="black" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 20h14" stroke="black" stroke-width="2.3" stroke-linecap="round"/>
  </svg>
`)
const imgEdit = svgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
    <path d="M7 25h5l12-12-5-5L7 20v5Z" stroke="white" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="m17 8 5 5" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M6 27h20" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  </svg>
`)
const router = useRouter()
const isLoggingOut = ref(false)
const displayName = ref('Alonso Von Leopard')
const studentNumber = ref('20232023')
const studentUid = ref('')
const studentProfileRecord = ref(null)
const isSidebarExpanded = ref(false)
const isEditModalOpen = ref(false)
const editNameValue = ref('')
const editAvatarKey = ref(defaultStudentAvatarKey)
const editError = ref('')
const isSavingName = ref(false)
const nameChangeCount = ref(0)
const avatarKey = ref(defaultStudentAvatarKey)
const maxNameChanges = 2

const saveMaskStyle = {
  maskImage: `url('${imgRectangle78}')`,
  WebkitMaskImage: `url('${imgRectangle78}')`,
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
}

const nameParts = computed(() => displayName.value.trim().split(/\s+/).filter(Boolean))
const firstNameValue = computed(() => {
  if (nameParts.value.length <= 1) return displayName.value
  return nameParts.value.slice(0, -1).join(' ')
})
const lastNameValue = computed(() => {
  if (nameParts.value.length <= 1) return displayName.value
  return nameParts.value.at(-1)
})
const remainingNameChanges = computed(() => Math.max(0, maxNameChanges - nameChangeCount.value))
const canEditName = computed(() => remainingNameChanges.value > 0)
const normalizedEditName = computed(() => editNameValue.value.trim().replace(/\s+/g, ' '))
const fallbackStudentPhotoURL = computed(() => studentProfileRecord.value?.photoURL || '')
const studentAvatarSrc = computed(() =>
  resolveStudentAvatar(avatarKey.value, fallbackStudentPhotoURL.value),
)
const editAvatarPreview = computed(() =>
  resolveStudentAvatar(editAvatarKey.value, fallbackStudentPhotoURL.value),
)
const hasProfileChanges = computed(
  () => normalizedEditName.value !== displayName.value || editAvatarKey.value !== avatarKey.value,
)

const qrPayload = computed(() =>
  JSON.stringify({
    type: 'student-id',
    uid: studentUid.value,
    studentNumber: studentNumber.value,
    name: displayName.value,
    avatarKey: avatarKey.value,
  }),
)

const qrImageUrl = computed(
  () =>
    `https://api.qrserver.com/v1/create-qr-code/?size=244x244&data=${encodeURIComponent(qrPayload.value)}`,
)

const generateStudentNumber = (uid) => {
  const digits = uid.replace(/\D/g, '')
  if (digits.length >= 8) return digits.slice(0, 8)

  let hash = 0
  for (const char of uid) {
    hash = (hash * 31 + char.charCodeAt(0)) % 100000000
  }

  return String(hash).padStart(8, '0')
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
  }
}

const openEditModal = () => {
  editNameValue.value = displayName.value
  editAvatarKey.value = avatarKey.value
  editError.value = canEditName.value
    ? ''
    : `You have already used all ${maxNameChanges} lifetime name changes, but you can still change your avatar.`
  isEditModalOpen.value = true
}

const closeEditModal = (force = false) => {
  if (isSavingName.value && !force) return
  isEditModalOpen.value = false
  editError.value = ''
}

const saveProfileChanges = async () => {
  if (isSavingName.value) return

  const trimmedName = normalizedEditName.value
  const nameWasChanged = trimmedName !== displayName.value
  const avatarWasChanged = editAvatarKey.value !== avatarKey.value

  if (!trimmedName) {
    editError.value = 'Please enter your full name.'
    return
  }

  if (nameWasChanged && !canEditName.value) {
    editError.value = `You have already used all ${maxNameChanges} lifetime name changes.`
    return
  }

  if (!nameWasChanged && !avatarWasChanged) {
    closeEditModal(true)
    return
  }

  isSavingName.value = true
  editError.value = ''

  try {
    const nextAvatarKey = editAvatarKey.value || (fallbackStudentPhotoURL.value ? '' : defaultStudentAvatarKey)
    let updatedCount = nameChangeCount.value

    if (nameWasChanged) {
      updatedCount += 1
      await updateCurrentUserAccount({
        displayName: trimmedName,
        photoURL: fallbackStudentPhotoURL.value,
      })
    }

    await upsertUserProfile(studentUid.value, {
      avatarKey: nextAvatarKey,
      avatarPromptSeen: true,
      ...(nameWasChanged
        ? {
            displayName: trimmedName,
            nameChangeCount: updatedCount,
          }
        : {}),
    })

    await syncStudentProfileAcrossClasses(studentUid.value, {
      displayName: nameWasChanged ? trimmedName : displayName.value,
      avatarKey: nextAvatarKey,
      photoURL: fallbackStudentPhotoURL.value || undefined,
      email: studentProfileRecord.value?.email || auth.currentUser?.email || undefined,
      gradeLevel: studentProfileRecord.value?.gradeLevel,
      studentNumber: studentNumber.value,
    })

    displayName.value = nameWasChanged ? trimmedName : displayName.value
    avatarKey.value = nextAvatarKey
    nameChangeCount.value = updatedCount
    studentProfileRecord.value = {
      ...(studentProfileRecord.value || {}),
      displayName: nameWasChanged ? trimmedName : displayName.value,
      avatarKey: nextAvatarKey,
      nameChangeCount: updatedCount,
      photoURL: fallbackStudentPhotoURL.value,
    }
    closeEditModal()
  } catch (error) {
    editError.value = error?.message || 'Unable to update your profile right now.'
  } finally {
    isSavingName.value = false
  }
}

onMounted(async () => {
  const user = auth.currentUser
  if (!user) return

  studentUid.value = user.uid

  const profile = await getUserById(user.uid)
  studentProfileRecord.value = {
    ...(profile || {}),
    photoURL: profile?.photoURL || '',
  }
  if (profile?.displayName) displayName.value = profile.displayName
  else if (user.displayName) displayName.value = user.displayName
  nameChangeCount.value = Number(profile?.nameChangeCount || 0)

  const resolvedAvatarKey = profile?.avatarKey || (profile?.photoURL ? '' : defaultStudentAvatarKey)
  avatarKey.value = resolvedAvatarKey

  const resolvedStudentNumber =
    profile?.studentNumber || profile?.idNumber || generateStudentNumber(user.uid)
  studentNumber.value = resolvedStudentNumber

  if (!profile?.studentNumber) {
    await upsertUserProfile(user.uid, { studentNumber: resolvedStudentNumber })
  }

  if (!profile?.avatarKey && !profile?.photoURL) {
    await upsertUserProfile(user.uid, { avatarKey: defaultStudentAvatarKey })
    studentProfileRecord.value = {
      ...(studentProfileRecord.value || {}),
      avatarKey: defaultStudentAvatarKey,
    }
  }
})
</script>
