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
          <img :src="imgStar1" alt="" class="ml-4 mt-1 h-[40px] w-[44px] object-contain sm:ml-6 sm:mt-2 sm:h-[48px] sm:w-[53px] lg:ml-[31px] lg:mt-[15px] lg:h-[55px] lg:w-[61px]" />
          <p class="ml-3 mt-1 text-[28px] leading-none font-black tracking-[-0.03em] sm:ml-4 sm:mt-2 sm:text-[34px] lg:ml-[22px] lg:mt-[18px] lg:text-[40px]">ReciCall</p>
        </div>

        <button type="button" class="interactive-profile-button ml-4 flex items-start gap-2 rounded-[24px] px-2 py-2 sm:gap-[9px] lg:mr-[34px]" aria-label="Edit profile" @click="openProfileModal">
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
              class="interactive-nav-button flex h-[63px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="[isSidebarExpanded ? 'justify-start px-[18px]' : 'justify-center', currentTab !== 'analytics' ? 'bg-[rgba(46,130,239,0.25)]' : '']"
              aria-label="Classes"
              @click="router.push('/teacher')"
            >
              <img :src="imgRectangle14" alt="" class="h-[36px] w-[45px] shrink-0" :style="navIconStyle(currentTab !== 'analytics')" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px]" :class="currentTab !== 'analytics' ? 'font-semibold text-[#174ca0]' : 'font-medium text-[#3a3a3a]'">Classes</span>
            </button>
            <button
              type="button"
              class="interactive-nav-button flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="[isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center', currentTab === 'analytics' ? 'bg-[rgba(46,130,239,0.25)]' : '']"
              aria-label="Predictive analytics"
              @click="setTab('analytics')"
            >
              <img :src="imgRectangle15" alt="" class="h-[40px] w-[38px] shrink-0" :style="navIconStyle(currentTab === 'analytics')" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[15px]" :class="currentTab === 'analytics' ? 'font-semibold text-[#174ca0]' : 'font-medium text-[#3a3a3a]'">Predictive Analytics</span>
            </button>
            <button
              type="button"
              class="interactive-nav-button flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Archive"
              @click="router.push('/teacher/archive')"
            >
              <img :src="imgRectangle16" alt="" class="h-[40px] w-[38px] shrink-0" :style="inactiveNavIconStyle" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Archive</span>
            </button>
          </div>

          <div class="flex flex-col gap-[18px]">
            <button
              type="button"
              class="interactive-nav-button flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Settings"
              @click="openProfileModal"
            >
              <img :src="imgRectangle18" alt="" class="h-[40px] w-[38px] shrink-0" :style="inactiveNavIconStyle" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Settings</span>
            </button>
            <button
              type="button"
              class="interactive-nav-button flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(255,84,84,0.08)]"
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
          <section class="min-h-[653px] rounded-[28px] border-2 border-[#2e82ef] bg-white px-4 pb-8 pt-4 sm:px-6 lg:rounded-[52px] lg:px-[28px] lg:pb-[30px] lg:pt-[14px]">
            <div v-if="isLoading" class="px-4 py-8 text-[18px] font-medium text-[#5d5d5d]">Loading classroom...</div>
            <div v-else-if="!classroom" class="px-4 py-8 text-[18px] font-medium text-[#b81717]">We couldn't find that class.</div>

            <template v-else>
              <div class="mt-[18px] flex h-auto w-full max-w-[458px] items-center gap-2 overflow-x-auto rounded-[30.5px] bg-[#f6f6f6] p-[11px] shadow-[0_4px_6.1px_-4px_rgba(0,0,0,0.25)]">
                <button
                  type="button"
                  class="interactive-tab-button h-[47px] min-w-[120px] rounded-[30.5px] px-4 text-[16px] font-semibold sm:min-w-[141px]"
                  :class="currentTab === 'class' ? 'bg-white text-[#1188f8] shadow-[0_4px_6.1px_-4px_rgba(0,0,0,0.25)]' : 'text-[#373737]'"
                  @click="setTab('class')"
                >
                  Class
                </button>
                <button
                  type="button"
                  class="interactive-tab-button h-[47px] min-w-[120px] rounded-[30.5px] px-4 text-[16px] font-semibold sm:min-w-[146px]"
                  :class="currentTab === 'class-list' ? 'bg-white text-[#1188f8] shadow-[0_4px_6.1px_-4px_rgba(0,0,0,0.25)]' : 'text-[#373737]'"
                  @click="setTab('class-list')"
                >
                  Class List
                </button>
                <button
                  type="button"
                  class="interactive-tab-button h-[47px] min-w-[120px] rounded-[30.5px] px-4 text-[16px] font-semibold"
                  :class="currentTab === 'analytics' ? 'bg-white text-[#1188f8] shadow-[0_4px_6.1px_-4px_rgba(0,0,0,0.25)]' : 'text-[#373737]'"
                  @click="setTab('analytics')"
                >
                  Analytics
                </button>
              </div>

              <template v-if="currentTab === 'class'">
              <div class="mt-[18px] flex min-h-[220px] flex-col overflow-hidden rounded-[17px] px-4 pb-4 pt-4 text-white sm:px-5 sm:pb-5 sm:pt-5 lg:min-h-[244px] lg:px-[24px] lg:pb-[20px] lg:pt-[18px]" :style="{ backgroundImage: classroom.gradient }">
                <div class="flex items-start justify-between">
                <div class="min-w-0">
                  <template v-if="isSessionActive">
                    <p class="text-[26px] font-semibold leading-none sm:text-[32px] lg:text-[36px]">{{ classroom.subject }}</p>
                    <p class="mt-[14px] text-[18px] font-medium leading-none sm:text-[22px] lg:text-[24px]">{{ classroom.gradeLevel }} | {{ classroom.classLabel }}</p>
                  </template>
                  <template v-else>
                    <p class="text-[26px] font-semibold leading-none sm:text-[32px] lg:text-[36px]">{{ classroom.classLabel }}</p>
                    <p class="mt-[14px] text-[18px] font-medium leading-none sm:text-[22px] lg:text-[24px]">{{ classroom.gradeLevel }} | {{ classroom.subject }}</p>
                  </template>
                </div>
                  <button type="button" class="interactive-icon-button rounded-[18px] px-2 py-1 pt-[4px]" aria-label="Class options">
                    <svg class="h-[48px] w-[28px] sm:h-[56px] sm:w-[34px]" viewBox="0 0 34 56" fill="none" aria-hidden="true">
                      <circle cx="17" cy="10" r="5" fill="white" />
                      <circle cx="17" cy="28" r="5" fill="white" />
                      <circle cx="17" cy="46" r="5" fill="white" />
                    </svg>
                  </button>
                </div>

                <div class="mt-[12px] flex flex-1 items-end justify-end">
                  <div class="relative hidden h-[98px] w-[210px] opacity-80 sm:block">
                    <img :src="imgPolygon4" alt="" class="absolute right-[48px] top-[0px] h-[92px] w-[34px]" />
                    <img :src="imgPolygon5" alt="" class="absolute right-[24px] top-[44px] h-[62px] w-[20px]" />
                    <img :src="imgPolygon6" alt="" class="absolute right-[19px] top-[63px] h-[44px] w-[7px]" />
                    <img :src="imgPolygon7" alt="" class="absolute right-[0px] top-[16px] h-[78px] w-[15px]" />
                  </div>
                </div>

                <p class="mt-[10px] text-[20px] font-medium leading-none">
                  {{ classroom.scheduleLabel }} &bull; {{ classroom.time }}
                </p>
              </div>

              <div class="mt-[12px] flex flex-col gap-4 xl:flex-row xl:items-start xl:gap-[34px]">
                <div class="w-full shrink-0 xl:w-[242px]">
                  <div class="relative h-[141px] w-full rounded-[23px] border border-[#bdbdbd] bg-white px-[14px] pt-[10px] xl:w-[242px]">
                    <div class="absolute right-[12px] top-[10px]">
                      <svg class="h-[40px] w-[40px]" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                        <path d="m20 3 3.2 9.3 9.5 3.3-9.5 3.4L20 28.2l-3.3-9.2-9.4-3.4 9.4-3.3L20 3Z" fill="#111" />
                        <path d="m33 5 1.8 5.2 5.2 1.8-5.2 1.9-1.8 5.1-1.9-5.1-5.1-1.9 5.1-1.8L33 5Z" fill="#111" />
                        <path d="m9.5 22 1.5 4.1 4.1 1.5-4.1 1.5-1.5 4.1-1.5-4.1L4 27.6l4-1.5 1.5-4.1Z" fill="#111" />
                      </svg>
                    </div>
                    <p class="text-[20px] font-bold leading-none text-black">Class</p>
                    <p class="mt-[18px] text-[40px] font-bold leading-none text-[#0084ff]">{{ classroom.students }}</p>
                    <p class="mt-[16px] text-[16px] font-bold leading-none text-black">Students enrolled</p>
                  </div>

                  <div class="mt-[16px] h-[150px] w-full rounded-[23px] border border-[#bdbdbd] bg-white px-[12px] pt-[10px] xl:w-[242px]">
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <p class="text-[16px] font-bold leading-none text-black">Notify participation</p>
                        <p class="mt-[8px] w-[150px] text-[14px] font-medium leading-[1.18] text-black">
                          upcoming participation opportunities or engagement updates.
                        </p>
                      </div>
                      <svg class="mt-[2px] h-[38px] w-[32px] text-[#f2cb4d]" viewBox="0 0 32 38" fill="none" aria-hidden="true">
                        <path d="M16 3c-4.4 0-8 3.6-8 8v5.5c0 1.3-.4 2.6-1.3 3.6L4 23h24l-2.7-2.9c-.9-1-1.3-2.3-1.3-3.6V11c0-4.4-3.6-8-8-8Z" fill="currentColor" />
                        <path d="M12 28a4 4 0 0 0 8 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                      </svg>
                    </div>
                    <button
                      type="button"
                      class="interactive-secondary-button ml-auto mt-[14px] flex h-[37px] w-[93px] items-center justify-center rounded-[35px] border border-black text-[14px] font-medium text-[#1188f8] disabled:cursor-not-allowed disabled:opacity-60"
                      :disabled="isSendingParticipationUpdate"
                      @click="handleNotifyParticipation"
                    >
                      {{ isSendingParticipationUpdate ? 'Sending...' : 'Notify' }}
                    </button>
                    <p
                      v-if="notifyParticipationStatus"
                      class="mt-[10px] text-right text-[12px] font-semibold leading-[1.25]"
                      :class="notifyParticipationStatusError ? 'text-[#b81717]' : 'text-[#1188f8]'"
                    >
                      {{ notifyParticipationStatus }}
                    </p>
                  </div>
                </div>

                <div class="min-w-0 w-full flex-1 pt-0 xl:w-[946px] xl:pt-[11px]">
                  <div class="flex flex-col gap-4 md:flex-row md:flex-wrap xl:flex-nowrap xl:items-center xl:gap-[23px]">
                    <button
                      type="button"
                      class="interactive-primary-button flex w-full items-center justify-center gap-[16px] rounded-[60px] bg-gradient-to-r from-[#1188f8] via-[#2490fa] to-[#57a5ff] font-bold text-white md:flex-1 xl:flex-none"
                      :class="isSessionActive ? 'h-[82px] text-[18px] sm:text-[20px] xl:h-[95px] xl:w-[393px] xl:text-[22px]' : 'h-[72px] text-[18px] sm:text-[20px] xl:h-[76px] xl:w-[324px] xl:text-[24px]'"
                      @click="openScanModal"
                    >
                      <svg class="h-[36px] w-[36px] sm:h-[40px] sm:w-[40px] xl:h-[44px] xl:w-[44px]" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                        <rect x="4" y="4" width="9" height="9" rx="1.5" stroke="white" stroke-width="3" />
                        <rect x="4" y="31" width="9" height="9" rx="1.5" stroke="white" stroke-width="3" />
                        <rect x="31" y="4" width="9" height="9" rx="1.5" stroke="white" stroke-width="3" />
                        <path d="M22 5v9M18 9h8M22 20v5M22 29v9M18 34h7M31 22h9M31 30h5M5 22h9M9 18v8" stroke="white" stroke-width="3" stroke-linecap="round" />
                      </svg>
                      <span>Scan Participation</span>
                    </button>

                    <button
                      type="button"
                      class="interactive-primary-button flex w-full items-center justify-center gap-[16px] rounded-[60px] bg-gradient-to-l from-[#1188f8] via-[#2490fa] to-[#57a5ff] font-bold text-white md:flex-1 xl:flex-none"
                      :class="isSessionActive ? 'h-[82px] text-[18px] sm:text-[20px] xl:h-[95px] xl:w-[385px] xl:text-[22px]' : 'h-[72px] text-[18px] sm:text-[20px] xl:h-[76px] xl:w-[324px] xl:text-[20px]'"
                      @click="openPickNextStudentModal"
                    >
                      <svg class="h-[34px] w-[34px] sm:h-[38px] sm:w-[38px] xl:h-[42px] xl:w-[42px]" viewBox="0 0 42 42" fill="none" aria-hidden="true">
                        <path d="M8 12h22M22 6l6 6-6 6M34 28H12M18 22l-6 6 6 6" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <span>Pick Next Student</span>
                    </button>
                  </div>

                  <template v-if="isSessionActive">
                    <div class="mt-[16px] w-full rounded-[32px] bg-[#f6f6f6] px-4 py-4 sm:px-5 xl:h-[244px] xl:px-[20px] xl:py-[16px]">
                      <div class="grid h-full grid-cols-1 gap-y-4 xl:grid-cols-[276px_1fr] xl:gap-x-[18px] xl:gap-y-0">
                        <div class="relative pl-[16px] pt-[2px]">
                          <div class="absolute left-[0px] top-[0px] h-full w-[3px] rounded-full bg-[#1188f8]" />
                          <div class="flex items-start gap-[12px]">
                            <div class="grid h-[52px] w-[54px] place-items-center rounded-[14px] bg-[#50d24a]">
                              <img :src="imgLearning" alt="" class="h-[34px] w-[30px]" />
                            </div>
                            <div>
                              <p class="text-[27px] font-bold leading-none text-black">{{ activeSessionTitle }}</p>
                              <p class="mt-[8px] text-[20px] font-semibold leading-none text-[#4a4a4a]">{{ activeSessionDateLabel }}</p>
                            </div>
                          </div>

                          <div class="mt-[18px] flex min-h-[61px] w-full max-w-[275px] items-center rounded-[9px] bg-[#d9d9d9] px-[14px] py-3 text-[18px] font-bold text-black sm:text-[20px]">
                            <span>Student Participated:</span>
                            <span class="ml-[8px] text-[#1188f8]">{{ activeSessionParticipantCount }}</span>
                          </div>
                        </div>

                        <div class="relative min-w-0 border-t border-[#8d8d8d] pt-4 xl:border-l xl:border-t-0 xl:pl-[24px] xl:pt-[4px]">
                          <div class="flex items-center gap-[8px]">
                            <button
                              type="button"
                              class="interactive-icon-button grid h-[28px] w-[28px] place-items-center rounded-full text-[#777] transition-colors hover:bg-[#e8edf3] hover:text-[#1188f8] disabled:cursor-not-allowed disabled:opacity-60"
                              :disabled="isRefreshingRecentEngagement"
                              aria-label="Refresh recent student engagement"
                              @click="refreshRecentStudentEngagement"
                            >
                              <svg
                                class="h-[20px] w-[20px]"
                                :class="isRefreshingRecentEngagement ? 'animate-spin text-[#1188f8]' : ''"
                                viewBox="0 0 20 20"
                                fill="none"
                                aria-hidden="true"
                              >
                                <path d="M10 3a7 7 0 1 0 6.2 3.75" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                                <path d="M10 1v4h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                            </button>
                            <p class="text-[18px] font-bold text-[#313131]">Recent Student Engagement</p>
                          </div>

                          <div v-if="recentStudents.length" class="mt-[14px] space-y-[10px]">
                            <div v-for="student in recentStudents" :key="student.id" class="flex h-[47px] items-center justify-between rounded-[28px] border border-[#cccdce] bg-[#fdfdfd] px-[10px]">
                              <div class="flex min-w-0 items-center gap-[12px]">
                                <img :src="student.avatarSrc" alt="" class="h-[30px] w-[30px] rounded-full border-2 border-black object-cover" />
                                <span class="truncate text-[15px] font-medium text-black">{{ student.name }}</span>
                              </div>
                              <div class="flex h-[35px] w-[73px] items-center justify-center rounded-[14px] bg-[#cfe3fb] text-[20px] font-bold text-black">
                                + {{ student.points }}
                              </div>
                            </div>
                          </div>
                          <p v-else class="mt-[14px] text-[14px] font-medium text-[#666]">No students scanned in this session yet.</p>

                          <div class="mt-[18px] flex justify-start xl:justify-end xl:pr-[8px]">
                            <button type="button" class="interactive-secondary-button h-[42px] w-[154px] rounded-[16.5px] border border-[#535353] bg-white text-[15px] font-semibold text-[#1188f8]">
                              End Session
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="mt-[20px] w-full rounded-[32px] bg-[#f6f6f6] px-5 py-8 sm:px-8 xl:mt-[29px] xl:h-[191px] xl:px-[32px] xl:py-[25px]">
                      <div class="flex h-full flex-col items-center justify-center">
                        <img :src="imgPresentationScreen" alt="" class="h-[48px] w-[65px]" />
                        <p class="mt-[14px] text-center text-[18px] font-medium text-[#202020] sm:text-[20px]">
                          Click &quot;Start Session&quot; to begin tracking student engagement.
                        </p>
                        <button
                          type="button"
                          class="interactive-secondary-button mt-[10px] flex h-[42px] w-[194px] items-center justify-center rounded-[16.5px] border border-[#535353] bg-white text-[18px] font-semibold text-[#1188f8] sm:text-[20px]"
                          @click="startSession"
                        >
                          Start Session
                        </button>
                      </div>
                    </div>
                  </template>

                  <div class="mt-[12px] flex">
                    <button
                      type="button"
                      class="interactive-card-button flex min-h-[84px] w-full max-w-[374px] items-center rounded-[32px] border border-[#cccdce] bg-[#f6f6f6] px-[18px] py-3 text-left transition-colors hover:bg-[#eef6ff]"
                      @click="openRecentParticipationLog"
                    >
                      <div class="mr-[14px] grid h-[57px] w-[64px] place-items-center rounded-[14px] bg-[#50d24a]">
                        <img :src="imgLearning" alt="" class="h-[38px] w-[32px]" />
                      </div>
                      <div class="min-w-0">
                        <p class="truncate text-[22px] font-bold leading-none text-black sm:text-[24px]">
                          {{ latestParticipationTitle }}
                        </p>
                        <p class="mt-[10px] text-[16px] font-semibold leading-none text-[#4a4a4a]">
                          {{ latestParticipationSubtitle }}
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              </template>

              <template v-else-if="currentTab === 'class-list'">
                <div class="mt-[18px] space-y-[22px]">
                  <div class="rounded-[31px] bg-[#f6f6f6] px-[22px] pb-[22px] pt-[18px]">
                    <div class="mx-auto flex h-[53px] w-fit items-center justify-center bg-[#d9d9d9] px-[32px]">
                      <p class="text-[24px] font-semibold text-black">Blackboard / Whiteboard</p>
                    </div>

                    <div class="mt-[22px] grid gap-[20px] xl:grid-cols-2">
                      <div class="space-y-[14px]">
                        <div
                          v-for="(row, rowIndex) in deskRowsLeft"
                          :key="`left-${rowIndex}`"
                          class="grid gap-[10px] rounded-[24px] bg-[#eef1f2] px-[16px] py-[9px]"
                          :style="{ gridTemplateColumns: `repeat(${Math.max(row.length, 1)}, minmax(0, 1fr))` }"
                        >
                          <div
                            v-for="seat in row"
                            :key="seat.id"
                            class="flex h-[69px] min-w-0 flex-col items-center justify-start rounded-[12px] border border-[#cccdce] bg-[#f8f8f8] pt-[2px] transition"
                            :class="isSeatEditMode && !isLayoutLocked ? 'cursor-move hover:border-[#1188f8] hover:bg-[#eef6ff]' : ''"
                            :draggable="isSeatEditMode && !isLayoutLocked && !!seat.studentId"
                            @dragstart="handleSeatDragStart(seat, 'left', rowIndex, row.indexOf(seat))"
                            @dragend="clearDraggedSeat"
                            @dragover.prevent
                            @drop="handleSeatDrop('left', rowIndex, row.indexOf(seat))"
                          >
                            <template v-if="seat.studentId">
                              <img :src="getSeatStudent(seat)?.avatarSrc || resolveStudentAvatar()" alt="" class="h-[41px] w-[43px] rounded-full object-cover" />
                              <p class="mt-[2px] max-w-[56px] truncate text-[10px] font-medium leading-none text-black">{{ getSeatLabel(seat) }}</p>
                            </template>
                          </div>
                        </div>
                      </div>

                      <div class="space-y-[14px]">
                        <div
                          v-for="(row, rowIndex) in deskRowsRight"
                          :key="`right-${rowIndex}`"
                          class="grid gap-[10px] rounded-[24px] bg-[#eef1f2] px-[16px] py-[9px]"
                          :style="{ gridTemplateColumns: `repeat(${Math.max(row.length, 1)}, minmax(0, 1fr))` }"
                        >
                          <div
                            v-for="seat in row"
                            :key="seat.id"
                            class="flex h-[69px] min-w-0 flex-col items-center justify-start rounded-[12px] border border-[#cccdce] bg-[#f8f8f8] pt-[2px] transition"
                            :class="isSeatEditMode && !isLayoutLocked ? 'cursor-move hover:border-[#1188f8] hover:bg-[#eef6ff]' : ''"
                            :draggable="isSeatEditMode && !isLayoutLocked && !!seat.studentId"
                            @dragstart="handleSeatDragStart(seat, 'right', rowIndex, row.indexOf(seat))"
                            @dragend="clearDraggedSeat"
                            @dragover.prevent
                            @drop="handleSeatDrop('right', rowIndex, row.indexOf(seat))"
                          >
                            <template v-if="seat.studentId">
                              <img :src="getSeatStudent(seat)?.avatarSrc || resolveStudentAvatar()" alt="" class="h-[41px] w-[43px] rounded-full object-cover" />
                              <p class="mt-[2px] max-w-[56px] truncate text-[10px] font-medium leading-none text-black">{{ getSeatLabel(seat) }}</p>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex justify-center">
                    <div class="flex flex-col items-center gap-3">
                      <div class="flex flex-wrap items-center justify-center gap-3">
                        <button
                          type="button"
                          class="flex h-[61px] min-w-[213px] items-center justify-center rounded-[33.5px] bg-[#1188f8] px-[26px] text-[24px] font-semibold text-white"
                          @click="toggleSeatEditMode"
                        >
                          {{ isSeatEditMode ? 'Finish Seat Edit' : 'Change Seat' }}
                        </button>
                        <button
                          type="button"
                          class="flex h-[61px] min-w-[213px] items-center justify-center rounded-[33.5px] border-2 border-[#1188f8] bg-white px-[26px] text-[22px] font-semibold text-[#1188f8] disabled:opacity-60"
                          :disabled="isSavingSeatLayout"
                          @click="saveSeatLayoutNow"
                        >
                          {{ isSavingSeatLayout ? 'Saving...' : 'Save Layout' }}
                        </button>
                      </div>
                      <p
                        v-if="seatLayoutSaveStatus"
                        class="text-[16px] font-medium"
                        :class="seatLayoutSaveError ? 'text-[#b81717]' : 'text-[#1188f8]'"
                      >
                        {{ seatLayoutSaveStatus }}
                      </p>
                    </div>
                  </div>

                  <div
                    v-if="isSeatEditMode"
                    class="rounded-[28px] bg-[#f6f6f6] px-[18px] py-[16px]"
                  >
                    <div class="grid gap-[10px] md:grid-cols-2 xl:grid-cols-5">
                      <button type="button" class="flex h-[56px] w-full items-center rounded-[28px] bg-[#fdfdfd] px-[22px] text-left shadow-[0_1px_4px_rgba(0,0,0,0.05)]" @click="addDesk">
                        <span class="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#2bc848] text-white">
                          <svg class="h-[14px] w-[14px]" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
                          </svg>
                        </span>
                        <span class="ml-[14px] text-[20px] font-semibold text-black">Add Desk</span>
                      </button>
                      <button type="button" class="flex h-[56px] w-full items-center rounded-[28px] bg-[#fdfdfd] px-[22px] text-left shadow-[0_1px_4px_rgba(0,0,0,0.05)]" @click="removeDesk">
                        <span class="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#ed5a5a] text-white">
                          <svg class="h-[14px] w-[14px]" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
                          </svg>
                        </span>
                        <span class="ml-[14px] text-[20px] font-semibold text-black">Remove Desk</span>
                      </button>
                      <button type="button" class="flex h-[56px] w-full items-center rounded-[28px] bg-[#fdfdfd] px-[22px] text-left shadow-[0_1px_4px_rgba(0,0,0,0.05)]" @click="resetDeskLayout">
                        <svg class="h-[34px] w-[34px] text-[#707070]" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                          <path d="M17 5a12 12 0 1 1-8.5 3.5" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" />
                          <path d="M10 4v8h8" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span class="ml-[14px] text-[20px] font-semibold text-black">Reset Desk</span>
                      </button>
                      <button type="button" class="flex h-[56px] w-full items-center rounded-[28px] bg-[#fdfdfd] px-[22px] text-left shadow-[0_1px_4px_rgba(0,0,0,0.05)]" @click="toggleLayoutLock">
                        <svg class="h-[34px] w-[34px]" :class="isLayoutLocked ? 'text-[#1188f8]' : 'text-[#707070]'" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                          <rect x="9" y="15" width="16" height="12" rx="2" stroke="currentColor" stroke-width="2.6" />
                          <path d="M13 15V11a4 4 0 1 1 8 0v4" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" />
                        </svg>
                        <span class="ml-[14px] text-[20px] font-semibold text-black">{{ isLayoutLocked ? 'Unlock Layout' : 'Lock Layout' }}</span>
                      </button>
                      <div class="flex h-[56px] items-center rounded-[28px] bg-[#fdfdfd] px-[22px] text-left shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
                        <svg class="h-[34px] w-[34px] text-[#1188f8]" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                          <path d="m24.6 7.8 1.6 1.6c.8.8.8 2 0 2.8L15.8 22.6l-4.8 1.1 1.1-4.8L22.5 8.6c.8-.8 2-.8 2.8 0Z" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M10 26.5h14" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" />
                        </svg>
                        <span class="ml-[14px] text-[20px] font-semibold text-black">{{ isLayoutLocked ? 'Layout Locked' : 'Drag students to move seats' }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="grid gap-[18px] xl:grid-cols-[242px_minmax(0,1fr)] xl:gap-[26px]">
                    <div class="space-y-[18px]">
                      <div class="rounded-[23px] border border-[#bdbdbd] bg-white px-[16px] py-[12px]">
                        <p class="text-[20px] font-bold text-black">Teacher</p>
                        <div class="mt-[12px] flex items-center gap-[12px]">
                          <img :src="teacherPhoto" alt="" class="h-[56px] w-[56px] rounded-full object-cover" />
                          <div class="min-w-0">
                            <p class="truncate text-[18px] font-semibold text-black">{{ teacherName }}</p>
                            <p class="text-[15px] font-medium text-black">{{ teacherRole }}</p>
                          </div>
                        </div>
                      </div>

                      <div class="relative rounded-[23px] border border-[#bdbdbd] bg-white px-[18px] py-[12px]">
                        <div class="absolute right-[12px] top-[10px]">
                          <svg class="h-[40px] w-[40px]" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                            <path d="m20 3 3.2 9.3 9.5 3.3-9.5 3.4L20 28.2l-3.3-9.2-9.4-3.4 9.4-3.3L20 3Z" fill="#111" />
                            <path d="m33 5 1.8 5.2 5.2 1.8-5.2 1.9-1.8 5.1-1.9-5.1-5.1-1.9 5.1-1.8L33 5Z" fill="#111" />
                            <path d="m9.5 22 1.5 4.1 4.1 1.5-4.1 1.5-1.5 4.1-1.5-4.1L4 27.6l4-1.5 1.5-4.1Z" fill="#111" />
                          </svg>
                        </div>
                        <p class="text-[20px] font-bold text-black">Class</p>
                        <p class="mt-[10px] text-[40px] leading-none font-bold text-[#0084ff]">{{ classroom.students }}</p>
                        <p class="mt-[10px] text-[16px] font-bold text-black">Students enrolled</p>
                      </div>
                    </div>

                    <div class="rounded-[20px] border border-[#969696] bg-white px-[22px] py-[18px]">
                      <p class="text-[24px] font-bold text-black">Class List</p>

                      <div class="mt-[18px] grid gap-x-[38px] gap-y-[7px] md:grid-cols-2 xl:grid-cols-3">
                        <div
                          v-for="(column, columnIndex) in classListColumns"
                          :key="`column-${columnIndex}`"
                          class="space-y-[7px]"
                        >
                          <div
                            v-for="(student, rowIndex) in column"
                            :key="student?.id || `empty-row-${columnIndex}-${rowIndex}`"
                            class="flex min-h-[56px] items-center gap-[12px]"
                          >
                            <template v-if="student">
                              <img :src="student.avatarSrc" alt="" class="h-[46px] w-[46px] rounded-full object-cover" />
                              <span
                                class="text-[20px] font-medium text-black"
                                :class="isSeatEditMode && !isLayoutLocked ? 'cursor-grab' : ''"
                                :draggable="isSeatEditMode && !isLayoutLocked"
                                @dragstart="handleRosterDragStart(student)"
                                @dragend="clearDraggedSeat"
                              >{{ student.name }}</span>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="mt-[18px] space-y-[18px]">
                  <div class="flex flex-col overflow-hidden rounded-[17px] px-4 py-4 text-white sm:px-6 lg:h-[178px] lg:px-[25px] lg:py-[22px]" :style="{ backgroundImage: classroom.gradient }">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <p class="text-[30px] font-semibold leading-none sm:text-[36px]">{{ classroom.subject }}</p>
                        <p class="mt-[12px] text-[20px] font-medium leading-none sm:text-[24px]">{{ classroom.gradeLevel }} | {{ classroom.classLabel }}</p>
                      </div>
                      <div class="rounded-[22px] bg-white/20 px-4 py-3 text-right backdrop-blur-sm">
                        <p class="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/80">Queue Status</p>
                        <p class="mt-1 text-[22px] font-bold leading-none">{{ classAnalytics.statusLabel }}</p>
                      </div>
                    </div>
                    <p class="mt-auto pt-10 text-[18px] font-medium leading-none sm:text-[20px]">
                      {{ classroom.scheduleLabel }} &bull; {{ classroom.time }}
                    </p>
                  </div>

                  <div class="grid gap-[16px] md:grid-cols-2 xl:grid-cols-4">
                    <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                      <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">Engagement Score</p>
                      <p class="mt-3 text-[42px] font-bold leading-none text-[#1188f8]">{{ classAnalytics.averageScore }}%</p>
                      <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">{{ classAnalytics.confidenceLabel }}</p>
                    </article>
                    <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                      <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">Next Session Forecast</p>
                      <p class="mt-3 text-[42px] font-bold leading-none text-black">{{ classAnalytics.predictedNextParticipants }}</p>
                      <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">likely participants</p>
                    </article>
                    <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                      <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">At-Risk Students</p>
                      <p class="mt-3 text-[42px] font-bold leading-none text-[#b81717]">{{ classAnalytics.atRiskStudents }}</p>
                      <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">need a participation prompt</p>
                    </article>
                    <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                      <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">Avg. Points</p>
                      <p class="mt-3 text-[42px] font-bold leading-none text-black">{{ classAnalytics.averagePoints }}</p>
                      <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">per enrolled student</p>
                    </article>
                  </div>

                  <div class="grid gap-[18px] xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                    <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                      <div class="flex items-start justify-between gap-4">
                        <div>
                          <h2 class="text-[24px] font-bold leading-none text-black">Participation Trend</h2>
                          <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">Participants and points captured across recent sessions.</p>
                        </div>
                        <div class="rounded-[16px] bg-[#f6f6f6] px-4 py-3 text-right">
                          <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Tracked Sessions</p>
                          <p class="mt-1 text-[24px] font-bold leading-none text-[#1188f8]">{{ classAnalytics.totalSessions }}</p>
                        </div>
                      </div>
                      <div class="mt-5 h-[280px]">
                        <ParticipationChart type="line" :data="teacherTrendChartData" :options="teacherChartAxisOptions" />
                      </div>
                    </section>

                    <section class="grid gap-[18px]">
                      <article class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                        <h2 class="text-[24px] font-bold leading-none text-black">Risk Distribution</h2>
                        <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">A quick view of which students need attention next.</p>
                        <div class="mt-5 h-[280px]">
                          <ParticipationChart type="doughnut" :data="teacherRiskChartData" :options="teacherRiskChartOptions" />
                        </div>
                      </article>
                    </section>
                  </div>

                  <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 class="text-[24px] font-bold leading-none text-black">Participation Leaders</h2>
                        <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">Students with the highest participation points so far.</p>
                      </div>
                      <div class="rounded-[16px] bg-[#f6f6f6] px-4 py-3 text-right">
                        <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Total Points</p>
                        <p class="mt-1 text-[24px] font-bold leading-none text-[#1188f8]">{{ classAnalytics.totalPoints }}</p>
                      </div>
                    </div>
                    <div class="mt-5 h-[280px]">
                      <ParticipationChart type="bar" :data="teacherTopStudentsChartData" :options="teacherTopStudentsChartOptions" />
                    </div>
                  </section>

                  <div class="grid gap-[18px] xl:grid-cols-[minmax(0,1fr)_360px]">
                    <section class="rounded-[28px] bg-[#f6f6f6] px-4 py-4 sm:px-6">
                      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h2 class="text-[28px] font-bold leading-none text-black">Priority Students</h2>
                          <p class="mt-2 text-[16px] font-medium text-[#4a4a4a]">Ranked highest in the participation priority queue, including seat environment.</p>
                        </div>
                        <div class="rounded-[18px] bg-white px-4 py-3 text-center">
                          <p class="text-[28px] font-bold leading-none text-[#1188f8]">{{ classAnalytics.participationRate }}%</p>
                          <p class="mt-1 text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">active rate</p>
                        </div>
                      </div>

                      <div v-if="priorityQueuePreview.length" class="mt-5 space-y-[10px]">
                        <div
                          v-for="student in priorityQueuePreview"
                          :key="student.id"
                          class="flex flex-col gap-3 rounded-[18px] border border-[#d5d5d5] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div class="flex min-w-0 items-center gap-3">
                            <img :src="student.avatarSrc" alt="" class="h-[46px] w-[46px] rounded-full object-cover" />
                            <div class="min-w-0">
                              <div class="flex flex-wrap items-center gap-2">
                                <p class="truncate text-[18px] font-bold text-black">{{ student.name }}</p>
                                <span class="rounded-full bg-[#e9f3ff] px-2 py-1 text-[11px] font-bold text-[#1188f8]">#{{ student.queuePosition }}</span>
                              </div>
                              <p class="truncate text-[14px] font-medium text-[#5b5b5b]">{{ student.reasons[0] }}</p>
                              <p class="mt-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#7b7b7b]">{{ student.seatZoneLabel }}</p>
                            </div>
                          </div>
                          <div class="flex items-center gap-3 sm:shrink-0">
                            <div class="h-[8px] w-[120px] overflow-hidden rounded-full bg-[#e6e6e6]">
                              <div class="h-full rounded-full" :style="getHeatmapBarStyle(student.priorityScore)" />
                            </div>
                            <span class="w-[92px] text-right text-[15px] font-bold text-[#1188f8]">{{ Math.round(student.priorityScore) }}</span>
                          </div>
                        </div>
                      </div>

                      <div v-else class="mt-5 rounded-[18px] border border-dashed border-[#bdbdbd] bg-white px-5 py-8 text-center text-[17px] font-semibold text-[#5d5d5d]">
                        No enrolled students yet. Once students join and participate, queue recommendations will appear here.
                      </div>
                    </section>

                    <aside class="space-y-[18px]">
                      <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                        <h2 class="text-[24px] font-bold leading-none text-black">Recommended Action</h2>
                        <p class="mt-4 text-[16px] font-medium leading-[1.35] text-[#333]">
                          Start the next session by scanning low-score or high-friction seats first, then use "Pick Next Student" to rotate through the rest of the queue.
                        </p>
                        <button
                          type="button"
                          class="mt-5 flex h-[50px] w-full items-center justify-center rounded-[25px] bg-[#1188f8] text-[17px] font-bold text-white"
                          @click="setTab('class')"
                        >
                          Go to Session Tools
                        </button>
                      </section>

                      <section id="recent-participation-log" class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                        <h2 class="text-[24px] font-bold leading-none text-black">Recent Participation Log</h2>
                        <div v-if="classAnalytics.recentHighlights.length" class="mt-4 space-y-[10px]">
                          <div
                            v-for="event in classAnalytics.recentHighlights"
                            :key="event.id"
                            class="flex items-center justify-between rounded-[16px] bg-[#f6f6f6] px-4 py-3"
                          >
                            <div class="min-w-0">
                              <p class="truncate text-[16px] font-semibold text-black">{{ event.name }}</p>
                              <p class="mt-1 text-[13px] font-medium text-[#6b6b6b]">{{ event.label }}</p>
                            </div>
                            <span class="ml-3 text-[16px] font-bold text-[#1188f8]">+{{ event.points }}</span>
                          </div>
                        </div>
                        <p v-else class="mt-4 text-[16px] font-medium text-[#5d5d5d]">No participation events yet.</p>
                      </section>
                    </aside>
                  </div>

                  <section class="grid gap-[18px] xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                    <article class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h2 class="text-[24px] font-bold leading-none text-black">Selection Coverage</h2>
                          <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">
                            Fairness and participation coverage across the current class roster.
                          </p>
                        </div>
                        <div class="rounded-[16px] bg-[#f6f6f6] px-4 py-3 text-right">
                          <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Selection Gap</p>
                          <p class="mt-1 text-[24px] font-bold leading-none text-[#1188f8]">{{ classAnalytics.selectionGap }}</p>
                        </div>
                      </div>

                      <div class="mt-5 grid gap-[14px] sm:grid-cols-2">
                        <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                          <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Coverage Rate</p>
                          <p class="mt-3 text-[34px] font-bold leading-none text-[#1188f8]">{{ classAnalytics.coverageRate }}%</p>
                          <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">students called at least once</p>
                        </div>

                        <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                          <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Fairness Score</p>
                          <p class="mt-3 text-[34px] font-bold leading-none text-black">{{ classAnalytics.fairnessScore }}</p>
                          <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">{{ classAnalytics.fairnessLabel }}</p>
                        </div>

                        <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                          <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Weekly Participation</p>
                          <p class="mt-3 text-[34px] font-bold leading-none text-black">{{ classAnalytics.weeklyFrequency.events }}</p>
                          <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">
                            {{ classAnalytics.weeklyFrequency.participants }} students joined in the last 7 days
                          </p>
                        </div>

                        <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                          <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Monthly Participation</p>
                          <p class="mt-3 text-[34px] font-bold leading-none text-black">{{ classAnalytics.monthlyFrequency.events }}</p>
                          <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">
                            {{ classAnalytics.monthlyFrequency.participants }} students joined in the last 30 days
                          </p>
                        </div>
                      </div>
                    </article>

                    <article class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                      <div>
                        <h2 class="text-[24px] font-bold leading-none text-black">Participation Watchlists</h2>
                        <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">
                          Quick lists for thesis reporting, intervention, and fair student rotation.
                        </p>
                      </div>

                      <div class="mt-5 grid gap-[14px] md:grid-cols-3">
                        <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                          <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Waiting Longest</p>
                          <div v-if="classAnalytics.waitingStudents.length" class="mt-3 space-y-[10px]">
                            <div
                              v-for="student in classAnalytics.waitingStudents.slice(0, 4)"
                              :key="`waiting-${student.id}`"
                              class="rounded-[16px] bg-white px-3 py-3"
                            >
                              <p class="truncate text-[15px] font-bold text-black">{{ student.name }}</p>
                              <p class="mt-1 text-[12px] font-medium text-[#5d5d5d]">
                                {{ student.sessionsSinceLastParticipation }} sessions since last turn
                              </p>
                            </div>
                          </div>
                          <p v-else class="mt-3 text-[14px] font-medium text-[#5d5d5d]">No waiting data yet.</p>
                        </div>

                        <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                          <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Never Called Yet</p>
                          <div v-if="classAnalytics.neverCalledStudents.length" class="mt-3 space-y-[10px]">
                            <div
                              v-for="student in classAnalytics.neverCalledStudents.slice(0, 4)"
                              :key="`never-${student.id}`"
                              class="rounded-[16px] bg-white px-3 py-3"
                            >
                              <p class="truncate text-[15px] font-bold text-black">{{ student.name }}</p>
                              <p class="mt-1 text-[12px] font-medium text-[#5d5d5d]">Needs first participation opportunity</p>
                            </div>
                          </div>
                          <p v-else class="mt-3 text-[14px] font-medium text-[#5d5d5d]">Everyone has been called at least once.</p>
                        </div>

                        <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                          <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Least Active</p>
                          <div v-if="classAnalytics.leastActiveStudents.length" class="mt-3 space-y-[10px]">
                            <div
                              v-for="student in classAnalytics.leastActiveStudents.slice(0, 4)"
                              :key="`least-${student.id}`"
                              class="rounded-[16px] bg-white px-3 py-3"
                            >
                              <p class="truncate text-[15px] font-bold text-black">{{ student.name }}</p>
                              <p class="mt-1 text-[12px] font-medium text-[#5d5d5d]">
                                {{ student.sessions }} sessions &bull; {{ student.points }} points
                              </p>
                            </div>
                          </div>
                          <p v-else class="mt-3 text-[14px] font-medium text-[#5d5d5d]">No participation data yet.</p>
                        </div>
                      </div>

                      <div class="mt-4 rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                        <div class="flex items-center justify-between gap-4">
                          <div>
                            <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Most Active Students</p>
                            <p class="mt-1 text-[14px] font-medium text-[#5b5b5b]">Useful for top participant and performance reporting.</p>
                          </div>
                        </div>
                        <div v-if="classAnalytics.mostActiveStudents.length" class="mt-3 grid gap-[10px] sm:grid-cols-2">
                          <div
                            v-for="student in classAnalytics.mostActiveStudents.slice(0, 4)"
                            :key="`most-${student.id}`"
                            class="rounded-[16px] bg-white px-3 py-3"
                          >
                            <p class="truncate text-[15px] font-bold text-black">{{ student.name }}</p>
                            <p class="mt-1 text-[12px] font-medium text-[#5d5d5d]">
                              {{ student.sessions }} sessions &bull; {{ student.points }} points
                            </p>
                          </div>
                        </div>
                        <p v-else class="mt-3 text-[14px] font-medium text-[#5d5d5d]">No participation data yet.</p>
                      </div>
                    </article>
                  </section>

                  <section class="grid gap-[18px] xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                    <article class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h2 class="text-[24px] font-bold leading-none text-black">Engagement Timing</h2>
                          <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">
                            Best and quietest participation windows based on recorded recitation activity.
                          </p>
                        </div>
                        <div class="rounded-[16px] bg-[#f6f6f6] px-4 py-3 text-right">
                          <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Activity Signal</p>
                          <p class="mt-1 text-[24px] font-bold leading-none text-[#1188f8]">
                            {{ classAnalytics.timingInsights.peakDay.events }}
                          </p>
                        </div>
                      </div>

                      <div class="mt-5 grid gap-[14px] sm:grid-cols-2">
                        <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                          <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Peak Day</p>
                          <p class="mt-3 text-[30px] font-bold leading-none text-black">{{ classAnalytics.timingInsights.peakDay.label }}</p>
                          <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">
                            {{ classAnalytics.timingInsights.peakDay.events }} events and
                            {{ classAnalytics.timingInsights.peakDay.participants }} active students
                          </p>
                        </div>

                        <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                          <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Quiet Day</p>
                          <p class="mt-3 text-[30px] font-bold leading-none text-black">{{ classAnalytics.timingInsights.quietDay.label }}</p>
                          <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">
                            {{ classAnalytics.timingInsights.quietDay.events }} events and
                            {{ classAnalytics.timingInsights.quietDay.participants }} active students
                          </p>
                        </div>

                        <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                          <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Peak Time</p>
                          <p class="mt-3 text-[30px] font-bold leading-none text-black">{{ classAnalytics.timingInsights.peakHour.label }}</p>
                          <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">
                            {{ classAnalytics.timingInsights.peakHour.events }} events and
                            {{ classAnalytics.timingInsights.peakHour.points }} total points
                          </p>
                        </div>

                        <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                          <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Quiet Time</p>
                          <p class="mt-3 text-[30px] font-bold leading-none text-black">{{ classAnalytics.timingInsights.quietHour.label }}</p>
                          <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">
                            {{ classAnalytics.timingInsights.quietHour.events }} events and
                            {{ classAnalytics.timingInsights.quietHour.points }} total points
                          </p>
                        </div>
                      </div>
                    </article>

                    <article class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h2 class="text-[24px] font-bold leading-none text-black">Low Engagement Sessions</h2>
                          <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">
                            Sessions with the fewest participation events, helpful for thesis reporting and intervention planning.
                          </p>
                        </div>
                        <div class="rounded-[16px] bg-[#f6f6f6] px-4 py-3 text-right">
                          <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Reviewed</p>
                          <p class="mt-1 text-[24px] font-bold leading-none text-[#1188f8]">{{ classAnalytics.lowEngagementSessions.length }}</p>
                        </div>
                      </div>

                      <div v-if="classAnalytics.lowEngagementSessions.length" class="mt-5 space-y-[10px]">
                        <div
                          v-for="session in classAnalytics.lowEngagementSessions"
                          :key="session.id"
                          class="flex items-center justify-between gap-4 rounded-[18px] bg-[#f6f6f6] px-4 py-4"
                        >
                          <div class="min-w-0">
                            <p class="truncate text-[17px] font-bold text-black">{{ session.label }}</p>
                            <p class="mt-1 text-[13px] font-medium text-[#5d5d5d]">
                              {{ session.participants }} students | {{ session.points }} points
                            </p>
                          </div>
                          <span class="shrink-0 rounded-full bg-white px-3 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#b81717]">
                            low activity
                          </span>
                        </div>
                      </div>
                      <p v-else class="mt-5 text-[15px] font-medium text-[#5d5d5d]">No session history yet.</p>
                    </article>
                  </section>

                  <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h2 class="text-[24px] font-bold leading-none text-black">Class List Heatmap</h2>
                        <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">
                          Queue intensity blends participation need with seating-environment friction across the room.
                        </p>
                      </div>
                      <div class="flex flex-wrap items-center gap-3 text-[12px] font-semibold text-[#555]">
                        <div
                          v-for="legend in heatmapLegend"
                          :key="legend.label"
                          class="inline-flex items-center gap-2 rounded-full bg-[#f6f6f6] px-3 py-2"
                        >
                          <span class="h-[10px] w-[10px] rounded-full" :style="getHeatmapLegendDotStyle(legend.score)" />
                          <span>{{ legend.label }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="mt-5 grid gap-[18px] xl:grid-cols-[minmax(0,1.1fr)_360px]">
                      <section class="rounded-[24px] bg-[#f6f6f6] px-4 py-4 sm:px-5">
                        <div class="mx-auto flex h-[46px] w-fit items-center justify-center rounded-[14px] bg-[#d9d9d9] px-5 text-[16px] font-semibold text-black">
                          Blackboard / Whiteboard
                        </div>

                        <div class="mt-5 grid gap-[16px] xl:grid-cols-2">
                          <div class="space-y-[12px]">
                            <div
                              v-for="(row, rowIndex) in analyticsHeatmapRowsLeft"
                              :key="`analytics-left-${rowIndex}`"
                              class="grid gap-[10px] rounded-[24px] bg-white px-[16px] py-[10px]"
                              :style="{ gridTemplateColumns: `repeat(${Math.max(row.length, 1)}, minmax(0, 1fr))` }"
                            >
                              <div
                                v-for="seat in row"
                                :key="seat.id"
                                class="flex min-h-[82px] min-w-0 flex-col items-center rounded-[14px] border px-2 py-2 text-center"
                                :style="seat.student ? getHeatmapSeatStyle(seat.heatScore) : undefined"
                                :class="seat.student ? '' : 'border-[#d7d7d7] bg-[#fafafa]'"
                              >
                                <template v-if="seat.student">
                                  <div class="flex w-full items-start justify-between gap-2">
                                    <span class="inline-flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white/80 text-[11px] font-bold text-black">
                                      {{ getStudentInitials(seat.student.name) }}
                                    </span>
                                    <span class="rounded-full bg-white/75 px-2 py-[2px] text-[10px] font-bold text-[#0f172a]">
                                      #{{ seat.student.queuePosition || '-' }}
                                    </span>
                                  </div>
                                  <p class="mt-2 max-w-full truncate text-[10px] font-semibold leading-none text-black">{{ getSeatLabel(seat) }}</p>
                                  <p class="mt-2 text-[9px] font-bold uppercase tracking-[0.08em] text-[#334155]">
                                    {{ Math.round(seat.student.priorityScore) }} priority
                                  </p>
                                </template>
                              </div>
                            </div>
                          </div>

                          <div class="space-y-[12px]">
                            <div
                              v-for="(row, rowIndex) in analyticsHeatmapRowsRight"
                              :key="`analytics-right-${rowIndex}`"
                              class="grid gap-[10px] rounded-[24px] bg-white px-[16px] py-[10px]"
                              :style="{ gridTemplateColumns: `repeat(${Math.max(row.length, 1)}, minmax(0, 1fr))` }"
                            >
                              <div
                                v-for="seat in row"
                                :key="seat.id"
                                class="flex min-h-[82px] min-w-0 flex-col items-center rounded-[14px] border px-2 py-2 text-center"
                                :style="seat.student ? getHeatmapSeatStyle(seat.heatScore) : undefined"
                                :class="seat.student ? '' : 'border-[#d7d7d7] bg-[#fafafa]'"
                              >
                                <template v-if="seat.student">
                                  <div class="flex w-full items-start justify-between gap-2">
                                    <span class="inline-flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white/80 text-[11px] font-bold text-black">
                                      {{ getStudentInitials(seat.student.name) }}
                                    </span>
                                    <span class="rounded-full bg-white/75 px-2 py-[2px] text-[10px] font-bold text-[#0f172a]">
                                      #{{ seat.student.queuePosition || '-' }}
                                    </span>
                                  </div>
                                  <p class="mt-2 max-w-full truncate text-[10px] font-semibold leading-none text-black">{{ getSeatLabel(seat) }}</p>
                                  <p class="mt-2 text-[9px] font-bold uppercase tracking-[0.08em] text-[#334155]">
                                    {{ Math.round(seat.student.priorityScore) }} priority
                                  </p>
                                </template>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      <section class="space-y-[12px]">
                        <div
                          v-for="student in analyticsHeatmapStudents"
                          :key="student.id"
                          class="flex items-center justify-between gap-4 rounded-[20px] border px-4 py-3"
                          :style="getHeatmapRowStyle(student.priorityScore)"
                        >
                          <div class="min-w-0">
                            <div class="flex flex-wrap items-center gap-2">
                              <p class="truncate text-[17px] font-bold text-black">{{ student.name }}</p>
                              <span
                                v-if="student.queuePosition"
                                class="rounded-full bg-white/75 px-2 py-1 text-[11px] font-bold text-[#0f172a]"
                              >
                                #{{ student.queuePosition }}
                              </span>
                            </div>
                            <p class="mt-1 text-[13px] font-medium text-[#334155]">
                              {{ student.seatZoneLabel }} seat | {{ student.points }} pts | {{ student.sessions }} sessions
                            </p>
                            <p class="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#516072]">
                              environment boost +{{ student.seatEnvironmentBoost }}
                            </p>
                          </div>

                          <div class="shrink-0 text-right">
                            <p class="text-[18px] font-bold text-black">{{ Math.round(student.priorityScore) }}</p>
                            <p class="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#555]">priority</p>
                          </div>
                        </div>
                      </section>
                    </div>
                  </section>
                </div>
              </template>
            </template>
          </section>
        </main>
      </div>

      <div class="px-4 pb-6 sm:px-6 lg:hidden">
        <div class="flex items-center justify-center gap-8 rounded-[20px] border border-[#d9e8fb] bg-white px-4 py-3 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
          <button type="button" class="interactive-mobile-nav-button grid h-10 w-10 place-items-center rounded-[12px]" :class="currentTab !== 'analytics' ? 'bg-[rgba(46,130,239,0.25)]' : ''" aria-label="Classes" @click="router.push('/teacher')">
            <img :src="imgRectangle14" alt="" class="h-[24px] w-[30px]" :style="navIconStyle(currentTab !== 'analytics')" />
          </button>
          <button type="button" class="interactive-mobile-nav-button grid h-10 w-10 place-items-center rounded-[12px]" :class="currentTab === 'analytics' ? 'bg-[rgba(46,130,239,0.25)]' : ''" aria-label="Predictive analytics" @click="setTab('analytics')">
            <img :src="imgRectangle15" alt="" class="h-[28px] w-[26px]" :style="navIconStyle(currentTab === 'analytics')" />
          </button>
          <button type="button" class="interactive-mobile-nav-button grid h-10 w-10 place-items-center rounded-[12px]" aria-label="Archive" @click="router.push('/teacher/archive')">
            <img :src="imgRectangle16" alt="" class="h-[28px] w-[26px]" :style="inactiveNavIconStyle" />
          </button>
          <button type="button" class="interactive-mobile-nav-button grid h-10 w-10 place-items-center rounded-[12px]" aria-label="Settings" @click="openProfileModal">
            <img :src="imgRectangle18" alt="" class="h-[28px] w-[26px]" :style="inactiveNavIconStyle" />
          </button>
          <button type="button" class="interactive-mobile-nav-button grid h-10 w-10 place-items-center rounded-[12px]" aria-label="Logout" @click="handleLogout">
            <img :src="imgRectangle17" alt="" class="h-[28px] w-[26px]" :style="inactiveNavIconStyle" />
          </button>
        </div>
      </div>

      <transition name="fade">
        <div
          v-if="isPickNextStudentModalOpen"
          class="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(217,217,217,0.24)] px-4 py-8 backdrop-blur-[1px]"
          @click.self="closePickNextStudentModal"
        >
          <div class="relative w-full max-w-[720px] rounded-[22px] bg-white px-6 pb-7 pt-8 shadow-[0_4px_39.3px_2px_rgba(0,0,0,0.2)]">
            <button
              type="button"
              class="absolute right-[22px] top-[18px] text-[40px] leading-none text-black"
              aria-label="Close pick next student modal"
              @click="closePickNextStudentModal"
            >
              &times;
            </button>

            <h2 class="text-center text-[32px] leading-none font-bold text-black">Pick Next Student</h2>
            <p class="mx-auto mt-3 max-w-[440px] text-center text-[18px] leading-[1.2] font-medium text-[#5b5b5b]">
              The priority queue algorithm ranks who to call on next using participation balance, inactivity, class engagement trends, and seat environment.
            </p>

            <div v-if="selectedQueuedStudent" class="mt-8 rounded-[28px] border border-[#d8d8d8] bg-[#f8fbff] px-6 py-6">
              <div class="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <p class="text-[14px] font-semibold tracking-[0.16em] text-[#1188f8] uppercase">Next in Queue</p>
                  <p class="mt-2 text-[32px] leading-none font-bold text-black">{{ selectedQueuedStudent.name }}</p>
                  <p class="mt-3 text-[16px] font-medium text-[#4d4d4d]">
                    Priority score:
                    <span class="font-bold text-[#1188f8]">{{ Math.round(selectedQueuedStudent.priorityScore) }}</span>
                  </p>
                  <p class="mt-2 text-[15px] font-medium text-[#6b7280]">
                    Sessions since last turn: {{ selectedQueuedStudent.sessionsSinceLastParticipation }}
                  </p>
                  <p class="mt-2 text-[15px] font-medium text-[#6b7280]">
                    Seat zone: {{ selectedQueuedStudent.seatZoneLabel }}
                  </p>
                </div>

                <div class="rounded-[18px] bg-white px-4 py-3 text-left shadow-[0_4px_12px_rgba(17,136,248,0.08)]">
                  <p class="text-[14px] font-semibold text-[#111]">Why this student?</p>
                  <ul class="mt-2 space-y-2 text-[14px] font-medium text-[#4d4d4d]">
                    <li v-for="reason in selectedQueuedStudent.reasons" :key="reason" class="flex items-start gap-2">
                      <span class="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#1188f8]" />
                      <span>{{ reason }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="mt-6">
                <p class="text-[15px] font-semibold text-black">Award participation</p>
                <div class="mt-3 flex flex-wrap items-center gap-4">
                  <button
                    v-for="points in [1, 3, 5]"
                    :key="`predicted-${points}`"
                    type="button"
                    class="flex h-[62px] min-w-[120px] items-center justify-center rounded-[28px] bg-[#efefef] px-6 text-[28px] font-bold text-[#0084ff] transition-transform disabled:opacity-50"
                    :disabled="isSavingQueueParticipation"
                    @click="awardQueuedStudent(points)"
                  >
                    +{{ points }}
                  </button>
                </div>
              </div>

              <div class="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  class="rounded-[24px] border border-[#1188f8] px-5 py-3 text-[16px] font-semibold text-[#1188f8] disabled:opacity-50"
                  :disabled="queueRecommendation.candidateCount <= 1 || isSavingQueueParticipation"
                  @click="rerollQueuedStudent"
                >
                  Advance Queue
                </button>
                <p class="text-[14px] font-medium text-[#6b7280]">
                  {{ queueRecommendation.candidateCount }} students in queue
                </p>
              </div>

              <div v-if="queueRecommendation.alternatives.length" class="mt-6 rounded-[20px] border border-[#e4e4e4] bg-white px-4 py-4">
                <p class="text-[15px] font-semibold text-black">Next in Queue</p>
                <div class="mt-3 grid gap-3 md:grid-cols-3">
                  <div
                    v-for="student in queueRecommendation.alternatives"
                    :key="student.id"
                    class="rounded-[16px] border border-[#ececec] bg-[#fafafa] px-4 py-3"
                  >
                    <p class="truncate text-[16px] font-bold text-black">{{ student.name }}</p>
                    <p class="mt-1 text-[13px] font-medium text-[#1188f8]">
                      Priority {{ Math.round(student.priorityScore) }}
                    </p>
                    <p class="mt-1 text-[12px] font-medium text-[#6b7280]">
                      {{ student.reasons[0] }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="mt-8 rounded-[24px] border border-dashed border-[#d7d7d7] bg-[#f8f8f8] px-6 py-10 text-center">
              <p class="text-[20px] font-semibold text-black">No students are available for the queue yet.</p>
              <p class="mt-2 text-[15px] font-medium text-[#6b7280]">
                Add students to the class first so the priority queue has someone to rank.
              </p>
            </div>

            <p v-if="pickNextStudentError" class="mt-5 text-center text-[15px] font-semibold text-[#d11111]">{{ pickNextStudentError }}</p>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div
          v-if="isScanModalOpen"
          class="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(217,217,217,0.24)] px-4 py-8 backdrop-blur-[1px]"
          @click.self="closeScanModal"
        >
          <div class="relative w-full max-w-[551px] rounded-[22px] bg-white px-6 pb-7 pt-8 shadow-[0_4px_39.3px_2px_rgba(0,0,0,0.2)]">
            <button
              type="button"
              class="absolute right-[22px] top-[18px] text-[40px] leading-none text-black"
              aria-label="Close scan modal"
              @click="closeScanModal"
            >
              &times;
            </button>

            <h2 class="text-center text-[32px] leading-none font-bold text-black">Ready to Scan</h2>
            <p class="mx-auto mt-3 max-w-[355px] text-center text-[18px] leading-[1.15] font-bold text-[#5b5b5b]">
              Point the camera at the student's participation ID or barcode.
            </p>

            <div class="mx-auto mt-8 flex h-[469px] w-full max-w-[479px] items-center justify-center rounded-[36px] border border-[#828282] bg-[#d4d4d4] px-6 py-6">
              <div class="w-full max-w-[398px] overflow-hidden rounded-[18px] bg-[#149c94] p-6">
                <div :id="fileScannerElementId" class="hidden" />
                <div class="relative h-[350px] w-full overflow-hidden bg-white">
                  <div
                    v-show="!scannedStudentName"
                    :id="scannerElementId"
                    class="h-full w-full overflow-hidden bg-white"
                  />

                  <div
                    v-if="isStartingScanner"
                    class="absolute inset-0 flex items-center justify-center bg-white text-[20px] font-semibold text-[#444]"
                  >
                    Starting camera...
                  </div>

                  <div
                    v-else-if="scanError && !scannedStudentName"
                    class="absolute inset-0 flex flex-col items-center justify-center bg-white px-6 text-center"
                  >
                    <p class="text-[18px] font-semibold text-[#b81717]">{{ scanError }}</p>
                    <button
                      type="button"
                      class="mt-5 rounded-[18px] bg-[#1188f8] px-5 py-2 text-[16px] font-semibold text-white"
                      @click="restartScanner"
                    >
                      Retry camera
                    </button>
                    <button
                      type="button"
                      class="mt-3 rounded-[18px] border border-[#1188f8] bg-white px-5 py-2 text-[16px] font-semibold text-[#1188f8]"
                      @click="openQrUpload"
                    >
                      Upload QR image
                    </button>
                  </div>

                  <div
                    v-else-if="scannedStudentName"
                    class="absolute inset-0 flex flex-col items-center justify-center bg-white px-6 text-center"
                  >
                    <p class="text-[18px] font-medium text-[#5b5b5b]">Scanned student</p>
                    <p class="mt-3 text-[28px] font-bold text-black">{{ scannedStudentName }}</p>
                    <p class="mt-3 text-[15px] font-medium text-[#5b5b5b]">
                      Student ID: {{ scannedPayload?.studentNumber || 'Unknown' }}
                    </p>
                    <button
                      type="button"
                      class="mt-6 rounded-[18px] bg-[#1188f8] px-5 py-2 text-[16px] font-semibold text-white"
                      @click="restartScanner"
                    >
                      Scan another student
                    </button>
                    <button
                      type="button"
                      class="mt-3 rounded-[18px] border border-[#1188f8] bg-white px-5 py-2 text-[16px] font-semibold text-[#1188f8]"
                      @click="openQrUpload"
                    >
                      Upload another QR image
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 flex items-center justify-center gap-4 sm:gap-6">
              <button
                v-for="points in [1, 3, 5]"
                :key="points"
                type="button"
                class="flex h-[68px] w-[139px] items-center justify-center rounded-[31px] bg-[#efefef] text-[32px] font-bold text-[#0084ff] transition-transform disabled:opacity-50"
                :disabled="!scannedPayload"
                @click="awardPoints(points)"
              >
                +{{ points }}
              </button>
            </div>

            <input
              ref="qrUploadInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleQrFileChange"
            />
          </div>
        </div>
      </transition>

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
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Html5Qrcode } from 'html5-qrcode'
import { auth } from '../../config/firebase'
import ParticipationChart from '../../components/charts/ParticipationChart.vue'
import { logoutUser, updateCurrentUserAccount } from '../../services/authService'
import {
  buildClassAnalytics,
  buildPriorityQueueRecommendation,
  buildSeatEnvironmentMap,
} from '../../services/analyticsService'
import { getTeacherClassById, recordStudentParticipation, updateTeacherClass } from '../../services/teacherService'
import { getUserById, upsertUserProfile } from '../../services/userService'
import imgRectangle15 from '../../assets/icons/recicall-analytics.svg'
import imgRectangle16 from '../../assets/icons/recicall-archive.svg'
import imgRectangle17 from '../../assets/icons/recicall-logout.svg'
import imgRectangle18 from '../../assets/icons/recicall-settings.svg'
import imgRectangle13 from '../../assets/icons/recicall-menu.svg'
import imgRectangle14 from '../../assets/icons/recicall-classes.svg'
import imgRectangle25 from '../../assets/icons/recicall-ellipsis-white.svg'
import imgRectangle26 from '../../assets/icons/recicall-ellipsis.svg'
import imgLearning from '../../assets/icons/recicall-learning.svg'
import imgPresentationScreen from '../../assets/icons/recicall-presentation.svg'
import imgStar1 from '../../assets/icons/recicall-logo.png'
import { inactiveNavIconStyle, navIconStyle } from '../../utils/navIconStyles'
import { resolveStudentAvatar } from '../../utils/studentAvatarOptions'
import { defaultTeacherAvatarKey, resolveTeacherAvatar, sanitizeTeacherAvatarKey, teacherAvatarOptions } from '../../utils/teacherAvatarOptions'

const svgDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`
const imgPolygon4 = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 91"><path d="M34 0 0 74 34 91V0Z" fill="rgba(19,67,145,0.72)"/></svg>`)
const imgPolygon5 = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 61"><path d="M20 0 0 40 20 61V0Z" fill="rgba(22,92,182,0.8)"/></svg>`)
const imgPolygon6 = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 44"><path d="M7 0 0 44H7V0Z" fill="rgba(13,73,165,0.85)"/></svg>`)
const imgPolygon7 = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 78"><path d="M15 0 0 78 15 64V0Z" fill="rgba(18,86,173,0.78)"/></svg>`)
const router = useRouter()
const route = useRoute()

const gradientOptions = {
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
const teacherAvatarKey = ref(defaultTeacherAvatarKey)
const teacherId = ref('')
const isLoading = ref(true)
const isLoggingOut = ref(false)
const isSidebarExpanded = ref(false)
const isProfileModalOpen = ref(false)
const isSavingProfile = ref(false)
const isScanModalOpen = ref(false)
const isPickNextStudentModalOpen = ref(false)
const isStartingScanner = ref(false)
const isSavingQueueParticipation = ref(false)
const isSendingParticipationUpdate = ref(false)
const isRefreshingRecentEngagement = ref(false)
const isSeatEditMode = ref(false)
const isLayoutLocked = ref(false)
const isHydratingSeatLayout = ref(false)
const isSavingSeatLayout = ref(false)
const seatLayoutSaveStatus = ref('')
const seatLayoutSaveError = ref(false)
const notifyParticipationStatus = ref('')
const notifyParticipationStatusError = ref(false)
const profileError = ref('')
const profileSuccess = ref('')
const scanError = ref('')
const pickNextStudentError = ref('')
const scannedPayload = ref(null)
const scannerInstance = ref(null)
const qrUploadInput = ref(null)
const profileName = ref('')
const profileAvatarKey = ref(defaultTeacherAvatarKey)
const rawClassroom = ref(null)
const deskRowsLeft = ref([])
const deskRowsRight = ref([])
const draggedSeatPayload = ref(null)
const excludedRecommendationIds = ref([])
const scannerElementId = 'teacher-qr-scanner'
const fileScannerElementId = 'teacher-qr-file-reader'
const teacherPhoto = computed(() =>
  resolveTeacherAvatar(teacherAvatarKey.value, ''),
)
const profilePreviewSrc = computed(() =>
  resolveTeacherAvatar(profileAvatarKey.value || defaultTeacherAvatarKey, ''),
)

const isSessionActive = computed(() => route.query.session === 'active')
const currentTab = computed(() => route.query.tab || 'class')
const scannedStudentName = computed(() => scannedPayload.value?.name || '')

const setTab = (tab) => {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      tab,
    },
  })
}

const classroom = computed(() => {
  if (!rawClassroom.value) return null
  const config = gradientOptions[rawClassroom.value.gradientId] || gradientOptions.blue
  return {
    ...rawClassroom.value,
    students: rawClassroom.value.students ?? 0,
    gradient: config.gradient,
    ellipsisAsset: config.ellipsisAsset,
  }
})

const analyticsSeatLayout = computed(() => ({
  left: serializeDeskRows(deskRowsLeft.value),
  right: serializeDeskRows(deskRowsRight.value),
}))

const analyticsClassroom = computed(() => {
  if (!classroom.value) return {}

  return {
    ...classroom.value,
    seatLayout: analyticsSeatLayout.value,
  }
})

const classAnalytics = computed(() => buildClassAnalytics(analyticsClassroom.value))
const queueRecommendation = computed(() =>
  buildPriorityQueueRecommendation(analyticsClassroom.value, excludedRecommendationIds.value),
)
const selectedQueuedStudent = computed(() => queueRecommendation.value.selectedStudent)
const participationEvents = computed(() => rawClassroom.value?.participationEvents || [])
const latestParticipationHighlight = computed(() => classAnalytics.value.recentHighlights[0] || null)
const latestParticipationTitle = computed(() =>
  latestParticipationHighlight.value?.name || 'No participation yet',
)
const latestParticipationSubtitle = computed(() => {
  if (!latestParticipationHighlight.value) {
    return 'Open analytics once students start participating.'
  }

  return `${latestParticipationHighlight.value.label} • +${latestParticipationHighlight.value.points} pts`
})

const toEventDate = (value) => {
  if (!value) return null
  if (value instanceof Date) return value
  if (typeof value.toDate === 'function') return value.toDate()
  if (typeof value.seconds === 'number') return new Date(value.seconds * 1000)

  const parsedDate = new Date(value)
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
}

const getLocalDateKey = (value) => {
  const date = toEventDate(value)
  if (!date) return ''

  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

const formatFullDate = (value) => {
  const date = toEventDate(value)
  if (!date) return 'No session date yet'

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const sessionGroups = computed(() => {
  const groups = new Map()

  participationEvents.value.forEach((event, index) => {
    const date = toEventDate(event.createdAt)
    if (!date) return

    const key = getLocalDateKey(date)
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        date,
        events: [],
        participants: new Set(),
      })
    }

    const group = groups.get(key)
    group.events.push({
      ...event,
      _eventIndex: index,
      _timestamp: date.getTime(),
    })

    if (event.studentId) {
      group.participants.add(event.studentId)
    }
  })

  return [...groups.values()]
    .sort((left, right) => left.date.getTime() - right.date.getTime())
    .map((group, index) => ({
      key: group.key,
      date: group.date,
      sessionNumber: index + 1,
      participants: group.participants.size,
      events: [...group.events].sort((left, right) => left._timestamp - right._timestamp),
    }))
})

const activeSessionKey = computed(() => getLocalDateKey(new Date()))
const activeSessionGroup = computed(
  () => sessionGroups.value.find((group) => group.key === activeSessionKey.value) || null,
)
const activeSessionTitle = computed(() => {
  const sessionNumber = activeSessionGroup.value?.sessionNumber || sessionGroups.value.length + 1
  return `Participation ${sessionNumber}`
})
const activeSessionDateLabel = computed(() =>
  formatFullDate(activeSessionGroup.value?.date || new Date()),
)
const activeSessionParticipantCount = computed(() => activeSessionGroup.value?.participants || 0)
const recentStudents = computed(() => {
  const sourceEvents = activeSessionGroup.value?.events?.length
    ? activeSessionGroup.value.events
    : participationEvents.value
  const enrolledStudentIndex = new Map(
    (rawClassroom.value?.enrolledStudents || []).map((student, index) => [
      student.studentId || student.id || `student-${index}`,
      student,
    ]),
  )

  return sourceEvents
    .slice(-3)
    .reverse()
    .map((event, index) => {
      const matchedStudent = enrolledStudentIndex.get(event.studentId) || null

      return {
        id: event.id || `${event.studentId || 'student'}-${event._eventIndex || index}-${index}`,
        name: event.displayName || event.email || 'Joined student',
        points: Number(event.points) || 0,
        avatarSrc: resolveStudentAvatar(
          event.avatarKey || matchedStudent?.avatarKey,
          event.photoURL || matchedStudent?.photoURL,
        ),
      }
    })
})

const teacherChartAxisOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        boxWidth: 12,
        color: '#222',
        font: { size: 12, weight: '600' },
      },
    },
    tooltip: {
      backgroundColor: '#111827',
      titleColor: '#fff',
      bodyColor: '#fff',
      padding: 12,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#667085', font: { size: 12, weight: '600' } },
    },
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(17, 24, 39, 0.08)' },
      ticks: { color: '#667085', font: { size: 12, weight: '600' } },
    },
  },
}

