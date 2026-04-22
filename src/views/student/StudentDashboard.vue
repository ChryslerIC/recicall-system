<template>
  <div class="min-h-screen bg-[#f6f6f6] font-sans text-black">
    <div class="w-full">
      <header class="flex items-start justify-between px-4 pt-4 sm:px-6 lg:px-[30px] lg:pt-[13px]">
        <div class="flex items-start">
          <button type="button" class="mt-2 h-[32px] w-[34px] sm:mt-4 sm:h-[36px] sm:w-[38px] lg:mt-[22px] lg:h-[41px] lg:w-[43px]" aria-label="Menu">
            <img :src="imgRectangle13" alt="" class="block h-full w-full" />
          </button>

          <img :src="imgStar1" alt="" class="ml-4 mt-1 h-[40px] w-[44px] sm:ml-6 sm:mt-2 sm:h-[48px] sm:w-[53px] lg:ml-[31px] lg:mt-[15px] lg:h-[55px] lg:w-[61px]" />
          <p class="ml-3 mt-1 text-[28px] leading-none font-black tracking-[-0.03em] sm:ml-4 sm:mt-2 sm:text-[34px] lg:ml-[22px] lg:mt-[18px] lg:text-[40px]">ReciCall</p>
        </div>

        <div class="ml-4 flex items-start gap-4 sm:gap-5 lg:mr-[34px] lg:gap-[24px]">
          <button type="button" class="mt-1 sm:mt-2 lg:mt-[18px]" aria-label="Notifications">
            <span class="block bg-black h-[52px] w-[40px] sm:h-[56px] sm:w-[44px] lg:h-[55px] lg:w-[70px]" :style="bellMaskStyle" />
          </button>
          <button type="button" class="mt-0 sm:mt-1 lg:mt-[12px]" aria-label="Profile">
            <img :src="imgProfile" alt="" class="h-[48px] w-[49px] sm:h-[56px] sm:w-[57px] lg:h-[63px] lg:w-[64px]" />
          </button>
        </div>
      </header>

      <div class="flex gap-4 px-4 pb-4 pt-2 sm:px-6 lg:gap-0 lg:px-0">
        <aside class="hidden w-[72px] shrink-0 flex-col justify-between pb-[40px] pt-[77px] lg:ml-[7px] lg:flex lg:h-[650px]">
          <div class="flex flex-col items-center gap-[24px]">
            <div class="grid h-[63px] w-[80px] place-items-center rounded-[17px] bg-[rgba(46,130,239,0.25)]">
              <img :src="imgRectangle14" alt="" class="h-[36px] w-[45px]" />
            </div>
            <button type="button" class="grid h-[54px] w-[42px] place-items-center" aria-label="Student ID" @click="router.push('/student/id')">
              <img :src="imgRectangle77" alt="" class="h-[54px] w-[42px]" />
            </button>
          </div>

          <div class="flex flex-col items-center gap-[28px]">
            <button type="button" class="grid h-[40px] w-[38px] place-items-center" aria-label="Settings">
              <img :src="imgRectangle18" alt="" class="h-[40px] w-[38px]" />
            </button>
            <button type="button" class="grid h-[40px] w-[38px] place-items-center" aria-label="Logout" @click="handleLogout">
              <img :src="imgRectangle17" alt="" class="h-[40px] w-[38px]" />
            </button>
          </div>
        </aside>

        <main class="min-w-0 flex-1 lg:pl-[28px] lg:pr-[27px] lg:pt-[13px]">
          <section class="min-h-[653px] rounded-[28px] border-2 border-[#2e82ef] bg-white px-4 pb-8 pt-6 sm:px-7 sm:pt-8 lg:rounded-[52px] lg:px-[39px] lg:pb-[36px] lg:pt-[47px]">
            <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 class="text-[32px] leading-none font-bold sm:text-[40px]">My Classes</h1>
                <p class="mt-[8px] text-[18px] leading-none font-medium sm:text-[20px]">Lorem ipsum lorem ipsum</p>
              </div>

              <button type="button" class="mt-[2px] flex h-[72px] w-full max-w-[249px] items-center rounded-[33.5px] bg-[#1188f8] pl-[24px] pr-[18px] sm:h-[78px] sm:pl-[32px] sm:pr-[21px]" @click="openJoinModal">
                <img :src="imgRectangle39" alt="" class="h-[42px] w-[46px] sm:h-[48px] sm:w-[53px]" />
                <span class="ml-[7px] text-[20px] font-semibold text-white sm:text-[24px]">Join Class</span>
              </button>
            </div>

            <div v-if="isLoading" class="mt-10 text-[18px] font-medium text-[#5d5d5d]">Loading classes...</div>

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
                class="relative h-[260px] w-full overflow-hidden rounded-[20px] border-2 border-[#bdbdbd] bg-white"
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
                    <img :src="imgVector1" alt="" class="absolute right-[-1px] top-[82px] h-[71px] w-[112px]" />
                    <img :src="imgVector2" alt="" class="absolute right-[1px] top-[116px] h-[38px] w-[118px]" />
                    <img :src="imgVector3" alt="" class="absolute right-[30px] top-[119px] h-[35px] w-[71px]" />
                  </template>

                  <template v-else>
                    <img :src="imgGroup9" alt="" class="absolute right-[-29px] top-[67px] h-[133px] w-[160px]" />
                  </template>

                  <button
                    type="button"
                    class="absolute right-[8px] top-[11px] z-20"
                    :aria-label="`Open options for ${classItem.subject}`"
                    @click.stop="toggleOptions(classItem.id)"
                  >
                    <img :src="classItem.ellipsisAsset" alt="" class="h-[39px] w-[35px]" />
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
                  <p class="relative z-10 mt-[24px] pl-[15px] text-[18px] leading-none font-medium text-white">{{ classItem.scheduleLabel }} • {{ classItem.time }}</p>
                </div>

                <div class="mt-[10px] px-[10px]">
                  <div class="flex h-[61px] w-full items-start rounded-[11px] bg-[#f6f6f6] px-[10px] py-[9px]">
                    <img :src="imgProfile" alt="" class="h-[40px] w-[38px] shrink-0" />
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

      <div class="px-4 pb-6 sm:px-6 lg:hidden">
        <div class="flex items-center justify-center gap-8 rounded-[20px] border border-[#d9e8fb] bg-white px-4 py-3 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
          <button type="button" class="grid h-10 w-10 place-items-center rounded-[12px] bg-[rgba(46,130,239,0.25)]" aria-label="Dashboard">
            <img :src="imgRectangle14" alt="" class="h-[24px] w-[30px]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Student ID" @click="router.push('/student/id')">
            <img :src="imgRectangle77" alt="" class="h-[26px] w-[20px]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Settings">
            <img :src="imgRectangle18" alt="" class="h-[24px] w-[24px]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Logout" @click="handleLogout">
            <img :src="imgRectangle17" alt="" class="h-[24px] w-[24px]" />
          </button>
        </div>
      </div>

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
              <button type="button" class="text-[34px] leading-none" aria-label="Close modal" @click="closeJoinModal">x</button>
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
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../../config/firebase'
import { logoutUser } from '../../services/authService'
import { enrollStudentInClass, findTeacherClassByJoinCode, getStudentClasses, leaveStudentClass } from '../../services/studentService'
import { getUserById } from '../../services/userService'

