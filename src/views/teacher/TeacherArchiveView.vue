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

        <button type="button" class="ml-4 flex items-start gap-2 sm:gap-[9px] lg:mr-[34px]" aria-label="Edit profile" @click="openProfileModal">
          <div class="pt-1 text-right sm:pt-2 lg:pt-[18px]">
            <p class="text-[14px] leading-none font-bold sm:text-[16px] lg:text-[20px]">{{ teacherName }}</p>
            <p class="mt-[2px] text-[11px] leading-none font-medium sm:text-[13px] lg:mt-[4px] lg:text-[15px]">{{ teacherRole }}</p>
          </div>
          <img :src="teacherPhoto" alt="" class="h-[52px] w-[52px] rounded-full object-cover sm:h-[62px] sm:w-[62px] lg:h-[78px] lg:w-[78px]" @error="ensureProfileFallback" />
        </button>
      </header>

      <transition name="fade">
        <div
          v-if="isSidebarExpanded"
          class="fixed inset-0 z-30 bg-[rgba(12,18,28,0.45)] backdrop-blur-[2px] lg:hidden"
          @click.self="isSidebarExpanded = false"
        >
          <aside class="flex h-full w-[272px] max-w-[86vw] flex-col justify-between bg-white px-4 pb-6 pt-5 shadow-[0_18px_44px_rgba(0,0,0,0.18)]">
            <div>
              <div class="flex items-center justify-between">
                <p class="text-[26px] font-black leading-none tracking-[-0.03em]">ReciCall</p>
                <button type="button" class="grid h-10 w-10 place-items-center rounded-full text-[#4a4a4a] transition hover:bg-[#eef4ff] hover:text-[#1188f8]" aria-label="Close sidebar" @click="isSidebarExpanded = false">
                  <AppIcon name="x" :size="20" />
                </button>
              </div>
              <div class="mt-8 space-y-3">
                <button type="button" class="flex h-[52px] w-full items-center rounded-[18px] px-4 text-left transition hover:bg-[rgba(46,130,239,0.12)]" aria-label="Classes" @click="isSidebarExpanded = false; router.push('/teacher')">
                  <AppIcon name="classes" :size="22" class="text-[#707070]" />
                  <span class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Classes</span>
                </button>
                <button type="button" class="flex h-[52px] w-full items-center rounded-[18px] px-4 text-left transition hover:bg-[rgba(46,130,239,0.12)]" aria-label="Predictive analytics" @click="isSidebarExpanded = false; openPredictiveAnalytics()">
                  <AppIcon name="insights" :size="22" class="text-[#707070]" />
                  <span class="ml-4 text-[15px] font-medium text-[#3a3a3a]">Predictive Analytics</span>
                </button>
                <div class="flex h-[56px] items-center rounded-[18px] bg-[rgba(46,130,239,0.25)] px-4">
                  <AppIcon name="archive" :size="22" class="text-[#174ca0]" />
                  <span class="ml-4 text-[16px] font-semibold text-[#174ca0]">Archive</span>
                </div>
              </div>
            </div>
            <div class="space-y-3">
              <button type="button" class="flex h-[52px] w-full items-center rounded-[18px] px-4 text-left transition hover:bg-[rgba(46,130,239,0.12)]" aria-label="Settings" @click="isSidebarExpanded = false; openProfileModal()">
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
          class="hidden shrink-0 self-start flex-col justify-between pb-[40px] pt-[77px] transition-[width,padding] duration-200 lg:sticky lg:top-[118px] lg:ml-[7px] lg:flex lg:h-[650px]"
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
          class="fixed inset-0 z-20 flex items-start justify-center overflow-y-auto bg-[rgba(224,224,224,0.44)] px-3 py-3 backdrop-blur-[1px] sm:px-4 sm:py-8 sm:items-center"
          @click.self="closeProfileModal"
        >
          <div class="w-full max-w-[560px] max-h-[calc(100vh-1.5rem)] overflow-y-auto rounded-[22px] bg-white px-4 py-4 shadow-[0_4px_39.3px_2px_rgba(0,0,0,0.2)] sm:max-h-[calc(100vh-4rem)] sm:px-6 sm:py-5">
            <div class="sticky top-0 z-10 flex items-start justify-between border-b border-[#d7d7d7] bg-white pb-4">
              <div>
                <h2 class="text-[30px] leading-none font-semibold sm:text-[40px]">Settings</h2>
                <p class="mt-2 text-[15px] font-medium sm:text-[20px]">Manage your teacher profile, password access, and privacy options.</p>
              </div>
              <button type="button" class="grid h-10 w-10 place-items-center rounded-full text-[#4a4a4a] transition hover:bg-[#eef4ff] hover:text-[#1188f8]" aria-label="Close profile modal" @click="closeProfileModal">
                <AppIcon name="x" :size="20" />
              </button>
            </div>

            <form class="space-y-4 pt-5" @submit.prevent="saveProfileChanges">
              <div class="flex flex-wrap gap-2 rounded-[22px] bg-[#f6f6f6] p-2">
                <button type="button" class="min-h-[42px] rounded-[18px] px-4 text-[14px] font-semibold transition sm:text-[15px]" :class="activeSettingsSection === 'profile' ? 'bg-white text-[#1188f8] shadow-[0_8px_18px_rgba(17,136,248,0.12)]' : 'text-[#4b4b4b]'" @click="activeSettingsSection = 'profile'">Profile</button>
                <button type="button" class="min-h-[42px] rounded-[18px] px-4 text-[14px] font-semibold transition sm:text-[15px]" :class="activeSettingsSection === 'security' ? 'bg-white text-[#1188f8] shadow-[0_8px_18px_rgba(17,136,248,0.12)]' : 'text-[#4b4b4b]'" @click="activeSettingsSection = 'security'">Security</button>
                <button type="button" class="min-h-[42px] rounded-[18px] px-4 text-[14px] font-semibold transition sm:text-[15px]" :class="activeSettingsSection === 'legal' ? 'bg-white text-[#1188f8] shadow-[0_8px_18px_rgba(17,136,248,0.12)]' : 'text-[#4b4b4b]'" @click="activeSettingsSection = 'legal'">Legal</button>
                <button type="button" class="min-h-[42px] rounded-[18px] px-4 text-[14px] font-semibold transition sm:text-[15px]" :class="activeSettingsSection === 'danger' ? 'bg-white text-[#b81717] shadow-[0_8px_18px_rgba(184,23,23,0.12)]' : 'text-[#7a4a4a]'" @click="activeSettingsSection = 'danger'">Danger Zone</button>
              </div>

              <div v-if="activeSettingsSection === 'profile'" class="space-y-4">
                <div class="flex items-center gap-4">
                  <img :src="profilePreviewSrc" alt="" class="h-[72px] w-[72px] rounded-full border border-[#d7d7d7] object-cover sm:h-[88px] sm:w-[88px]" />
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
              </div>

              <div v-else-if="activeSettingsSection === 'security'" class="rounded-[20px] border border-[#d9e8fb] bg-[#f8fbff] px-4 py-4">
                <p class="text-[18px] font-bold text-black">Password & Sign-In</p>
                <p class="mt-2 text-[14px] leading-[1.5] text-[#5b5b5b]">Use your account email to receive a secure password reset link.</p>
                <div class="mt-4 rounded-[16px] border border-[#d9e8fb] bg-white px-4 py-3">
                  <p class="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6b7280]">Signed in email</p>
                  <p class="mt-1 break-all text-[15px] font-semibold text-black">{{ signedInEmail }}</p>
                </div>
                <button
                  type="button"
                  class="mt-4 flex min-h-[46px] w-full items-center justify-center rounded-[18px] border border-[#1188f8] bg-white px-5 text-[15px] font-semibold text-[#1188f8] transition hover:bg-[#eef6ff] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  :disabled="isSavingProfile || isSendingPasswordReset"
                  @click="sendPasswordResetLink"
                >
                  {{ isSendingPasswordReset ? 'Sending reset link...' : 'Change Password' }}
                </button>
              </div>

              <div v-else-if="activeSettingsSection === 'legal'" class="rounded-[20px] border border-[#d9e8fb] bg-[#f8fbff] px-4 py-4">
                <p class="text-[18px] font-bold text-black">Terms & Privacy</p>
                <p class="mt-2 text-[14px] leading-[1.5] text-[#5b5b5b]">Open the app policies in their own page with a simple back button.</p>
                <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    class="flex min-h-[46px] items-center justify-center rounded-[18px] border border-[#d7d7d7] bg-white px-5 text-[15px] font-semibold text-black transition hover:bg-[#f7f7f7]"
                    @click="goToTerms"
                  >
                    Terms of Service
                  </button>
                  <button
                    type="button"
                    class="flex min-h-[46px] items-center justify-center rounded-[18px] border border-[#d7d7d7] bg-white px-5 text-[15px] font-semibold text-black transition hover:bg-[#f7f7f7]"
                    @click="goToPrivacy"
                  >
                    Privacy Policy
                  </button>
                </div>
              </div>

              <div v-else class="rounded-[20px] border border-[#ffd6d6] bg-[#fff7f7] px-4 py-4">
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

              <div class="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button type="button" class="h-[52px] w-full rounded-[24px] bg-[#c5c5c5] text-[18px] font-bold sm:h-[57px] sm:w-[151px] sm:rounded-[33.5px] sm:text-[20px]" @click="closeProfileModal">
                  Cancel
                </button>
                <button v-if="activeSettingsSection === 'profile'" type="submit" class="h-[52px] w-full rounded-[24px] bg-[#1188f8] text-[18px] font-bold text-white disabled:opacity-70 sm:h-[57px] sm:w-[151px] sm:rounded-[33.5px] sm:text-[20px]" :disabled="isSavingProfile">
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
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '../../components/common/AppIcon.vue'
import ClassThemeArt from '../../components/common/ClassThemeArt.vue'
import ConfirmActionModal from '../../components/common/ConfirmActionModal.vue'
import AnalyticsClassPickerModal from '../../components/teacher/AnalyticsClassPickerModal.vue'
import { auth } from '../../config/firebase'
import { logoutUser, requestCurrentUserPasswordReset, updateCurrentUserAccount } from '../../services/authService'
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
const route = useRoute()

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
const isSendingPasswordReset = ref(false)
const activeSettingsSection = ref('profile')
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
const signedInEmail = computed(() => auth.currentUser?.email || 'No email available')
const profilePreviewSrc = computed(() =>
  resolveTeacherAvatar(profileAvatarKey.value || defaultTeacherAvatarKey, ''),
)

const normalizeSettingsSection = (value) =>
  ['profile', 'security', 'legal', 'danger'].includes(value) ? value : 'profile'

const syncProfileModalQuery = async (open, section = activeSettingsSection.value) => {
  const normalizedSection = normalizeSettingsSection(section)
  const nextQuery = { ...route.query }

  if (open) {
    nextQuery.settings = 'open'
    nextQuery.settingsSection = normalizedSection
  } else {
    delete nextQuery.settings
    delete nextQuery.settingsSection
  }

  const isOpenInRoute = route.query.settings === 'open'
  const currentSection = normalizeSettingsSection(route.query.settingsSection)
  if ((open && isOpenInRoute && currentSection === normalizedSection) || (!open && !isOpenInRoute)) {
    return
  }

  await router.replace({
    path: route.path,
    query: nextQuery,
  })
}

const buildSettingsReturnTo = (section = activeSettingsSection.value) =>
  router.resolve({
    path: route.path,
    query: {
      ...route.query,
      settings: 'open',
      settingsSection: normalizeSettingsSection(section),
    },
  }).fullPath

const prefillProfileSettings = () => {
  profileName.value = teacherName.value
  profileAvatarKey.value = teacherAvatarKey.value || defaultTeacherAvatarKey
}

const recoverTeacherAccessFailure = async (error) => {
  console.error('Unable to load the teacher profile or archive.', error)

  try {
    await logoutUser()
  } catch (signOutError) {
    console.error('Unable to sign out after a teacher access failure.', signOutError)
  }

  await router.replace({
    path: '/login',
    query: { error: 'profile-access' },
  })
}

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
    if (error?.code === 'permission-denied' || error?.code === 'firestore/permission-denied') {
      await recoverTeacherAccessFailure(error)
      return
    }
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

const openProfileModal = async (section = 'profile') => {
  profileError.value = ''
  profileSuccess.value = ''
  prefillProfileSettings()
  activeSettingsSection.value = normalizeSettingsSection(section)
  isProfileModalOpen.value = true
  await syncProfileModalQuery(true, activeSettingsSection.value)
}

const closeProfileModal = async ({ skipRouteSync = false } = {}) => {
  isProfileModalOpen.value = false
  profileError.value = ''
  profileSuccess.value = ''
  deleteAccountError.value = ''
  if (!skipRouteSync) {
    await syncProfileModalQuery(false)
  }
}

const sendPasswordResetLink = async () => {
  if (isSendingPasswordReset.value) return

  isSendingPasswordReset.value = true
  profileError.value = ''
  profileSuccess.value = ''

  try {
    await requestCurrentUserPasswordReset()
    profileSuccess.value = 'Password reset instructions were sent to your email.'
  } catch (error) {
    console.error(error)
    profileError.value = error?.message || 'We could not send a password reset link right now.'
  } finally {
    isSendingPasswordReset.value = false
  }
}

const goToTerms = () => {
  router.push({
    path: '/terms',
    query: {
      returnTo: buildSettingsReturnTo('legal'),
    },
  })
}

const goToPrivacy = () => {
  router.push({
    path: '/privacy',
    query: {
      returnTo: buildSettingsReturnTo('legal'),
    },
  })
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

  try {
    teacherId.value = user.uid
    const profile = await getUserById(user.uid)
    if (!profile?.role) {
      throw new Error('Authenticated teacher profile is missing a role.')
    }
    if (profile?.displayName) teacherName.value = profile.displayName
    else if (user.displayName) teacherName.value = user.displayName
    teacherAvatarKey.value = sanitizeTeacherAvatarKey(profile?.avatarKey)
    profileName.value = teacherName.value
    if (route.query.settings === 'open') {
      prefillProfileSettings()
    }

    await loadArchivedClasses()
  } catch (error) {
    await recoverTeacherAccessFailure(error)
  }
})

watch(
  () => [route.query.settings, route.query.settingsSection],
  ([settings, section]) => {
    if (settings === 'open') {
      activeSettingsSection.value = normalizeSettingsSection(section)
      prefillProfileSettings()
      isProfileModalOpen.value = true
      return
    }

    if (isProfileModalOpen.value) {
      closeProfileModal({ skipRouteSync: true })
    }
  },
  { immediate: true },
)
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
