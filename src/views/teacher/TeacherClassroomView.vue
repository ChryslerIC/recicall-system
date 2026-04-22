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
              class="flex h-[63px] w-full items-center rounded-[17px] bg-[rgba(46,130,239,0.25)]"
              :class="isSidebarExpanded ? 'justify-start px-[18px]' : 'justify-center'"
              aria-label="Classes"
              @click="router.push('/teacher')"
            >
              <img :src="imgRectangle14" alt="" class="h-[36px] w-[45px] shrink-0" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-semibold text-[#174ca0]">Classes</span>
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
            <button
              type="button"
              class="flex h-[52px] w-full items-center rounded-[17px] transition-colors hover:bg-[rgba(46,130,239,0.12)]"
              :class="isSidebarExpanded ? 'justify-start px-[21px]' : 'justify-center'"
              aria-label="Archive"
              @click="router.push('/teacher/archive')"
            >
              <img :src="imgRectangle16" alt="" class="h-[40px] w-[38px] shrink-0" />
              <span v-if="isSidebarExpanded" class="ml-4 text-[16px] font-medium text-[#3a3a3a]">Archive</span>
            </button>
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
          <section class="min-h-[653px] rounded-[28px] border-2 border-[#2e82ef] bg-white px-4 pb-8 pt-4 sm:px-6 lg:rounded-[52px] lg:px-[28px] lg:pb-[30px] lg:pt-[14px]">
            <div v-if="isLoading" class="px-4 py-8 text-[18px] font-medium text-[#5d5d5d]">Loading classroom...</div>
            <div v-else-if="!classroom" class="px-4 py-8 text-[18px] font-medium text-[#b81717]">We couldn’t find that class.</div>

            <template v-else>
              <div class="mt-[18px] flex h-auto w-full max-w-[458px] items-center gap-2 overflow-x-auto rounded-[30.5px] bg-[#f6f6f6] p-[11px] shadow-[0_4px_6.1px_-4px_rgba(0,0,0,0.25)]">
                <button type="button" class="h-[47px] min-w-[120px] rounded-[30.5px] bg-white px-4 text-[16px] font-semibold text-[#1188f8] shadow-[0_4px_6.1px_-4px_rgba(0,0,0,0.25)] sm:min-w-[141px]">
                  Class
                </button>
                <button type="button" class="h-[47px] min-w-[120px] px-4 text-[16px] font-semibold text-[#373737] sm:min-w-[146px]">
                  Class List
                </button>
                <button type="button" class="h-[47px] min-w-[120px] px-4 text-[16px] font-semibold text-[#373737]">
                  Analytics
                </button>
              </div>

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
                  <button type="button" class="pt-[4px]" aria-label="Class options">
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
                  {{ classroom.scheduleLabel }} • {{ classroom.time }}
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
                    <button type="button" class="ml-auto mt-[14px] flex h-[37px] w-[93px] items-center justify-center rounded-[35px] border border-black text-[14px] font-medium text-[#1188f8]">
                      Notify
                    </button>
                  </div>
                </div>

                <div class="min-w-0 w-full flex-1 pt-0 xl:w-[946px] xl:pt-[11px]">
                  <div class="flex flex-col gap-4 md:flex-row md:flex-wrap xl:flex-nowrap xl:items-center xl:gap-[23px]">
                    <button
                      type="button"
                      class="flex w-full items-center justify-center gap-[16px] rounded-[60px] bg-gradient-to-r from-[#1188f8] via-[#2490fa] to-[#57a5ff] font-bold text-white md:flex-1 xl:flex-none"
                      :class="isSessionActive ? 'h-[82px] text-[18px] sm:text-[20px] xl:h-[95px] xl:w-[393px] xl:text-[22px]' : 'h-[72px] text-[18px] sm:text-[20px] xl:h-[76px] xl:w-[324px] xl:text-[24px]'"
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
                      class="flex w-full items-center justify-center gap-[16px] rounded-[60px] bg-gradient-to-l from-[#1188f8] via-[#2490fa] to-[#57a5ff] font-bold text-white md:flex-1 xl:flex-none"
                      :class="isSessionActive ? 'h-[82px] text-[18px] sm:text-[20px] xl:h-[95px] xl:w-[385px] xl:text-[22px]' : 'h-[72px] text-[18px] sm:text-[20px] xl:h-[76px] xl:w-[324px] xl:text-[20px]'"
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
                              <p class="text-[27px] font-bold leading-none text-black">Participation 2</p>
                              <p class="mt-[8px] text-[20px] font-semibold leading-none text-[#4a4a4a]">July 1, 2026</p>
                            </div>
                          </div>

                          <div class="mt-[18px] flex min-h-[61px] w-full max-w-[275px] items-center rounded-[9px] bg-[#d9d9d9] px-[14px] py-3 text-[18px] font-bold text-black sm:text-[20px]">
                            <span>Student Participated:</span>
                            <span class="ml-[8px] text-[#1188f8]">13</span>
                          </div>
                        </div>

                        <div class="relative min-w-0 border-t border-[#8d8d8d] pt-4 xl:border-l xl:border-t-0 xl:pl-[24px] xl:pt-[4px]">
                          <div class="flex items-center gap-[8px]">
                            <svg class="h-[20px] w-[20px] text-[#777]" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                              <path d="M10 3a7 7 0 1 0 6.2 3.75" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                              <path d="M10 1v4h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p class="text-[18px] font-bold text-[#313131]">Recent Student Engagement</p>
                          </div>

                          <div class="mt-[14px] space-y-[10px]">
                            <div v-for="student in recentStudents" :key="student.id" class="flex h-[47px] items-center justify-between rounded-[28px] border border-[#cccdce] bg-[#fdfdfd] px-[10px]">
                              <div class="flex min-w-0 items-center gap-[12px]">
                                <div class="grid h-[30px] w-[30px] place-items-center rounded-full border-2 border-black bg-white">
                                  <svg class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <circle cx="12" cy="8" r="4" fill="black" />
                                    <path d="M5 20c1.8-3.6 4.5-5.4 7-5.4S17.2 16.4 19 20" fill="black" />
                                  </svg>
                                </div>
                                <span class="truncate text-[15px] font-medium text-black">{{ student.name }}</span>
                              </div>
                              <div class="flex h-[35px] w-[73px] items-center justify-center rounded-[14px] bg-[#cfe3fb] text-[20px] font-bold text-black">
                                + 5
                              </div>
                            </div>
                          </div>

                          <div class="mt-[18px] flex justify-start xl:justify-end xl:pr-[8px]">
                            <button type="button" class="h-[42px] w-[154px] rounded-[16.5px] border border-[#535353] bg-white text-[15px] font-semibold text-[#1188f8]">
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
                          Click “Start Session” to begin tracking student engagement.
                        </p>
                        <button
                          type="button"
                          class="mt-[10px] flex h-[42px] w-[194px] items-center justify-center rounded-[16.5px] border border-[#535353] bg-white text-[18px] font-semibold text-[#1188f8] sm:text-[20px]"
                          @click="startSession"
                        >
                          Start Session
                        </button>
                      </div>
                    </div>
                  </template>

                  <div class="mt-[12px] flex">
                    <div class="flex min-h-[84px] w-full max-w-[374px] items-center rounded-[32px] border border-[#cccdce] bg-[#f6f6f6] px-[18px] py-3">
                      <div class="mr-[14px] grid h-[57px] w-[64px] place-items-center rounded-[14px] bg-[#50d24a]">
                        <img :src="imgLearning" alt="" class="h-[38px] w-[32px]" />
                      </div>
                      <div>
                        <p class="text-[22px] font-bold leading-none text-black sm:text-[24px]">Participation 1 -</p>
                        <p class="mt-[10px] text-[16px] font-semibold leading-none text-[#4a4a4a]">July 1, 2026</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </section>
        </main>
      </div>

      <div class="px-4 pb-6 sm:px-6 lg:hidden">
        <div class="flex items-center justify-center gap-8 rounded-[20px] border border-[#d9e8fb] bg-white px-4 py-3 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
          <button type="button" class="grid h-10 w-10 place-items-center rounded-[12px] bg-[rgba(46,130,239,0.25)]" aria-label="Classes" @click="router.push('/teacher')">
            <img :src="imgRectangle14" alt="" class="h-[24px] w-[30px]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Predictive analytics">
            <img :src="imgRectangle15" alt="" class="h-[28px] w-[26px]" />
          </button>
          <button type="button" class="grid h-10 w-10 place-items-center" aria-label="Archive" @click="router.push('/teacher/archive')">
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
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth } from '../../config/firebase'
import { logoutUser, updateCurrentUserAccount } from '../../services/authService'
import { getTeacherClassById } from '../../services/teacherService'
import { getUserById, upsertUserProfile } from '../../services/userService'

const imgRectangle15 = 'https://www.figma.com/api/mcp/asset/8de4c4e0-e1c8-4c94-8c43-7026434f4f72'
const imgRectangle16 = 'https://www.figma.com/api/mcp/asset/5f12f2f8-4dd4-402a-8fdf-9802396c85ed'
const imgRectangle17 = 'https://www.figma.com/api/mcp/asset/2b5d5c88-f44b-4365-a777-8ab1766c9f67'
const imgRectangle18 = 'https://www.figma.com/api/mcp/asset/abb45a38-8355-4e97-95f4-d2347d71be2e'
const imgProfile = 'https://www.figma.com/api/mcp/asset/c9e4c631-c728-42fb-803f-39bcf33364ff'
const imgRectangle13 = 'https://www.figma.com/api/mcp/asset/0f796a8b-56db-42a7-9495-bdaecb1e8154'
const imgRectangle14 = 'https://www.figma.com/api/mcp/asset/ca07f66a-4450-4c66-9d04-a5213d0cde2c'
const imgRectangle25 = 'https://www.figma.com/api/mcp/asset/f4c60863-9305-4c79-9431-c43ebe9fe631'
const imgRectangle43 = 'https://www.figma.com/api/mcp/asset/0ffa9ac8-f0d7-4ca3-beed-cd62e417a5be'
const imgRectangle44 = 'https://www.figma.com/api/mcp/asset/e56b0445-232f-4487-869c-78ea62a1a298'
const imgLearning = 'https://www.figma.com/api/mcp/asset/70a439da-f869-4ee7-9218-e740c0f3ae98'
const imgRectangle76 = 'https://www.figma.com/api/mcp/asset/557f2899-54d7-41d5-bf86-e738acbb63e8'
const imgPresentationScreen = 'https://www.figma.com/api/mcp/asset/2b76acc2-da77-436f-ba02-43e26068c1ad'
const imgStar2 = 'https://www.figma.com/api/mcp/asset/710c74f3-e97e-4c91-9c82-c6b15f68b0bd'
const imgStar3 = 'https://www.figma.com/api/mcp/asset/6c261d9c-b047-4ae4-a89d-2fe11ec14146'
const imgStar4 = 'https://www.figma.com/api/mcp/asset/b3c2ba69-da03-4d37-84f0-805b5e5cc1ae'
const imgStar1 = 'https://www.figma.com/api/mcp/asset/4ce37ba9-3887-457a-a4b9-c25cd7b7e008'
const imgPolygon4 = 'https://www.figma.com/api/mcp/asset/1de66fc4-dacb-4b63-b929-08689a3b4300'
const imgPolygon5 = 'https://www.figma.com/api/mcp/asset/c9864706-14c5-4334-aed8-39848d12242d'
const imgPolygon6 = 'https://www.figma.com/api/mcp/asset/8749e81c-a5d4-4c68-80e6-5f1c3df3aa1b'
const imgPolygon7 = 'https://www.figma.com/api/mcp/asset/5e20a21a-7d4e-4f95-93e0-60088b8d15ec'
const imgRectangle26 = 'https://www.figma.com/api/mcp/asset/c66743d0-d8cf-4b0e-ae2e-a70c8021c53c'

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
const teacherPhoto = ref(imgProfile)
const teacherId = ref('')
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
const rawClassroom = ref(null)
const recentStudents = computed(() =>
  (classroom.value?.enrolledStudents || []).slice(0, 2).map((student, index) => ({
    id: student.studentId || student.id || `${index}`,
    name: student.displayName || student.email || 'Joined student',
    points: 5,
  })),
)

const isSessionActive = computed(() => route.query.session === 'active')

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

  rawClassroom.value = await getTeacherClassById(user.uid, route.params.classId)
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