const imgRectangle17 = 'https://www.figma.com/api/mcp/asset/96dfb1f1-e25d-42c2-be80-a75b53d920d3'
const imgRectangle18 = 'https://www.figma.com/api/mcp/asset/0dc91600-d96a-49c2-9172-f7fb72506cdd'
const imgProfile = 'https://www.figma.com/api/mcp/asset/c6a4171f-9fb7-4abc-9c63-6bddb572190d'
const imgRectangle13 = 'https://www.figma.com/api/mcp/asset/7df93e1c-0a05-4f5a-b2e8-23ed5bb22fb1'
const imgRectangle14 = 'https://www.figma.com/api/mcp/asset/2a18f610-c6bf-4f7e-b225-19b9a2536c9e'
const imgRectangle39 = 'https://www.figma.com/api/mcp/asset/fda8cf8b-cd9d-4004-abc9-a22ed7f49020'
const imgRectangle25 = 'https://www.figma.com/api/mcp/asset/c7ac4ffd-df3e-45db-8cd2-49d33bfebdc1'
const imgRectangle26 = 'https://www.figma.com/api/mcp/asset/270fc865-72f7-4e1c-afc3-1c851617a303'
const imgRectangle76 = 'https://www.figma.com/api/mcp/asset/99acbd4b-0070-43fa-936e-548703c52a26'
const imgRectangle77 = 'https://www.figma.com/api/mcp/asset/3f38a4f3-e264-4751-a907-21c133c3983b'
const imgStar1 = 'https://www.figma.com/api/mcp/asset/a39ebbfd-86f8-48c4-b462-cffba3cc2ecf'
const imgPolygon4 = 'https://www.figma.com/api/mcp/asset/233e1b53-39df-45b3-8174-189f3e3fba58'
const imgPolygon5 = 'https://www.figma.com/api/mcp/asset/511e62a6-9e9b-40e9-a538-32dcd7f99276'
const imgPolygon6 = 'https://www.figma.com/api/mcp/asset/47575bb6-5778-4d8f-94fb-2c7afd9f75df'
const imgPolygon7 = 'https://www.figma.com/api/mcp/asset/34f279ce-cb5d-48e1-8455-affc747be9fe'
const imgVector1 = 'https://www.figma.com/api/mcp/asset/1d6100ef-1f83-49e0-9eb4-7683dbffd71e'
const imgVector2 = 'https://www.figma.com/api/mcp/asset/5e826f6a-fc15-477e-81fa-4987354e6aab'
const imgVector3 = 'https://www.figma.com/api/mcp/asset/58d4c442-8e4f-4608-9d2b-5fced21d2207'
const imgGroup9 = 'https://www.figma.com/api/mcp/asset/d3c8089f-c2cb-47a8-811d-770046bf226a'

