<template>
  <div class="vp-team-page">
    <slot />
  </div>
</template>

<style scoped>
.vp-team-page {
  margin: 6rem 0;
}

@media (min-width: 48rem) {
  .vp-team-page {
    margin: 8rem 0;
  }
}

.vp-home :slotted(.vp-team-page-title) {
  padding-top: 5.5rem !important;
  border-top: 1px solid var(--vp-c-gutter);
}

:slotted(.vp-team-page-section + .vp-team-page-section),
:slotted(.vp-team-members + .vp-team-page-section) {
  margin-top: 4rem;
}

:slotted(.vp-team-members + .vp-team-members) {
  margin-top: 1.5rem;
}

@media (min-width: 48rem) {
  :slotted(.vp-team-page-title + .vp-team-page-section) {
    margin-top: 1rem;
  }

  :slotted(.vp-team-page-section + .vp-team-page-section),
  :slotted(.vp-team-members + .vp-team-page-section) {
    margin-top: 6rem;
  }
}

:slotted(.vp-team-members) {
  padding: 0 1.5rem;
}

@media (min-width: 48rem) {
  :slotted(.vp-team-members) {
    padding: 0 3rem;
  }
}

@media (min-width: 60rem) {
  :slotted(.vp-team-members) {
    padding: 0 4rem;
  }
}
</style>
