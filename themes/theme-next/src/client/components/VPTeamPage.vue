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

.vp-home :slotted(.vp-team-pageTitle) {
  border-top: 1px solid var(--vp-c-gutter);
  padding-top: 88px !important;
}

:slotted(.vp-team-pageSection + .vp-team-pageSection),
:slotted(.vp-team-members + .vp-team-pageSection) {
  margin-top: 64px;
}

:slotted(.vp-team-members + .vp-team-members) {
  margin-top: 24px;
}

@media (min-width: 768px) {
  :slotted(.vp-team-pageTitle + .vp-team-pageSection) {
    margin-top: 16px;
  }

  :slotted(.vp-team-pageSection + .vp-team-pageSection),
  :slotted(.vp-team-members + .vp-team-pageSection) {
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