const teacherTrendChartData = computed(() => ({
  labels: classAnalytics.value.sessionTrend.map((entry) => entry.label),
  datasets: [
    {
      label: 'Participants',
      data: classAnalytics.value.sessionTrend.map((entry) => entry.participants),
      borderColor: '#1188F8',
      backgroundColor: 'rgba(17, 136, 248, 0.15)',
      fill: true,
      tension: 0.35,
      pointBackgroundColor: '#1188F8',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
    },
    {
      label: 'Points',
      data: classAnalytics.value.sessionTrend.map((entry) => entry.points),
      borderColor: '#4FB817',
      backgroundColor: 'rgba(79, 184, 23, 0.12)',
      fill: false,
      tension: 0.3,
      pointBackgroundColor: '#4FB817',
      pointRadius: 3,
    },
  ],
}))

const teacherRiskChartData = computed(() => ({
  labels: ['Low Risk', 'Moderate Risk', 'High Risk'],
  datasets: [
    {
      data: [
        classAnalytics.value.riskBreakdown.low,
        classAnalytics.value.riskBreakdown.moderate,
        classAnalytics.value.riskBreakdown.high,
      ],
      backgroundColor: ['#1188F8', '#4FB817', '#F97316'],
      borderColor: '#fff',
      borderWidth: 4,
      hoverOffset: 4,
    },
  ],
}))

