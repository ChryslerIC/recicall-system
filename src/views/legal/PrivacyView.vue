<template>
  <div class="min-h-screen bg-[#f6f6f6] px-4 py-8 sm:px-6 lg:px-10">
    <div class="mx-auto w-full max-w-[980px] rounded-[32px] border border-[#d6e6fa] bg-white px-6 py-8 shadow-[0_16px_40px_rgba(17,136,248,0.06)] sm:px-8 lg:px-10">
      <div class="flex flex-col gap-4 border-b border-[#e6eef8] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-[14px] font-semibold uppercase tracking-[0.14em] text-[#1188f8]">
            ReciCall
          </p>
          <h1 class="mt-3 text-[34px] font-bold leading-none text-black sm:text-[42px]">
            Privacy Policy
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
          <h2 class="text-[24px] font-bold leading-none text-black">1. Information We Collect</h2>
          <p class="mt-3">
            ReciCall may collect your name, email address, user role, classroom enrollment data,
            participation history, teacher feedback, seating records, and profile preferences.
          </p>
        </section>

        <section>
          <h2 class="text-[24px] font-bold leading-none text-black">2. How We Use Information</h2>
          <p class="mt-3">
            We use this information to authenticate accounts, manage classrooms, generate
            participation analytics, support teacher feedback, and improve the overall educational
            experience inside the platform.
          </p>
        </section>

        <section>
          <h2 class="text-[24px] font-bold leading-none text-black">3. Data Sharing</h2>
          <p class="mt-3">
            Classroom data is shared only as needed within the platform experience, such as between
            a teacher and the students enrolled in the same class. ReciCall does not intend to sell
            personal information.
          </p>
        </section>

        <section>
          <h2 class="text-[24px] font-bold leading-none text-black">4. Data Security</h2>
          <p class="mt-3">
            We take reasonable steps to protect stored information through account authentication,
            access rules, and project-level platform controls, but no online system can guarantee
            absolute security.
          </p>
        </section>

        <section>
          <h2 class="text-[24px] font-bold leading-none text-black">5. Your Choices</h2>
          <p class="mt-3">
            You may request updates to account information through the platform’s profile features.
            By creating an account, you consent to the collection and use of information as
            described in this policy.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
