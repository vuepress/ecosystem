<template>
  <div class="vpTeamPage">
    <slot />
  </div>
</template>

<style scoped>
.vpTeamPage {
  margin: 96px 0;
}

@media (min-width: 768px) {
  .vpTeamPage {
    margin: 128px 0;
  }
}

.vpHome :slotted(.vpTeamPageTitle) {
  border-top: 1px solid var(--vp-c-gutter);
  padding-top: 88px !important;
}

:slotted(.vpTeamPageSection + .vpTeamPageSection),
:slotted(.vpTeamMembers + .vpTeamPageSection) {
  margin-top: 64px;
}

:slotted(.vpTeamMembers + .vpTeamMembers) {
  margin-top: 24px;
}

@media (min-width: 768px) {
  :slotted(.vpTeamPageTitle + .vpTeamPageSection) {
    margin-top: 16px;
  }

  :slotted(.vpTeamPageSection + .vpTeamPageSection),
  :slotted(.vpTeamMembers + .vpTeamPageSection) {
    margin-top: 96px;
  }
}

:slotted(.vpTeamMembers) {
  padding: 0 24px;
}

@media (min-width: 768px) {
  :slotted(.vpTeamMembers) {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  :slotted(.vpTeamMembers) {
    padding: 0 64px;
  }
}
</style>