const teacherRiskChartOptions = {
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 12,
        color: '#222',
        font: { size: 12, weight: '600' },
      },
    },
  },
}

const teacherTopStudentsChartData = computed(() => ({
  labels: classAnalytics.value.topPointsBreakdown.map((entry) => entry.label),
  datasets: [
    {
      label: 'Participation Points',
      data: classAnalytics.value.topPointsBreakdown.map((entry) => entry.value),
      backgroundColor: ['#1188F8', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
      borderRadius: 12,
      borderSkipped: false,
    },
  ],
}))

const teacherTopStudentsChartOptions = {
  ...teacherChartAxisOptions,
  indexAxis: 'y',
  plugins: {
    ...teacherChartAxisOptions.plugins,
    legend: { display: false },
  },
}

const classListStudents = computed(() =>
  (classroom.value?.enrolledStudents || []).map((student, index) => ({
    id: student.studentId || student.id || `student-${index}`,
    name: student.displayName || student.email || `Student ${index + 1}`,
    email: student.email,
    gradeLevel: student.gradeLevel,
    studentNumber: student.studentNumber,
    photoURL: student.photoURL || '',
    avatarKey: student.avatarKey || '',
    avatarSrc: resolveStudentAvatar(student.avatarKey, student.photoURL),
  })),
)

const classListColumns = computed(() => {
  const rowsPerColumn = 6
  const totalSlots = rowsPerColumn * 3
  const slots = Array.from({ length: totalSlots }, (_, index) => classListStudents.value[index] || null)

  return Array.from({ length: 3 }, (_, columnIndex) =>
    slots.slice(columnIndex * rowsPerColumn, columnIndex * rowsPerColumn + rowsPerColumn),
  )
})

const seatEnvironmentIndex = computed(() => buildSeatEnvironmentMap(analyticsClassroom.value))
const queueStudentIndex = computed(
  () => new Map(queueRecommendation.value.queue.map((student) => [student.id, student])),
)
const classAnalyticsStudentIndex = computed(
  () => new Map(classAnalytics.value.students.map((student) => [student.id, student])),
)

const priorityQueuePreview = computed(() => queueRecommendation.value.queue.slice(0, 4))

const analyticsHeatmapStudents = computed(() =>
  classListStudents.value
    .map((student) => {
      const queueStudent = queueStudentIndex.value.get(student.id) || null
      const analyticsStudent = classAnalyticsStudentIndex.value.get(student.id) || null
      const seatEnvironment = seatEnvironmentIndex.value.get(student.id) || null

      return {
        ...student,
        points: analyticsStudent?.points || 0,
        sessions: analyticsStudent?.sessions || 0,
        priorityScore: queueStudent?.priorityScore || 0,
        queuePosition: queueStudent?.queuePosition || null,
        seatZoneLabel: queueStudent?.seatZoneLabel || seatEnvironment?.zoneLabel || 'Seat not assigned',
        seatEnvironmentBoost: queueStudent?.seatEnvironmentBoost || seatEnvironment?.priorityBoost || 0,
        seatEnvironmentScore:
          queueStudent?.seatEnvironmentScore || seatEnvironment?.environmentScore || 0,
      }
    })
    .sort((left, right) => {
      if (left.queuePosition && right.queuePosition && left.queuePosition !== right.queuePosition) {
        return left.queuePosition - right.queuePosition
      }

      if (left.queuePosition && !right.queuePosition) return -1
      if (!left.queuePosition && right.queuePosition) return 1

      return left.name.localeCompare(right.name)
    }),
)

const analyticsHeatmapStudentIndex = computed(
  () => new Map(analyticsHeatmapStudents.value.map((student) => [student.id, student])),
)

const createAnalyticsHeatmapRows = (rows) =>
  rows.map((row) =>
    row.map((seat) => {
      const student = seat.studentId
        ? analyticsHeatmapStudentIndex.value.get(seat.studentId) || null
        : null

      return {
        ...seat,
        student,
        heatScore: student
          ? Math.round(student.priorityScore * 0.68 + student.seatEnvironmentScore * 0.32)
          : 0,
      }
    }),
  )

const analyticsHeatmapRowsLeft = computed(() => createAnalyticsHeatmapRows(deskRowsLeft.value))
const analyticsHeatmapRowsRight = computed(() => createAnalyticsHeatmapRows(deskRowsRight.value))

const heatmapLegend = [
  { label: 'Low queue pressure', score: 18 },
  { label: 'Monitor', score: 52 },
  { label: 'High queue pressure', score: 86 },
]

const clampHeatScore = (value, min = 0, max = 100) =>
  Math.min(Math.max(Number(value) || 0, min), max)

const getHeatTone = (value = 0) => {
  const normalizedValue = clampHeatScore(value) / 100
  const hue = 210 - normalizedValue * 182
  const backgroundLightness = 97 - normalizedValue * 24
  const borderLightness = 62 - normalizedValue * 20

  return {
    backgroundColor: `hsl(${hue} 88% ${backgroundLightness}%)`,
    borderColor: `hsl(${hue} 76% ${borderLightness}%)`,
  }
}

const getHeatmapSeatStyle = (value = 0) => {
  const tone = getHeatTone(value)

  return {
    backgroundColor: tone.backgroundColor,
    borderColor: tone.borderColor,
  }
}

const getHeatmapRowStyle = (value = 0) => {
  const tone = getHeatTone(value)

  return {
    backgroundColor: tone.backgroundColor,
    borderColor: tone.borderColor,
  }
}

const getHeatmapBarStyle = (value = 0) => ({
  width: `${clampHeatScore(value)}%`,
  backgroundColor: getHeatTone(value).borderColor,
})

const getHeatmapLegendDotStyle = (value = 0) => ({
  backgroundColor: getHeatTone(value).borderColor,
})

const getStudentInitials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

const seatPatterns = {
  left: [5, 3, 5, 3],
  right: [5, 5, 4, 3],
}

const createSeat = (side, rowIndex, seatIndex, studentId = null) => ({
  id: `${side}-${rowIndex}-${seatIndex}-${Math.random().toString(36).slice(2, 8)}`,
  studentId,
})

const createDeskRowsFromPatterns = (patterns, students, side) => {
  let cursor = 0

  return patterns.map((deskCount, rowIndex) =>
    Array.from({ length: deskCount }, (_, seatIndex) => {
      const student = students[cursor] || null
      cursor += 1
      return createSeat(side, rowIndex, seatIndex, student?.id || null)
    }),
  )
}

const createDeskRowsFromSavedLayout = (savedRows, validStudentIds, side) =>
  (Array.isArray(savedRows) ? savedRows : [])
    .map((row) => {
      if (Array.isArray(row)) return row
      if (row && Array.isArray(row.seats)) return row.seats
      return []
    })
    .filter((row) => row.length > 0)
    .map((row, rowIndex) =>
      row.map((studentId, seatIndex) =>
        createSeat(side, rowIndex, seatIndex, validStudentIds.has(studentId) ? studentId : null),
      ),
    )

const serializeDeskRows = (rows) =>
  rows.map((row) => ({
    seats: row.map((seat) => seat.studentId || null),
  }))

const assignStudentsIntoLayout = (leftRows, rightRows, students) => {
  const assignedStudentIds = new Set(
    [...leftRows, ...rightRows].flatMap((row) => row.map((seat) => seat.studentId)).filter(Boolean),
  )
  const remainingIds = students.map((student) => student.id).filter((id) => !assignedStudentIds.has(id))

  const fillExistingSeats = (rows) => {
    for (const row of rows) {
      for (const seat of row) {
        if (!seat.studentId && remainingIds.length > 0) {
          seat.studentId = remainingIds.shift()
        }
      }
    }
  }

  fillExistingSeats(leftRows)
  fillExistingSeats(rightRows)

  while (remainingIds.length > 0) {
    const target = totalDesks(leftRows) <= totalDesks(rightRows)
      ? { rows: leftRows, side: 'left' }
      : { rows: rightRows, side: 'right' }

    const targetRowIndex = target.rows.findIndex((row) => row.length < 5)

    if (targetRowIndex >= 0) {
      target.rows[targetRowIndex].push(
        createSeat(target.side, targetRowIndex, target.rows[targetRowIndex].length, remainingIds.shift()),
      )
      continue
    }

    target.rows.push([createSeat(target.side, target.rows.length, 0, remainingIds.shift())])
  }
}

const setDeskRows = (leftRows, rightRows) => {
  isHydratingSeatLayout.value = true
  deskRowsLeft.value = leftRows
  deskRowsRight.value = rightRows
  nextTick(() => {
    isHydratingSeatLayout.value = false
  })
}

const initializeDeskLayout = ({ useSaved = true } = {}) => {
  const students = classListStudents.value
  const savedSeatLayout = useSaved ? classroom.value?.seatLayout : null
  const validStudentIds = new Set(students.map((student) => student.id))
  const leftCapacity = seatPatterns.left.reduce((sum, count) => sum + count, 0)

  if (savedSeatLayout?.left || savedSeatLayout?.right) {
    const leftRows = createDeskRowsFromSavedLayout(savedSeatLayout.left, validStudentIds, 'left')
    const rightRows = createDeskRowsFromSavedLayout(savedSeatLayout.right, validStudentIds, 'right')

    assignStudentsIntoLayout(leftRows, rightRows, students)

    setDeskRows(
      normalizeDeskRows(leftRows, 'left'),
      normalizeDeskRows(rightRows, 'right'),
    )
    return
  }

  setDeskRows(
    createDeskRowsFromPatterns(seatPatterns.left, students.slice(0, leftCapacity), 'left'),
    createDeskRowsFromPatterns(seatPatterns.right, students.slice(leftCapacity), 'right'),
  )
}

const normalizeDeskRows = (rows, side) =>
  rows
    .filter((row) => row.length > 0)
    .map((row, rowIndex) =>
      row.map((seat, seatIndex) => ({
        ...seat,
        id: `${side}-${rowIndex}-${seatIndex}-${seat.id?.split('-').slice(-1)[0] || `${Date.now()}`}`,
      })),
    )

const totalDesks = (rows) => rows.reduce((sum, row) => sum + row.length, 0)

const persistSeatLayout = async () => {
  if (!teacherId.value || !route.params.classId) return

  const seatLayout = {
    left: serializeDeskRows(deskRowsLeft.value),
    right: serializeDeskRows(deskRowsRight.value),
  }

  rawClassroom.value = {
    ...rawClassroom.value,
    seatLayout,
  }

  try {
    await updateTeacherClass(teacherId.value, route.params.classId, { seatLayout })
  } catch (error) {
    console.error('Unable to persist seat layout:', error)
    throw error
  }
}

let seatLayoutSaveChain = Promise.resolve()

const queueSeatLayoutPersistence = () => {
  seatLayoutSaveChain = seatLayoutSaveChain
    .catch(() => {})
    .then(() => persistSeatLayout())

  return seatLayoutSaveChain
}

let seatLayoutStatusTimer = null
let notifyParticipationStatusTimer = null

const setSeatLayoutStatus = (message, isError = false) => {
  seatLayoutSaveStatus.value = message
  seatLayoutSaveError.value = isError

  if (seatLayoutStatusTimer) {
    window.clearTimeout(seatLayoutStatusTimer)
    seatLayoutStatusTimer = null
  }

  if (!message) return

  seatLayoutStatusTimer = window.setTimeout(() => {
    seatLayoutSaveStatus.value = ''
    seatLayoutSaveError.value = false
    seatLayoutStatusTimer = null
  }, isError ? 4000 : 2500)
}

const setNotifyParticipationStatus = (message, isError = false) => {
  notifyParticipationStatus.value = message
  notifyParticipationStatusError.value = isError

  if (notifyParticipationStatusTimer) {
    window.clearTimeout(notifyParticipationStatusTimer)
    notifyParticipationStatusTimer = null
  }

  if (!message) return

  notifyParticipationStatusTimer = window.setTimeout(() => {
    notifyParticipationStatus.value = ''
    notifyParticipationStatusError.value = false
    notifyParticipationStatusTimer = null
  }, isError ? 3800 : 2800)
}

const saveSeatLayoutNow = async () => {
  if (isSavingSeatLayout.value) return

  isSavingSeatLayout.value = true
  setSeatLayoutStatus('Saving layout...')

  try {
    await queueSeatLayoutPersistence()
    setSeatLayoutStatus('Layout saved.')
  } catch (error) {
    console.error('Unable to save seat layout:', error)
    setSeatLayoutStatus('Failed to save layout.', true)
  } finally {
    isSavingSeatLayout.value = false
  }
}

const addDeskToRows = (rows, side) => {
  const nextRows = rows.map((row) => [...row])
  const targetRowIndex = nextRows.findIndex((row) => row.length < 5)

  if (targetRowIndex >= 0) {
    nextRows[targetRowIndex].push(createSeat(side, targetRowIndex, nextRows[targetRowIndex].length))
  } else {
    nextRows.push([createSeat(side, nextRows.length, 0)])
  }

  return normalizeDeskRows(nextRows, side)
}

const removeDeskFromRows = (rows, side) => {
  const nextRows = rows.map((row) => [...row])

  for (let rowIndex = nextRows.length - 1; rowIndex >= 0; rowIndex -= 1) {
    for (let seatIndex = nextRows[rowIndex].length - 1; seatIndex >= 0; seatIndex -= 1) {
      if (!nextRows[rowIndex][seatIndex].studentId) {
        nextRows[rowIndex].splice(seatIndex, 1)
        return normalizeDeskRows(nextRows, side)
      }
    }
  }

  for (let rowIndex = nextRows.length - 1; rowIndex >= 0; rowIndex -= 1) {
    if (nextRows[rowIndex].length > 0) {
      nextRows[rowIndex].splice(nextRows[rowIndex].length - 1, 1)
      return normalizeDeskRows(nextRows, side)
    }
  }

  return normalizeDeskRows(nextRows, side)
}

const addDesk = async () => {
  const leftCount = totalDesks(deskRowsLeft.value)
  const rightCount = totalDesks(deskRowsRight.value)

  if (leftCount <= rightCount) {
    deskRowsLeft.value = addDeskToRows(deskRowsLeft.value, 'left')
    await persistSeatLayout()
    return
  }

  deskRowsRight.value = addDeskToRows(deskRowsRight.value, 'right')
  await persistSeatLayout()
}

const removeDesk = async () => {
  const leftCount = totalDesks(deskRowsLeft.value)
  const rightCount = totalDesks(deskRowsRight.value)

  if (rightCount >= leftCount && rightCount > 0) {
    deskRowsRight.value = removeDeskFromRows(deskRowsRight.value, 'right')
    await persistSeatLayout()
    return
  }

  if (leftCount > 0) {
    deskRowsLeft.value = removeDeskFromRows(deskRowsLeft.value, 'left')
    await persistSeatLayout()
  }
}

const resetDeskLayout = async () => {
  initializeDeskLayout({ useSaved: false })
  isSeatEditMode.value = false
  await persistSeatLayout()
}

const toggleLayoutLock = () => {
  isLayoutLocked.value = !isLayoutLocked.value

  if (isLayoutLocked.value) {
    isSeatEditMode.value = false
  }
}

const toggleSeatEditMode = () => {
  if (isLayoutLocked.value) return
  isSeatEditMode.value = !isSeatEditMode.value
}

const studentMap = computed(() =>
  Object.fromEntries(classListStudents.value.map((student) => [student.id, student])),
)

const getSeatStudent = (seat) => (seat?.studentId ? studentMap.value[seat.studentId] || null : null)

const getSeatLabel = (seat) => {
  const student = getSeatStudent(seat)
  if (!student) return ''

  const [first] = student.name.split(' ')
  return first || student.name
}

const handleSeatDragStart = (seat, side, rowIndex, seatIndex) => {
  if (!isSeatEditMode.value || isLayoutLocked.value || !seat.studentId) return

  draggedSeatPayload.value = {
    type: 'seat',
    studentId: seat.studentId,
    side,
    rowIndex,
    seatIndex,
  }
}

const handleRosterDragStart = (student) => {
  if (!isSeatEditMode.value || isLayoutLocked.value) return

  draggedSeatPayload.value = {
    type: 'roster',
    studentId: student.id,
  }
}

const cloneDeskRows = (rows) => rows.map((row) => row.map((seat) => ({ ...seat })))

const findStudentSeatInRows = (rows, studentId) => {
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
    for (let seatIndex = 0; seatIndex < rows[rowIndex].length; seatIndex += 1) {
      if (rows[rowIndex][seatIndex].studentId === studentId) {
        return { rowIndex, seatIndex }
      }
    }
  }

  return null
}

