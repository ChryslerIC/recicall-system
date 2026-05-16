<template>
  <div class="min-h-screen bg-[#f6f6f6] px-4 py-8 sm:px-6 lg:px-10">
    <div class="mx-auto w-full max-w-[980px] rounded-[32px] border border-[#d6e6fa] bg-white px-6 py-8 shadow-[0_16px_40px_rgba(17,136,248,0.06)] sm:px-8 lg:px-10">
      <div class="flex flex-col gap-4 border-b border-[#e6eef8] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-[14px] font-semibold uppercase tracking-[0.14em] text-[#1188f8]">
            ReciCall
          </p>
          <h1 class="mt-3 text-[34px] font-bold leading-none text-black sm:text-[42px]">
            Terms of Service
          </h1>
          <p class="mt-3 text-[16px] leading-[1.5] text-[#475467]">
            Last updated: May 12, 2026
          </p>
        </div>

        <RouterLink
          to="/signup"
          class="inline-flex h-[46px] items-center justify-center rounded-full border border-[#1188f8] px-5 text-[15px] font-semibold text-[#1188f8] transition hover:bg-[#eef6ff]"
        >
          Back to Sign Up
        </RouterLink>
      </div>

      <div class="space-y-8 pt-8 text-[16px] leading-[1.7] text-[#344054]">
        <section>
          <h2 class="text-[24px] font-bold leading-none text-black">1. Using ReciCall</h2>
          <p class="mt-3">
            ReciCall is a classroom participation and analytics platform designed for teachers and
            students. You may use the service only for lawful educational purposes and in a way
            that does not disrupt the experience of other users.
          </p>
        </section>

        <section>
          <h2 class="text-[24px] font-bold leading-none text-black">2. Accounts and Access</h2>
          <p class="mt-3">
            You are responsible for keeping your login details secure and for the activity that
            happens under your account. Teachers and students must provide accurate account
            information so classroom records remain reliable.
          </p>
        </section>

        <section>
          <h2 class="text-[24px] font-bold leading-none text-black">3. Classroom Data</h2>
          <p class="mt-3">
            ReciCall stores class-related information such as names, participation records,
            seating layouts, teacher feedback, and analytics summaries in order to provide the
            platform’s core features.
          </p>
        </section>

        <section>
          <h2 class="text-[24px] font-bold leading-none text-black">4. Acceptable Use</h2>
          <p class="mt-3">
            You agree not to misuse the platform, attempt unauthorized access, upload harmful
            content, or use the service to harm, harass, or impersonate another person.
          </p>
        </section>

        <section>
          <h2 class="text-[24px] font-bold leading-none text-black">5. Updates</h2>
          <p class="mt-3">
            These terms may be updated as the project develops. Continued use of ReciCall after an
            update means you accept the revised terms.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
