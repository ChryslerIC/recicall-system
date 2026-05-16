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
          <p class="ml-3 mt-1 text-[28px] leading-none font-black tracking-[-0.03em] sm:ml-4 sm:mt-2 sm:text-[34px] lg:ml-[22px] lg:mt-[18px] lg:text-[40px]">
            ReciCall
          </p>
        </div>

        <div class="ml-4 flex items-start sm:gap-5 lg:mr-[34px]">
          <button type="button" class="mt-0 sm:mt-1 lg:mt-[12px]" aria-label="Profile" @click="openStudentSettings">
            <img :src="studentAvatarSrc" alt="" class="h-[48px] w-[49px] rounded-full object-cover sm:h-[56px] sm:w-[57px] lg:h-[63px] lg:w-[64px]" />
          </button>
        </div>
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
              <AppIcon name="classes" :size="26" class="shrink-0 text-[#174ca0]" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-semibold text-[#174ca0]">Classes</span>
            </div>

            <button
              type="button"
              class="flex h-[63px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[18px]' : 'justify-center'"
              aria-label="Student ID"
              @click="router.push('/student/id')"
            >
              <AppIcon name="badge" :size="24" class="shrink-0 text-[#707070]" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Student ID</span>
            </button>
          </div>

          <div class="flex flex-col gap-[18px]">
            <button
              type="button"
              class="flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Settings"
              @click="openStudentSettings"
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
          <section class="min-h-[653px] rounded-[28px] border-2 border-[#2e82ef] bg-white px-4 pb-8 pt-6 sm:px-7 sm:pt-8 lg:rounded-[52px] lg:px-[34px] lg:pb-[36px] lg:pt-[30px]">
            <div v-if="isLoading" class="text-[18px] font-medium text-[#5d5d5d]">Loading class...</div>
            <div
              v-else-if="!classroom"
              class="rounded-[24px] border border-[#ffd0d0] bg-[#fff8f8] px-6 py-8 text-[18px] font-medium text-[#b81717]"
            >
              We couldn't find that class.
            </div>

            <template v-else>
              <div class="rounded-[30.5px] bg-[#f6f6f6] px-[10px] py-[8px] shadow-[0_4px_6.1px_-4px_rgba(0,0,0,0.25)] sm:w-fit">
                <div class="flex flex-wrap gap-2 sm:flex-nowrap">
                  <button
                    type="button"
                    class="h-[47px] min-w-[141px] rounded-[30.5px] text-[16px] font-semibold"
                    :class="activeTab === 'class' ? 'bg-white text-[#1188f8]' : 'text-[#373737]'"
                    @click="setTab('class')"
                  >
                    Class
                  </button>
                  <button
                    type="button"
                    class="h-[47px] min-w-[141px] rounded-[30.5px] text-[16px] font-semibold"
                    :class="activeTab === 'class-list' ? 'bg-white text-[#1188f8]' : 'text-[#373737]'"
                    @click="setTab('class-list')"
                  >
                    Class List
                  </button>
                  <button
                    type="button"
                    class="h-[47px] min-w-[141px] rounded-[30.5px] text-[16px] font-semibold"
                    :class="activeTab === 'analytics' ? 'bg-white text-[#1188f8]' : 'text-[#373737]'"
                    @click="setTab('analytics')"
                  >
                    Insights
                  </button>
                </div>
              </div>

              <div v-if="activeTab === 'class'" class="mt-[22px]">
                <div class="relative overflow-hidden rounded-[17px] px-4 pb-5 pt-5 sm:px-6 lg:min-h-[191px] lg:px-[28px] lg:pb-[22px] lg:pt-[24px]" :style="{ backgroundImage: classroom.gradient }">
                  <div class="absolute inset-y-0 right-0 hidden w-[250px] sm:block">
                    <ClassThemeArt :theme-id="classroom.gradientId" variant="hero" />
                  </div>

                  <p class="relative z-10 pr-12 text-[28px] leading-none font-semibold text-white sm:text-[34px] lg:text-[39px]">
                    {{ classroom.subject }}
                  </p>
                  <p class="relative z-10 mt-3 text-[16px] leading-none font-medium text-white sm:mt-[18px] sm:text-[20px] lg:text-[21px]">
                    {{ classroom.gradeLevel }} | {{ classroom.classLabel }}
                  </p>
                  <p class="relative z-10 mt-10 text-[13px] leading-none font-medium text-white sm:mt-14 sm:text-[15px] lg:mt-[68px] lg:text-[18px]">
                    {{ classroom.scheduleLabel }} &bull; {{ classroom.time }}
                  </p>

                  <div class="relative z-10 mt-4 flex flex-wrap items-center justify-start gap-3 sm:mt-6 sm:justify-between lg:mt-[6px]">
                    <span class="inline-flex items-center rounded-full bg-white/16 px-4 py-2 text-[13px] font-semibold tracking-[0.02em] text-white backdrop-blur-sm">
                      {{ classroom.themeLabel }}
                    </span>
                    <div class="flex min-h-[47px] w-full max-w-[231px] items-center rounded-[11px] bg-[#f6f6f6] px-[10px] py-2">
                      <img :src="teacherChipPhoto" alt="" class="h-[34px] w-[33px] rounded-full object-cover" />
                      <div class="ml-[9px] min-w-0">
                        <p class="truncate text-[16px] leading-none font-bold text-black sm:text-[18px] lg:text-[20px]">{{ teacherName }}</p>
                        <p class="mt-[2px] text-[12px] leading-none font-medium text-black sm:text-[13px] lg:text-[15px]">High School Teacher</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-[15px] grid gap-[18px] xl:grid-cols-[307px_minmax(0,1fr)]">
                  <div class="flex min-h-[360px] flex-col rounded-[31px] border border-black bg-white px-[8px] py-[12px] xl:min-h-[430px]">
                    <div class="flex flex-col gap-4 px-[8px]">
                      <div class="flex flex-col gap-3">
                        <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p class="text-[22px] leading-none font-semibold text-black lg:text-[24px]">Participation History</p>
                            <p class="mt-2 text-[14px] font-medium text-[#5d5d5d]">
                              Filter your participation dates, then download a formatted history for your records.
                            </p>
                          </div>

                          <button
                            type="button"
                            class="interactive-primary-button inline-flex h-[44px] items-center justify-center rounded-[22px] bg-[#1188f8] px-5 text-[15px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                            :disabled="!filteredParticipationHistory.length"
                            @click="downloadParticipationHistoryReport"
                          >
                            Download Report
                          </button>
                        </div>

                        <div class="grid gap-3">
                          <label class="block">
                            <span class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">From</span>
                            <input
                              v-model="historyFilterStartDate"
                              type="date"
                              class="mt-2 h-[46px] w-full rounded-[18px] border border-[#cccdce] bg-[#f9fbff] px-4 text-[15px] font-medium text-black outline-none transition focus:border-[#1188f8]"
                            />
                          </label>

                          <label class="block">
                            <span class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">To</span>
                            <input
                              v-model="historyFilterEndDate"
                              type="date"
                              class="mt-2 h-[46px] w-full rounded-[18px] border border-[#cccdce] bg-[#f9fbff] px-4 text-[15px] font-medium text-black outline-none transition focus:border-[#1188f8]"
                            />
                          </label>

                          <button
                            type="button"
                            class="interactive-secondary-button h-[44px] rounded-[18px] border border-[#1188f8] bg-white px-5 text-[15px] font-semibold text-[#1188f8]"
                            @click="clearParticipationHistoryFilters"
                          >
                            Clear
                          </button>
                        </div>

                        <p class="text-[14px] font-medium text-[#5d5d5d]">
                          {{ filteredParticipationHistoryDateRangeLabel }}
                        </p>

                        <div class="grid grid-cols-2 gap-3">
                          <div class="rounded-[18px] bg-[#f6f6f6] px-4 py-3">
                            <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Entries</p>
                            <p class="mt-2 text-[24px] font-bold leading-none text-[#1188f8]">{{ filteredParticipationHistorySummary.sessions }}</p>
                          </div>
                          <div class="rounded-[18px] bg-[#f6f6f6] px-4 py-3">
                            <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Points</p>
                            <p class="mt-2 text-[24px] font-bold leading-none text-black">+{{ filteredParticipationHistorySummary.points }}</p>
                          </div>
                          <div class="col-span-2 rounded-[18px] bg-[#f6f6f6] px-4 py-3">
                            <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Completed Class Sessions</p>
                            <p class="mt-2 text-[24px] font-bold leading-none text-black">{{ completedClassSessions }}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="recentParticipationEntries.length" class="mt-[24px] max-h-[320px] space-y-[14px] overflow-y-auto px-[8px]">
                      <div
                        v-for="event in recentParticipationEntries"
                        :key="event.id"
                        class="rounded-[32px] border border-[#cccdce] bg-[#f6f6f6] px-[16px] py-[12px]"
                      >
                        <div class="flex items-center justify-between gap-3">
                          <div class="flex items-center gap-[13px]">
                            <div class="grid h-[57px] w-[72px] place-items-center rounded-[14px] bg-[#50d24a]">
                              <AppIcon name="sparkles" :size="28" class="text-[#072b10]" />
                            </div>
                            <div>
                              <p class="text-[16px] leading-none font-bold text-black lg:text-[20px]">Participation recorded</p>
                              <p class="mt-[9px] text-[13px] leading-none font-semibold text-[#4a4a4a] lg:text-[16px]">{{ event.label }}</p>
                            </div>
                          </div>

                          <div class="rounded-[10.5px] bg-[#d2e6ff] px-[13px] py-[8px]">
                            <p class="text-[16px] leading-none font-semibold text-[#1188f8] lg:text-[20px]">+{{ event.points }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-else
                      class="mt-[24px] mx-[8px] rounded-[32px] border border-dashed border-[#cccdce] bg-[#f8fbff] px-[18px] py-[22px] text-[16px] font-medium leading-[1.4] text-[#5d5d5d]"
                    >
                      No participation events yet. Your next QR check-in will show up here.
                    </div>

                    <button
                      type="button"
                      class="mt-auto pt-10 text-center text-[18px] font-semibold text-[#1188f8] hover:underline lg:text-[20px]"
                      @click="setTab('analytics')"
                    >
                      View Insights
                    </button>
                  </div>

                  <div>
                    <div class="flex flex-wrap items-center justify-end gap-4">
                      <button
                        type="button"
                        class="flex h-[55px] w-full max-w-[251px] items-center justify-center rounded-[32px] bg-[#52a2f4] px-[18px] text-left sm:w-auto sm:min-w-[220px] sm:px-[22px]"
                        @click="isQrModalOpen = true"
                      >
                        <AppIcon name="qr" :size="34" class="text-white" />
                        <span class="ml-[10px] text-[18px] font-semibold text-white lg:text-[20px]">Show QR Code</span>
                      </button>
                    </div>

                    <div class="mt-[14px] grid gap-[16px] md:grid-cols-3">
                      <div class="relative min-h-[137px] rounded-[30px] border border-black bg-[#174ca0] px-[12px] py-[14px] text-white lg:rounded-[36px]">
                        <AppIcon name="trophy" :size="30" class="text-white" />
                        <p class="mt-[2px] text-[11px] font-semibold sm:text-[12px] lg:text-[14px]">Total Points Earned</p>
                        <p class="mt-[18px] text-[28px] leading-none font-semibold sm:text-[32px] lg:text-[41px]">{{ totalPointsLabel }}</p>
                        <div class="mt-[13px] inline-flex rounded-[10.5px] bg-[#2f7bc2] px-[8px] py-[4px] text-[8px] font-semibold">
                          {{ pointsComparisonLabel }}
                        </div>
                        <div class="absolute bottom-[0px] right-[0px] h-[75px] w-[95px] overflow-hidden">
                          <ClassThemeArt :theme-id="classroom.gradientId" />
                        </div>
                      </div>

                      <div class="min-h-[137px] rounded-[30px] border border-[#cccdce] bg-white px-[18px] py-[14px] lg:rounded-[36px]">
                        <AppIcon name="message" :size="30" class="text-[#1188f8]" />
                        <p class="mt-[6px] text-[11px] font-semibold text-black sm:text-[12px] lg:text-[14px]">Total Participation</p>
                        <p class="mt-[22px] text-[28px] leading-[1.02] font-semibold text-black sm:text-[32px] lg:text-[39px]">{{ participationSessionsLabel }}</p>
                      </div>

                      <div class="min-h-[137px] rounded-[30px] border border-[#cccdce] bg-white px-[18px] py-[14px] lg:rounded-[36px]">
                        <AppIcon name="sparkles" :size="30" class="text-[#1188f8]" />
                        <p class="text-[11px] font-semibold text-black sm:text-[12px] lg:text-[14px]">Avg. Points / Recitation</p>
                        <p class="mt-[20px] text-[28px] leading-none font-semibold text-black sm:text-[32px] lg:text-[39px]">{{ averagePointsLabel }}</p>
                      </div>
                    </div>

                    <div class="mt-[16px] rounded-[24px] bg-[#f6f6f6] px-[18px] py-[14px] sm:px-[20px]">
                      <div class="flex items-start justify-between gap-4">
                        <p class="text-[18px] font-semibold text-[#1188f8] lg:text-[20px]">Teacher Feedback</p>
                        <p class="text-[13px] font-semibold text-[#4a4a4a] sm:text-[14px] lg:text-[16px]">{{ teacherFeedbackDateLabel }}</p>
                      </div>

                      <p class="mt-[18px] max-w-[560px] text-[15px] leading-[1.35] font-semibold text-black sm:text-[16px] lg:text-[18px]">
                        "{{ teacherFeedback }}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="activeTab === 'class-list'" class="mt-[22px] space-y-[22px]">
                <div class="rounded-[31px] bg-[#f6f6f6] px-4 pb-4 pt-4 sm:px-[22px] sm:pb-[22px] sm:pt-[18px]">
                  <div class="mx-auto flex h-[46px] w-fit items-center justify-center bg-[#d9d9d9] px-5 sm:h-[53px] sm:px-[32px]">
                    <p class="text-[18px] font-semibold text-black sm:text-[24px]">Blackboard / Whiteboard</p>
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
                          class="flex h-[69px] min-w-0 flex-col items-center justify-start rounded-[12px] border border-[#cccdce] bg-[#f8f8f8] pt-[4px]"
                          :class="isCurrentStudentSeat(seat) ? 'border-[#1188f8] bg-[#eaf3ff] shadow-[0_0_0_2px_rgba(17,136,248,0.15)]' : ''"
                        >
                          <template v-if="seat.studentId">
                            <img
                              :src="getSeatAvatar(seat)"
                              alt=""
                              class="h-[41px] w-[43px] rounded-full border-2 object-cover"
                              :class="isCurrentStudentSeat(seat) ? 'border-[#1188f8]' : 'border-[#8d8d8d]'"
                            />
                            <p class="mt-[3px] max-w-[56px] truncate text-center text-[10px] font-medium leading-none" :class="isCurrentStudentSeat(seat) ? 'text-[#1188f8]' : 'text-black'">
                              {{ isCurrentStudentSeat(seat) ? 'YOU' : getSeatLabel(seat) }}
                            </p>
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
                          class="flex h-[69px] min-w-0 flex-col items-center justify-start rounded-[12px] border border-[#cccdce] bg-[#f8f8f8] pt-[4px]"
                          :class="isCurrentStudentSeat(seat) ? 'border-[#1188f8] bg-[#eaf3ff] shadow-[0_0_0_2px_rgba(17,136,248,0.15)]' : ''"
                        >
                          <template v-if="seat.studentId">
                            <img
                              :src="getSeatAvatar(seat)"
                              alt=""
                              class="h-[41px] w-[43px] rounded-full border-2 object-cover"
                              :class="isCurrentStudentSeat(seat) ? 'border-[#1188f8]' : 'border-[#8d8d8d]'"
                            />
                            <p class="mt-[3px] max-w-[56px] truncate text-center text-[10px] font-medium leading-none" :class="isCurrentStudentSeat(seat) ? 'text-[#1188f8]' : 'text-black'">
                              {{ isCurrentStudentSeat(seat) ? 'YOU' : getSeatLabel(seat) }}
                            </p>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-5 flex justify-center">
                    <div class="rounded-[33.5px] bg-[#1188f8] px-6 py-3 text-[16px] font-semibold text-white sm:text-[18px]">
                      Your seat is highlighted in blue
                    </div>
                  </div>
                </div>

                <div class="grid gap-[18px] xl:grid-cols-[242px_minmax(0,1fr)] xl:gap-[26px]">
                  <div class="space-y-[18px]">
                    <div class="rounded-[23px] border border-[#bdbdbd] bg-white px-[16px] py-[12px]">
                      <p class="text-[20px] font-bold text-black">Teacher</p>
                      <div class="mt-[12px] flex items-center gap-[12px]">
                        <img :src="teacherChipPhoto" alt="" class="h-[56px] w-[56px] rounded-full object-cover" />
                        <div class="min-w-0">
                          <p class="truncate text-[18px] font-semibold text-black">{{ teacherName }}</p>
                          <p class="text-[15px] font-medium text-black">High School Teacher</p>
                        </div>
                      </div>
                    </div>

                    <div class="rounded-[23px] border border-[#bdbdbd] bg-white px-[18px] py-[18px]">
                      <p class="text-[20px] font-bold text-black">Class Details</p>

                      <div class="mt-[22px]">
                        <p class="text-[13px] font-medium tracking-[0.2em] text-[#6b6b6b] uppercase">Join Code</p>
                        <p class="mt-[10px] text-[17px] font-bold text-[#1188f8]">{{ classroom.joinCode || 'Unavailable' }}</p>
                      </div>

                      <div class="mt-[22px]">
                        <p class="text-[13px] font-medium tracking-[0.2em] text-[#6b6b6b] uppercase">Students</p>
                        <p class="mt-[10px] text-[40px] leading-none font-bold text-[#0084ff]">{{ classmates.length }}</p>
                        <p class="mt-[8px] text-[16px] font-bold text-black">Students enrolled</p>
                      </div>
                    </div>
                  </div>

                  <div class="rounded-[20px] border border-[#969696] bg-white px-[18px] py-[18px] sm:px-[22px]">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <p class="text-[28px] leading-none font-bold text-black sm:text-[32px]">Class List</p>
                        <p class="mt-[12px] text-[15px] font-medium text-[#4f4f4f]">Students currently enrolled in this class.</p>
                      </div>
                      <div class="grid h-[56px] w-[61px] place-items-center rounded-[17px] bg-[#f6f6f6]">
                        <span class="text-[22px] font-semibold text-[#1188f8]">{{ classmates.length }}</span>
                      </div>
                    </div>

                    <div class="mt-[22px] grid gap-x-[24px] gap-y-[10px] md:grid-cols-2 xl:grid-cols-3">
                      <div v-for="(column, columnIndex) in classListColumns" :key="`column-${columnIndex}`" class="space-y-[10px]">
                        <div
                          v-for="(student, rowIndex) in column"
                          :key="student?.id || `empty-row-${columnIndex}-${rowIndex}`"
                          class="flex min-h-[56px] items-center gap-[12px]"
                        >
                          <template v-if="student">
                            <img
                              :src="student.avatarSrc"
                              alt=""
                              class="h-[38px] w-[38px] rounded-full border-2 object-cover"
                              :class="student.id === studentUid ? 'border-[#1188f8]' : 'border-black'"
                            />
                            <div class="min-w-0">
                              <p class="truncate text-[18px] font-medium text-black">{{ student.name }}</p>
                              <p class="truncate text-[14px] font-medium text-[#5a5a5a]">{{ student.id === studentUid ? 'This is you' : student.subtitle }}</p>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="mt-[22px] space-y-[18px]">
                <div class="relative flex flex-col overflow-hidden rounded-[17px] px-4 py-4 text-white sm:px-6 lg:min-h-[178px] lg:px-[25px] lg:py-[22px]" :style="{ backgroundImage: classroom.gradient }">
                  <div class="absolute inset-y-0 right-0 hidden w-[240px] sm:block">
                    <ClassThemeArt :theme-id="classroom.gradientId" variant="hero" />
                  </div>
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <p class="text-[30px] font-semibold leading-none sm:text-[36px]">Your Class Insights</p>
                      <p class="mt-[12px] text-[18px] font-medium leading-none sm:text-[24px]">{{ classroom.subject }} | {{ classroom.classLabel }}</p>
                      <span class="mt-4 inline-flex items-center rounded-full bg-white/16 px-4 py-2 text-[13px] font-semibold tracking-[0.02em] text-white backdrop-blur-sm">
                        {{ classroom.themeLabel }}
                      </span>
                    </div>
                    <div class="relative z-10 rounded-[22px] bg-white/20 px-4 py-3 text-right backdrop-blur-sm">
                      <p class="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/80">Your Pace</p>
                      <p class="mt-1 text-[22px] font-bold leading-none">{{ studentStandingLabel }}</p>
                      <p class="mt-2 text-[13px] font-medium text-white/80">{{ studentStatusLabel }}</p>
                    </div>
                  </div>
                  <p class="relative z-10 mt-auto pt-10 text-[18px] font-medium leading-none sm:text-[20px]">
                    {{ classroom.scheduleLabel }} &bull; {{ classroom.time }}
                  </p>
                </div>

                <div class="grid gap-[16px] md:grid-cols-2 xl:grid-cols-4">
                  <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                    <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">Participation Score</p>
                    <p class="mt-3 text-[42px] font-bold leading-none text-[#1188f8]">{{ studentAnalytics.score }}%</p>
                    <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">{{ studentStatusLabel }}</p>
                  </article>
                  <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                    <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">Times You Joined</p>
                    <p class="mt-3 text-[42px] font-bold leading-none text-black">{{ studentAnalytics.attendedSessions }}</p>
                    <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">{{ studentSessionsSummary }}</p>
                  </article>
                  <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                    <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">Total Points</p>
                    <p class="mt-3 text-[42px] font-bold leading-none text-black">{{ totalPointsLabel }}</p>
                    <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">{{ pointsComparisonLabel }}</p>
                  </article>
                  <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                    <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">Class Rank</p>
                    <p class="mt-3 text-[42px] font-bold leading-none text-[#1188f8]">{{ studentRankDisplay }}</p>
                    <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">{{ studentPercentileSummary }}</p>
                  </article>
                </div>

                <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                  <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h2 class="text-[24px] font-bold leading-none text-black">Browse Your Insights</h2>
                      <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">
                        Open one view at a time so your progress is easier to read.
                      </p>
                    </div>
                    <div class="rounded-[18px] bg-[#f6f6f6] px-4 py-3 text-right">
                      <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Latest Answer</p>
                      <p class="mt-1 text-[22px] font-bold leading-none text-black">{{ studentLatestParticipationTitle }}</p>
                      <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">{{ studentLatestParticipationSummary }}</p>
                    </div>
                  </div>

                  <div class="mt-5 grid gap-[12px] md:grid-cols-2 xl:grid-cols-4">
                    <button
                      v-for="card in studentInsightsSectionCards"
                      :key="card.id"
                      type="button"
                      class="rounded-[22px] border px-5 py-4 text-left transition-all"
                      :class="insightsSubview === card.id ? 'border-[#1188f8] bg-[#eef6ff] shadow-[0_10px_24px_rgba(17,136,248,0.12)]' : 'border-[#d8d8d8] bg-[#fbfbfb] hover:border-[#1188f8] hover:bg-[#f8fbff]'"
                      @click="insightsSubview = card.id"
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
                  <div :key="insightsSubview" class="space-y-[18px]">
                    <template v-if="insightsSubview === 'overview'">
                      <div class="grid gap-[18px] xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
                        <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                          <div class="flex items-start justify-between gap-4">
                            <div>
                              <h2 class="text-[24px] font-bold leading-none text-black">Your Activity Trend</h2>
                              <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">Your points across recent participation rounds.</p>
                            </div>
                            <div class="rounded-[16px] bg-[#f6f6f6] px-4 py-3 text-right">
                              <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Tracked Rounds</p>
                              <p class="mt-1 text-[24px] font-bold leading-none text-[#1188f8]">{{ studentAnalytics.totalTrackedSessions }}</p>
                            </div>
                          </div>
                          <div class="mt-5 h-[280px]">
                            <ParticipationChart type="line" :data="studentTrendChartData" :options="studentChartAxisOptions" />
                          </div>
                        </section>

                        <section class="grid gap-[18px]">
                          <article class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                            <h2 class="text-[24px] font-bold leading-none text-black">Showing Up</h2>
                            <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">How often you have joined tracked participation rounds.</p>
                            <div class="mt-5 h-[280px]">
                              <ParticipationChart type="doughnut" :data="studentMixChartData" :options="studentMixChartOptions" />
                            </div>
                          </article>

                          <article class="rounded-[28px] bg-[#f6f6f6] px-5 py-5">
                            <h2 class="text-[24px] font-bold leading-none text-black">Quick Read</h2>
                            <div class="mt-4 grid gap-3 sm:grid-cols-3">
                              <div class="rounded-[18px] bg-white px-4 py-4">
                                <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Status</p>
                                <p class="mt-2 text-[20px] font-bold leading-none text-black">{{ studentStatusLabel }}</p>
                              </div>
                              <div class="rounded-[18px] bg-white px-4 py-4">
                                <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Joined</p>
                                <p class="mt-2 text-[20px] font-bold leading-none text-black">{{ participationSessionsLabel }}</p>
                              </div>
                              <div class="rounded-[18px] bg-white px-4 py-4">
                                <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Points Each Time</p>
                                <p class="mt-2 text-[20px] font-bold leading-none text-black">{{ averagePointsLabel }}</p>
                              </div>
                            </div>
                          </article>
                        </section>
                      </div>
                    </template>

                    <template v-else-if="insightsSubview === 'progress'">
                      <div class="grid gap-[18px] xl:grid-cols-[minmax(0,1fr)_360px]">
                        <section class="rounded-[28px] bg-[#f6f6f6] px-4 py-4 sm:px-6">
                          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h2 class="text-[28px] font-bold leading-none text-black">Try This Next</h2>
                              <p class="mt-2 text-[16px] font-medium text-[#4a4a4a]">A simple next step based on your recent class activity.</p>
                            </div>
                            <div class="rounded-[18px] bg-white px-4 py-3 text-center">
                              <p class="text-[28px] font-bold leading-none text-[#1188f8]">{{ totalPointsLabel }}</p>
                              <p class="mt-1 text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">points so far</p>
                            </div>
                          </div>

                          <div class="mt-5 rounded-[22px] bg-white px-5 py-5">
                            <p class="text-[18px] font-bold text-black">{{ studentAnalytics.recommendation }}</p>
                            <div class="mt-5 grid gap-3 sm:grid-cols-3">
                              <div class="rounded-[18px] bg-[#f6f6f6] px-4 py-4">
                                <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Your Pace</p>
                                <p class="mt-2 text-[20px] font-bold leading-none text-black">{{ studentStandingLabel }}</p>
                              </div>
                              <div class="rounded-[18px] bg-[#f6f6f6] px-4 py-4">
                                <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Compared to Class</p>
                                <p class="mt-2 text-[20px] font-bold leading-none text-black">{{ pointsComparisonLabel }}</p>
                              </div>
                              <div class="rounded-[18px] bg-[#f6f6f6] px-4 py-4">
                                <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Average Each Time</p>
                                <p class="mt-2 text-[20px] font-bold leading-none text-black">{{ averagePointsLabel }}</p>
                              </div>
                            </div>
                          </div>
                        </section>

                        <aside class="space-y-[18px]">
                          <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                            <h2 class="text-[24px] font-bold leading-none text-black">Teacher Note</h2>
                            <p class="mt-2 text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">{{ teacherFeedbackDateLabel }}</p>
                            <p class="mt-4 text-[16px] font-medium leading-[1.35] text-[#333]">"{{ teacherFeedback }}"</p>
                          </section>

                          <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                            <h2 class="text-[24px] font-bold leading-none text-black">Progress Snapshot</h2>
                            <div class="mt-4 space-y-[10px]">
                              <div class="flex items-center justify-between rounded-[16px] bg-[#f6f6f6] px-4 py-3">
                                <span class="text-[15px] font-semibold text-black">Participation score</span>
                                <span class="text-[18px] font-bold text-[#1188f8]">{{ studentAnalytics.score }}%</span>
                              </div>
                              <div class="flex items-center justify-between rounded-[16px] bg-[#f6f6f6] px-4 py-3">
                                <span class="text-[15px] font-semibold text-black">Times you joined</span>
                                <span class="text-[18px] font-bold text-black">{{ participationSessionsLabel }}</span>
                              </div>
                              <div class="flex items-center justify-between rounded-[16px] bg-[#f6f6f6] px-4 py-3">
                                <span class="text-[15px] font-semibold text-black">Class rank</span>
                                <span class="text-[18px] font-bold text-[#1188f8]">{{ studentRankDisplay }}</span>
                              </div>
                            </div>
                          </section>
                        </aside>
                      </div>
                    </template>

                    <template v-else-if="insightsSubview === 'comparison'">
                      <div class="grid gap-[18px] xl:grid-cols-[minmax(0,1fr)_360px]">
                        <section class="rounded-[28px] bg-[#f6f6f6] px-4 py-4 sm:px-6">
                          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h2 class="text-[28px] font-bold leading-none text-black">How You Compare</h2>
                              <p class="mt-2 text-[16px] font-medium text-[#4a4a4a]">See your participation score beside the class average and top score.</p>
                            </div>
                            <div class="rounded-[18px] bg-white px-4 py-3 text-center">
                              <p class="text-[28px] font-bold leading-none text-[#1188f8]">{{ studentAnalytics.classAverageScore }}%</p>
                              <p class="mt-1 text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">class average</p>
                            </div>
                          </div>
                          <div class="mt-5 h-[280px] rounded-[18px] bg-white px-4 py-4">
                            <ParticipationChart type="bar" :data="studentComparisonChartData" :options="studentComparisonChartOptions" />
                          </div>
                        </section>

                        <aside class="space-y-[18px]">
                          <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                            <h2 class="text-[24px] font-bold leading-none text-black">Where You Stand</h2>
                            <div class="mt-4 space-y-[10px]">
                              <div class="rounded-[18px] bg-[#f6f6f6] px-4 py-4">
                                <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Class Rank</p>
                                <p class="mt-2 text-[28px] font-bold leading-none text-[#1188f8]">{{ studentRankDisplay }}</p>
                                <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">{{ studentPercentileSummary }}</p>
                              </div>
                              <div class="rounded-[18px] bg-[#f6f6f6] px-4 py-4">
                                <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Your Pace</p>
                                <p class="mt-2 text-[20px] font-bold leading-none text-black">{{ studentStandingLabel }}</p>
                                <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">{{ scoreComparisonLabel }}</p>
                              </div>
                              <div class="rounded-[18px] bg-[#f6f6f6] px-4 py-4">
                                <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Top Score</p>
                                <p class="mt-2 text-[20px] font-bold leading-none text-black">{{ studentAnalytics.classTopScore }}%</p>
                                <p class="mt-2 text-[14px] font-medium text-[#4a4a4a]">{{ topScoreGapLabel }}</p>
                              </div>
                            </div>
                          </section>
                        </aside>
                      </div>
                    </template>

                    <template v-else>
                      <div class="grid gap-[18px] xl:grid-cols-[minmax(0,1fr)_360px]">
                        <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h2 class="text-[24px] font-bold leading-none text-black">Recent Answers</h2>
                              <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">Your latest recorded participation, with the newest answer first.</p>
                            </div>
                            <div class="rounded-[16px] bg-[#f6f6f6] px-4 py-3 text-right">
                              <p class="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">Recorded Answers</p>
                              <p class="mt-1 text-[24px] font-bold leading-none text-[#1188f8]">{{ studentHistorySummary.entries }}</p>
                            </div>
                          </div>

                          <div v-if="studentAnalytics.recentEvents.length" class="mt-5 space-y-[10px]">
                            <div
                              v-for="event in studentAnalytics.recentEvents"
                              :key="event.id"
                              class="flex items-center justify-between rounded-[16px] bg-[#f6f6f6] px-4 py-3"
                            >
                              <div>
                                <p class="text-[16px] font-semibold text-black">{{ event.label }}</p>
                                <p class="mt-1 text-[13px] font-medium text-[#6b6b6b]">Participation recorded</p>
                              </div>
                              <span class="ml-3 text-[16px] font-bold text-[#1188f8]">+{{ event.points }}</span>
                            </div>
                          </div>
                          <p v-else class="mt-5 text-[16px] font-medium text-[#5d5d5d]">No participation events recorded yet.</p>
                        </section>

                        <aside class="space-y-[18px]">
                          <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                            <h2 class="text-[24px] font-bold leading-none text-black">Need the Full History?</h2>
                            <p class="mt-4 text-[16px] font-medium leading-[1.35] text-[#333]">
                              Open the class tab to filter dates and download your full participation record.
                            </p>
                            <button
                              type="button"
                              class="mt-5 flex h-[50px] w-full items-center justify-center rounded-[25px] bg-[#1188f8] text-[17px] font-bold text-white"
                              @click="setTab('class')"
                            >
                              Open Participation History
                            </button>
                          </section>

                          <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                            <h2 class="text-[24px] font-bold leading-none text-black">History Snapshot</h2>
                            <div class="mt-4 space-y-[10px]">
                              <div class="flex items-center justify-between rounded-[16px] bg-[#f6f6f6] px-4 py-3">
                                <span class="text-[15px] font-semibold text-black">Recorded answers</span>
                                <span class="text-[18px] font-bold text-[#1188f8]">{{ studentHistorySummary.entries }}</span>
                              </div>
                              <div class="flex items-center justify-between rounded-[16px] bg-[#f6f6f6] px-4 py-3">
                                <span class="text-[15px] font-semibold text-black">Total points</span>
                                <span class="text-[18px] font-bold text-black">{{ totalPointsLabel }}</span>
                              </div>
                              <div class="flex items-center justify-between rounded-[16px] bg-[#f6f6f6] px-4 py-3">
                                <span class="text-[15px] font-semibold text-black">Joined rounds</span>
                                <span class="text-[18px] font-bold text-black">{{ studentSessionsSummary }}</span>
                              </div>
                            </div>
                          </section>
                        </aside>
                      </div>
                    </template>
                  </div>
                </transition>
              </div>
            </template>
          </section>
        </main>
      </div>

      <div class="px-4 pb-6 sm:px-6 lg:hidden">
        <div class="flex items-center justify-center gap-8 rounded-[20px] border border-[#d9e8fb] bg-white px-4 py-3 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
          <button type="button" class="grid h-10 w-10 place-items-center rounded-[12px] bg-[rgba(46,130,239,0.25)]" aria-label="Classes" @click="router.push('/student')">
            <AppIcon name="classes" :size="22" class="text-[#174ca0]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Student ID" @click="router.push('/student/id')">
            <AppIcon name="badge" :size="22" class="text-[#707070]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Settings" @click="openStudentSettings">
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

      <transition name="fade">
        <div
          v-if="isQrModalOpen"
          class="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(12,18,28,0.45)] px-4 py-8 backdrop-blur-[2px]"
          @click.self="isQrModalOpen = false"
        >
          <div class="w-full max-w-[440px] rounded-[28px] bg-white px-6 py-6 shadow-[0_22px_52px_rgba(0,0,0,0.22)]">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-[32px] leading-none font-bold">Your QR Code</h3>
                <p class="mt-2 text-[16px] font-medium text-[#5f5f5f]">Show this to your teacher during participation.</p>
              </div>
              <button type="button" class="grid h-10 w-10 place-items-center rounded-full text-[#4a4a4a] transition hover:bg-[#eef4ff] hover:text-[#1188f8]" aria-label="Close QR modal" @click="isQrModalOpen = false">
                <AppIcon name="x" :size="22" />
              </button>
            </div>

            <div class="mt-6 rounded-[28px] border border-[#d9e8fb] bg-[#f8fbff] p-5">
              <div class="mx-auto w-fit rounded-[24px] border-2 border-black bg-[linear-gradient(135deg,#dce8fb_0%,#c7d9f8_46%,#2e82ef_100%)] p-4">
                <div class="flex items-start gap-4">
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <img :src="imgStar" alt="" class="h-[26px] w-[28px] object-contain" />
                      <p class="text-[20px] font-bold">ReciCall</p>
                    </div>

                    <img :src="studentAvatarSrc" alt="" class="mt-5 h-[74px] w-[74px] rounded-full object-cover" />

                    <p class="mt-5 text-[13px] font-medium">Last Name:</p>
                    <p class="mt-1 text-[22px] leading-none font-bold">{{ lastNameValue }}</p>

                    <p class="mt-4 text-[13px] font-medium">First Name:</p>
                    <p class="mt-1 text-[22px] leading-none font-bold">{{ firstNameValue }}</p>
                  </div>

                  <div class="shrink-0 rounded-[4px] bg-white p-[10px]">
                    <img :src="qrImageUrl" alt="Student QR Code" class="h-[180px] w-[180px] object-contain" />
                    <p class="mt-3 text-[13px] font-bold">ID NUMBER: {{ studentNumber }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth } from '../../config/firebase'
import AppIcon from '../../components/common/AppIcon.vue'
import ClassThemeArt from '../../components/common/ClassThemeArt.vue'
import ConfirmActionModal from '../../components/common/ConfirmActionModal.vue'
import ParticipationChart from '../../components/charts/ParticipationChart.vue'
import { logoutUser } from '../../services/authService'
import { buildStudentAnalytics } from '../../services/analyticsService'
import { getStudentClasses } from '../../services/studentService'
import { getTeacherClassById } from '../../services/teacherService'
import { getUserById, upsertUserProfile } from '../../services/userService'
import imgStar from '../../assets/icons/recicall-logo.png'
import { decorateClassWithTheme } from '../../utils/classThemes'
import {
  buildParticipationDateRangeLabel,
  downloadParticipationPdfReport,
  filterParticipationEventsByDate,
  formatParticipationDate,
  toParticipationDate,
} from '../../utils/participationReports'
import {
  defaultStudentAvatarKey,
  resolveStudentAvatar,
} from '../../utils/studentAvatarOptions'
import { defaultTeacherAvatarKey, resolveTeacherAvatar, sanitizeTeacherAvatarKey } from '../../utils/teacherAvatarOptions'

const router = useRouter()
const route = useRoute()

const isLoggingOut = ref(false)
const isLogoutConfirmOpen = ref(false)
const isLoading = ref(true)
const isSidebarExpanded = ref(false)
const isQrModalOpen = ref(false)
const classroom = ref(null)
const teacherName = ref('Maam. Anderson')
const teacherAvatarKey = ref(defaultTeacherAvatarKey)
const displayName = ref('Alonso Von Leopard')
const studentNumber = ref('20232023')
const studentUid = ref('')
const studentPhotoURL = ref('')
const avatarKey = ref(defaultStudentAvatarKey)
const historyFilterStartDate = ref('')
const historyFilterEndDate = ref('')
const insightsSubview = ref('overview')

const activeTab = computed(() => String(route.query.tab || 'class'))
const studentAnalytics = computed(() => buildStudentAnalytics(classroom.value || {}, studentUid.value))
const studentParticipationEvents = computed(() =>
  (classroom.value?.participationEvents || []).filter((event) => event.studentId === studentUid.value),
)
const filteredParticipationHistory = computed(() =>
  filterParticipationEventsByDate(studentParticipationEvents.value, {
    startDate: historyFilterStartDate.value,
    endDate: historyFilterEndDate.value,
  })
    .map((event, index) => ({
      id: event.id || `student-history-${index}`,
      points: Number(event.points) || 0,
      label: formatParticipationDate(event.createdAt),
      timestamp: toParticipationDate(event.createdAt)?.getTime() || 0,
    }))
    .sort((left, right) => right.timestamp - left.timestamp),
)
const filteredParticipationHistoryDateRangeLabel = computed(() =>
  buildParticipationDateRangeLabel({
    startDate: historyFilterStartDate.value,
    endDate: historyFilterEndDate.value,
  }),
)

const classmates = computed(() =>
  (classroom.value?.enrolledStudents || []).map((student, index) => ({
    id: student.studentId || student.id || `classmate-${index}`,
    name:
      (student.studentId || student.id) === studentUid.value
        ? displayName.value
        : student.displayName || student.email || `Student ${index + 1}`,
    subtitle: student.email || student.gradeLevel || 'Joined student',
    avatarKey:
      (student.studentId || student.id) === studentUid.value ? avatarKey.value : student.avatarKey || '',
    photoURL:
      (student.studentId || student.id) === studentUid.value
        ? studentPhotoURL.value || student.photoURL || ''
        : student.photoURL || '',
    avatarSrc: resolveStudentAvatar(
      (student.studentId || student.id) === studentUid.value ? avatarKey.value : student.avatarKey,
      (student.studentId || student.id) === studentUid.value
        ? studentPhotoURL.value || student.photoURL || ''
        : student.photoURL || '',
    ),
  })),
)

const classListStudents = computed(() => classmates.value)

const classListColumns = computed(() => {
  const rowsPerColumn = 6
  const totalSlots = rowsPerColumn * 3
  const slots = Array.from({ length: totalSlots }, (_, index) => classListStudents.value[index] || null)

  return Array.from({ length: 3 }, (_, columnIndex) =>
    slots.slice(columnIndex * rowsPerColumn, columnIndex * rowsPerColumn + rowsPerColumn),
  )
})

const teacherChipPhoto = computed(() =>
  resolveTeacherAvatar(teacherAvatarKey.value, ''),
)
const studentAvatarSrc = computed(() =>
  resolveStudentAvatar(avatarKey.value, studentPhotoURL.value || ''),
)

const nameParts = computed(() => displayName.value.trim().split(/\s+/).filter(Boolean))
const firstNameValue = computed(() => {
  if (nameParts.value.length <= 1) return displayName.value
  return nameParts.value.slice(0, -1).join(' ')
})
const lastNameValue = computed(() => {
  if (nameParts.value.length <= 1) return displayName.value
  return nameParts.value.at(-1)
})

const currentStudentEnrollment = computed(
  () =>
    (classroom.value?.enrolledStudents || []).find(
      (student) => (student.studentId || student.id) === studentUid.value,
    ) || null,
)

const teacherFeedback = computed(() => {
  const personalFeedback = String(currentStudentEnrollment.value?.teacherFeedback || '').trim()
  if (personalFeedback) return personalFeedback

  const fallbackClassFeedback = String(classroom.value?.teacherFeedback || '').trim()
  if (fallbackClassFeedback) return fallbackClassFeedback

  return 'Your teacher has not left a personal note for you yet.'
})

const recentParticipationEntries = computed(() => filteredParticipationHistory.value.slice(0, 6))

const formatPointsLabel = (value) => {
  const roundedValue = Math.round(Number(value || 0) * 10) / 10
  return `${Number.isInteger(roundedValue) ? roundedValue : roundedValue.toFixed(1)} pts`
}

const totalPointsLabel = computed(() => formatPointsLabel(studentAnalytics.value.points))

const averagePointsLabel = computed(() => {
  const sessions = studentAnalytics.value.attendedSessions
  const averagePoints = sessions ? studentAnalytics.value.points / sessions : 0
  return formatPointsLabel(averagePoints)
})

const participationSessionsLabel = computed(() => {
  const sessions = studentAnalytics.value.attendedSessions
  return `${sessions} ${sessions === 1 ? 'Session' : 'Sessions'}`
})

const pointsComparisonLabel = computed(() => {
  const difference = Math.round((studentAnalytics.value.points - studentAnalytics.value.classAveragePoints) * 10) / 10

  if (difference > 0) {
    return `${formatPointsLabel(difference)} above class avg`
  }

  if (difference < 0) {
    return `${formatPointsLabel(Math.abs(difference))} below class avg`
  }

  return 'On pace with class average'
})

const teacherFeedbackDateLabel = computed(() => {
  const feedbackUpdatedAt = currentStudentEnrollment.value?.teacherFeedbackUpdatedAt
  if (feedbackUpdatedAt) {
    return `Updated ${formatParticipationDate(feedbackUpdatedAt)}`
  }

  if (String(classroom.value?.teacherFeedback || '').trim()) {
    return 'Class note'
  }

  return 'No note yet'
})
const studentStandingLabel = computed(() => {
  if (studentAnalytics.value.standingLabel === 'Top Quartile') return 'Doing great'
  if (studentAnalytics.value.standingLabel === 'Middle Band') return 'On track'
  if (studentAnalytics.value.standingLabel === 'Needs Visibility') return 'Ready for more turns'
  return studentAnalytics.value.standingLabel
})
const studentStatusLabel = computed(() => {
  if (studentAnalytics.value.riskLevel === 'Low') return 'Doing well'
  if (studentAnalytics.value.riskLevel === 'Moderate') return 'Building momentum'
  if (studentAnalytics.value.riskLevel === 'High') return 'Needs a little boost'
  return studentAnalytics.value.riskLevel
})
const studentSessionsSummary = computed(() => {
  const total = studentAnalytics.value.totalTrackedSessions
  return `${studentAnalytics.value.attendedSessions} of ${total} tracked rounds joined`
})
const studentRankDisplay = computed(() =>
  studentAnalytics.value.studentRank ? `#${studentAnalytics.value.studentRank}` : '--',
)
const studentPercentileSummary = computed(() => {
  if (!studentAnalytics.value.studentRank) return 'Keep joining to build your place'
  return `Ahead of ${studentAnalytics.value.percentile}% of class`
})
const studentLatestParticipationHighlight = computed(() => studentAnalytics.value.recentEvents[0] || null)
const studentLatestParticipationTitle = computed(() =>
  studentLatestParticipationHighlight.value?.label || 'No answers yet',
)
const studentLatestParticipationSummary = computed(() => {
  if (!studentLatestParticipationHighlight.value) {
    return 'Join a participation round to start seeing your progress here.'
  }

  return `+${studentLatestParticipationHighlight.value.points} pts the last time you joined`
})
const scoreComparisonLabel = computed(() => {
  const difference = Math.round((studentAnalytics.value.score - studentAnalytics.value.classAverageScore) * 10) / 10

  if (difference > 0) {
    return `${difference}% above class average`
  }

  if (difference < 0) {
    return `${Math.abs(difference)}% below class average`
  }

  return 'Right on the class average'
})
const topScoreGapLabel = computed(() => {
  const difference = Math.round((studentAnalytics.value.classTopScore - studentAnalytics.value.score) * 10) / 10

  if (difference <= 0) {
    return 'You are tied with the top score'
  }

  return `${difference}% away from the top score`
})
const studentHistorySummary = computed(() => ({
  entries: studentParticipationEvents.value.length,
  points: studentParticipationEvents.value.reduce((sum, event) => sum + (Number(event.points) || 0), 0),
}))
const studentInsightsSectionCards = computed(() => [
  {
    id: 'overview',
    title: 'Overview',
    description: 'See your score, trend, and joined rounds at a glance.',
    value: `${studentAnalytics.value.score}%`,
    caption: 'score',
  },
  {
    id: 'progress',
    title: 'My Progress',
    description: 'Open your next step, teacher note, and personal pace.',
    value: totalPointsLabel.value,
    caption: 'points',
  },
  {
    id: 'comparison',
    title: 'Compared to Class',
    description: 'Check your rank beside the class average and top score.',
    value: studentRankDisplay.value,
    caption: 'class rank',
  },
  {
    id: 'history',
    title: 'Recent Answers',
    description: 'Review your latest recorded answers and next history step.',
    value: `${studentHistorySummary.value.entries}`,
    caption: 'entries',
  },
])

const filteredParticipationHistorySummary = computed(() => ({
  sessions: filteredParticipationHistory.value.length,
  points: filteredParticipationHistory.value.reduce((sum, event) => sum + event.points, 0),
}))
const completedClassSessions = computed(() =>
  Array.isArray(classroom.value?.sessionHistory) ? classroom.value.sessionHistory.length : 0,
)

const slugifyReportValue = (value, fallback = 'report') =>
  String(value || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || fallback

const clearParticipationHistoryFilters = () => {
  historyFilterStartDate.value = ''
  historyFilterEndDate.value = ''
}

const downloadParticipationHistoryReport = async () => {
  if (!classroom.value || !filteredParticipationHistory.value.length) return

  await downloadParticipationPdfReport({
    fileName: `${slugifyReportValue(displayName.value, 'student')}-${slugifyReportValue(classroom.value.subject, 'participation')}-participation-history.pdf`,
    title: `${displayName.value} Participation History`,
    subtitle: `${classroom.value.subject} - ${classroom.value.gradeLevel} - ${classroom.value.classLabel}`,
    generatedFor: `${displayName.value} - Student`,
    summaryItems: [
      { label: 'Date Range', value: filteredParticipationHistoryDateRangeLabel.value },
      { label: 'Recorded Entries', value: filteredParticipationHistorySummary.value.sessions },
      { label: 'Total Points', value: filteredParticipationHistorySummary.value.points },
      { label: 'Completed Class Sessions', value: completedClassSessions.value },
      { label: 'Class', value: classroom.value.classLabel },
    ],
    columns: [
      { key: 'label', label: 'Date' },
      { key: 'pointsLabel', label: 'Points Earned' },
    ],
    rows: filteredParticipationHistory.value.map((event) => ({
      label: event.label,
      pointsLabel: `+${event.points}`,
    })),
  })
}

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
  () => `https://api.qrserver.com/v1/create-qr-code/?size=244x244&data=${encodeURIComponent(qrPayload.value)}`,
)

const deskRowsLeft = ref([])
const deskRowsRight = ref([])

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

const totalDesks = (rows) => rows.reduce((sum, row) => sum + row.length, 0)

const normalizeDeskRows = (rows, side) =>
  rows
    .filter((row) => row.length > 0)
    .map((row, rowIndex) =>
      row.map((seat, seatIndex) => ({
        ...seat,
        id: `${side}-${rowIndex}-${seatIndex}-${seat.id?.split('-').slice(-1)[0] || `${Date.now()}`}`,
      })),
    )

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

const initializeDeskLayout = () => {
  const students = classListStudents.value
  const savedSeatLayout = classroom.value?.seatLayout
  const validStudentIds = new Set(students.map((student) => student.id))
  const leftCapacity = seatPatterns.left.reduce((sum, count) => sum + count, 0)

  if (savedSeatLayout?.left || savedSeatLayout?.right) {
    const leftRows = createDeskRowsFromSavedLayout(savedSeatLayout.left, validStudentIds, 'left')
    const rightRows = createDeskRowsFromSavedLayout(savedSeatLayout.right, validStudentIds, 'right')

    assignStudentsIntoLayout(leftRows, rightRows, students)

    deskRowsLeft.value = normalizeDeskRows(leftRows, 'left')
    deskRowsRight.value = normalizeDeskRows(rightRows, 'right')
    return
  }

  deskRowsLeft.value = createDeskRowsFromPatterns(seatPatterns.left, students.slice(0, leftCapacity), 'left')
  deskRowsRight.value = createDeskRowsFromPatterns(seatPatterns.right, students.slice(leftCapacity), 'right')
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

const getSeatAvatar = (seat) => getSeatStudent(seat)?.avatarSrc || resolveStudentAvatar()

const isCurrentStudentSeat = (seat) => seat?.studentId === studentUid.value

const studentChartAxisOptions = {
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

const studentTrendChartData = computed(() => ({
  labels: studentAnalytics.value.personalTrend.map((entry) => entry.label),
  datasets: [
    {
      label: 'Your Points',
      data: studentAnalytics.value.personalTrend.map((entry) => entry.points),
      borderColor: '#1188F8',
      backgroundColor: 'rgba(17, 136, 248, 0.16)',
      fill: true,
      tension: 0.35,
      pointBackgroundColor: '#1188F8',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
    },
  ],
}))

const studentComparisonChartData = computed(() => ({
  labels: studentAnalytics.value.comparisonBreakdown.map((entry) => entry.label),
  datasets: [
    {
      label: 'Score',
      data: studentAnalytics.value.comparisonBreakdown.map((entry) => entry.value),
      backgroundColor: ['#1188F8', '#60A5FA', '#1D4ED8'],
      borderRadius: 12,
      borderSkipped: false,
    },
  ],
}))

const studentComparisonChartOptions = {
  ...studentChartAxisOptions,
  plugins: {
    ...studentChartAxisOptions.plugins,
    legend: { display: false },
  },
}

const studentMixChartData = computed(() => ({
  labels: ['Attended', 'Missed'],
  datasets: [
    {
      data: [studentAnalytics.value.sessionMix.attended, studentAnalytics.value.sessionMix.missed],
      backgroundColor: ['#1188F8', '#D9E7F7'],
      borderColor: '#fff',
      borderWidth: 4,
      hoverOffset: 4,
    },
  ],
}))

const studentMixChartOptions = {
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

const mapClassroom = (classItem) => decorateClassWithTheme(classItem)

const generateStudentNumber = (uid) => {
  const digits = uid.replace(/\D/g, '')
  if (digits.length >= 8) return digits.slice(0, 8)

  let hash = 0
  for (const char of uid) {
    hash = (hash * 31 + char.charCodeAt(0)) % 100000000
  }

  return String(hash).padStart(8, '0')
}

const setTab = (tab) => {
  router.push({
    path: route.path,
    query: tab === 'class' ? {} : { tab },
  })
}

const openStudentSettings = () => {
  router.push('/student/id')
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

watch(
  classListStudents,
  () => {
    initializeDeskLayout()
  },
  { immediate: true },
)

onMounted(async () => {
  const user = auth.currentUser
  if (!user) return

  studentUid.value = user.uid

  const [profile, studentClasses] = await Promise.all([
    getUserById(user.uid),
    getStudentClasses(user.uid),
  ])

  if (profile?.displayName) displayName.value = profile.displayName
  else if (user.displayName) displayName.value = user.displayName
  studentPhotoURL.value = profile?.photoURL || ''
  avatarKey.value = profile?.avatarKey || (profile?.photoURL ? '' : defaultStudentAvatarKey)

  const resolvedStudentNumber = profile?.studentNumber || profile?.idNumber || generateStudentNumber(user.uid)
  studentNumber.value = resolvedStudentNumber

  if (!profile?.studentNumber) {
    await upsertUserProfile(user.uid, { studentNumber: resolvedStudentNumber })
  }

  const joinedClass = studentClasses.find((classItem) => classItem.id === route.params.classId)

  if (!joinedClass) {
    isLoading.value = false
    return
  }

  if (joinedClass.teacherId) {
    const [teacherProfile, teacherClass] = await Promise.all([
      getUserById(joinedClass.teacherId),
      getTeacherClassById(joinedClass.teacherId, joinedClass.id),
    ])

    if (teacherProfile?.displayName) teacherName.value = teacherProfile.displayName
    teacherAvatarKey.value = sanitizeTeacherAvatarKey(teacherProfile?.avatarKey || joinedClass.teacherAvatarKey)

    classroom.value = mapClassroom({
      ...joinedClass,
      ...teacherClass,
    })
  } else {
    classroom.value = mapClassroom(joinedClass)
  }

  isLoading.value = false
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