const handleSeatDrop = async (side, rowIndex, seatIndex) => {
  if (!isSeatEditMode.value || isLayoutLocked.value || !draggedSeatPayload.value) return

  const leftRows = cloneDeskRows(deskRowsLeft.value)
  const rightRows = cloneDeskRows(deskRowsRight.value)
  const targetRows = side === 'left' ? leftRows : rightRows
  const targetSeat = targetRows[rowIndex]?.[seatIndex]
  if (!targetSeat) return

  if (draggedSeatPayload.value.type === 'roster') {
    const draggedStudentId = draggedSeatPayload.value.studentId
    const displacedStudentId = targetSeat.studentId || null

    const existingLeftSeat = findStudentSeatInRows(leftRows, draggedStudentId)
    const existingRightSeat = findStudentSeatInRows(rightRows, draggedStudentId)

    if (existingLeftSeat && side === 'left' && existingLeftSeat.rowIndex === rowIndex && existingLeftSeat.seatIndex === seatIndex) {
      draggedSeatPayload.value = null
      return
    }

    if (existingRightSeat && side === 'right' && existingRightSeat.rowIndex === rowIndex && existingRightSeat.seatIndex === seatIndex) {
      draggedSeatPayload.value = null
      return
    }

    if (existingLeftSeat) {
      leftRows[existingLeftSeat.rowIndex][existingLeftSeat.seatIndex].studentId = displacedStudentId
    }

    if (existingRightSeat) {
      rightRows[existingRightSeat.rowIndex][existingRightSeat.seatIndex].studentId = displacedStudentId
    }

    targetRows[rowIndex][seatIndex].studentId = draggedStudentId

    deskRowsLeft.value = normalizeDeskRows(leftRows, 'left')
    deskRowsRight.value = normalizeDeskRows(rightRows, 'right')
    draggedSeatPayload.value = null
    await persistSeatLayout()
    return
  }

  const source = draggedSeatPayload.value
  const sourceRows = source.side === 'left' ? leftRows : rightRows
  const sourceSeat = sourceRows[source.rowIndex]?.[source.seatIndex]

  if (!sourceSeat) {
    draggedSeatPayload.value = null
    return
  }

  const incomingStudentId = sourceSeat.studentId
  const displacedStudentId = targetRows[rowIndex][seatIndex].studentId || null

  sourceSeat.studentId = displacedStudentId
  targetRows[rowIndex][seatIndex].studentId = incomingStudentId

  deskRowsLeft.value = normalizeDeskRows(leftRows, 'left')
  deskRowsRight.value = normalizeDeskRows(rightRows, 'right')

  draggedSeatPayload.value = null
  await persistSeatLayout()
}

