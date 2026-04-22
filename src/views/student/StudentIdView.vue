<template>
  <div class="min-h-screen bg-[#f6f6f6] font-sans text-black">
    <div class="w-full">
      <header class="flex items-start justify-between px-4 pt-4 sm:px-6 lg:px-[30px] lg:pt-[13px]">
        <div class="flex items-start">
          <button
            type="button"
            class="mt-2 h-[32px] w-[34px] sm:mt-4 sm:h-[36px] sm:w-[38px] lg:mt-[22px] lg:h-[41px] lg:w-[43px]"
            aria-label="Menu"
          >
            <img :src="imgRectangle13" alt="" class="block h-full w-full" />
          </button>

          <img
            :src="imgStar1"
            alt=""
            class="ml-4 mt-1 h-[40px] w-[44px] sm:ml-6 sm:mt-2 sm:h-[48px] sm:w-[53px] lg:ml-[31px] lg:mt-[15px] lg:h-[55px] lg:w-[61px]"
          />
          <p
            class="ml-3 mt-1 text-[28px] leading-none font-black tracking-[-0.03em] sm:ml-4 sm:mt-2 sm:text-[34px] lg:ml-[22px] lg:mt-[18px] lg:text-[40px]"
          >
            ReciCall
          </p>
        </div>

        <div class="ml-4 flex items-start gap-4 sm:gap-5 lg:mr-[34px] lg:gap-[24px]">
          <button type="button" class="mt-1 sm:mt-2 lg:mt-[18px]" aria-label="Notifications">
            <span
              class="block bg-black h-[52px] w-[40px] sm:h-[56px] sm:w-[44px] lg:h-[55px] lg:w-[70px]"
              :style="bellMaskStyle"
            />
          </button>
          <button type="button" class="mt-0 sm:mt-1 lg:mt-[12px]" aria-label="Profile">
            <img
              :src="imgProfile"
              alt=""
              class="h-[48px] w-[49px] sm:h-[56px] sm:w-[57px] lg:h-[63px] lg:w-[64px]"
            />
          </button>
        </div>
      </header>

      <div class="flex gap-4 px-4 pb-4 pt-2 sm:px-6 lg:gap-0 lg:px-0">
        <aside
          class="hidden w-[72px] shrink-0 flex-col justify-between pb-[40px] pt-[77px] lg:ml-[7px] lg:flex lg:h-[650px]"
        >
          <div class="flex flex-col items-center gap-[24px]">
            <button
              type="button"
              class="grid h-[63px] w-[80px] place-items-center rounded-[17px]"
              aria-label="Dashboard"
              @click="router.push('/student')"
            >
              <img :src="imgRectangle14" alt="" class="h-[36px] w-[45px]" />
            </button>
            <div
              class="grid h-[63px] w-[80px] place-items-center rounded-[17px] bg-[rgba(46,130,239,0.25)]"
            >
              <img :src="imgRectangle77" alt="" class="h-[54px] w-[42px]" />
            </div>
          </div>

          <div class="flex flex-col items-center gap-[28px]">
            <button
              type="button"
              class="grid h-[40px] w-[38px] place-items-center"
              aria-label="Settings"
            >
              <img :src="imgRectangle18" alt="" class="h-[40px] w-[38px]" />
            </button>
            <button
              type="button"
              class="grid h-[40px] w-[38px] place-items-center"
              aria-label="Logout"
              @click="handleLogout"
            >
              <img :src="imgRectangle17" alt="" class="h-[40px] w-[38px]" />
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

            <div class="mt-[28px] hidden sm:flex sm:justify-center">
              <div style="width: min(100%, 580px)">
                <div
                  class="relative overflow-hidden border-2 border-black"
                  style="
                    width: 100%;
                    aspect-ratio: 580 / 330;
                    min-height: 0;
                    border-radius: 36px;
                    background: linear-gradient(135deg, #dce8fb 0%, #c7d9f8 46%, #2e82ef 100%);
                  "
                >
                  <div
                    style="
                      position: absolute;
                      left: 30px;
                      top: 22px;
                      display: flex;
                      align-items: center;
                      gap: 10px;
                    "
                  >
                    <svg
                      viewBox="0 0 52 47"
                      aria-hidden="true"
                      style="width: 38px; height: 34px; display: block"
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
                    :src="imgProfile"
                    alt=""
                    style="
                      position: absolute;
                      left: 80px;
                      top: 84px;
                      width: 92px;
                      height: 92px;
                      display: block;
                    "
                  />

                  <div
                    style="
                      position: absolute;
                      right: 18px;
                      top: 18px;
                      width: 280px;
                      height: 280px;
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

                <div style="position: absolute; left: 34px; top: 206px">
                  <p style="margin: 0; font-size: 14px; font-weight: 500; line-height: 1">
                    Last Name:
                  </p>
                  <p style="margin: 5px 0 0; font-size: 22px; font-weight: 700; line-height: 1">
                    {{ lastNameValue }}
                  </p>
                </div>

                <div style="position: absolute; left: 34px; top: 258px; width: 215px">
                    <p style="margin: 0; font-size: 14px; font-weight: 500; line-height: 1">
                      First Name:
                    </p>
                    <p style="margin: 5px 0 0; font-size: 22px; font-weight: 700; line-height: 1">
                      {{ firstNameValue }}
                    </p>
                  </div>

                  <p
                    style="
                      position: absolute;
                      left: 304px;
                      bottom: 12px;
                      margin: 0;
                      font-size: 14px;
                      font-weight: 700;
                      line-height: 1;
                    "
                  >
                    ID NUMBER: {{ studentNumber }}
                  </p>
                </div>

                <div class="mt-[22px] flex justify-center">
                  <button
                    type="button"
                    style="
                      width: 260px;
                      height: 56px;
                      border-radius: 22px;
                      background: #1188f8;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      gap: 10px;
                    "
                    @click="openEditModal"
                  >
                    <img :src="imgEdit" alt="" style="width: 28px; height: 28px; display: block" />
                    <span style="font-size: 18px; font-weight: 700; color: white; line-height: 1"
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
                    <img :src="imgProfile" alt="" class="mx-auto h-[64px] w-[64px]" />

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
            <img :src="imgRectangle14" alt="" class="h-[24px] w-[30px]" />
          </button>
          <button
            type="button"
            class="grid h-10 w-10 place-items-center rounded-[12px] bg-[rgba(46,130,239,0.25)]"
            aria-label="Student ID"
          >
            <img :src="imgRectangle77" alt="" class="h-[26px] w-[20px]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Settings">
            <img :src="imgRectangle18" alt="" class="h-[24px] w-[24px]" />
          </button>
          <button
            type="button"
            class="grid h-10 w-10 place-items-center"
            aria-label="Logout"
            @click="handleLogout"
          >
            <img :src="imgRectangle17" alt="" class="h-[24px] w-[24px]" />
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
            Update your full name. You can only change it {{ maxNameChanges }} times for the
            lifetime of the account.
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
          :disabled="isSavingName || !canEditName"
          @click="saveEditedName"
        >
          {{ isSavingName ? 'Saving...' : 'Save Name' }}
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
import { getUserById, upsertUserProfile } from '../../services/userService'

const imgRectangle78 = 'https://www.figma.com/api/mcp/asset/e06cd03c-6e12-475e-bbfa-6652282c34a0'
const imgRectangle17 = 'https://www.figma.com/api/mcp/asset/f30591fd-2b24-4f0b-9995-7c6b88d508e4'
const imgRectangle18 = 'https://www.figma.com/api/mcp/asset/f0552249-70c6-4e14-a368-563fb15fbf47'
const imgProfile = 'https://www.figma.com/api/mcp/asset/f7c3191e-3fe4-4332-bd80-a319047d8deb'
const imgRectangle13 = 'https://www.figma.com/api/mcp/asset/30b5db25-2720-4c67-9e3c-cc40ea7446e1'
const imgRectangle14 = 'https://www.figma.com/api/mcp/asset/e72e4ab8-67ab-44f3-8ed9-eac63e9040af'
const imgRectangle76 = 'https://www.figma.com/api/mcp/asset/741d405f-a8cc-48ed-b1e2-a2c228a7eca6'
const imgRectangle77 = 'https://www.figma.com/api/mcp/asset/212a2ad1-63cb-40b2-8fd2-dc6e85dabcb0'
const imgEdit = 'https://www.figma.com/api/mcp/asset/40aaf0a1-77fd-4c45-a658-80bfd5c9c4c1'
const imgStar1 = 'https://www.figma.com/api/mcp/asset/7f2ca16a-b819-4ee1-993c-061bf5e4c00b'
const imgStar2 = 'https://www.figma.com/api/mcp/asset/87138530-9fed-4b40-8a5e-c7e0de17cc0e'

const router = useRouter()
const isLoggingOut = ref(false)
const displayName = ref('Alonso Von Leopard')
const studentNumber = ref('20232023')
const studentUid = ref('')
const isEditModalOpen = ref(false)
const editNameValue = ref('')
const editError = ref('')
const isSavingName = ref(false)
const nameChangeCount = ref(0)
const maxNameChanges = 2

const bellMaskStyle = {
  maskImage: `url('${imgRectangle76}')`,
  WebkitMaskImage: `url('${imgRectangle76}')`,
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
}

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

const qrPayload = computed(() =>
  JSON.stringify({
    type: 'student-id',
    uid: studentUid.value,
    studentNumber: studentNumber.value,
    name: displayName.value,
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
  editError.value = canEditName.value
    ? ''
    : `You have already used all ${maxNameChanges} lifetime name changes.`
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  if (isSavingName.value) return
  isEditModalOpen.value = false
  editError.value = ''
}

const saveEditedName = async () => {
  if (isSavingName.value) return

  const trimmedName = editNameValue.value.trim().replace(/\s+/g, ' ')

  if (!canEditName.value) {
    editError.value = `You have already used all ${maxNameChanges} lifetime name changes.`
    return
  }

  if (!trimmedName) {
    editError.value = 'Please enter your full name.'
    return
  }

  if (trimmedName === displayName.value) {
    closeEditModal()
    return
  }

  isSavingName.value = true
  editError.value = ''

  try {
    const updatedCount = nameChangeCount.value + 1
    await updateCurrentUserAccount({ displayName: trimmedName })
    await upsertUserProfile(studentUid.value, {
      displayName: trimmedName,
      nameChangeCount: updatedCount,
    })
    displayName.value = trimmedName
    nameChangeCount.value = updatedCount
    closeEditModal()
  } catch (error) {
    editError.value = error?.message || 'Unable to update your name right now.'
  } finally {
    isSavingName.value = false
  }
}

onMounted(async () => {
  const user = auth.currentUser
  if (!user) return

  studentUid.value = user.uid

  const profile = await getUserById(user.uid)
  if (profile?.displayName) displayName.value = profile.displayName
  else if (user.displayName) displayName.value = user.displayName
  nameChangeCount.value = Number(profile?.nameChangeCount || 0)

  const resolvedStudentNumber =
    profile?.studentNumber || profile?.idNumber || generateStudentNumber(user.uid)
  studentNumber.value = resolvedStudentNumber

  if (!profile?.studentNumber) {
    await upsertUserProfile(user.uid, { studentNumber: resolvedStudentNumber })
  }
})
</script>
