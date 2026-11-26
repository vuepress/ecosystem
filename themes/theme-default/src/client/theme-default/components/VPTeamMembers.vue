<script setup lang="ts">
import type { TeamMember } from '../shared.js'
import VPTeamMembersItem from './VPTeamMembersItem.vue'

interface Props {
  size?: 'small' | 'medium'
  members: TeamMember[]
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
})
</script>

<template>
  <div class="vp-team-members" :class="[size, `count-${members.length}`]">
    <ul class="container">
      <li v-for="member in members" :key="member.name" class="item">
        <VPTeamMembersItem :size :member />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.vp-team-members.small .container {
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}

.vp-team-members.small.count-1 .container {
  max-width: 17.25rem;
}

.vp-team-members.small.count-2 .container {
  max-width: calc(17.25rem * 2 + 1.5rem);
}

.vp-team-members.small.count-3 .container {
  max-width: calc(17.25rem * 3 + 1.5rem * 2);
}

.vp-team-members.medium .container {
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

@media (min-width: 23.4375rem) {
  .vp-team-members.medium .container {
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  }
}

.vp-team-members.medium.count-1 .container {
  max-width: 23rem;
}

.vp-team-members.medium.count-2 .container {
  max-width: calc(23rem * 2 + 1.5rem);
}

.container {
  display: grid;
  gap: 1.5rem;
  max-width: 72rem;
  margin: 0 auto;
}

/* Reset styles from vp-doc if used in markdown */
.vp-doc .vp-team-members .container {
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

.vp-doc .vp-team-members .item {
  margin: 0;
  padding: 0;
}

.vp-doc .vp-team-members :deep(.org),
.vp-doc .vp-team-members :deep(.sp-link) {
  text-decoration: none;
}

/* Sizing for doc pages, where the content area is narrow (excludes home content) */
.vp-doc:not(.vp-home-content) .vp-team-members {
  margin-top: 1.5rem;
}

.vp-doc:not(.vp-home-content) .vp-team-members.small.count-1 .container,
.vp-doc:not(.vp-home-content) .vp-team-members.medium.count-1 .container {
  max-width: calc((100% - 1.5rem) / 2);
  margin: 0;
}

.vp-doc:not(.vp-home-content) .vp-team-members.small.count-2 .container,
.vp-doc:not(.vp-home-content) .vp-team-members.small.count-3 .container {
  max-width: 100%;
}
</style>