const clearDraggedSeat = () => {
  draggedSeatPayload.value = null
}

watch(
  classListStudents,
  () => {
    initializeDeskLayout()
  },
  { immediate: true },
)

watch(
  () => [serializeDeskRows(deskRowsLeft.value), serializeDeskRows(deskRowsRight.value)],
  () => {
    if (isHydratingSeatLayout.value || !teacherId.value || !rawClassroom.value) return
    queueSeatLayoutPersistence()
  },
  { deep: true },
)

const openProfileModal = () => {
  profileError.value = ''
  profileSuccess.value = ''
  profileName.value = teacherName.value
  profileAvatarKey.value = teacherAvatarKey.value || defaultTeacherAvatarKey
  isProfileModalOpen.value = true
}

const resetScanState = () => {
  scanError.value = ''
  scannedPayload.value = null
}

const buildParticipationPayload = (student) => ({
  uid: student.id,
  name: student.name || 'Joined student',
  studentNumber: student.studentNumber || 'Unavailable',
  email: student.email,
  photoURL: student.photoURL,
  avatarKey: student.avatarKey,
  gradeLevel: student.gradeLevel,
})

const openPickNextStudentModal = () => {
  excludedRecommendationIds.value = []
  pickNextStudentError.value = ''
  isPickNextStudentModalOpen.value = true
}

