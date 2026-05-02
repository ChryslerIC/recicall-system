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
            <div
              class="flex h-[63px] w-full items-center rounded-[17px] bg-[rgba(46,130,239,0.25)]"
              :class="isSidebarExpanded ? 'justify-start px-[18px]' : 'justify-center'"
            >
              <img :src="imgClasses" alt="" class="h-[36px] w-[45px] shrink-0" :style="activeNavIconStyle" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-semibold text-[#174ca0]">Classes</span>
            </div>
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
            <button
              type="button"
              class="flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Archive"
              @click="router.push('/teacher/archive')"
            >
              <img :src="imgArchive" alt="" class="h-[40px] w-[38px] shrink-0" :style="inactiveNavIconStyle" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Archive</span>
            </button>
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
          <section class="min-h-[653px] rounded-[28px] border-2 border-[#2e82ef] bg-white px-4 pb-8 pt-6 sm:px-7 sm:pt-8 lg:rounded-[52px] lg:px-[39px] lg:pb-[36px] lg:pt-[47px]">
            <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 class="text-[32px] leading-none font-bold sm:text-[40px]">My Classes</h1>
                <p class="mt-[8px] text-[18px] leading-tight font-medium sm:text-[20px]">{{ dashboardSubtitle }}</p>
              </div>

              <button
              type="button"
              class="mt-[2px] flex h-[72px] w-full max-w-[298px] items-center rounded-[33.5px] bg-[#1188f8] pl-[24px] pr-[18px] sm:h-[78px] sm:pl-[32px] sm:pr-[21px]"
              @click="openModal"
            >
              <span class="grid h-[42px] w-[46px] place-items-center rounded-full bg-white sm:h-[48px] sm:w-[53px]">
                <svg viewBox="0 0 53 48" class="h-[24px] w-[24px] sm:h-[28px] sm:w-[28px]" fill="none" aria-hidden="true">
                  <path d="M26.5 10V38" stroke="#1188F8" stroke-width="5" stroke-linecap="round" />
                  <path d="M12.5 24H40.5" stroke="#1188F8" stroke-width="5" stroke-linecap="round" />
                </svg>
              </span>
              <span class="ml-[7px] text-[20px] font-semibold text-white sm:text-[24px]">Add New Class</span>
            </button>
          </div>

            <div v-if="isLoading" class="mt-10 text-[18px] font-medium text-[#5d5d5d]">Loading classes...</div>

            <div
              v-else-if="classes.length === 0"
              class="mt-10 rounded-[24px] border border-[#d9e8fb] bg-[#fbfdff] px-6 py-8 text-[18px] font-medium text-[#5d5d5d]"
            >
              No active classes yet. Add your first class to get started.
            </div>

            <div v-else class="mt-[39px] grid grid-cols-1 gap-x-[19px] gap-y-[22px] md:grid-cols-2 xl:flex xl:flex-wrap xl:gap-x-[19px] xl:gap-y-[22px]">
              <article
                v-for="classItem in classes"
                :key="classItem.id"
                class="relative h-[260px] w-full cursor-pointer rounded-[20px] border-2 border-[#bdbdbd] bg-white transition-transform hover:-translate-y-0.5"
                :style="{ width: classCardWidth(classItem) }"
                @click="openClassroom(classItem.id)"
              >
                <div class="relative mx-[5px] mt-[6px] h-[173px] overflow-visible rounded-[17px]" :style="{ backgroundImage: classItem.gradient }">
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
                    class="absolute right-[8px] top-[34px] z-30 w-[176px] rounded-[14px] border border-[#d8d8d8] bg-white py-2 shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                  >
                    <div class="px-4 pb-1">
                      <p class="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#777]">Join code</p>
                      <p class="mt-1 text-[16px] font-bold leading-none text-[#1188f8]">{{ classItem.joinCode }}</p>
                    </div>
                    <button
                      type="button"
                      class="block w-full px-4 py-[7px] text-left text-[14px] font-medium text-black hover:bg-[#f6f6f6]"
                      @click.stop="copyJoinCode(classItem.joinCode)"
                    >
                      {{ copiedJoinCode === classItem.joinCode ? 'Copied' : 'Copy Join Code' }}
                    </button>
                    <button
                      type="button"
                      class="block w-full px-4 py-[7px] text-left text-[14px] font-medium text-black hover:bg-[#f6f6f6]"
                      @click.stop="startEditingClass(classItem)"
                    >
                      Edit Class
                    </button>
                    <button
                      type="button"
                      class="block w-full px-4 py-[7px] text-left text-[14px] font-medium text-[#b81717] hover:bg-[#fff3f3]"
                      @click.stop="archiveClass(classItem.id)"
                    >
                      Delete Class
                    </button>
                  </div>

                  <p class="relative z-10 pl-[16px] pt-[16px] text-[36px] leading-none font-semibold text-white">{{ classItem.classLabel }}</p>
                  <p class="relative z-10 mt-[10px] pl-[16px] text-[24px] leading-none font-medium text-white">
                    {{ classItem.gradeLevel }} | {{ classItem.subject }}
                  </p>
                  <p class="relative z-10 mt-[24px] pl-[15px] text-[18px] leading-none font-medium text-white">{{ classItem.scheduleLabel }} &bull; {{ classItem.time }}</p>
                </div>

                <div class="mt-[10px] flex gap-[13px] px-[10px]">
                  <div class="h-[58px] rounded-[11px] bg-[#f6f6f6] px-[11px] py-[5px]" :style="{ width: `${classItem.statsWidth}px` }" @click.stop>
                    <p class="text-[20px] leading-none font-medium text-[#161616]">Students</p>
                    <p class="mt-[8px] text-[20px] leading-none font-semibold text-[#1188f8]">{{ classItem.students }}</p>
                  </div>
                  <div class="h-[58px] rounded-[11px] bg-[#f6f6f6] px-[11px] py-[5px]" :style="{ width: `${classItem.engagementWidth}px` }" @click.stop>
                    <p class="text-[18px] leading-none font-medium text-[#161616]">Engagement</p>
                    <p class="mt-[8px] text-[20px] leading-none font-semibold" :class="engagementClass(classItem.engagement)">
                      {{ classItem.engagement }}
                    </p>
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
            <img :src="imgClasses" alt="" class="h-[24px] w-[30px]" :style="activeNavIconStyle" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Predictive analytics" @click="openPredictiveAnalytics">
            <img :src="imgAnalytics" alt="" class="h-[28px] w-[26px]" :style="inactiveNavIconStyle" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Archive" @click="router.push('/teacher/archive')">
            <img :src="imgArchive" alt="" class="h-[28px] w-[26px]" :style="inactiveNavIconStyle" />
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
        :classes="classes"
        :loading="isLoading"
        empty-message="No active classes yet. Add a class first before opening analytics."
        @close="closeAnalyticsClassPicker"
        @select="handleAnalyticsClassSelect"
      />

      <AvatarSuggestionModal
        :open="isAvatarPromptOpen"
        title="Pick Your Teacher Avatar"
        description="Choose the avatar you want students to see with your classes and classroom profile."
        preview-label="Teacher avatar preview"
        preview-hint="You can change this later anytime from Settings."
        :preview-src="promptAvatarPreview"
        :options="teacherAvatarOptions"
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

      <transition name="fade">
        <div
          v-if="isModalOpen"
          class="fixed inset-0 z-20 flex items-start justify-center overflow-y-auto bg-[rgba(224,224,224,0.44)] px-3 py-3 backdrop-blur-[1px] sm:px-4 sm:py-8 sm:items-center"
          @click.self="closeModal"
        >
          <div class="w-full max-w-[551px] max-h-[calc(100vh-1.5rem)] overflow-y-auto rounded-[22px] bg-white px-4 py-4 shadow-[0_4px_39.3px_2px_rgba(0,0,0,0.2)] sm:max-h-[calc(100vh-4rem)] sm:px-6 sm:py-5">
            <div class="flex items-start justify-between gap-3 border-b border-[#d7d7d7] pb-4">
              <div class="min-w-0">
                <h2 class="text-[28px] leading-none font-semibold sm:text-[40px]">Class Details</h2>
                <p class="mt-2 text-[16px] font-medium sm:text-[20px]">
                  {{ editingClassId ? 'Update the class info below' : 'To start new class, Enter info below' }}
                </p>
              </div>
              <button type="button" class="shrink-0 text-[28px] leading-none sm:text-[34px]" aria-label="Close modal" @click="closeModal">x</button>
            </div>

            <form class="space-y-4 pt-4" @submit.prevent="handleSaveClass">
              <label class="block">
                <span class="mb-1 block text-[16px] font-semibold">Class Name</span>
                <input
                  v-model.trim="newClass.classLabel"
                  type="text"
                  name="class-name"
                  placeholder="Enter class name"
                  :class="classDetailInputClass"
                  autocomplete="off"
                  required
                />
              </label>

              <label class="block">
                <span class="mb-1 block text-[16px] font-semibold">Subject Name</span>
                <input
                  v-model.trim="newClass.subject"
                  type="text"
                  name="subject-name"
                  placeholder="Enter subject name"
                  :class="classDetailInputClass"
                  autocomplete="off"
                  required
                />
              </label>

              <label class="block">
                <span class="mb-1 block text-[16px] font-semibold">Grade Level</span>
                <input
                  v-model.trim="newClass.gradeLevel"
                  type="text"
                  name="grade-level"
                  placeholder="Enter grade level"
                  :class="classDetailInputClass"
                  autocomplete="off"
                  required
                />
              </label>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label class="block">
                  <span class="mb-1 block text-[16px] font-semibold">Start Time</span>
                  <div class="relative">
                    <select
                      v-model="newClass.startTime"
                      name="start-time"
                      :class="classDetailSelectClass"
                      required
                      @change="handleStartTimeChange"
                    >
                      <option value="" disabled>Select start time</option>
                      <option v-for="option in timeOptions" :key="`start-${option.value}`" :value="option.value">
                        {{ option.label }}
                      </option>
                    </select>
                    <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#4b4b4b]">
                      <svg viewBox="0 0 20 20" class="h-4 w-4 fill-current" aria-hidden="true">
                        <path d="M5.5 7.5 10 12l4.5-4.5" />
                      </svg>
                    </span>
                  </div>
                </label>

                <label class="block">
                  <span class="mb-1 block text-[16px] font-semibold">End Time</span>
                  <div class="relative">
                    <select
                      v-model="newClass.endTime"
                      name="end-time"
                      :class="classDetailSelectClass"
                      required
                      :disabled="!newClass.startTime"
                    >
                      <option value="" disabled>{{ newClass.startTime ? 'Select end time' : 'Choose start time first' }}</option>
                      <option v-for="option in availableEndTimeOptions" :key="`end-${option.value}`" :value="option.value">
                        {{ option.label }}
                      </option>
                    </select>
                    <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#4b4b4b]">
                      <svg viewBox="0 0 20 20" class="h-4 w-4 fill-current" aria-hidden="true">
                        <path d="M5.5 7.5 10 12l4.5-4.5" />
                      </svg>
                    </span>
                  </div>
                </label>
              </div>

              <div>
                <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span class="block text-[16px] font-semibold">Schedule Days</span>
                  <span class="text-[13px] font-medium text-[#666]">
                    {{ scheduleSummaryLabel || 'Select at least one day' }}
                  </span>
                </div>
                <div class="mt-3 flex flex-wrap gap-2">
                  <button
                    v-for="day in dayOptions"
                    :key="day"
                    type="button"
                    class="min-w-[94px] rounded-full border px-4 py-2 text-[14px] font-semibold transition"
                    :class="newClass.scheduleDays.includes(day) ? 'border-[#1188f8] bg-[#1188f8] text-white' : 'border-[#cfcfcf] bg-white text-[#333] hover:border-[#1188f8]'"
                    :aria-pressed="newClass.scheduleDays.includes(day)"
                    @click="toggleScheduleDay(day)"
                  >
                    {{ day }}
                  </button>
                </div>
              </div>

              <div>
                <span class="mb-3 block text-[16px] font-semibold">Background</span>
                <div class="flex flex-wrap gap-3 sm:gap-5">
                  <button
                    v-for="option in gradientOptions"
                    :key="option.id"
                    type="button"
                    class="h-12 w-[106px] rounded-[17px] border-[3px]"
                    :class="newClass.gradientId === option.id ? 'border-black' : 'border-transparent'"
                    :style="{ backgroundImage: option.gradient }"
                    @click="newClass.gradientId = option.id"
                  />
                </div>
              </div>

              <p v-if="formError" class="text-sm font-medium text-red-600">{{ formError }}</p>

              <div class="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end sm:gap-4">
                <button type="button" class="h-[57px] w-full rounded-[33.5px] bg-[#c5c5c5] text-[20px] font-bold sm:w-[151px]" @click="closeModal">
                  Cancel
                </button>
                <button
                  type="submit"
                  class="h-[57px] w-full rounded-[33.5px] bg-[#1188f8] text-[20px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-[151px]"
                  :disabled="isClassFormIncomplete"
                >
                  {{ editingClassId ? 'Save' : 'Create' }}
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
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AvatarSuggestionModal from '../../components/profile/AvatarSuggestionModal.vue'
import AnalyticsClassPickerModal from '../../components/teacher/AnalyticsClassPickerModal.vue'
import { auth } from '../../config/firebase'
import { logoutUser, updateCurrentUserAccount } from '../../services/authService'
import {
  archiveTeacherClass,
  createTeacherClass,
  getTeacherClasses,
  updateTeacherClass,
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

const gradientOptions = [
  {
    id: 'blue',
    gradient: 'linear-gradient(90deg, rgb(37, 122, 255) 0%, rgb(36, 118, 247) 44.712%, rgb(29, 96, 201) 90.385%, rgb(22, 73, 153) 100%)',
    engagement: 'High',
  },
  {
    id: 'green',
    gradient: 'linear-gradient(90deg, rgb(29, 201, 49) 0%, rgb(6, 196, 28) 15.865%, rgb(89, 234, 99) 87.019%, rgb(85, 232, 96) 92.308%)',
    engagement: 'Low',
  },
  {
    id: 'yellow',
    gradient: 'linear-gradient(90deg, rgb(228, 206, 40) 0%, rgb(253, 228, 66) 36.058%, rgb(255, 238, 47) 76.442%, rgb(237, 211, 42) 100%)',
    engagement: 'Moderate',
  },
]

const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const buildTimeOptions = () => {
  const options = []

  for (let minutes = 6 * 60; minutes <= 20 * 60; minutes += 30) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    const value = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
    const suffix = hours >= 12 ? 'PM' : 'AM'
    const normalizedHour = hours % 12 || 12
    const label = `${normalizedHour}:${String(mins).padStart(2, '0')} ${suffix}`

    options.push({ value, label })
  }

  return options
}

const timeOptions = buildTimeOptions()

const defaultClasses = [
  {
    classLabel: 'Class 1',
    gradeLevel: 'Grade 6',
    subject: 'Araling Panlipunan',
    scheduleLabel: 'Monday / Tuesday',
    time: '10 AM - 12 PM',
    engagement: 'High',
    gradientId: 'blue',
    students: 35,
    sortOrder: 1,
  },
  {
    classLabel: 'Class 2',
    gradeLevel: 'Grade 6',
    subject: 'Science',
    scheduleLabel: 'Monday / Tuesday',
    time: '10 AM - 12 PM',
    engagement: 'Low',
    gradientId: 'green',
    students: 35,
    sortOrder: 2,
  },
  {
    classLabel: 'Class 3',
    gradeLevel: 'Grade 6',
    subject: 'Math',
    scheduleLabel: 'Monday / Tuesday',
    time: '10 AM - 12 PM',
    engagement: 'Moderate',
    gradientId: 'yellow',
    students: 35,
    sortOrder: 3,
  },
]

const teacherName = ref('Maam. Anderson')
const teacherRole = ref('High School Teacher')
const teacherAvatarKey = ref(defaultTeacherAvatarKey)
const teacherId = ref('')
const isLoading = ref(true)
const isLoggingOut = ref(false)
const isSidebarExpanded = ref(false)
const isModalOpen = ref(false)
const isAnalyticsClassPickerOpen = ref(false)
const isAvatarPromptOpen = ref(false)
const isProfileModalOpen = ref(false)
const isSavingAvatarPrompt = ref(false)
const isSavingProfile = ref(false)
const formError = ref('')
const avatarPromptError = ref('')
const profileError = ref('')
const profileSuccess = ref('')
const openOptionsId = ref(null)
const editingClassId = ref(null)
const copiedJoinCode = ref('')
const promptAvatarKey = ref(defaultTeacherAvatarKey)
const profileName = ref('')
const profileAvatarKey = ref(defaultTeacherAvatarKey)
const classes = ref([])
const currentDateTime = ref(new Date())
let dashboardClockTimer = null
const classDetailInputClass = 'h-14 w-full rounded-[18px] border border-[#1b1b1b] bg-white px-4 text-[16px] font-medium text-black outline-none transition focus:border-[#1188f8] focus:ring-2 focus:ring-[#b7dcff] placeholder:text-[#8a8a8a]'
const classDetailSelectClass = `${classDetailInputClass} appearance-none pr-11`

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
const teacherPhoto = computed(() =>
  resolveTeacherAvatar(teacherAvatarKey.value, ''),
)
const promptAvatarPreview = computed(() =>
  resolveTeacherAvatar(promptAvatarKey.value, ''),
)
const profilePreviewSrc = computed(() =>
  resolveTeacherAvatar(profileAvatarKey.value || defaultTeacherAvatarKey, ''),
)
const isClassFormIncomplete = computed(
  () =>
    !newClass.classLabel.trim() ||
    !newClass.subject.trim() ||
    !newClass.gradeLevel.trim() ||
    !newClass.startTime ||
    !newClass.endTime ||
    !newClass.scheduleDays.length,
)

const ensureProfileFallback = (event) => {
  event.target.src = imgProfile
}

const createInitialClassState = () => ({
  classLabel: '',
  subject: '',
  gradeLevel: '',
  startTime: '',
  endTime: '',
  scheduleDays: [],
  gradientId: 'blue',
})

const newClass = reactive(createInitialClassState())

const availableEndTimeOptions = computed(() =>
  timeOptions.filter((option) => !newClass.startTime || option.value > newClass.startTime),
)

const scheduleSummaryLabel = computed(() => formatScheduleLabel(newClass.scheduleDays))

const formatScheduleLabel = (days = []) =>
  dayOptions.filter((day) => days.includes(day)).join(' / ')

const parseScheduleDaysFromLabel = (value = '') =>
  dayOptions.filter((day) => new RegExp(`\\b${day}\\b`, 'i').test(value))

const formatTimeLabel = (value = '') =>
  timeOptions.find((option) => option.value === value)?.label || ''

const buildTimeRangeLabel = (startTime = '', endTime = '') => {
  const startLabel = formatTimeLabel(startTime)
  const endLabel = formatTimeLabel(endTime)

  return startLabel && endLabel ? `${startLabel} - ${endLabel}` : ''
}

const parseTimeValue = (value = '') => {
  const match = value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i)
  if (!match) return ''

  const hours = Number(match[1])
  const minutes = Number(match[2] || '0')
  const meridiem = match[3].toUpperCase()

  if (!hours || hours > 12 || minutes > 59) return ''

  let normalizedHours = hours % 12
  if (meridiem === 'PM') normalizedHours += 12

  return `${String(normalizedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

const parseTimeRangeLabel = (value = '') => {
  const [startLabel = '', endLabel = ''] = value.split('-').map((item) => item.trim())
  return {
    startTime: parseTimeValue(startLabel),
    endTime: parseTimeValue(endLabel),
  }
}

const handleStartTimeChange = () => {
  if (newClass.endTime && newClass.endTime <= newClass.startTime) {
    newClass.endTime = ''
  }
}

const toggleScheduleDay = (day) => {
  if (newClass.scheduleDays.includes(day)) {
    newClass.scheduleDays = newClass.scheduleDays.filter((item) => item !== day)
    return
  }

  newClass.scheduleDays = dayOptions.filter((item) => [...newClass.scheduleDays, day].includes(item))
}

const mapClassToCard = (classItem) => {
  const isBlue = classItem.gradientId === 'blue'
  const gradientOption = gradientOptions.find((option) => option.id === classItem.gradientId) || gradientOptions[0]

  return {
    ...classItem,
    students: classItem.students ?? 35,
    engagement: classItem.engagement || gradientOption.engagement,
    gradient: gradientOption.gradient,
    width: isBlue ? 396.347 : 400,
    statsWidth: isBlue ? 140.482 : 142.391,
    engagementWidth: isBlue ? 139.41 : 141.304,
  }
}

const resetForm = () => {
  Object.assign(newClass, createInitialClassState())
  formError.value = ''
  editingClassId.value = null
}

const engagementClass = (engagement) => {
  if (engagement === 'High') return 'text-[#1188f8]'
  if (engagement === 'Moderate') return 'text-[#4fb817]'
  return 'text-[#b81717]'
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

const seedDefaultClasses = async () => {
  const activeClasses = await getTeacherClasses(teacherId.value, { archived: false })
  const archivedClasses = await getTeacherClasses(teacherId.value, { archived: true })

  if (activeClasses.length > 0 || archivedClasses.length > 0) {
    return activeClasses
  }

  for (const classItem of defaultClasses) {
    await createTeacherClass(teacherId.value, classItem)
  }

  return getTeacherClasses(teacherId.value, { archived: false })
}

const loadClasses = async () => {
  if (!teacherId.value) return

  isLoading.value = true
  const activeClasses = await seedDefaultClasses()
  classes.value = activeClasses.map(mapClassToCard)
  isLoading.value = false
}

const openModal = () => {
  openOptionsId.value = null
  isModalOpen.value = true
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

const closeModal = () => {
  isModalOpen.value = false
  resetForm()
}

const toggleOptions = (classId) => {
  openOptionsId.value = openOptionsId.value === classId ? null : classId
}

const legacyCopyText = (value) => {
  const textArea = document.createElement('textarea')
  textArea.value = value
  textArea.setAttribute('readonly', '')
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  textArea.style.pointerEvents = 'none'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  let copied = false
  try {
    copied = document.execCommand('copy')
  } catch (error) {
    console.error(error)
  }

  document.body.removeChild(textArea)
  return copied
}

const copyJoinCode = async (joinCode) => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(joinCode)
    } else if (!legacyCopyText(joinCode)) {
      throw new Error('Clipboard copy is unavailable')
    }

    copiedJoinCode.value = joinCode
    window.setTimeout(() => {
      if (copiedJoinCode.value === joinCode) copiedJoinCode.value = ''
    }, 1800)
  } catch (error) {
    console.error(error)
    if (legacyCopyText(joinCode)) {
      copiedJoinCode.value = joinCode
      window.setTimeout(() => {
        if (copiedJoinCode.value === joinCode) copiedJoinCode.value = ''
      }, 1800)
    }
  }
}

const openClassroom = (classId) => {
  router.push(`/teacher/class/${classId}`)
}

const openPredictiveAnalytics = () => {
  isAnalyticsClassPickerOpen.value = true
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

const closeAvatarPrompt = () => {
  isAvatarPromptOpen.value = false
  avatarPromptError.value = ''
}

const dismissAvatarPrompt = async () => {
  if (isSavingAvatarPrompt.value || !teacherId.value) return

  isSavingAvatarPrompt.value = true
  avatarPromptError.value = ''

  try {
    await upsertUserProfile(teacherId.value, { avatarPromptSeen: true })
    closeAvatarPrompt()
  } catch (error) {
    console.error(error)
    avatarPromptError.value = 'Unable to dismiss the avatar suggestion right now.'
  } finally {
    isSavingAvatarPrompt.value = false
  }
}

const saveAvatarPrompt = async () => {
  if (isSavingAvatarPrompt.value || !teacherId.value) return

  isSavingAvatarPrompt.value = true
  avatarPromptError.value = ''

  try {
    const nextAvatarKey = sanitizeTeacherAvatarKey(promptAvatarKey.value)
    await upsertUserProfile(teacherId.value, {
      avatarKey: nextAvatarKey,
      photoURL: '',
      avatarPromptSeen: true,
    })

    teacherAvatarKey.value = nextAvatarKey
    closeAvatarPrompt()
  } catch (error) {
    console.error(error)
    avatarPromptError.value = 'Unable to save your avatar right now.'
  } finally {
    isSavingAvatarPrompt.value = false
  }
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

const startEditingClass = (classItem) => {
  openOptionsId.value = null
  editingClassId.value = classItem.id
  const parsedTimeRange = parseTimeRangeLabel(classItem.time)
  newClass.classLabel = classItem.classLabel
  newClass.subject = classItem.subject
  newClass.gradeLevel = classItem.gradeLevel
  newClass.startTime = parsedTimeRange.startTime
  newClass.endTime = parsedTimeRange.endTime
  newClass.scheduleDays = parseScheduleDaysFromLabel(classItem.scheduleLabel)
  newClass.gradientId = classItem.gradientId || 'blue'
  isModalOpen.value = true
}

const archiveClass = async (classId) => {
  await archiveTeacherClass(teacherId.value, classId)
  openOptionsId.value = null
  await loadClasses()
}

const handleSaveClass = async () => {
  formError.value = ''

  if (isClassFormIncomplete.value) {
    formError.value = 'Complete all required class details first.'
    return
  }

  const scheduleLabel = formatScheduleLabel(newClass.scheduleDays)
  const timeLabel = buildTimeRangeLabel(newClass.startTime, newClass.endTime)
  const option = gradientOptions.find((item) => item.id === newClass.gradientId) || gradientOptions[0]

  if (editingClassId.value) {
    await updateTeacherClass(teacherId.value, editingClassId.value, {
      classLabel: newClass.classLabel,
      gradeLevel: newClass.gradeLevel,
      subject: newClass.subject,
      scheduleLabel,
      time: timeLabel,
      engagement: option.engagement,
      gradientId: option.id,
    })
    await loadClasses()
    closeModal()
    return
  }

  await createTeacherClass(teacherId.value, {
    classLabel: newClass.classLabel,
    gradeLevel: newClass.gradeLevel,
    subject: newClass.subject,
    scheduleLabel,
    time: timeLabel,
    students: 35,
    engagement: option.engagement,
    gradientId: option.id,
    sortOrder: classes.value.length + 1,
  })
  await loadClasses()
  closeModal()
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
  startDashboardClock()

  const user = auth.currentUser
  if (!user) return

  teacherId.value = user.uid
  const profile = await getUserById(user.uid)
  if (profile?.displayName) teacherName.value = profile.displayName
  else if (user.displayName) teacherName.value = user.displayName
  teacherAvatarKey.value = sanitizeTeacherAvatarKey(profile?.avatarKey)
  promptAvatarKey.value = teacherAvatarKey.value || defaultTeacherAvatarKey
  profileName.value = teacherName.value
  if (profile?.avatarPromptSeen === false) {
    isAvatarPromptOpen.value = true
  }

  await loadClasses()
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