const router = useRouter()
const isLoggingOut = ref(false)
const isLoading = ref(true)
const isJoinModalOpen = ref(false)
const isJoining = ref(false)
const joinCode = ref('')
const joinError = ref('')
const joinSuccess = ref('')
const openOptionsId = ref(null)
const studentId = ref('')
const studentProfile = ref(null)
const classes = ref([])

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

const gradientMap = {
  blue: 'linear-gradient(90deg, rgb(37, 122, 255) 0%, rgb(36, 118, 247) 44.712%, rgb(29, 96, 201) 90.385%, rgb(22, 73, 153) 100%)',
  green: 'linear-gradient(90deg, rgb(29, 201, 49) 0%, rgb(6, 196, 28) 15.865%, rgb(89, 234, 99) 87.019%, rgb(85, 232, 96) 92.308%)',
  yellow: 'linear-gradient(90deg, rgb(228, 206, 40) 0%, rgb(253, 228, 66) 36.058%, rgb(255, 238, 47) 76.442%, rgb(237, 211, 42) 100%)',
}

const mapClassToCard = (classItem) => {
  const gradientId = classItem.gradientId || 'blue'

  return {
    ...classItem,
    gradientId,
    gradient: classItem.gradient || gradientMap[gradientId] || gradientMap.blue,
    teacherName: classItem.teacherName || 'Maam. Anderson',
    teacherRole: classItem.teacherRole || 'High School Teacher',
    ellipsisAsset: gradientId === 'blue' ? imgRectangle25 : imgRectangle26,
    width: gradientId === 'blue' ? 396.347 : 400,
  }
}

const classCardWidth = (classItem) => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) return '100%'
  if (typeof window !== 'undefined' && window.innerWidth < 1280) return '100%'
  return `${classItem.width}px`
}

const loadStudentClasses = async () => {
  if (!studentId.value) return
  isLoading.value = true
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
        teacherPhotoURL: latestTeacherProfile?.photoURL || classItem.teacherPhotoURL,
      })
    }),
  )
  isLoading.value = false
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
      photoURL: studentProfile.value?.photoURL || auth.currentUser?.photoURL || '',
      email: auth.currentUser?.email || '',
      gradeLevel: studentProfile.value?.gradeLevel,
    })

    if (result.alreadyJoined) {
      joinError.value = 'You already joined this class.'
      return
    }

    joinSuccess.value = 'Class joined successfully.'
    await loadStudentClasses()
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

onMounted(async () => {
  const user = auth.currentUser
  if (!user) return
  studentId.value = user.uid
  studentProfile.value = await getUserById(user.uid)
  await loadStudentClasses()
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