const openRecentParticipationLog = async () => {
  if (currentTab.value !== 'analytics') {
    await router.push({
      path: route.path,
      query: {
        ...route.query,
        tab: 'analytics',
      },
    })
  }

  await nextTick()
  document.getElementById('recent-participation-log')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const buildParticipationUpdate = () => {
  const classLabel = classroom.value?.classLabel || 'This class'
  const queueLead = selectedQueuedStudent.value?.name || ''
  const totalStudents = classAnalytics.value.totalStudents
  const activeStudents = classAnalytics.value.activeStudents
  const latestDate = latestParticipationHighlight.value?.label || ''
  const statusLine = totalStudents
    ? `${activeStudents} of ${totalStudents} students have already participated.`
    : 'No enrolled students have participated yet.'

  return {
    title: `${classLabel} participation update`,
    body: [
      'Participation tools are ready.',
      queueLead ? `Priority queue lead: ${queueLead}.` : '',
      statusLine,
      latestDate ? `Latest activity: ${latestDate}.` : '',
    ]
      .filter(Boolean)
      .join(' '),
  }
}

const sendBrowserParticipationNotification = async (title, body) => {
  if (typeof window === 'undefined' || typeof window.Notification === 'undefined') return false

  let permission = window.Notification.permission
  if (permission === 'default') {
    permission = await window.Notification.requestPermission()
  }

  if (permission !== 'granted') return false

  new window.Notification(title, {
    body,
    tag: `participation-${route.params.classId || 'class'}`,
  })

  return true
}

const handleNotifyParticipation = async () => {
  if (isSendingParticipationUpdate.value) return

  if (!classroom.value) {
    setNotifyParticipationStatus('Load the classroom first before sending updates.', true)
    return
  }

  if (!classListStudents.value.length) {
    setNotifyParticipationStatus('Add students first to prepare a participation update.', true)
    return
  }

  isSendingParticipationUpdate.value = true
  const update = buildParticipationUpdate()
  let copiedToClipboard = false
  let sentBrowserNotification = false

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(update.body)
      copiedToClipboard = true
    }
  } catch (error) {
    console.error(error)
  }

  try {
    sentBrowserNotification = await sendBrowserParticipationNotification(update.title, update.body)
  } catch (error) {
    console.error(error)
  }

  isSendingParticipationUpdate.value = false

  if (copiedToClipboard && sentBrowserNotification) {
    setNotifyParticipationStatus('Participation update copied and sent to browser notifications.')
    return
  }

  if (copiedToClipboard) {
    setNotifyParticipationStatus('Participation update copied. You can paste it into a class message.')
    return
  }

  if (sentBrowserNotification) {
    setNotifyParticipationStatus('Participation update sent to browser notifications.')
    return
  }

  setNotifyParticipationStatus('Participation update is ready. Showing the recent log instead.')
  await openRecentParticipationLog()
}

