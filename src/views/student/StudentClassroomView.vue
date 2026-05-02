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
          <p class="ml-3 mt-1 text-[28px] leading-none font-black tracking-[-0.03em] sm:ml-4 sm:mt-2 sm:text-[34px] lg:ml-[22px] lg:mt-[18px] lg:text-[40px]">
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
              <img :src="imgRectangle14" alt="" class="h-[36px] w-[45px] shrink-0" :style="activeNavIconStyle" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-semibold text-[#174ca0]">Classes</span>
            </div>

            <button
              type="button"
              class="flex h-[63px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[18px]' : 'justify-center'"
              aria-label="Student ID"
              @click="router.push('/student/id')"
            >
              <img :src="imgRectangle77" alt="" class="h-[54px] w-[42px] shrink-0" />
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
                    Analytics
                  </button>
                </div>
              </div>

              <div v-if="activeTab === 'class'" class="mt-[22px]">
                <div class="relative overflow-hidden rounded-[17px] bg-[linear-gradient(90deg,#257aff_0%,#2476f7_44.712%,#1d60c9_90.385%,#164999_100%)] px-4 pb-5 pt-5 sm:px-6 lg:min-h-[191px] lg:px-[28px] lg:pb-[22px] lg:pt-[24px]">
                  <img :src="imgHeroPolygonA" alt="" class="absolute bottom-[34px] right-[84px] h-[91px] w-[174px] opacity-90" />
                  <img :src="imgHeroPolygonB" alt="" class="absolute bottom-[17px] right-[32px] h-[79px] w-[42px] opacity-95" />
                  <img :src="imgHeroPolygonC" alt="" class="absolute bottom-[13px] right-[47px] h-[48px] w-[13px] opacity-95" />
                  <img :src="imgHeroPolygonD" alt="" class="absolute bottom-[28px] right-[3px] h-[84px] w-[17px] opacity-95" />
                  <img :src="imgHeroDots" alt="" class="absolute right-[18px] top-[16px] h-[58px] w-[29px]" />

                  <p class="relative z-10 pr-12 text-[28px] leading-none font-semibold text-white sm:text-[34px] lg:text-[39px]">
                    {{ classroom.subject }}
                  </p>
                  <p class="relative z-10 mt-3 text-[16px] leading-none font-medium text-white sm:mt-[18px] sm:text-[20px] lg:text-[21px]">
                    {{ classroom.gradeLevel }} | {{ classroom.classLabel }}
                  </p>
                  <p class="relative z-10 mt-10 text-[13px] leading-none font-medium text-white sm:mt-14 sm:text-[15px] lg:mt-[68px] lg:text-[18px]">
                    {{ classroom.scheduleLabel }} &bull; {{ classroom.time }}
                  </p>

                  <div class="relative z-10 mt-4 flex justify-start sm:mt-6 sm:justify-end lg:mt-[6px]">
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
                    <p class="text-[22px] leading-none font-semibold text-black lg:text-[24px]">Participation History</p>

                    <div v-if="recentParticipationEntries.length" class="mt-[24px] space-y-[14px]">
                      <div
                        v-for="event in recentParticipationEntries"
                        :key="event.id"
                        class="rounded-[32px] border border-[#cccdce] bg-[#f6f6f6] px-[16px] py-[12px]"
                      >
                        <div class="flex items-center justify-between gap-3">
                          <div class="flex items-center gap-[13px]">
                            <div class="grid h-[57px] w-[72px] place-items-center rounded-[14px] bg-[#50d24a]">
                              <img :src="imgLearning" alt="" class="h-[45px] w-[40px]" />
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
                      class="mt-[24px] rounded-[32px] border border-dashed border-[#cccdce] bg-[#f8fbff] px-[18px] py-[22px] text-[16px] font-medium leading-[1.4] text-[#5d5d5d]"
                    >
                      No participation events yet. Your next QR check-in will show up here.
                    </div>

                    <button
                      type="button"
                      class="mt-auto pt-10 text-center text-[18px] font-semibold text-[#1188f8] hover:underline lg:text-[20px]"
                      @click="setTab('analytics')"
                    >
                      View Analytics
                    </button>
                  </div>

                  <div>
                    <div class="flex flex-wrap items-center justify-end gap-4">
                      <button
                        type="button"
                        class="flex h-[55px] w-full max-w-[251px] items-center justify-center rounded-[32px] bg-[#52a2f4] px-[18px] text-left sm:w-auto sm:min-w-[220px] sm:px-[22px]"
                        @click="isQrModalOpen = true"
                      >
                        <img :src="imgShowQrIcon" alt="" class="h-[44px] w-[33px] lg:h-[52px] lg:w-[39px]" />
                        <span class="ml-[10px] text-[18px] font-semibold text-white lg:text-[20px]">Show Qr Code</span>
                      </button>
                    </div>

                    <div class="mt-[14px] grid gap-[16px] md:grid-cols-3">
                      <div class="relative min-h-[137px] rounded-[30px] border border-black bg-[#174ca0] px-[12px] py-[14px] text-white lg:rounded-[36px]">
                        <img :src="imgPrize" alt="" class="h-[34px] w-[26px] lg:h-[42px] lg:w-[32px]" />
                        <p class="mt-[2px] text-[11px] font-semibold sm:text-[12px] lg:text-[14px]">Total Points Earned</p>
                        <p class="mt-[18px] text-[28px] leading-none font-semibold sm:text-[32px] lg:text-[41px]">{{ totalPointsLabel }}</p>
                        <div class="mt-[13px] inline-flex rounded-[10.5px] bg-[#2f7bc2] px-[8px] py-[4px] text-[8px] font-semibold">
                          {{ pointsComparisonLabel }}
                        </div>
                        <img :src="imgStatsPolygon" alt="" class="absolute bottom-[0px] right-[0px] h-[75px] w-[95px]" />
                      </div>

                      <div class="min-h-[137px] rounded-[30px] border border-[#cccdce] bg-white px-[18px] py-[14px] lg:rounded-[36px]">
                        <img :src="imgChat" alt="" class="h-[32px] w-[27px] lg:h-[38px] lg:w-[32px]" />
                        <p class="mt-[6px] text-[11px] font-semibold text-black sm:text-[12px] lg:text-[14px]">Total Participation</p>
                        <p class="mt-[22px] text-[28px] leading-[1.02] font-semibold text-black sm:text-[32px] lg:text-[39px]">{{ participationSessionsLabel }}</p>
                      </div>

                      <div class="min-h-[137px] rounded-[30px] border border-[#cccdce] bg-white px-[18px] py-[14px] lg:rounded-[36px]">
                        <p class="text-[11px] font-semibold text-black sm:text-[12px] lg:text-[14px]">Avg. Points / Recitation</p>
                        <p class="mt-[54px] text-[28px] leading-none font-semibold text-black sm:text-[32px] lg:text-[39px]">{{ averagePointsLabel }}</p>
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
                <div class="flex flex-col overflow-hidden rounded-[17px] px-4 py-4 text-white sm:px-6 lg:min-h-[178px] lg:px-[25px] lg:py-[22px]" :style="{ backgroundImage: classroom.gradient }">
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <p class="text-[30px] font-semibold leading-none sm:text-[36px]">Your Participation Analytics</p>
                      <p class="mt-[12px] text-[18px] font-medium leading-none sm:text-[24px]">{{ classroom.subject }} | {{ classroom.classLabel }}</p>
                    </div>
                    <div class="rounded-[22px] bg-white/20 px-4 py-3 text-right backdrop-blur-sm">
                      <p class="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/80">Standing</p>
                      <p class="mt-1 text-[22px] font-bold leading-none">{{ studentAnalytics.standingLabel }}</p>
                    </div>
                  </div>
                  <p class="mt-auto pt-10 text-[18px] font-medium leading-none sm:text-[20px]">
                    {{ classroom.scheduleLabel }} &bull; {{ classroom.time }}
                  </p>
                </div>

                <div class="grid gap-[16px] md:grid-cols-2 xl:grid-cols-4">
                  <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                    <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">Your Score</p>
                    <p class="mt-3 text-[42px] font-bold leading-none text-[#1188f8]">{{ studentAnalytics.score }}%</p>
                    <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">{{ studentAnalytics.riskLevel }} risk profile</p>
                  </article>
                  <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                    <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">Sessions Joined</p>
                    <p class="mt-3 text-[42px] font-bold leading-none text-black">{{ studentAnalytics.attendedSessions }}</p>
                    <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">of {{ studentAnalytics.totalTrackedSessions }} tracked sessions</p>
                  </article>
                  <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                    <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">Total Points</p>
                    <p class="mt-3 text-[42px] font-bold leading-none text-black">{{ studentAnalytics.points }}</p>
                    <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">class average: {{ studentAnalytics.classAveragePoints }}</p>
                  </article>
                  <article class="rounded-[22px] border border-[#cccdce] bg-white px-5 py-4">
                    <p class="text-[14px] font-bold uppercase tracking-[0.08em] text-[#777]">Class Rank</p>
                    <p class="mt-3 text-[42px] font-bold leading-none text-[#1188f8]">#{{ studentAnalytics.studentRank || '-' }}</p>
                    <p class="mt-3 text-[15px] font-semibold text-[#4a4a4a]">{{ studentAnalytics.percentile }}th percentile</p>
                  </article>
                </div>

                <div class="grid gap-[18px] xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
                  <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <h2 class="text-[24px] font-bold leading-none text-black">Participation Trend</h2>
                        <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">Your points across recent participation sessions.</p>
                      </div>
                    </div>
                    <div class="mt-5 h-[280px]">
                      <ParticipationChart type="line" :data="studentTrendChartData" :options="studentChartAxisOptions" />
                    </div>
                  </section>

                  <section class="grid gap-[18px]">
                    <article class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                      <h2 class="text-[24px] font-bold leading-none text-black">Attendance Mix</h2>
                      <p class="mt-2 text-[15px] font-medium text-[#5b5b5b]">How often you've been visible in tracked participation rounds.</p>
                      <div class="mt-5 h-[280px]">
                        <ParticipationChart type="doughnut" :data="studentMixChartData" :options="studentMixChartOptions" />
                      </div>
                    </article>
                  </section>
                </div>

                <div class="grid gap-[18px] xl:grid-cols-[minmax(0,1fr)_360px]">
                  <section class="rounded-[28px] bg-[#f6f6f6] px-4 py-4 sm:px-6">
                    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 class="text-[28px] font-bold leading-none text-black">Score Comparison</h2>
                        <p class="mt-2 text-[16px] font-medium text-[#4a4a4a]">See how your engagement score compares to the class.</p>
                      </div>
                      <div class="rounded-[18px] bg-white px-4 py-3 text-center">
                        <p class="text-[28px] font-bold leading-none text-[#1188f8]">{{ studentAnalytics.classAverageScore }}%</p>
                        <p class="mt-1 text-[12px] font-bold uppercase tracking-[0.08em] text-[#777]">class avg</p>
                      </div>
                    </div>
                    <div class="mt-5 h-[280px] rounded-[18px] bg-white px-4 py-4">
                      <ParticipationChart type="bar" :data="studentComparisonChartData" :options="studentComparisonChartOptions" />
                    </div>
                  </section>

                  <aside class="space-y-[18px]">
                    <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                      <h2 class="text-[24px] font-bold leading-none text-black">Recommended Focus</h2>
                      <p class="mt-4 text-[16px] font-medium leading-[1.4] text-[#333]">
                        {{ studentAnalytics.recommendation }}
                      </p>
                      <div class="mt-5 rounded-[18px] bg-[#f6f6f6] px-4 py-4">
                        <p class="text-[13px] font-bold uppercase tracking-[0.08em] text-[#777]">Teacher Note</p>
                        <p class="mt-2 text-[15px] font-medium leading-[1.35] text-black">"{{ teacherFeedback }}"</p>
                      </div>
                    </section>

                    <section class="rounded-[28px] border border-[#cccdce] bg-white px-5 py-5">
                      <h2 class="text-[24px] font-bold leading-none text-black">Recent Participation Log</h2>
                      <div v-if="studentAnalytics.recentEvents.length" class="mt-4 space-y-[10px]">
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
                      <p v-else class="mt-4 text-[16px] font-medium text-[#5d5d5d]">No participation events recorded yet.</p>
                    </section>
                  </aside>
                </div>
              </div>
            </template>
          </section>
        </main>
      </div>

      <div class="px-4 pb-6 sm:px-6 lg:hidden">
        <div class="flex items-center justify-center gap-8 rounded-[20px] border border-[#d9e8fb] bg-white px-4 py-3 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
          <button type="button" class="grid h-10 w-10 place-items-center rounded-[12px] bg-[rgba(46,130,239,0.25)]" aria-label="Classes" @click="router.push('/student')">
            <img :src="imgRectangle14" alt="" class="h-[24px] w-[30px]" :style="activeNavIconStyle" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Student ID" @click="router.push('/student/id')">
            <img :src="imgRectangle77" alt="" class="h-[26px] w-[20px]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Settings" @click="openStudentSettings">
            <img :src="imgRectangle18" alt="" class="h-[24px] w-[24px]" :style="inactiveNavIconStyle" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Logout" @click="handleLogout">
            <img :src="imgRectangle17" alt="" class="h-[24px] w-[24px]" :style="inactiveNavIconStyle" />
          </button>
        </div>
      </div>

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
              <button type="button" class="text-[34px] leading-none" aria-label="Close QR modal" @click="isQrModalOpen = false">
                &times;
              </button>
            </div>

            <div class="mt-6 rounded-[28px] border border-[#d9e8fb] bg-[#f8fbff] p-5">
              <div class="mx-auto w-fit rounded-[24px] border-2 border-black bg-[linear-gradient(135deg,#dce8fb_0%,#c7d9f8_46%,#2e82ef_100%)] p-4">
                <div class="flex items-start gap-4">
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <img :src="imgLogoStar" alt="" class="h-[26px] w-[28px] object-contain" />
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
import ParticipationChart from '../../components/charts/ParticipationChart.vue'
import { logoutUser } from '../../services/authService'
import { buildStudentAnalytics } from '../../services/analyticsService'
import { getStudentClasses } from '../../services/studentService'
import { getTeacherClassById } from '../../services/teacherService'
import { getUserById, upsertUserProfile } from '../../services/userService'
import imgRectangle17 from '../../assets/icons/recicall-logout.svg'
import imgRectangle18 from '../../assets/icons/recicall-settings.svg'
import imgRectangle14 from '../../assets/icons/recicall-classes.svg'
import imgRectangle77 from '../../assets/icons/recicall-student-id.svg'
import imgMenu from '../../assets/icons/recicall-menu.svg'
import imgStar from '../../assets/icons/recicall-logo.png'
import imgHeroDots from '../../assets/icons/recicall-ellipsis-white.svg'
import imgShowQrIcon from '../../assets/icons/recicall-show-qr.svg'
import imgLearning from '../../assets/icons/recicall-learning.svg'
import imgPrize from '../../assets/icons/recicall-prize.svg'
import imgChat from '../../assets/icons/recicall-chat.svg'
import imgLogoStar from '../../assets/icons/recicall-logo.png'
import imgBell from '../../assets/icons/notification-bell-svgrepo-com.svg'
import { activeNavIconStyle, inactiveNavIconStyle } from '../../utils/navIconStyles'
import {
  defaultStudentAvatarKey,
  resolveStudentAvatar,
} from '../../utils/studentAvatarOptions'
import { defaultTeacherAvatarKey, resolveTeacherAvatar, sanitizeTeacherAvatarKey } from '../../utils/teacherAvatarOptions'

const svgDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`
const imgHeroPolygonA = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174 91"><path d="M174 0 40 58 174 91V0Z" fill="rgba(20,73,153,0.55)"/></svg>`)
const imgHeroPolygonB = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 79"><path d="M42 0 0 64 42 79V0Z" fill="rgba(25,96,201,0.7)"/></svg>`)
const imgHeroPolygonC = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 48"><path d="M13 0 0 48 13 41V0Z" fill="rgba(18,86,173,0.78)"/></svg>`)
const imgHeroPolygonD = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 84"><path d="M17 0 0 84 17 70V0Z" fill="rgba(13,73,165,0.85)"/></svg>`)
const imgStatsPolygon = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95 75"><path d="M95 0v75H27l12-18 10 4 14-27 8 6 24-40Z" fill="rgba(13,54,122,0.6)"/></svg>`)

const gradientMap = {
  blue: 'linear-gradient(90deg, rgb(37, 122, 255) 0%, rgb(36, 118, 247) 44.712%, rgb(29, 96, 201) 90.385%, rgb(22, 73, 153) 100%)',
}

const router = useRouter()
const route = useRoute()

const isLoggingOut = ref(false)
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

const activeTab = computed(() => String(route.query.tab || 'class'))
const studentAnalytics = computed(() => buildStudentAnalytics(classroom.value || {}, studentUid.value))

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

const teacherFeedback = computed(
  () =>
    classroom.value?.teacherFeedback ||
    'Excellent critical thinking and participation during our discussion on the Philippine Revolution. Keep up the great work!',
)

const recentParticipationEntries = computed(() => studentAnalytics.value.recentEvents.slice(0, 3))

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

const teacherFeedbackDateLabel = computed(
  () => recentParticipationEntries.value[0]?.label || 'Latest update',
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

const mapClassroom = (classItem) => ({
  ...classItem,
  gradientId: 'blue',
  gradient: gradientMap.blue,
})

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
