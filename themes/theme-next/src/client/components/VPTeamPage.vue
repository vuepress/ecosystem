<template>
  <div class="vp-team-page">
    <slot />
  </div>
</template>

<style scoped>
.vp-team-page {
  margin: 96px 0;
}

@media (min-width: 768px) {
  .vp-team-page {
    margin: 128px 0;
  }
}

.vp-home :slotted(.vp-team-page-title) {
  padding-top: 88px !important;
  border-top: 1px solid var(--vp-c-gutter);
}

:slotted(.vp-team-page-section + .vp-team-page-section),
:slotted(.vp-team-members + .vp-team-page-section) {
  margin-top: 64px;
}

:slotted(.vp-team-members + .vp-team-members) {
  margin-top: 24px;
}

@media (min-width: 768px) {
  :slotted(.vp-team-page-title + .vp-team-page-section) {
    margin-top: 16px;
  }

  :slotted(.vp-team-page-section + .vp-team-page-section),
  :slotted(.vp-team-members + .vp-team-page-section) {
    margin-top: 96px;
  }
}

:slotted(.vp-team-members) {
  padding: 0 24px;
}

@media (min-width: 768px) {
  :slotted(.vp-team-members) {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  :slotted(.vp-team-members) {
    padding: 0 64px;
  }
}
</style>