const closePickNextStudentModal = () => {
  isPickNextStudentModalOpen.value = false
  pickNextStudentError.value = ''
}

const rerollQueuedStudent = () => {
  const currentStudentId = selectedQueuedStudent.value?.id
  if (!currentStudentId) return
  if (!excludedRecommendationIds.value.includes(currentStudentId)) {
    excludedRecommendationIds.value = [...excludedRecommendationIds.value, currentStudentId]
  }
  pickNextStudentError.value = ''
}

const formatCameraError = (error) => {
  const errorName = error?.name || ''
  const errorMessage = error?.message || ''

  if (errorName === 'NotAllowedError' || errorName === 'PermissionDeniedError') {
    return 'Camera permission was denied. Allow camera access for localhost in your browser settings and reload the page.'
  }

  if (errorName === 'NotFoundError' || errorName === 'DevicesNotFoundError') {
    return 'No camera was found on this device.'
  }

  if (errorName === 'NotReadableError' || errorName === 'TrackStartError') {
    return 'The camera is already in use by another app. Close other camera apps and try again.'
  }

  if (errorName === 'OverconstrainedError' || errorName === 'ConstraintNotSatisfiedError') {
    return 'The selected camera does not support the required settings.'
  }

  if (/Permission|denied/i.test(errorMessage)) {
    return 'Camera permission was denied. Allow camera access for localhost in your browser settings and reload the page.'
  }

  if (/Requested device not found|not found/i.test(errorMessage)) {
    return 'No usable camera was found on this device.'
  }

  if (/Could not start video source|TrackStartError|NotReadable/i.test(errorMessage)) {
    return 'The camera is busy or blocked by another app. Close other apps using the camera and try again.'
  }

  return errorMessage || 'Please check camera permissions and try again.'
}

