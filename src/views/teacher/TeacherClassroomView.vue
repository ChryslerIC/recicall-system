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
              <AppIcon name="classes" :size="26" class="shrink-0" :class="currentTab !== 'analytics' ? 'text-[#174ca0]' : 'text-[#707070]'" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px]" :class="currentTab !== 'analytics' ? 'font-semibold text-[#174ca0]' : 'font-medium text-[#3a3a3a]'">Classes</span>
            </button>
            <button
              type="button"
              class="interactive-nav-button flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="[isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center', currentTab === 'analytics' ? 'bg-[rgba(46,130,239,0.25)]' : '']"
              aria-label="Class insights"
              @click="setTab('analytics')"
            >
              <AppIcon name="insights" :size="24" class="shrink-0" :class="currentTab === 'analytics' ? 'text-[#174ca0]' : 'text-[#707070]'" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[15px]" :class="currentTab === 'analytics' ? 'font-semibold text-[#174ca0]' : 'font-medium text-[#3a3a3a]'">Class Insights</span>
            </button>
            <button
              type="button"
              class="interactive-nav-button flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Archive"
              @click="router.push('/teacher/archive')"
            >
              <AppIcon name="archive" :size="24" class="shrink-0 text-[#707070]" />
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
              <AppIcon name="settings" :size="24" class="shrink-0 text-[#707070]" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Settings</span>
            </button>
            <button
              type="button"
              class="interactive-nav-button flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(255,84,84,0.08)]"
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
          <section class="min-h-[653px] rounded-[28px] border-2 border-[#2e82ef] bg-white px-4 pb-8 pt-4 sm:px-6 lg:rounded-[52px] lg:px-[28px] lg:pb-[30px] lg:pt-[14px]">
            <div v-if="isLoading" class="px-4 py-8 text-[18px] font-medium text-[#5d5d5d]">Loading classroom...</div>
            <div
              v-else-if="loadError"
              class="mx-4 rounded-[20px] border border-[#f1b5b5] bg-[#fff5f5] px-5 py-4 text-[16px] font-semibold text-[#b81717] sm:text-[18px]"
            >
              {{ loadError }}
            </div>
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
                  Insights
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
                  <button type="button" class="interactive-icon-button grid h-[40px] w-[40px] place-items-center rounded-[18px] bg-black/10 text-white" aria-label="Class options">
                    <AppIcon name="more" :size="22" />
                  </button>
                </div>

                <div class="mt-[12px] flex flex-1 items-end justify-end">
                  <div class="relative hidden h-[112px] w-[224px] opacity-90 sm:block">
                    <ClassThemeArt :theme-id="classroom.gradientId" variant="hero" />
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
                      <AppIcon name="sparkles" :size="30" class="text-[#111]" />
                    </div>
                    <p class="text-[20px] font-bold leading-none text-black">Class</p>
                    <p class="mt-[18px] text-[40px] font-bold leading-none text-[#0084ff]">{{ classroom.students }}</p>
                    <p class="mt-[16px] text-[16px] font-bold leading-none text-black">Students enrolled</p>
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
                      <AppIcon name="scan" :size="38" class="text-white" />
                      <span>Scan Participation</span>
                    </button>

                    <button
                      type="button"
                      class="interactive-primary-button flex w-full items-center justify-center gap-[16px] rounded-[60px] bg-gradient-to-l from-[#1188f8] via-[#2490fa] to-[#57a5ff] font-bold text-white md:flex-1 xl:flex-none"
                      :class="isSessionActive ? 'h-[82px] text-[18px] sm:text-[20px] xl:h-[95px] xl:w-[385px] xl:text-[22px]' : 'h-[72px] text-[18px] sm:text-[20px] xl:h-[76px] xl:w-[324px] xl:text-[20px]'"
                      @click="openPickNextStudentModal"
                    >
                      <AppIcon name="pick-next" :size="36" class="text-white" />
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
                              <AppIcon name="sparkles" :size="26" class="text-[#072b10]" />
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
                              <AppIcon
                                name="refresh"
                                :size="20"
                                class="h-[20px] w-[20px]"
                                :class="isRefreshingRecentEngagement ? 'animate-spin text-[#1188f8]' : ''"
                              />
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
                            <button
                              type="button"
                              class="interactive-secondary-button h-[42px] w-[154px] rounded-[16.5px] border border-[#535353] bg-white text-[15px] font-semibold text-[#1188f8] disabled:cursor-not-allowed disabled:opacity-60"
                              :disabled="isSavingSessionState"
                              @click="endSession"
                            >
                              {{ isSavingSessionState ? 'Ending...' : 'End Session' }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="mt-[20px] w-full rounded-[32px] bg-[#f6f6f6] px-5 py-8 sm:px-8 xl:mt-[29px] xl:h-[191px] xl:px-[32px] xl:py-[25px]">
                      <div class="flex h-full flex-col items-center justify-center">
                        <AppIcon name="monitor" :size="42" class="text-[#111]" />
                        <p class="mt-[14px] text-center text-[18px] font-medium text-[#202020] sm:text-[20px]">
                          Click &quot;Start Session&quot; to begin tracking student engagement.
                        </p>
                        <button
                          type="button"
                          class="interactive-secondary-button mt-[10px] flex h-[42px] w-[194px] items-center justify-center rounded-[16.5px] border border-[#535353] bg-white text-[18px] font-semibold text-[#1188f8] sm:text-[20px]"
                          :disabled="isSavingSessionState"
                          @click="openSessionSetupModal"
                        >
                          {{ isSavingSessionState ? 'Starting...' : 'Start Session' }}
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
                        <AppIcon name="sparkles" :size="28" class="text-[#072b10]" />
                      </div>
                      <div class="min-w-0">
                        <p class="truncate text-[22px] font-bold leading-none text-black sm:text-[24px]">
                          {{ latestParticipationTitle }}
                        </p>
                        <p class="mt-[10px] text-[16px] font-semibold leading-none text-[#4a4a4a]">
                          {{ latestParticipationSummary }}
                        </p>
                      </div>
                    </button>
                  </div>

                  <section class="mt-[16px] rounded-[28px] border border-[#cccdce] bg-[#f8fbff] px-5 py-5">
                    <div class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                      <div>
                        <h2 class="text-[22px] font-bold leading-none text-black">Session Report</h2>
                        <p class="mt-2 text-[15px] font-medium text-[#5d5d5d]">
                          Filter participation by date, then download a formatted session history for class records.
                        </p>
                      </div>

                      <button
                        type="button"
                        class="interactive-primary-button inline-flex h-[48px] items-center justify-center rounded-[24px] bg-[#1188f8] px-6 text-[16px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                        :disabled="!filteredSessionReportSessions.length"
                        @click="downloadSessionReport"
                      >
                        Download Report
                      </button>
                    </div>

                    <div class="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                      <label class="block">
                        <span class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">From</span>
                        <input
                          v-model="sessionReportStartDate"
                          type="date"
                          class="mt-2 h-[48px] w-full rounded-[18px] border border-[#cccdce] bg-white px-4 text-[15px] font-medium text-black outline-none transition focus:border-[#1188f8]"
                        />
                      </label>

                      <label class="block">
                        <span class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">To</span>
                        <input
                          v-model="sessionReportEndDate"
                          type="date"
                          class="mt-2 h-[48px] w-full rounded-[18px] border border-[#cccdce] bg-white px-4 text-[15px] font-medium text-black outline-none transition focus:border-[#1188f8]"
                        />
                      </label>

                      <button
                        type="button"
                        class="interactive-secondary-button h-[48px] rounded-[18px] border border-[#1188f8] bg-white px-5 text-[15px] font-semibold text-[#1188f8]"
                        @click="clearSessionReportFilters"
                      >
                        Clear
                      </button>
                    </div>

                    <p class="mt-3 text-[14px] font-medium text-[#5d5d5d]">
                      {{ filteredSessionReportDateRangeLabel }}
                    </p>

                    <div class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      <div class="rounded-[18px] bg-white px-4 py-4">
                        <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Completed Sessions</p>
                        <p class="mt-2 text-[28px] font-bold leading-none text-[#1188f8]">{{ filteredSessionReportSummary.sessions }}</p>
                      </div>
                      <div class="rounded-[18px] bg-white px-4 py-4">
                        <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Events</p>
                        <p class="mt-2 text-[28px] font-bold leading-none text-black">{{ filteredSessionReportSummary.events }}</p>
                      </div>
                      <div class="rounded-[18px] bg-white px-4 py-4">
                        <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Students</p>
                        <p class="mt-2 text-[28px] font-bold leading-none text-black">{{ filteredSessionReportSummary.students }}</p>
                      </div>
                      <div class="rounded-[18px] bg-white px-4 py-4">
                        <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Points</p>
                        <p class="mt-2 text-[28px] font-bold leading-none text-black">{{ filteredSessionReportSummary.points }}</p>
                      </div>
                    </div>

                    <div v-if="filteredSessionReportSessions.length" class="mt-4 max-h-[320px] overflow-y-auto rounded-[22px] border border-[#d8e4f3] bg-white">
                      <div
                        v-for="row in filteredSessionReportSessions"
                        :key="row.id"
                        class="flex flex-col gap-3 border-b border-[#eef1f4] px-4 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div class="min-w-0">
                          <p class="truncate text-[17px] font-bold text-black">{{ row.title }}</p>
                          <p v-if="row.topic" class="mt-1 text-[13px] font-semibold text-[#1188f8]">{{ row.topic }}</p>
                          <p class="mt-1 text-[13px] font-medium text-[#5d5d5d]">{{ row.date }}</p>
                          <p class="mt-1 text-[13px] font-medium text-[#5d5d5d]">Start: {{ row.started }}</p>
                          <p class="mt-1 text-[13px] font-medium text-[#5d5d5d]">End: {{ row.ended }}</p>
                        </div>
                        <div class="flex items-center gap-3 sm:shrink-0">
                          <div class="rounded-[14px] bg-[#f6f6f6] px-3 py-2 text-[13px] font-semibold text-[#4a4a4a]">
                            {{ row.duration }}
                          </div>
                          <div class="rounded-[14px] bg-[#eef6ff] px-3 py-2 text-[13px] font-semibold text-[#174ca0]">
                            {{ row.participantCount }} students
                          </div>
                          <div class="rounded-[14px] bg-[#d8ebff] px-3 py-2 text-[16px] font-bold text-[#1188f8]">
                            {{ row.points }} pts
                          </div>
                        </div>
                      </div>
                    </div>
                    <p v-else class="mt-4 rounded-[22px] border border-dashed border-[#cccdce] bg-white px-4 py-5 text-[15px] font-medium text-[#5d5d5d]">
                      No participation records matched the selected date range.
                    </p>
                  </section>

                  <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 class="text-[22px] font-bold leading-none text-black">Recitation Records</h2>
                        <p class="mt-2 text-[15px] font-medium text-[#5d5d5d]">
                          Open any completed session to see who recited, who did not recite, and the scores given.
                        </p>
                      </div>
                      <div class="rounded-[18px] bg-[#f6f6f6] px-4 py-3 text-right">
                        <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Sessions Recorded</p>
                        <p class="mt-1 text-[24px] font-bold leading-none text-[#1188f8]">{{ completedSessionRecords.length }}</p>
                      </div>
                    </div>

                    <div v-if="completedSessionRecords.length" class="mt-5 space-y-[14px]">
                      <button
                        v-for="session in completedSessionRecords.slice().reverse()"
                        :key="session.id"
                        type="button"
                        class="w-full rounded-[24px] border border-[#d8e4f3] bg-[#fbfdff] px-5 py-4 text-left transition hover:border-[#1188f8] hover:bg-[#f6fbff]"
                        @click="openSessionRecordModal(session)"
                      >
                        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div class="min-w-0">
                            <p class="truncate text-[21px] font-bold text-black">{{ session.title }}</p>
                            <p v-if="session.topic" class="mt-2 truncate text-[14px] font-semibold text-[#1188f8]">{{ session.topic }}</p>
                            <p class="mt-2 text-[14px] font-medium text-[#5d5d5d]">{{ formatFullDate(session.startedAt) }}</p>
                          </div>

                          <div class="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
                            <div class="rounded-[18px] bg-white px-4 py-3">
                              <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Recited</p>
                              <p class="mt-2 text-[22px] font-bold leading-none text-[#1188f8]">{{ session.recitationSummary.recitedCount }}</p>
                            </div>
                            <div class="rounded-[18px] bg-white px-4 py-3">
                              <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Did Not Recite</p>
                              <p class="mt-2 text-[22px] font-bold leading-none text-[#d11111]">{{ session.recitationSummary.notRecitedCount }}</p>
                            </div>
                            <div class="rounded-[18px] bg-white px-4 py-3">
                              <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Total Points</p>
                              <p class="mt-2 text-[22px] font-bold leading-none text-black">{{ formatScoreValue(session.recitationSummary.totalPoints) }}</p>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>

                    <p v-else class="mt-5 rounded-[22px] border border-dashed border-[#cccdce] bg-[#f8fbff] px-4 py-5 text-[15px] font-medium text-[#5d5d5d]">
                      No completed recitation sessions yet. Start a session to create the first record.
                    </p>
                  </section>
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
                          <AppIcon name="plus" :size="14" />
                        </span>
                        <span class="ml-[14px] text-[20px] font-semibold text-black">Add Desk</span>
                      </button>
                      <button type="button" class="flex h-[56px] w-full items-center rounded-[28px] bg-[#fdfdfd] px-[22px] text-left shadow-[0_1px_4px_rgba(0,0,0,0.05)]" @click="removeDesk">
                        <span class="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#ed5a5a] text-white">
                          <AppIcon name="minus" :size="14" />
                        </span>
                        <span class="ml-[14px] text-[20px] font-semibold text-black">Remove Desk</span>
                      </button>
                      <button type="button" class="flex h-[56px] w-full items-center rounded-[28px] bg-[#fdfdfd] px-[22px] text-left shadow-[0_1px_4px_rgba(0,0,0,0.05)]" @click="resetDeskLayout">
                        <AppIcon name="reset" :size="24" class="text-[#707070]" />
                        <span class="ml-[14px] text-[20px] font-semibold text-black">Reset Desk</span>
                      </button>
                      <button type="button" class="flex h-[56px] w-full items-center rounded-[28px] bg-[#fdfdfd] px-[22px] text-left shadow-[0_1px_4px_rgba(0,0,0,0.05)]" @click="toggleLayoutLock">
                        <AppIcon :name="isLayoutLocked ? 'unlock' : 'lock'" :size="24" :class="isLayoutLocked ? 'text-[#1188f8]' : 'text-[#707070]'" />
                        <span class="ml-[14px] text-[20px] font-semibold text-black">{{ isLayoutLocked ? 'Unlock Layout' : 'Lock Layout' }}</span>
                      </button>
                      <div class="flex h-[56px] items-center rounded-[28px] bg-[#fdfdfd] px-[22px] text-left shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
                        <AppIcon name="pencil" :size="24" class="text-[#1188f8]" />
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
                          <AppIcon name="sparkles" :size="30" class="text-[#111]" />
                        </div>
                        <p class="text-[20px] font-bold text-black">Class</p>
                        <p class="mt-[10px] text-[40px] leading-none font-bold text-[#0084ff]">{{ classroom.students }}</p>
                        <p class="mt-[10px] text-[16px] font-bold text-black">Students enrolled</p>
                      </div>
                    </div>

                    <div class="rounded-[20px] border border-[#969696] bg-white px-[22px] py-[18px]">
                      <p class="text-[24px] font-bold text-black">Class List</p>

                      <div class="mt-[18px] grid gap-[14px] md:grid-cols-2 xl:grid-cols-3">
                        <article
                          v-for="student in classListStudents"
                          :key="student.id"
                          class="rounded-[22px] border border-[#d7d7d7] bg-[#fafafa] px-[16px] py-[14px]"
                        >
                          <div class="flex items-start justify-between gap-3">
                            <div
                              class="flex min-w-0 items-center gap-[12px]"
                              :class="isSeatEditMode && !isLayoutLocked ? 'cursor-grab' : ''"
                              :draggable="isSeatEditMode && !isLayoutLocked"
                              @dragstart="handleRosterDragStart(student)"
                              @dragend="clearDraggedSeat"
                            >
                              <img :src="student.avatarSrc" alt="" class="h-[46px] w-[46px] rounded-full object-cover" />
                              <div class="min-w-0">
                                <p class="truncate text-[18px] font-semibold text-black">{{ student.name }}</p>
                                <p class="truncate text-[13px] font-medium text-[#666]">
                                  {{ student.studentNumber || student.email || 'Enrolled student' }}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              class="shrink-0 rounded-[18px] border border-[#1188f8] bg-white px-3 py-2 text-[13px] font-semibold text-[#1188f8] transition hover:bg-[#eef6ff]"
                              @click="openStudentFeedbackModal(student)"
                            >
                              {{ student.teacherFeedback ? 'Edit note' : 'Add note' }}
                            </button>
                          </div>

                          <div class="mt-[14px] rounded-[20px] bg-white px-[14px] py-[12px]">
                            <div class="flex items-start justify-between gap-3">
                              <p class="text-[14px] font-semibold text-[#1188f8]">Teacher Feedback</p>
                              <p class="text-[12px] font-semibold text-[#666]">
                                {{ getStudentFeedbackDateLabel(student.teacherFeedbackUpdatedAt) }}
                              </p>
                            </div>
                            <p class="mt-[12px] text-[14px] font-medium leading-[1.35] text-black">
                              {{ student.teacherFeedback || 'No personal note yet. Add a short message for this student.' }}
                            </p>
                          </div>

                          <p
                            v-if="isSeatEditMode && !isLayoutLocked"
                            class="mt-3 text-[12px] font-medium text-[#5d5d5d]"
                          >
                            Drag this student card onto a seat to place them in the layout.
                          </p>
                        </article>
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
                        <p class="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/80">Class Snapshot</p>
                        <p class="mt-1 text-[22px] font-bold leading-none">{{ analyticsStatusLabel }}</p>
                      </div>
                    </div>
                    <p class="mt-auto pt-10 text-[18px] font-medium leading-none sm:text-[20px]">
                      {{ classroom.scheduleLabel }} &bull; {{ classroom.time }}
                    </p>
                  </div>

                  <div class="grid gap-[16px] md:grid-cols-2 xl:grid-cols-4">
                    <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                      <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">Participation Score</p>
                      <p class="mt-3 text-[42px] font-bold leading-none text-[#1188f8]">{{ classAnalytics.averageScore }}%</p>
                      <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">{{ classAnalytics.confidenceLabel }}</p>
                    </article>
                    <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                      <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">Likely Next Participants</p>
                      <p class="mt-3 text-[42px] font-bold leading-none text-black">{{ classAnalytics.predictedNextParticipants }}</p>
                      <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">students expected to answer soon</p>
                    </article>
                    <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                      <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">Students Needing a Turn</p>
                      <p class="mt-3 text-[42px] font-bold leading-none text-[#b81717]">{{ classAnalytics.atRiskStudents }}</p>
                      <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">students who may need a prompt</p>
                    </article>
                    <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                      <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">Average Points</p>
                      <p class="mt-3 text-[42px] font-bold leading-none text-black">{{ classAnalytics.averagePoints }}</p>
                      <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">per student in this class</p>
                    </article>
                  </div>

                  <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h2 class="text-[24px] font-bold leading-none text-black">Browse Class Insights</h2>
                        <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">
                          Choose a simple view below so the page stays tidy and easier to read.
                        </p>
                      </div>
                      <div class="rounded-[18px] bg-[#f6f6f6] px-4 py-3 text-right">
                        <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Latest Answer</p>
                        <p class="mt-1 text-[22px] font-bold leading-none text-black">{{ latestParticipationTitle }}</p>
                        <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">{{ latestParticipationSummary }}</p>
                      </div>
                    </div>

                    <div class="mt-5 grid gap-[12px] md:grid-cols-2 xl:grid-cols-4">
                      <button
                        v-for="card in analyticsSectionCards"
                        :key="card.id"
                        type="button"
                        class="rounded-[22px] border px-5 py-4 text-left transition-all"
                        :class="analyticsSubview === card.id ? 'border-[#1188f8] bg-[#eef6ff] shadow-[0_10px_24px_rgba(17,136,248,0.12)]' : 'border-[#d8d8d8] bg-[#fbfbfb] hover:border-[#1188f8] hover:bg-[#f8fbff]'"
                        @click="analyticsSubview = card.id"
                      >
                        <div class="flex items-start justify-between gap-4">
                          <div>
                            <p class="text-[18px] font-bold text-black">{{ card.title }}</p>
                            <p class="mt-2 text-[14px] font-medium text-[#5b5b5b]">{{ card.description }}</p>
                          </div>
                          <div class="text-right">
                            <p class="text-[30px] font-bold leading-none text-[#1188f8]">{{ card.value }}</p>
                            <p class="mt-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#777]">{{ card.caption }}</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </section>

                  <transition name="fade" mode="out-in">
                    <div :key="analyticsSubview" class="space-y-[18px]">
                      <template v-if="analyticsSubview === 'overview'">
                        <div class="grid gap-[18px] xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                          <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                            <div class="flex items-start justify-between gap-4">
                              <div>
                                <h2 class="text-[24px] font-bold leading-none text-black">Class Activity Overview</h2>
                                <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">Participants and points across your recent sessions.</p>
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
                              <h2 class="text-[24px] font-bold leading-none text-black">Support Snapshot</h2>
                              <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">See who is doing well and who may need a nudge.</p>
                              <div class="mt-5 h-[280px]">
                                <ParticipationChart type="doughnut" :data="teacherRiskChartData" :options="teacherRiskChartOptions" />
                              </div>
                            </article>
                          </section>
                        </div>

                        <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h2 class="text-[24px] font-bold leading-none text-black">Most Active Students</h2>
                              <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">Students earning the most participation points so far.</p>
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
                      </template>

                      <template v-else-if="analyticsSubview === 'students'">
                        <div class="grid gap-[18px] xl:grid-cols-[minmax(0,1fr)_360px]">
                          <section class="rounded-[28px] bg-[#f6f6f6] px-4 py-4 sm:px-6">
                            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <h2 class="text-[28px] font-bold leading-none text-black">Turn Priority Queue</h2>
                                <p class="mt-2 text-[16px] font-medium text-[#4a4a4a]">A simple priority scale based on past turns, class activity, and where students are seated.</p>
                              </div>
                              <div class="rounded-[18px] bg-white px-4 py-3 text-center">
                                <p class="text-[28px] font-bold leading-none text-[#1188f8]">{{ classAnalytics.participationRate }}%</p>
                                <p class="mt-1 text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">active in class</p>
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
                              No enrolled students yet. Once students join and participate, suggestions will appear here.
                            </div>
                          </section>

                          <aside class="space-y-[18px]">
                            <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                              <h2 class="text-[24px] font-bold leading-none text-black">Try This Next</h2>
                              <p class="mt-4 text-[16px] font-medium leading-[1.35] text-[#333]">
                                Start by scanning students with low participation, then use "Pick Next Student" to keep turns fair.
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
                              <h2 class="text-[24px] font-bold leading-none text-black">Recent Answers</h2>
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

                        <article class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                          <div>
                            <h2 class="text-[24px] font-bold leading-none text-black">Student Follow-Up Lists</h2>
                            <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">
                              Quick lists for students who have been waiting, need a first turn, or are already very active.
                            </p>
                          </div>

                          <div class="mt-5 grid gap-[14px] md:grid-cols-3">
                            <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                              <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Waiting the Longest</p>
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
                              <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Still Waiting for a First Turn</p>
                              <div v-if="classAnalytics.neverCalledStudents.length" class="mt-3 space-y-[10px]">
                                <div
                                  v-for="student in classAnalytics.neverCalledStudents.slice(0, 4)"
                                  :key="`never-${student.id}`"
                                  class="rounded-[16px] bg-white px-3 py-3"
                                >
                                  <p class="truncate text-[15px] font-bold text-black">{{ student.name }}</p>
                                  <p class="mt-1 text-[12px] font-medium text-[#5d5d5d]">Needs a first participation chance</p>
                                </div>
                              </div>
                              <p v-else class="mt-3 text-[14px] font-medium text-[#5d5d5d]">Everyone has had a turn already.</p>
                            </div>

                            <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                              <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Participating the Least</p>
                              <div v-if="classAnalytics.leastActiveStudents.length" class="mt-3 space-y-[10px]">
                                <div
                                  v-for="student in classAnalytics.leastActiveStudents.slice(0, 4)"
                                  :key="`least-${student.id}`"
                                  class="rounded-[16px] bg-white px-3 py-3"
                                >
                                  <p class="truncate text-[15px] font-bold text-black">{{ student.name }}</p>
                                  <p class="mt-1 text-[12px] font-medium text-[#5d5d5d]">
                                    {{ student.sessions }} turns | {{ student.points }} points
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
                                <p class="mt-1 text-[14px] font-medium text-[#5b5b5b]">Helpful when you want to spread turns more evenly.</p>
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
                                  {{ student.sessions }} turns | {{ student.points }} points
                                </p>
                              </div>
                            </div>
                            <p v-else class="mt-3 text-[14px] font-medium text-[#5d5d5d]">No participation data yet.</p>
                          </div>
                        </article>
                      </template>

                      <template v-else-if="analyticsSubview === 'activity'">
                        <section class="grid gap-[18px] xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                          <article class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <h2 class="text-[24px] font-bold leading-none text-black">Who Has Had a Turn</h2>
                                <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">
                                  A simpler look at how evenly participation is being shared across the class.
                                </p>
                              </div>
                              <div class="rounded-[16px] bg-[#f6f6f6] px-4 py-3 text-right">
                                <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Turn Gap</p>
                                <p class="mt-1 text-[24px] font-bold leading-none text-[#1188f8]">{{ classAnalytics.selectionGap }}</p>
                              </div>
                            </div>

                            <div class="mt-5 grid gap-[14px] sm:grid-cols-2">
                              <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                                <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Coverage</p>
                                <p class="mt-3 text-[34px] font-bold leading-none text-[#1188f8]">{{ classAnalytics.coverageRate }}%</p>
                                <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">students called at least once</p>
                              </div>

                              <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                                <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Turn Balance</p>
                                <p class="mt-3 text-[34px] font-bold leading-none text-black">{{ classAnalytics.fairnessScore }}</p>
                                <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">{{ analyticsTurnBalanceLabel }}</p>
                              </div>

                              <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                                <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Last 7 Days</p>
                                <p class="mt-3 text-[34px] font-bold leading-none text-black">{{ classAnalytics.weeklyFrequency.events }}</p>
                                <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">
                                  {{ classAnalytics.weeklyFrequency.participants }} students joined in the last 7 days
                                </p>
                              </div>

                              <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                                <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Last 30 Days</p>
                                <p class="mt-3 text-[34px] font-bold leading-none text-black">{{ classAnalytics.monthlyFrequency.events }}</p>
                                <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">
                                  {{ classAnalytics.monthlyFrequency.participants }} students joined in the last 30 days
                                </p>
                              </div>
                            </div>
                          </article>

                          <article class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <h2 class="text-[24px] font-bold leading-none text-black">Best Times to Get Answers</h2>
                                <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">
                                  Use your recorded activity to see when the room tends to be more active or quieter.
                                </p>
                              </div>
                              <div class="rounded-[16px] bg-[#f6f6f6] px-4 py-3 text-right">
                                <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Strongest Signal</p>
                                <p class="mt-1 text-[24px] font-bold leading-none text-[#1188f8]">
                                  {{ classAnalytics.timingInsights.peakDay.events }}
                                </p>
                              </div>
                            </div>

                            <div class="mt-5 grid gap-[14px] sm:grid-cols-2">
                              <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                                <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Busiest Day</p>
                                <p class="mt-3 text-[30px] font-bold leading-none text-black">{{ classAnalytics.timingInsights.peakDay.label }}</p>
                                <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">
                                  {{ classAnalytics.timingInsights.peakDay.events }} events and
                                  {{ classAnalytics.timingInsights.peakDay.participants }} active students
                                </p>
                              </div>

                              <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                                <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Quietest Day</p>
                                <p class="mt-3 text-[30px] font-bold leading-none text-black">{{ classAnalytics.timingInsights.quietDay.label }}</p>
                                <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">
                                  {{ classAnalytics.timingInsights.quietDay.events }} events and
                                  {{ classAnalytics.timingInsights.quietDay.participants }} active students
                                </p>
                              </div>

                              <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                                <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Busiest Time</p>
                                <p class="mt-3 text-[30px] font-bold leading-none text-black">{{ classAnalytics.timingInsights.peakHour.label }}</p>
                                <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">
                                  {{ classAnalytics.timingInsights.peakHour.events }} events and
                                  {{ classAnalytics.timingInsights.peakHour.points }} total points
                                </p>
                              </div>

                              <div class="rounded-[20px] bg-[#f6f6f6] px-4 py-4">
                                <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Quietest Time</p>
                                <p class="mt-3 text-[30px] font-bold leading-none text-black">{{ classAnalytics.timingInsights.quietHour.label }}</p>
                                <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">
                                  {{ classAnalytics.timingInsights.quietHour.events }} events and
                                  {{ classAnalytics.timingInsights.quietHour.points }} total points
                                </p>
                              </div>
                            </div>
                          </article>
                        </section>

                        <article class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h2 class="text-[24px] font-bold leading-none text-black">Quiet Class Sessions</h2>
                              <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">
                                Sessions with the fewest participation events, useful when reviewing what to improve next.
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
                                quieter session
                              </span>
                            </div>
                          </div>
                          <p v-else class="mt-5 text-[15px] font-medium text-[#5d5d5d]">No session history yet.</p>
                        </article>
                      </template>

                      <div v-else class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div>
                            <h2 class="text-[24px] font-bold leading-none text-black">Room Attention Map</h2>
                            <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">
                              Match the room layout with who may need attention soon, using both turns and seating position.
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
                                  {{ student.seatZoneLabel }} seat | {{ student.points }} points | {{ student.sessions }} turns
                                </p>
                                <p class="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#516072]">
                                  seat effect +{{ student.seatEnvironmentBoost }}
                                </p>
                              </div>

                              <div class="shrink-0 text-right">
                                <p class="text-[18px] font-bold text-black">{{ Math.round(student.priorityScore) }}</p>
                                <p class="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#555]">priority</p>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </template>
            </template>
          </section>
        </main>
      </div>

      <div class="px-4 pb-6 sm:px-6 lg:hidden">
        <div class="flex items-center justify-center gap-8 rounded-[20px] border border-[#d9e8fb] bg-white px-4 py-3 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
          <button type="button" class="interactive-mobile-nav-button grid h-10 w-10 place-items-center rounded-[12px]" :class="currentTab !== 'analytics' ? 'bg-[rgba(46,130,239,0.25)]' : ''" aria-label="Classes" @click="router.push('/teacher')">
            <AppIcon name="classes" :size="22" :class="currentTab !== 'analytics' ? 'text-[#174ca0]' : 'text-[#707070]'" />
          </button>
          <button type="button" class="interactive-mobile-nav-button grid h-10 w-10 place-items-center rounded-[12px]" :class="currentTab === 'analytics' ? 'bg-[rgba(46,130,239,0.25)]' : ''" aria-label="Class insights" @click="setTab('analytics')">
            <AppIcon name="insights" :size="22" :class="currentTab === 'analytics' ? 'text-[#174ca0]' : 'text-[#707070]'" />
          </button>
          <button type="button" class="interactive-mobile-nav-button grid h-10 w-10 place-items-center rounded-[12px]" aria-label="Archive" @click="router.push('/teacher/archive')">
            <AppIcon name="archive" :size="22" class="text-[#707070]" />
          </button>
          <button type="button" class="interactive-mobile-nav-button grid h-10 w-10 place-items-center rounded-[12px]" aria-label="Settings" @click="openProfileModal">
            <AppIcon name="settings" :size="22" class="text-[#707070]" />
          </button>
          <button type="button" class="interactive-mobile-nav-button grid h-10 w-10 place-items-center rounded-[12px]" aria-label="Logout" @click="openLogoutConfirm">
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

      <transition name="fade">
        <div
          v-if="isPickNextStudentModalOpen"
          class="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(217,217,217,0.24)] px-3 py-4 backdrop-blur-[1px] sm:px-4 sm:py-8"
          @click.self="closePickNextStudentModal"
        >
          <div class="relative w-full max-w-[720px] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[22px] bg-white px-4 pb-5 pt-6 shadow-[0_4px_39.3px_2px_rgba(0,0,0,0.2)] sm:max-h-[calc(100vh-4rem)] sm:px-6 sm:pb-7 sm:pt-8">
            <button
              type="button"
              class="absolute right-[12px] top-[10px] grid h-10 w-10 place-items-center rounded-full text-[#4a4a4a] transition hover:bg-[#eef4ff] hover:text-[#1188f8] sm:right-[18px] sm:top-[14px]"
              aria-label="Close pick next student modal"
              @click="closePickNextStudentModal"
            >
              <AppIcon name="x" :size="22" />
            </button>

            <h2 class="pr-8 text-center text-[26px] leading-none font-bold text-black sm:text-[32px]">Pick Next Student</h2>
            <p class="mx-auto mt-3 max-w-[520px] text-center text-[15px] leading-[1.35] font-medium text-[#5b5b5b] sm:text-[18px] sm:leading-[1.2]">
              ReciCall ranks who to call on next using participation balance, inactivity, attendance history, class engagement trends, and seat environment. The selected student is still confirmed through QR scanning before any score is saved.
            </p>

            <div v-if="selectedQueuedStudent" class="mt-6 rounded-[28px] border border-[#d8d8d8] bg-[#f8fbff] px-4 py-4 sm:mt-8 sm:px-6 sm:py-6">
              <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div class="min-w-0">
                  <p class="text-[14px] font-semibold tracking-[0.16em] text-[#1188f8] uppercase">Next in Queue</p>
                  <p class="mt-2 break-words text-[26px] leading-none font-bold text-black sm:text-[32px]">{{ selectedQueuedStudent.name }}</p>
                  <p class="mt-3 text-[15px] font-medium text-[#4d4d4d] sm:text-[16px]">
                    Priority score:
                    <span class="font-bold text-[#1188f8]">{{ Math.round(selectedQueuedStudent.priorityScore) }}</span>
                  </p>
                  <p class="mt-2 text-[14px] font-medium text-[#6b7280] sm:text-[15px]">
                    Sessions since last turn: {{ selectedQueuedStudent.sessionsSinceLastParticipation }}
                  </p>
                  <p class="mt-2 text-[14px] font-medium text-[#6b7280] sm:text-[15px]">
                    Seat zone: {{ selectedQueuedStudent.seatZoneLabel }}
                  </p>
                </div>

                <div class="rounded-[18px] bg-white px-4 py-3 text-left shadow-[0_4px_12px_rgba(17,136,248,0.08)] lg:max-w-[280px]">
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
                <p class="text-[15px] font-semibold text-black">Choose the score before scanning</p>
                <p class="mt-2 text-[13px] font-medium text-[#6b7280]">
                  ReciCall will still confirm this pick through the student's QR code before saving the score.
                </p>
                <div class="mt-3 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                  <button
                    v-for="points in quickScoreOptions"
                    :key="`predicted-${points}`"
                    type="button"
                    class="flex h-[48px] w-full items-center justify-center rounded-[20px] px-4 text-[21px] font-bold transition-transform sm:h-[52px] sm:min-w-[98px] sm:px-5 sm:text-[24px]"
                    :class="selectedScanScore === points ? 'bg-[#1188f8] text-white shadow-[0_12px_22px_rgba(17,136,248,0.24)]' : 'bg-[#efefef] text-[#0084ff]'"
                    :disabled="isSavingQueueAbsence"
                    @click="selectQuickScore(points)"
                  >
                    +{{ points }}
                  </button>
                </div>
                <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    v-model="queueCustomScore"
                    type="number"
                    min="0.1"
                    step="0.1"
                    placeholder="Custom score"
                    class="h-[46px] w-full rounded-[18px] border border-[#cccdce] bg-white px-4 text-[15px] font-medium text-black outline-none transition focus:border-[#1188f8] sm:max-w-[160px]"
                  />
                  <button
                    type="button"
                    class="flex h-[46px] min-w-[156px] items-center justify-center rounded-[20px] border border-[#1188f8] bg-white px-4 text-[15px] font-semibold text-[#1188f8] disabled:opacity-50"
                    :disabled="isSavingQueueAbsence"
                    @click="armQueueCustomScore"
                  >
                    Use Custom Score
                  </button>
                </div>
              </div>

              <div class="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                <button
                  type="button"
                  class="w-full rounded-[20px] bg-[#1188f8] px-4 py-[11px] text-[15px] font-semibold text-white disabled:opacity-50 sm:w-auto"
                  :disabled="isSavingQueueAbsence || selectedScanScore === null || selectedScanScore === undefined"
                  @click="openQueueScanModal"
                >
                  Scan Selected Student QR
                </button>
                <button
                  type="button"
                  class="w-full rounded-[20px] border border-[#d11111] px-4 py-[11px] text-[15px] font-semibold text-[#d11111] disabled:opacity-50 sm:w-auto"
                  :disabled="isSavingQueueAbsence"
                  @click="markQueuedStudentAbsent"
                >
                  {{ isSavingQueueAbsence ? 'Recording absence...' : 'Mark Absent' }}
                </button>
                <button
                  type="button"
                  class="w-full rounded-[20px] border border-[#1188f8] px-4 py-[11px] text-[15px] font-semibold text-[#1188f8] disabled:opacity-50 sm:w-auto"
                  :disabled="queueRecommendation.candidateCount <= 1 || isSavingQueueAbsence"
                  @click="rerollQueuedStudent"
                >
                  Advance Queue
                </button>
                <p class="text-center text-[14px] font-medium text-[#6b7280] sm:text-left">
                  {{ queueRecommendation.candidateCount }} students in queue
                </p>
              </div>

              <div v-if="queueRecommendation.alternatives.length" class="mt-6 rounded-[20px] border border-[#e4e4e4] bg-white px-4 py-4">
                <p class="text-[15px] font-semibold text-black">Next in Queue</p>
                <div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

            <div v-else class="mt-6 rounded-[24px] border border-dashed border-[#d7d7d7] bg-[#f8f8f8] px-4 py-8 text-center sm:mt-8 sm:px-6 sm:py-10">
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
          class="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(8,13,22,0.68)] px-4 py-6 backdrop-blur-[2px]"
          @click.self="closeScanModal"
        >
          <div class="relative w-full max-w-[640px] rounded-[28px] bg-[#101722] px-5 pb-6 pt-5 text-white shadow-[0_24px_64px_rgba(0,0,0,0.42)]">
            <button
              type="button"
              class="absolute right-[16px] top-[14px] grid h-10 w-10 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Close scan modal"
              @click="closeScanModal"
            >
              <AppIcon name="x" :size="22" />
            </button>

            <div class="pr-10">
              <p class="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#8cc5ff]">
                {{ isQueueScanMode ? 'Queue Confirmation' : 'QR Scan' }}
              </p>
              <h2 class="mt-2 text-[30px] leading-none font-bold">
                {{ isQueueScanMode ? 'Scan the selected student' : 'Ready to scan' }}
              </h2>
              <p class="mt-3 max-w-[440px] text-[15px] font-medium leading-[1.45] text-white/75">
                {{ isQueueScanMode
                  ? `Scan ${scanExpectedStudent?.name || 'the selected student'}'s QR code to confirm the queue recommendation before saving the score.`
                  : 'Pick the score first, then point the camera at the student ID. The camera now scans across the full frame so it can locate the QR code automatically.' }}
              </p>
            </div>

            <div class="mt-5 flex flex-wrap items-center gap-3">
              <div class="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-[14px] font-semibold text-white">
                {{ selectedScanScoreLabel }}
              </div>
              <div v-if="isQueueScanMode && scanExpectedStudent" class="inline-flex items-center rounded-full bg-[#1188f8]/20 px-4 py-2 text-[14px] font-semibold text-[#8cc5ff]">
                Expected: {{ scanExpectedStudent.name }}
              </div>
            </div>

            <div class="mt-5 rounded-[26px] border border-white/10 bg-black/30 p-4">
              <div class="w-full overflow-hidden rounded-[22px] bg-black">
                <div :id="fileScannerElementId" class="hidden" />
                <div class="relative aspect-[4/5] w-full overflow-hidden bg-[#0b1220] sm:aspect-[16/10]">
                  <div
                    v-show="!scannedStudentName"
                    :id="scannerElementId"
                    class="h-full w-full overflow-hidden bg-black"
                  />

                  <div v-show="!scannedStudentName" class="pointer-events-none absolute inset-0">
                    <div class="absolute left-[10%] top-[14%] h-[52px] w-[52px] rounded-tl-[24px] border-l-[4px] border-t-[4px] border-white/90" />
                    <div class="absolute right-[10%] top-[14%] h-[52px] w-[52px] rounded-tr-[24px] border-r-[4px] border-t-[4px] border-white/90" />
                    <div class="absolute bottom-[14%] left-[10%] h-[52px] w-[52px] rounded-bl-[24px] border-b-[4px] border-l-[4px] border-white/90" />
                    <div class="absolute bottom-[14%] right-[10%] h-[52px] w-[52px] rounded-br-[24px] border-b-[4px] border-r-[4px] border-white/90" />
                    <div class="absolute inset-x-[16%] top-1/2 h-[2px] -translate-y-1/2 bg-[linear-gradient(90deg,rgba(17,136,248,0),rgba(17,136,248,0.9),rgba(17,136,248,0))]" />
                  </div>

                  <div
                    v-if="isStartingScanner"
                    class="absolute inset-0 flex items-center justify-center bg-[#0b1220] text-[18px] font-semibold text-white/80"
                  >
                    Starting camera...
                  </div>

                  <div
                    v-else-if="scanError && !scannedStudentName"
                    class="absolute inset-0 flex flex-col items-center justify-center bg-[#0b1220] px-6 text-center"
                  >
                    <p class="text-[18px] font-semibold text-[#ff8f8f]">{{ scanError }}</p>
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
                    class="absolute inset-0 flex flex-col items-center justify-center bg-[#0b1220] px-6 text-center"
                  >
                    <p class="text-[18px] font-medium text-white/70">Scanned student</p>
                    <p class="mt-3 text-[28px] font-bold text-white">{{ scannedStudentName }}</p>
                    <p class="mt-3 text-[15px] font-medium text-white/70">
                      Student ID: {{ scannedPayload?.studentNumber || 'Unknown' }}
                    </p>
                    <div class="mt-6 flex flex-col items-center gap-3 sm:flex-row">
                      <button
                        type="button"
                        class="rounded-[18px] bg-[#1188f8] px-5 py-2 text-[16px] font-semibold text-white disabled:opacity-60"
                        :disabled="isSavingScanAward || selectedScanScore === null || selectedScanScore === undefined"
                        @click="confirmScannedAward"
                      >
                        {{ isSavingScanAward ? 'Saving...' : `Confirm ${selectedScanScoreLabel}` }}
                      </button>
                      <button
                        type="button"
                        class="rounded-[18px] border border-white/20 bg-white/5 px-5 py-2 text-[16px] font-semibold text-white"
                        :disabled="isSavingScanAward"
                        @click="restartScanner"
                      >
                        Scan again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                v-for="points in quickScoreOptions"
                :key="points"
                type="button"
                class="flex h-[58px] min-w-[108px] items-center justify-center rounded-[26px] px-6 text-[28px] font-bold transition-transform"
                :class="selectedScanScore === points ? 'bg-[#1188f8] text-white shadow-[0_12px_22px_rgba(17,136,248,0.24)]' : 'bg-white text-[#1188f8]'"
                :disabled="isSavingScanAward"
                @click="selectQuickScore(points)"
              >
                +{{ points }}
              </button>
            </div>

            <div class="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <input
                v-model="scanCustomScore"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Custom score"
                class="h-[50px] w-full max-w-[220px] rounded-[18px] border border-white/18 bg-white px-4 text-[16px] font-medium text-black outline-none transition focus:border-[#1188f8]"
              />
              <button
                type="button"
                class="flex h-[50px] min-w-[180px] items-center justify-center rounded-[22px] border border-[#1188f8] bg-transparent px-5 text-[16px] font-semibold text-[#8cc5ff] disabled:opacity-50"
                :disabled="isSavingScanAward"
                @click="armScanCustomScore"
              >
                Use Custom Score
              </button>
            </div>

            <div class="mt-4 flex flex-wrap items-center justify-center gap-3 text-center text-[13px] font-medium text-white/65">
              <button
                type="button"
                class="rounded-[18px] border border-white/14 px-4 py-2 text-white transition hover:bg-white/8"
                :disabled="isSavingScanAward"
                @click="restartScanner"
              >
                Keep scanning
              </button>
              <button
                type="button"
                class="rounded-[18px] border border-white/14 px-4 py-2 text-white transition hover:bg-white/8"
                :disabled="isSavingScanAward"
                @click="openQrUpload"
              >
                Upload QR image
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
          v-if="isSessionSetupModalOpen"
          class="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(12,18,28,0.45)] px-4 py-8 backdrop-blur-[2px]"
          @click.self="closeSessionSetupModal"
        >
          <div class="w-full max-w-[520px] rounded-[28px] bg-white px-6 py-6 shadow-[0_22px_52px_rgba(0,0,0,0.22)]">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-[30px] leading-none font-bold">Start Recitation Session</h3>
                <p class="mt-2 text-[15px] font-medium text-[#5f5f5f]">
                  Name this session, add an optional topic, then jump straight into scanning.
                </p>
              </div>
              <button
                type="button"
                class="grid h-10 w-10 place-items-center rounded-full text-[#4a4a4a] transition hover:bg-[#eef4ff] hover:text-[#1188f8]"
                aria-label="Close session setup modal"
                @click="closeSessionSetupModal"
              >
                <AppIcon name="x" :size="20" />
              </button>
            </div>

            <label class="mt-5 block">
              <span class="text-[15px] font-semibold text-black">Session Name</span>
              <input
                v-model.trim="sessionDraftName"
                type="text"
                maxlength="80"
                class="mt-3 h-[54px] w-full rounded-[18px] border border-[#1188f8] bg-[#fbfdff] px-4 text-[18px] font-semibold text-black outline-none transition focus:shadow-[0_0_0_3px_rgba(17,136,248,0.12)]"
              />
            </label>

            <label class="mt-4 block">
              <span class="text-[15px] font-semibold text-black">Topic <span class="font-medium text-[#8a8a8a]">(optional)</span></span>
              <input
                v-model.trim="sessionDraftTopic"
                type="text"
                maxlength="120"
                placeholder="e.g. Kasaysayan ng Pilipinas"
                class="mt-3 h-[54px] w-full rounded-[18px] border border-[#d7d7d7] bg-[#fbfdff] px-4 text-[16px] font-medium text-black outline-none transition focus:border-[#1188f8]"
              />
            </label>

            <p v-if="sessionSetupError" class="mt-4 text-[14px] font-semibold text-[#b81717]">
              {{ sessionSetupError }}
            </p>

            <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                class="h-[50px] rounded-[24px] border border-[#d0d0d0] px-6 text-[18px] font-semibold text-[#4a4a4a]"
                :disabled="isSavingSessionState"
                @click="closeSessionSetupModal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="h-[50px] rounded-[24px] bg-[#1188f8] px-6 text-[18px] font-bold text-white disabled:opacity-70"
                :disabled="isSavingSessionState"
                @click="startSession"
              >
                {{ isSavingSessionState ? 'Starting...' : 'Start Scanning ->' }}
              </button>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div
          v-if="isSessionRecordModalOpen && selectedSessionRecord"
          class="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(12,18,28,0.45)] px-4 py-8 backdrop-blur-[2px]"
          @click.self="closeSessionRecordModal"
        >
          <div class="w-full max-w-[860px] overflow-hidden rounded-[28px] bg-white shadow-[0_22px_52px_rgba(0,0,0,0.22)]">
            <div class="bg-[linear-gradient(90deg,#257aff_0%,#2476f7_44.712%,#1d60c9_90.385%,#164999_100%)] px-6 py-6 text-white">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="text-[34px] leading-none font-bold">{{ selectedSessionRecord.title }}</h3>
                  <p v-if="selectedSessionRecord.topic" class="mt-3 text-[18px] font-semibold">{{ selectedSessionRecord.topic }}</p>
                  <p class="mt-2 text-[15px] font-medium">{{ formatFullDate(selectedSessionRecord.startedAt) }}</p>
                </div>
                <button
                  type="button"
                  class="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                  aria-label="Close recitation record modal"
                  @click="closeSessionRecordModal"
                >
                  <AppIcon name="x" :size="20" />
                </button>
              </div>

              <div class="mt-5 grid gap-3 sm:grid-cols-4">
                <div class="rounded-[20px] bg-white/12 px-4 py-4">
                  <p class="text-[30px] font-bold leading-none">{{ selectedSessionRecord.recitationSummary.recitedCount }}</p>
                  <p class="mt-2 text-[14px] font-medium text-white/90">Recited</p>
                </div>
                <div class="rounded-[20px] bg-white/12 px-4 py-4">
                  <p class="text-[30px] font-bold leading-none">{{ selectedSessionRecord.recitationSummary.notRecitedCount }}</p>
                  <p class="mt-2 text-[14px] font-medium text-white/90">Did Not Recite</p>
                </div>
                <div class="rounded-[20px] bg-white/12 px-4 py-4">
                  <p class="text-[30px] font-bold leading-none">{{ formatScoreValue(selectedSessionRecord.recitationSummary.totalPoints) }}</p>
                  <p class="mt-2 text-[14px] font-medium text-white/90">Total Points</p>
                </div>
                <div class="rounded-[20px] bg-white/12 px-4 py-4">
                  <p class="text-[30px] font-bold leading-none">{{ formatScoreValue(selectedSessionRecord.recitationSummary.averageScore) }}</p>
                  <p class="mt-2 text-[14px] font-medium text-white/90">Average Score</p>
                </div>
              </div>
            </div>

            <div class="max-h-[70vh] overflow-y-auto px-6 py-6">
              <section>
                <p class="text-[16px] font-bold uppercase tracking-[0.08em] text-[#4a4a4a]">
                  Recited ({{ selectedSessionRecord.recitationSummary.recitedCount }})
                </p>
                <div v-if="selectedSessionRecord.recitationSummary.recitedStudents.length" class="mt-4 space-y-[10px]">
                  <div
                    v-for="student in selectedSessionRecord.recitationSummary.recitedStudents"
                    :key="`recited-${student.id}`"
                    class="flex flex-col gap-3 rounded-[20px] border border-[#dfe7f3] bg-[#fbfdff] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div class="flex min-w-0 items-center gap-3">
                      <img :src="resolveStudentAvatar(student.avatarKey, student.photoURL)" alt="" class="h-[44px] w-[44px] rounded-full object-cover" />
                      <div class="min-w-0">
                        <p class="truncate text-[18px] font-semibold text-black">{{ student.name }}</p>
                        <p class="truncate text-[13px] font-medium text-[#666]">{{ student.studentNumber || student.email || 'Recited student' }}</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-3 sm:shrink-0">
                      <div class="rounded-[16px] bg-[#eef6ff] px-4 py-3 text-center">
                        <p class="text-[22px] font-bold leading-none text-[#1188f8]">{{ formatScoreValue(student.totalPoints) }}</p>
                        <p class="mt-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#777]">score</p>
                      </div>
                      <div class="rounded-[16px] bg-[#f6f6f6] px-4 py-3 text-center">
                        <p class="text-[18px] font-bold leading-none text-black">{{ student.turnCount }}</p>
                        <p class="mt-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#777]">turns</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p v-else class="mt-4 rounded-[20px] border border-dashed border-[#cccdce] bg-[#f8fbff] px-4 py-5 text-[15px] font-medium text-[#5d5d5d]">
                  No students recited in this session.
                </p>
              </section>

              <section class="mt-6">
                <p class="text-[16px] font-bold uppercase tracking-[0.08em] text-[#b81717]">
                  Did Not Recite ({{ selectedSessionRecord.recitationSummary.notRecitedCount }})
                </p>
                <div v-if="selectedSessionRecord.recitationSummary.notRecitedStudents.length" class="mt-4 space-y-[10px]">
                  <div
                    v-for="student in selectedSessionRecord.recitationSummary.notRecitedStudents"
                    :key="`not-recited-${student.id}`"
                    class="flex items-center gap-3 rounded-[20px] border border-[#f3d7d7] bg-[#fff8f8] px-4 py-4"
                  >
                    <img :src="resolveStudentAvatar(student.avatarKey, student.photoURL)" alt="" class="h-[44px] w-[44px] rounded-full object-cover" />
                    <div class="min-w-0">
                      <p class="truncate text-[18px] font-semibold text-black">{{ student.name }}</p>
                      <p class="truncate text-[13px] font-medium text-[#666]">{{ student.studentNumber || student.email || 'Student did not recite' }}</p>
                    </div>
                  </div>
                </div>
                <p v-else class="mt-4 rounded-[20px] border border-dashed border-[#cccdce] bg-[#f8fbff] px-4 py-5 text-[15px] font-medium text-[#5d5d5d]">
                  Everyone in the roster recited during this session.
                </p>
              </section>
            </div>
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

      <transition name="fade">
        <div
          v-if="isStudentFeedbackModalOpen"
          class="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(12,18,28,0.45)] px-4 py-8 backdrop-blur-[2px]"
          @click.self="closeStudentFeedbackModal"
        >
          <div class="w-full max-w-[640px] rounded-[28px] bg-white px-6 py-6 shadow-[0_22px_52px_rgba(0,0,0,0.22)]">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-[32px] leading-none font-bold">Student Feedback</h3>
                <p class="mt-2 text-[16px] font-medium text-[#5f5f5f]">
                  Write a personal note for {{ selectedFeedbackStudent?.name || 'this student' }}.
                </p>
              </div>
              <button
                type="button"
                class="grid h-10 w-10 place-items-center rounded-full text-[#4a4a4a] transition hover:bg-[#eef4ff] hover:text-[#1188f8]"
                aria-label="Close feedback modal"
                @click="closeStudentFeedbackModal"
              >
                <AppIcon name="x" :size="20" />
              </button>
            </div>

            <div
              v-if="selectedFeedbackStudent"
              class="mt-5 rounded-[22px] border border-[#d9e8fb] bg-[#f8fbff] px-4 py-4"
            >
              <div class="flex items-center gap-3">
                <img :src="selectedFeedbackStudent.avatarSrc" alt="" class="h-[54px] w-[54px] rounded-full object-cover" />
                <div class="min-w-0">
                  <p class="truncate text-[18px] font-bold text-black">{{ selectedFeedbackStudent.name }}</p>
                  <p class="truncate text-[14px] font-medium text-[#5d5d5d]">
                    {{ selectedFeedbackStudent.studentNumber || selectedFeedbackStudent.email || 'Enrolled student' }}
                  </p>
                </div>
              </div>
              <p class="mt-3 text-[13px] font-semibold text-[#4a4a4a]">
                {{ getStudentFeedbackDateLabel(selectedFeedbackStudent.teacherFeedbackUpdatedAt) }}
              </p>
            </div>

            <label class="mt-5 block">
              <span class="text-[15px] font-semibold text-black">Feedback Message</span>
              <textarea
                v-model="studentFeedbackDraft"
                rows="6"
                maxlength="500"
                placeholder="Example: You are contributing more consistently this week. Keep sharing your ideas early in the discussion."
                class="mt-3 w-full rounded-[22px] border border-[#cccdce] bg-[#fbfdff] px-4 py-4 text-[16px] font-medium text-black outline-none transition placeholder:text-[#8a8a8a] focus:border-[#1188f8]"
              />
            </label>

            <div class="mt-3 flex items-center justify-between gap-4">
              <p class="text-[13px] font-medium text-[#6b6b6b]">
                {{ studentFeedbackDraft.length }}/500 characters
              </p>
              <button
                type="button"
                class="text-[14px] font-semibold text-[#1188f8] hover:underline"
                :disabled="isSavingStudentFeedback"
                @click="studentFeedbackDraft = ''"
              >
                Clear note
              </button>
            </div>

            <p v-if="studentFeedbackError" class="mt-4 text-[14px] font-semibold text-[#b81717]">
              {{ studentFeedbackError }}
            </p>

            <div class="mt-6 flex justify-end gap-4">
              <button
                type="button"
                class="h-[54px] min-w-[144px] rounded-[28px] bg-[#d7d7d7] px-6 text-[18px] font-bold text-black"
                :disabled="isSavingStudentFeedback"
                @click="closeStudentFeedbackModal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="h-[54px] min-w-[160px] rounded-[28px] bg-[#1188f8] px-6 text-[18px] font-bold text-white disabled:opacity-70"
                :disabled="isSavingStudentFeedback || !selectedFeedbackStudent"
                @click="saveStudentFeedback"
              >
                {{ isSavingStudentFeedback ? 'Saving...' : 'Save Feedback' }}
              </button>
            </div>
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
import ConfirmActionModal from '../../components/common/ConfirmActionModal.vue'
import AppIcon from '../../components/common/AppIcon.vue'
import ClassThemeArt from '../../components/common/ClassThemeArt.vue'
import ParticipationChart from '../../components/charts/ParticipationChart.vue'
import { logoutUser, updateCurrentUserAccount } from '../../services/authService'
import {
  deleteTeacherAccount,
  getDeleteAccountErrorMessage,
} from '../../services/accountService'
import {
  buildClassAnalytics,
  buildPriorityQueueRecommendation,
  buildSeatEnvironmentMap,
} from '../../services/analyticsService'
import {
  endTeacherClassSession,
  getTeacherClassById,
  recordTeacherClassAbsence,
  recordStudentParticipation,
  startTeacherClassSession,
  updateTeacherClass,
  updateTeacherClassStudentFeedback,
} from '../../services/teacherService'
import { getUserById, upsertUserProfile } from '../../services/userService'
import imgStar1 from '../../assets/icons/recicall-logo.png'
import { decorateClassWithTheme } from '../../utils/classThemes'
import {
  buildParticipationDateRangeLabel,
  downloadParticipationPdfReport,
  filterParticipationEventsByDate,
} from '../../utils/participationReports'
import { resolveStudentAvatar } from '../../utils/studentAvatarOptions'
import { defaultTeacherAvatarKey, resolveTeacherAvatar, sanitizeTeacherAvatarKey, teacherAvatarOptions } from '../../utils/teacherAvatarOptions'
const router = useRouter()
const route = useRoute()

const teacherName = ref('Maam. Anderson')
const teacherRole = ref('High School Teacher')
const teacherAvatarKey = ref(defaultTeacherAvatarKey)
const teacherId = ref('')
const isLoading = ref(true)
const isLoggingOut = ref(false)
const isLogoutConfirmOpen = ref(false)
const isSidebarExpanded = ref(false)
const isProfileModalOpen = ref(false)
const isSavingProfile = ref(false)
const isDeleteAccountConfirmOpen = ref(false)
const isDeletingAccount = ref(false)
const isScanModalOpen = ref(false)
const isPickNextStudentModalOpen = ref(false)
const isStartingScanner = ref(false)
const isSavingScanAward = ref(false)
const isSavingQueueAbsence = ref(false)
const isRefreshingRecentEngagement = ref(false)
const isSeatEditMode = ref(false)
const isLayoutLocked = ref(false)
const isHydratingSeatLayout = ref(false)
const isSavingSeatLayout = ref(false)
const isSavingSessionState = ref(false)
const isSessionSetupModalOpen = ref(false)
const isSessionRecordModalOpen = ref(false)
const isStudentFeedbackModalOpen = ref(false)
const isSavingStudentFeedback = ref(false)
const seatLayoutSaveStatus = ref('')
const seatLayoutSaveError = ref(false)
const sessionReportStartDate = ref('')
const sessionReportEndDate = ref('')
const profileError = ref('')
const profileSuccess = ref('')
const deleteAccountError = ref('')
const scanError = ref('')
const pickNextStudentError = ref('')
const sessionSetupError = ref('')
const studentFeedbackError = ref('')
const scannedPayload = ref(null)
const scannerInstance = ref(null)
const qrUploadInput = ref(null)
const profileName = ref('')
const profileAvatarKey = ref(defaultTeacherAvatarKey)
const sessionDraftName = ref('')
const sessionDraftTopic = ref('')
const scanCustomScore = ref('')
const queueCustomScore = ref('')
const selectedScanScore = ref(3)
const scanMode = ref('general')
const scanExpectedStudent = ref(null)
const selectedSessionRecordId = ref('')
const selectedFeedbackStudentId = ref('')
const studentFeedbackDraft = ref('')
const rawClassroom = ref(null)
const loadError = ref('')
const analyticsSubview = ref('overview')
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

const isSessionActive = computed(() => Boolean(rawClassroom.value?.activeSession))
const currentTab = computed(() => route.query.tab || 'class')
const scannedStudentName = computed(() => scannedPayload.value?.name || '')
const quickScoreOptions = [1, 3, 5]
const isQueueScanMode = computed(() => scanMode.value === 'queue')
const selectedScanScoreLabel = computed(() =>
  selectedScanScore.value === null || selectedScanScore.value === undefined
    ? 'No score selected'
    : `+${formatScoreValue(selectedScanScore.value)} ready`,
)

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
  const themedClassroom = decorateClassWithTheme(rawClassroom.value)
  return {
    ...themedClassroom,
    students: themedClassroom.students ?? 0,
  }
})

const formatScoreValue = (value) => {
  const safeValue = Math.round(Number(value || 0) * 10) / 10
  return Number.isInteger(safeValue) ? `${safeValue}` : safeValue.toFixed(1)
}

const parseCustomScoreValue = (value) => {
  const normalized = String(value ?? '').trim()
  if (!normalized) return null

  const parsedValue = Number(normalized)
  if (!Number.isFinite(parsedValue) || parsedValue <= 0) return null

  return Math.round(parsedValue * 10) / 10
}

const buildSessionRosterStudent = (student = {}, index = 0) => ({
  id: student.studentId || student.id || `student-${index}`,
  name: student.displayName || student.name || student.email || `Student ${index + 1}`,
  email: student.email || '',
  studentNumber: student.studentNumber || '',
  avatarKey: student.avatarKey || '',
  photoURL: student.photoURL || '',
  gradeLevel: student.gradeLevel || '',
})

const buildSessionRecitationSummary = (session = {}, sessionEvents = []) => {
  const rosterSnapshotSource =
    Array.isArray(session?.rosterSnapshot) && session.rosterSnapshot.length
      ? session.rosterSnapshot
      : rawClassroom.value?.enrolledStudents || []

  const rosterSnapshot = rosterSnapshotSource.map((student, index) =>
    buildSessionRosterStudent(student, index),
  )
  const rosterIndex = new Map(rosterSnapshot.map((student) => [student.id, student]))
  const recitedIndex = new Map()

  sessionEvents.forEach((event) => {
    const studentId = event.studentId
    if (!studentId) return

    const rosterStudent = rosterIndex.get(studentId)
    const existingStudent = recitedIndex.get(studentId) || {
      id: studentId,
      name: rosterStudent?.name || event.displayName || 'Joined student',
      email: rosterStudent?.email || '',
      studentNumber: rosterStudent?.studentNumber || event.studentNumber || '',
      avatarKey: rosterStudent?.avatarKey || event.avatarKey || '',
      photoURL: rosterStudent?.photoURL || event.photoURL || '',
      totalPoints: 0,
      turnCount: 0,
      latestPoints: 0,
    }

    const awardedPoints = Number(event.points) || 0
    existingStudent.totalPoints += awardedPoints
    existingStudent.turnCount += 1
    existingStudent.latestPoints = awardedPoints
    recitedIndex.set(studentId, existingStudent)
  })

  const recitedStudents = [...recitedIndex.values()].sort((left, right) => {
    if (right.totalPoints !== left.totalPoints) {
      return right.totalPoints - left.totalPoints
    }

    return left.name.localeCompare(right.name)
  })

  const notRecitedStudents = rosterSnapshot
    .filter((student) => !recitedIndex.has(student.id))
    .sort((left, right) => left.name.localeCompare(right.name))

  const totalPoints = recitedStudents.reduce((sum, student) => sum + student.totalPoints, 0)

  return {
    totalStudents: rosterSnapshot.length,
    recitedCount: recitedStudents.length,
    notRecitedCount: notRecitedStudents.length,
    totalPoints,
    averageScore: recitedStudents.length ? Math.round((totalPoints / recitedStudents.length) * 10) / 10 : 0,
    recitedStudents,
    notRecitedStudents,
  }
}

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
const participationOnlyEvents = computed(() =>
  participationEvents.value.filter((event) => event?.eventType !== 'absence'),
)
const sessionHistory = computed(() =>
  Array.isArray(rawClassroom.value?.sessionHistory) ? rawClassroom.value.sessionHistory : [],
)
const activeSessionRecord = computed(() => rawClassroom.value?.activeSession || null)
const activeSessionEvents = computed(() => {
  if (!activeSessionRecord.value) return []

  const sessionStart = toEventDate(activeSessionRecord.value.startedAt)?.getTime() || 0
  return participationOnlyEvents.value.filter((event) => {
    const timestamp = toEventDate(event.createdAt)?.getTime() || 0
    return timestamp >= sessionStart
  })
})
const completedSessionRecords = computed(() =>
  sessionHistory.value
    .map((session, index) => {
      const startedAt = toEventDate(session.startedAt)
      const endedAt = toEventDate(session.endedAt)
      const sessionStart = startedAt?.getTime() || 0
      const sessionEnd = endedAt?.getTime() || Number.MAX_SAFE_INTEGER
      const sessionEvents = participationOnlyEvents.value.filter((event) => {
        if (session.id && event.sessionId) {
          return event.sessionId === session.id
        }

        const timestamp = toEventDate(event.createdAt)?.getTime() || 0
        return timestamp >= sessionStart && timestamp <= sessionEnd
      })
      const recitationSummary = buildSessionRecitationSummary(session, sessionEvents)

      return {
        ...session,
        sessionNumber: index + 1,
        title: session.name || `Participation ${index + 1}`,
        topic: session.topic || '',
        startedAt,
        endedAt,
        participantCount: recitationSummary.recitedCount,
        points: recitationSummary.totalPoints,
        recitationSummary,
      }
    })
    .filter((session) => session.startedAt),
)
const filteredSessionReportSessions = computed(() =>
  filterParticipationEventsByDate(
    completedSessionRecords.value.map((session) => ({
      ...session,
      createdAt: session.startedAt,
    })),
    {
      startDate: sessionReportStartDate.value,
      endDate: sessionReportEndDate.value,
    },
  )
    .map((session) => ({
      ...session,
      date: formatFullDate(session.startedAt),
      started: formatDateTime(session.startedAt),
      ended: formatDateTime(session.endedAt),
      duration: formatSessionDuration(session.startedAt, session.endedAt),
    }))
    .sort((left, right) => (right.startedAt?.getTime() || 0) - (left.startedAt?.getTime() || 0)),
)
const filteredSessionReportEvents = computed(() =>
  filterParticipationEventsByDate(participationOnlyEvents.value, {
    startDate: sessionReportStartDate.value,
    endDate: sessionReportEndDate.value,
  }),
)
const filteredSessionReportDateRangeLabel = computed(() =>
  buildParticipationDateRangeLabel({
    startDate: sessionReportStartDate.value,
    endDate: sessionReportEndDate.value,
  }),
)
const filteredSessionReportSummary = computed(() => ({
  sessions: filteredSessionReportSessions.value.length,
  events: filteredSessionReportEvents.value.length,
  students: new Set(filteredSessionReportEvents.value.map((event) => event.studentId).filter(Boolean)).size,
  points: filteredSessionReportEvents.value.reduce((sum, event) => sum + (Number(event.points) || 0), 0),
}))
const latestParticipationHighlight = computed(() => classAnalytics.value.recentHighlights[0] || null)
const latestParticipationTitle = computed(() =>
  latestParticipationHighlight.value?.name || 'No participation yet',
)
const latestParticipationSubtitle = computed(() => {
  if (!latestParticipationHighlight.value) {
    return 'Open insights once students start participating.'
  }

  return `${latestParticipationHighlight.value.label} • +${latestParticipationHighlight.value.points} pts`
})

const latestParticipationSummary = computed(() => {
  if (!latestParticipationHighlight.value) {
    return 'Open insights once students start participating.'
  }

  return `${latestParticipationHighlight.value.label} | +${latestParticipationHighlight.value.points} pts`
})

const analyticsStatusLabel = computed(() => {
  if (classAnalytics.value.statusLabel === 'Healthy') return 'Going well'
  if (classAnalytics.value.statusLabel === 'Needs Attention') return 'Needs a nudge'
  if (classAnalytics.value.statusLabel === 'Needs Baseline') return 'Just getting started'
  return classAnalytics.value.statusLabel
})

const analyticsTurnBalanceLabel = computed(() => {
  if (classAnalytics.value.fairnessLabel === 'Balanced') return 'Fair rotation'
  if (classAnalytics.value.fairnessLabel === 'Monitoring') return 'Watch the balance'
  if (classAnalytics.value.fairnessLabel === 'Uneven') return 'Needs balancing'
  return classAnalytics.value.fairnessLabel
})

const toEventDate = (value) => {
  if (!value) return null
  if (value instanceof Date) return value
  if (typeof value.toDate === 'function') return value.toDate()
  if (typeof value.seconds === 'number') return new Date(value.seconds * 1000)

  const parsedDate = new Date(value)
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
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

const getStudentFeedbackDateLabel = (value) => {
  const date = toEventDate(value)
  if (!date) return 'No note yet'
  return `Updated ${formatFullDate(date)}`
}

const formatClockTime = (value) => {
  const date = toEventDate(value)
  if (!date) return 'Not recorded'

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

const formatDateTime = (value) => {
  const date = toEventDate(value)
  if (!date) return 'Not recorded'
  return `${formatFullDate(date)} • ${formatClockTime(date)}`
}

const formatSessionDuration = (startedAt, endedAt) => {
  const start = toEventDate(startedAt)
  const end = toEventDate(endedAt)
  if (!start || !end) return 'In progress'

  const durationMs = Math.max(end.getTime() - start.getTime(), 0)
  const totalMinutes = Math.max(Math.round(durationMs / 60000), 0)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }

  return `${minutes} min`
}

const activeSessionTitle = computed(() => {
  if (activeSessionRecord.value?.name) return activeSessionRecord.value.name
  const sessionNumber = completedSessionRecords.value.length + 1
  return `Participation ${sessionNumber}`
})
const activeSessionDateLabel = computed(() =>
  activeSessionRecord.value
    ? activeSessionRecord.value.topic
      ? `${activeSessionRecord.value.topic} | Started ${formatDateTime(activeSessionRecord.value.startedAt)}`
      : `Started ${formatDateTime(activeSessionRecord.value.startedAt)}`
    : formatFullDate(new Date()),
)
const activeSessionParticipantCount = computed(() =>
  new Set(activeSessionEvents.value.map((event) => event.studentId).filter(Boolean)).size,
)
const nextSessionDefaultName = computed(() => `Participation ${completedSessionRecords.value.length + 1}`)
const selectedSessionRecord = computed(
  () => completedSessionRecords.value.find((session) => session.id === selectedSessionRecordId.value) || null,
)
const recentStudents = computed(() => {
  const sourceEvents = activeSessionEvents.value.length ? activeSessionEvents.value : participationOnlyEvents.value
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
  labels: ['Doing well', 'Needs a nudge', 'Needs extra attention'],
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
    teacherFeedback: String(student.teacherFeedback || '').trim(),
    teacherFeedbackUpdatedAt: student.teacherFeedbackUpdatedAt || null,
    avatarSrc: resolveStudentAvatar(student.avatarKey, student.photoURL),
  })),
)

const selectedFeedbackStudent = computed(
  () => classListStudents.value.find((student) => student.id === selectedFeedbackStudentId.value) || null,
)

const slugifyReportValue = (value, fallback = 'report') =>
  String(value || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || fallback

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

const analyticsSectionCards = computed(() => [
  {
    id: 'overview',
    title: 'Overview',
    description: 'See the class picture first.',
    value: `${classAnalytics.value.averageScore}%`,
    caption: 'participation score',
  },
  {
    id: 'students',
    title: 'Student Focus',
    description: 'See who has higher turn priority.',
    value: `${classAnalytics.value.atRiskStudents}`,
    caption: 'students to watch',
  },
  {
    id: 'activity',
    title: 'Activity Trends',
    description: 'Check class momentum over time.',
    value: `${classAnalytics.value.totalSessions}`,
    caption: 'tracked sessions',
  },
  {
    id: 'seating',
    title: 'Seat View',
    description: 'Match the room with student priority.',
    value: `${analyticsHeatmapStudents.value.length}`,
    caption: 'assigned students',
  },
])

const heatmapLegend = [
  { label: 'Low priority', score: 18 },
  { label: 'Medium priority', score: 52 },
  { label: 'High priority', score: 86 },
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

const openDeleteAccountConfirm = () => {
  if (isSavingProfile.value || isDeletingAccount.value) return

  deleteAccountError.value = ''
  isDeleteAccountConfirmOpen.value = true
}

const closeDeleteAccountConfirm = () => {
  if (isDeletingAccount.value) return
  isDeleteAccountConfirmOpen.value = false
}

const resetScanState = ({ keepSelectedScore = false, keepScanContext = false } = {}) => {
  scanError.value = ''
  scannedPayload.value = null
  scanCustomScore.value = ''
  if (!keepSelectedScore) {
    selectedScanScore.value = quickScoreOptions[1]
  }
  if (!keepScanContext) {
    scanMode.value = 'general'
    scanExpectedStudent.value = null
  }
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

const openSessionSetupModal = () => {
  sessionDraftName.value = nextSessionDefaultName.value
  sessionDraftTopic.value = ''
  sessionSetupError.value = ''
  isSessionSetupModalOpen.value = true
}

const closeSessionSetupModal = () => {
  if (isSavingSessionState.value) return
  isSessionSetupModalOpen.value = false
  sessionSetupError.value = ''
}

const openPickNextStudentModal = () => {
  excludedRecommendationIds.value = []
  pickNextStudentError.value = ''
  queueCustomScore.value = ''
  selectedScanScore.value = quickScoreOptions[1]
  isPickNextStudentModalOpen.value = true
}

const openSessionRecordModal = (session) => {
  selectedSessionRecordId.value = session?.id || ''
  isSessionRecordModalOpen.value = true
}

const closeSessionRecordModal = () => {
  isSessionRecordModalOpen.value = false
  selectedSessionRecordId.value = ''
}

const openRecentParticipationLog = async () => {
  analyticsSubview.value = 'students'

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

const clearSessionReportFilters = () => {
  sessionReportStartDate.value = ''
  sessionReportEndDate.value = ''
}

const downloadSessionReport = async () => {
  if (!classroom.value || !filteredSessionReportSessions.value.length) return

  await downloadParticipationPdfReport({
    fileName: `${slugifyReportValue(classroom.value.subject, 'class')}-${slugifyReportValue(classroom.value.classLabel, 'session')}-session-report.pdf`,
    title: `${classroom.value.subject} Session Report`,
    subtitle: `${classroom.value.gradeLevel} - ${classroom.value.classLabel}`,
    generatedFor: `${teacherName.value} - ${teacherRole.value}`,
    summaryItems: [
      { label: 'Date Range', value: filteredSessionReportDateRangeLabel.value },
      { label: 'Sessions', value: filteredSessionReportSummary.value.sessions },
      { label: 'Events', value: filteredSessionReportSummary.value.events },
      { label: 'Unique Students', value: filteredSessionReportSummary.value.students },
      { label: 'Total Points', value: filteredSessionReportSummary.value.points },
    ],
    columns: [
      { key: 'date', label: 'Date' },
      { key: 'sessionLabel', label: 'Session' },
      { key: 'started', label: 'Started' },
      { key: 'ended', label: 'Ended' },
      { key: 'participantLabel', label: 'Participants' },
      { key: 'pointsLabel', label: 'Points' },
    ],
    rows: filteredSessionReportSessions.value.map((session) => ({
      date: session.date,
      sessionLabel: session.title,
      started: session.started,
      ended: session.ended,
      participantLabel: `${session.participantCount}`,
      pointsLabel: `${session.points}`,
    })),
  })
}

const closePickNextStudentModal = () => {
  isPickNextStudentModalOpen.value = false
  pickNextStudentError.value = ''
  queueCustomScore.value = ''
}

const selectQuickScore = (points) => {
  selectedScanScore.value = points
}

const armScanCustomScore = () => {
  const customScore = parseCustomScoreValue(scanCustomScore.value)
  if (customScore === null) {
    scanError.value = 'Enter a valid custom score greater than 0.'
    return false
  }

  selectedScanScore.value = customScore
  scanError.value = ''
  return true
}

const armQueueCustomScore = () => {
  const customScore = parseCustomScoreValue(queueCustomScore.value)
  if (customScore === null) {
    pickNextStudentError.value = 'Enter a valid custom score greater than 0.'
    return false
  }

  selectedScanScore.value = customScore
  pickNextStudentError.value = ''
  return true
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

    if (scanExpectedStudent.value?.id && payload?.uid !== scanExpectedStudent.value.id) {
      scanError.value = `This QR belongs to ${payload?.name || 'another student'}. Scan ${scanExpectedStudent.value.name}'s QR instead.`
      return
    }

    scannedPayload.value = payload
    scanError.value = ''
    await stopScanner()
  } catch (error) {
    console.error(error)
    scanError.value = 'This QR code is not a valid student participation ID.'
  }
}

const startScanner = async () => {
  resetScanState({ keepSelectedScore: true, keepScanContext: true })
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
        fps: 12,
        aspectRatio: 1.3333333333,
        disableFlip: false,
        rememberLastUsedCamera: true,
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true,
        },
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
  resetScanState()
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
    recentEntry.teacherFeedback = existingStudent.teacherFeedback || ''
    recentEntry.teacherFeedbackUpdatedAt = existingStudent.teacherFeedbackUpdatedAt || null
    recentEntry.totalPoints = Number(existingStudent.totalPoints || 0) + points
    recentEntry.participatedSessions = Number(existingStudent.participatedSessions || 0) + 1
  } else {
    recentEntry.email = studentPayload.email
    recentEntry.photoURL = studentPayload.photoURL
    recentEntry.gradeLevel = studentPayload.gradeLevel
  }

  try {
    await recordStudentParticipation(teacherId.value, route.params.classId, recentEntry, points, {
      sessionId: activeSessionRecord.value?.id || '',
      sessionName: activeSessionRecord.value?.name || activeSessionTitle.value,
      sessionTopic: activeSessionRecord.value?.topic || '',
    })
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
    eventType: 'participation',
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

const persistStudentAbsence = async (studentPayload) => {
  if (!studentPayload?.uid) return { ok: false, error: 'Missing student information.' }

  try {
    await recordTeacherClassAbsence(teacherId.value, route.params.classId, {
      studentId: studentPayload.uid,
      displayName: studentPayload.name || 'Joined student',
      email: studentPayload.email,
      studentNumber: studentPayload.studentNumber,
      photoURL: studentPayload.photoURL,
      avatarKey: studentPayload.avatarKey,
    }, {
      absenceReason: 'called-absent',
      calledByQueue: true,
      sessionId: activeSessionRecord.value?.id || '',
      sessionName: activeSessionRecord.value?.name || activeSessionTitle.value,
      sessionTopic: activeSessionRecord.value?.topic || '',
    })
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      error: error?.message || 'Unable to record the absence right now.',
    }
  }

  rawClassroom.value = {
    ...rawClassroom.value,
    participationEvents: [
      ...(rawClassroom.value?.participationEvents || []),
      {
        id: `absence-${studentPayload.uid}-${Date.now()}`,
        studentId: studentPayload.uid,
        displayName: studentPayload.name || 'Joined student',
        studentNumber: studentPayload.studentNumber,
        photoURL: studentPayload.photoURL,
        avatarKey: studentPayload.avatarKey,
        eventType: 'absence',
        absenceReason: 'called-absent',
        calledByQueue: true,
        points: 0,
        createdAt: new Date(),
      },
    ],
  }

  return { ok: true }
}

const confirmScannedAward = async () => {
  if (!scannedPayload.value || selectedScanScore.value === null || selectedScanScore.value === undefined) return

  isSavingScanAward.value = true
  const result = await persistParticipationAward(scannedPayload.value, selectedScanScore.value)
  isSavingScanAward.value = false

  if (!result.ok) {
    scanError.value = result.error || 'Unable to save participation right now.'
    return
  }

  await closeScanModal()
}

const openQueueScanModal = async () => {
  if (!selectedQueuedStudent.value) return
  if (selectedScanScore.value === null || selectedScanScore.value === undefined) {
    pickNextStudentError.value = 'Select a score before scanning the selected student.'
    return
  }

  pickNextStudentError.value = ''
  scanMode.value = 'queue'
  scanExpectedStudent.value = {
    id: selectedQueuedStudent.value.id,
    name: selectedQueuedStudent.value.name,
    studentNumber: selectedQueuedStudent.value.studentNumber || '',
  }
  scannedPayload.value = null
  scanError.value = ''
  isPickNextStudentModalOpen.value = false
  isScanModalOpen.value = true
  await startScanner()
}

const markQueuedStudentAbsent = async () => {
  if (!selectedQueuedStudent.value || isSavingQueueAbsence.value) return

  isSavingQueueAbsence.value = true
  pickNextStudentError.value = ''
  const result = await persistStudentAbsence(buildParticipationPayload(selectedQueuedStudent.value))
  isSavingQueueAbsence.value = false

  if (!result.ok) {
    pickNextStudentError.value = result.error || 'Unable to record the absence right now.'
    return
  }

  if (!excludedRecommendationIds.value.includes(selectedQueuedStudent.value.id)) {
    excludedRecommendationIds.value = [...excludedRecommendationIds.value, selectedQueuedStudent.value.id]
  }
}

const openStudentFeedbackModal = (student) => {
  selectedFeedbackStudentId.value = student?.id || ''
  studentFeedbackDraft.value = student?.teacherFeedback || ''
  studentFeedbackError.value = ''
  isStudentFeedbackModalOpen.value = true
}

const closeStudentFeedbackModal = () => {
  if (isSavingStudentFeedback.value) return
  isStudentFeedbackModalOpen.value = false
  selectedFeedbackStudentId.value = ''
  studentFeedbackDraft.value = ''
  studentFeedbackError.value = ''
}

const saveStudentFeedback = async () => {
  if (!teacherId.value || !route.params.classId || !selectedFeedbackStudent.value) return

  isSavingStudentFeedback.value = true
  studentFeedbackError.value = ''

  const normalizedFeedback = studentFeedbackDraft.value.trim()

  try {
    await updateTeacherClassStudentFeedback(
      teacherId.value,
      route.params.classId,
      selectedFeedbackStudent.value.id,
      normalizedFeedback,
    )

    const savedAt = normalizedFeedback ? new Date() : null
    rawClassroom.value = {
      ...rawClassroom.value,
      enrolledStudents: (rawClassroom.value?.enrolledStudents || []).map((student) => {
        const studentId = student.studentId || student.id
        if (studentId !== selectedFeedbackStudent.value.id) return student

        return {
          ...student,
          teacherFeedback: normalizedFeedback,
          teacherFeedbackUpdatedAt: savedAt,
        }
      }),
    }

    isSavingStudentFeedback.value = false
    closeStudentFeedbackModal()
    return
  } catch (error) {
    console.error('Unable to save student feedback:', error)
    studentFeedbackError.value = 'We could not save this feedback right now. Please try again.'
  } finally {
    isSavingStudentFeedback.value = false
  }
}

const closeProfileModal = () => {
  isProfileModalOpen.value = false
  profileError.value = ''
  profileSuccess.value = ''
  deleteAccountError.value = ''
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

const startSession = async () => {
  if (isSavingSessionState.value || !teacherId.value || !route.params.classId || isSessionActive.value) return

  const sessionName = sessionDraftName.value.trim()
  if (!sessionName) {
    sessionSetupError.value = 'Enter a session name first.'
    return
  }

  isSavingSessionState.value = true

  try {
    const activeSession = await startTeacherClassSession(teacherId.value, route.params.classId, {
      name: sessionName,
      topic: sessionDraftTopic.value.trim(),
      rosterSnapshot: classListStudents.value,
    })
    rawClassroom.value = {
      ...rawClassroom.value,
      activeSession,
    }
    isSessionSetupModalOpen.value = false
    sessionSetupError.value = ''

    await router.push({
      path: route.path,
      query: {
        ...route.query,
        session: 'active',
      },
    })

    await openScanModal()
  } catch (error) {
    console.error('Unable to start session:', error)
    sessionSetupError.value = 'We could not start this session right now. Please try again.'
  } finally {
    isSavingSessionState.value = false
  }
}

const endSession = async () => {
  if (isSavingSessionState.value || !teacherId.value || !route.params.classId || !activeSessionRecord.value) return

  isSavingSessionState.value = true

  try {
    const completedSessionPreview = {
      ...activeSessionRecord.value,
      sessionNumber: sessionHistory.value.length + 1,
    }
    const recitationSummary = buildSessionRecitationSummary(completedSessionPreview, activeSessionEvents.value)
    const completedSession = await endTeacherClassSession(
      teacherId.value,
      route.params.classId,
      sessionHistory.value,
      activeSessionRecord.value,
      { recitationSummary },
    )

    rawClassroom.value = {
      ...rawClassroom.value,
      activeSession: null,
      sessionHistory: [...sessionHistory.value, completedSession].filter(Boolean),
    }

    const nextQuery = { ...route.query }
    delete nextQuery.session

    await router.push({
      path: route.path,
      query: nextQuery,
    })

    openSessionRecordModal(completedSession)
  } catch (error) {
    console.error('Unable to end session:', error)
  } finally {
    isSavingSessionState.value = false
  }
}

const loadClassroomData = async ({ silent = false } = {}) => {
  if (!teacherId.value || !route.params.classId) return

  if (!silent) {
    isLoading.value = true
  }

  loadError.value = ''

  try {
    rawClassroom.value = await getTeacherClassById(teacherId.value, route.params.classId)

    if (rawClassroom.value?.activeSession && route.query.session !== 'active') {
      await router.replace({
        path: route.path,
        query: {
          ...route.query,
          session: 'active',
        },
      })
    } else if (!rawClassroom.value?.activeSession && route.query.session === 'active') {
      const nextQuery = { ...route.query }
      delete nextQuery.session
      await router.replace({
        path: route.path,
        query: nextQuery,
      })
    }
  } catch (error) {
    console.error('Unable to load classroom:', error)
    rawClassroom.value = null
    loadError.value = 'We could not load this class right now. Please refresh and try again.'
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