const stopScanner = async () => {
  if (!scannerInstance.value) return

  try {
    if (scannerInstance.value.isScanning) {
      await scannerInstance.value.stop()
    }
  } catch (error) {
    console.error(error)
  }

  try {
    await scannerInstance.value.clear()
  } catch (error) {
    console.error(error)
  }

  scannerInstance.value = null
}

const handleScanSuccess = async (decodedText) => {
  try {
    const payload = JSON.parse(decodedText)

    if (payload?.type !== 'student-id') {
      scanError.value = 'This QR code is not a valid student participation ID.'
      return
    }

    scannedPayload.value = payload
    await stopScanner()
  } catch (error) {
    console.error(error)
    scanError.value = 'This QR code is not a valid student participation ID.'
  }
}

const startScanner = async () => {
  resetScanState()
  isStartingScanner.value = true

  try {
    if (!navigator.mediaDevices) {
      throw new Error('This browser does not support camera access.')
    }

    await nextTick()
    const scannerNode = document.getElementById(scannerElementId)

    if (!scannerNode) {
      throw new Error('Scanner container is not available yet.')
    }

    const scanner = new Html5Qrcode(scannerElementId)
    scannerInstance.value = scanner
    let cameras = []

    try {
      cameras = await Html5Qrcode.getCameras()
    } catch (cameraListError) {
      console.error(cameraListError)
    }

    if (!cameras.length) {
      const permissionStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })
      permissionStream.getTracks().forEach((track) => track.stop())
      cameras = await Html5Qrcode.getCameras()
    }

    if (!cameras.length) {
      throw new Error('No camera devices found.')
    }

    const preferredCamera =
      cameras.find((camera) => /back|rear|environment/i.test(camera.label)) || cameras[0]

    await scanner.start(
      preferredCamera.id,
      {
        fps: 10,
        qrbox: { width: 244, height: 244 },
        aspectRatio: 1,
      },
      handleScanSuccess,
      () => {},
    )
  } catch (error) {
    console.error(error)
    scanError.value = formatCameraError(error)
  } finally {
    isStartingScanner.value = false
  }
}

const openScanModal = async () => {
  isScanModalOpen.value = true
  await startScanner()
}

const closeScanModal = async () => {
  isScanModalOpen.value = false
  await stopScanner()
  resetScanState()
}

const restartScanner = async () => {
  await stopScanner()
  await startScanner()
}

const openQrUpload = () => {
  qrUploadInput.value?.click()
}

const handleQrFileChange = async (event) => {
  const [file] = event.target.files || []
  event.target.value = ''

  if (!file) return

  isStartingScanner.value = true
  scanError.value = ''

  try {
    await stopScanner()
    const fileScanner = new Html5Qrcode(fileScannerElementId)
    const decodedText = await fileScanner.scanFile(file, true)
    await fileScanner.clear()
    await handleScanSuccess(decodedText)
  } catch (error) {
    console.error(error)
    const message =
      error?.message || error?.name || 'We could not read a QR code from that image.'
    scanError.value = `Unable to read that QR image. ${message}`
  } finally {
    isStartingScanner.value = false
  }
}

const persistParticipationAward = async (studentPayload, points) => {
  if (!studentPayload?.uid) return { ok: false, error: 'Missing student information.' }

  const studentName = studentPayload.name || 'Joined student'
  const currentStudents = (rawClassroom.value?.enrolledStudents || []).map((student) => ({ ...student }))
  const existingIndex = currentStudents.findIndex((student) => (student.studentId || student.id) === studentPayload.uid)
  const existingStudent = existingIndex >= 0 ? currentStudents[existingIndex] : null
  const recentEntry = {
    studentId: studentPayload.uid,
    displayName: studentName,
    studentNumber: studentPayload.studentNumber,
    avatarKey: studentPayload.avatarKey,
    latestPoints: points,
    totalPoints: points,
    participatedSessions: 1,
  }

  if (existingStudent) {
    recentEntry.email = existingStudent.email
    recentEntry.photoURL = existingStudent.photoURL
    recentEntry.avatarKey = existingStudent.avatarKey
    recentEntry.gradeLevel = existingStudent.gradeLevel
    recentEntry.totalPoints = Number(existingStudent.totalPoints || 0) + points
    recentEntry.participatedSessions = Number(existingStudent.participatedSessions || 0) + 1
  } else {
    recentEntry.email = studentPayload.email
    recentEntry.photoURL = studentPayload.photoURL
    recentEntry.gradeLevel = studentPayload.gradeLevel
  }

  try {
    await recordStudentParticipation(teacherId.value, route.params.classId, recentEntry, points)
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      error: error?.message || 'Unable to save participation right now.',
    }
  }

  if (existingIndex >= 0) {
    currentStudents.splice(existingIndex, 1)
  }

  currentStudents.unshift(recentEntry)

  const recentEvent = {
    id: `local-${studentPayload.uid}-${Date.now()}`,
    studentId: studentPayload.uid,
    displayName: studentName,
    studentNumber: studentPayload.studentNumber,
    photoURL: recentEntry.photoURL,
    avatarKey: recentEntry.avatarKey,
    points,
    createdAt: new Date(),
  }

  rawClassroom.value = {
    ...rawClassroom.value,
    enrolledStudents: currentStudents,
    participationEvents: [...(rawClassroom.value?.participationEvents || []), recentEvent],
  }

  return { ok: true }
}

const awardPoints = async (points) => {
  if (!scannedPayload.value) return

  const result = await persistParticipationAward(scannedPayload.value, points)
  if (!result.ok) {
    scanError.value = result.error || 'Unable to save participation right now.'
    return
  }

  await closeScanModal()
}

const awardQueuedStudent = async (points) => {
  if (!selectedQueuedStudent.value) return

  isSavingQueueParticipation.value = true
  pickNextStudentError.value = ''

  const result = await persistParticipationAward(buildParticipationPayload(selectedQueuedStudent.value), points)

  isSavingQueueParticipation.value = false

  if (!result.ok) {
    pickNextStudentError.value = result.error || 'Unable to save participation right now.'
    return
  }

  closePickNextStudentModal()
}

const closeProfileModal = () => {
  isProfileModalOpen.value = false
  profileError.value = ''
  profileSuccess.value = ''
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

const startSession = () => {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      session: 'active',
    },
  })
}

const loadClassroomData = async ({ silent = false } = {}) => {
  if (!teacherId.value || !route.params.classId) return

  if (!silent) {
    isLoading.value = true
  }

  try {
    rawClassroom.value = await getTeacherClassById(teacherId.value, route.params.classId)
  } finally {
    if (!silent) {
      isLoading.value = false
    }
  }
}

const refreshRecentStudentEngagement = async () => {
  if (isRefreshingRecentEngagement.value || !teacherId.value) return

  isRefreshingRecentEngagement.value = true

  try {
    await loadClassroomData({ silent: true })
  } catch (error) {
    console.error('Unable to refresh recent engagement:', error)
  } finally {
    isRefreshingRecentEngagement.value = false
  }
}

onBeforeUnmount(async () => {
  if (seatLayoutStatusTimer) {
    window.clearTimeout(seatLayoutStatusTimer)
    seatLayoutStatusTimer = null
  }
  if (notifyParticipationStatusTimer) {
    window.clearTimeout(notifyParticipationStatusTimer)
    notifyParticipationStatusTimer = null
  }
  await stopScanner()
})

onMounted(async () => {
  const user = auth.currentUser
  if (!user) return

  teacherId.value = user.uid
  const profile = await getUserById(user.uid)
  if (profile?.displayName) teacherName.value = profile.displayName
  else if (user.displayName) teacherName.value = user.displayName
  teacherAvatarKey.value = sanitizeTeacherAvatarKey(profile?.avatarKey)
  profileName.value = teacherName.value

  await loadClassroomData()
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

.interactive-nav-button,
.interactive-tab-button,
.interactive-primary-button,
.interactive-secondary-button,
.interactive-card-button,
.interactive-icon-button,
.interactive-mobile-nav-button,
.interactive-profile-button {
  outline: none;
  transition:
    transform 0.16s ease,
    box-shadow 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    opacity 0.18s ease;
}

.interactive-nav-button:hover:not(:disabled),
.interactive-tab-button:hover:not(:disabled),
.interactive-primary-button:hover:not(:disabled),
.interactive-secondary-button:hover:not(:disabled),
.interactive-card-button:hover:not(:disabled),
.interactive-icon-button:hover:not(:disabled),
.interactive-mobile-nav-button:hover:not(:disabled),
.interactive-profile-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.interactive-nav-button:active:not(:disabled),
.interactive-tab-button:active:not(:disabled),
.interactive-primary-button:active:not(:disabled),
.interactive-secondary-button:active:not(:disabled),
.interactive-card-button:active:not(:disabled),
.interactive-icon-button:active:not(:disabled),
.interactive-mobile-nav-button:active:not(:disabled),
.interactive-profile-button:active:not(:disabled) {
  transform: translateY(0) scale(0.985);
}

.interactive-nav-button:focus-visible,
.interactive-tab-button:focus-visible,
.interactive-primary-button:focus-visible,
.interactive-secondary-button:focus-visible,
.interactive-card-button:focus-visible,
.interactive-icon-button:focus-visible,
.interactive-mobile-nav-button:focus-visible,
.interactive-profile-button:focus-visible {
  box-shadow:
    0 0 0 3px rgba(17, 136, 248, 0.16),
    0 10px 24px rgba(15, 23, 42, 0.08);
}

.interactive-nav-button:hover:not(:disabled),
.interactive-mobile-nav-button:hover:not(:disabled) {
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.interactive-tab-button:hover:not(:disabled) {
  box-shadow: 0 8px 18px rgba(17, 136, 248, 0.12);
}

.interactive-primary-button:hover:not(:disabled) {
  box-shadow: 0 14px 28px rgba(17, 136, 248, 0.24);
  filter: saturate(1.03) brightness(1.02);
}

.interactive-secondary-button:hover:not(:disabled) {
  border-color: rgba(17, 136, 248, 0.85);
  background-color: #f7fbff;
  box-shadow: 0 10px 22px rgba(17, 136, 248, 0.1);
}

.interactive-card-button:hover:not(:disabled),
.interactive-profile-button:hover:not(:disabled) {
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.08);
}

.interactive-icon-button:hover:not(:disabled) {
  box-shadow: 0 8px 16px rgba(15, 23, 42, 0.08);
}

.interactive-profile-button:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.68);
}

.interactive-primary-button:disabled,
.interactive-secondary-button:disabled,
.interactive-card-button:disabled,
.interactive-icon-button:disabled,
.interactive-mobile-nav-button:disabled,
.interactive-nav-button:disabled,
.interactive-profile-button:disabled,
.interactive-tab-button:disabled {
  box-shadow: none;
  filter: none;
}
</style>
