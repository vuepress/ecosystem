<script setup lang="ts">
import VPTeamMembersItem from '@theme/VPTeamMembersItem.vue'
import { computed } from 'vue'
import type { TeamMember } from '../../shared/index.js'

interface Props {
  size?: 'small' | 'medium'
  members: TeamMember[]
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
})

const classes = computed(() => [props.size, `count-${props.members.length}`])
</script>

<template>
  <div class="vpTeamMembers" :class="classes">
    <div class="container">
      <div v-for="member in members" :key="member.name" class="item">
        <VPTeamMembersItem :size="size" :member="member" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.vpTeamMembers.small .container {
  grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
}

.vpTeamMembers.small.count-1 .container {
  max-width: 276px;
}
.vpTeamMembers.small.count-2 .container {
  max-width: calc(276px * 2 + 24px);
}
.vpTeamMembers.small.count-3 .container {
  max-width: calc(276px * 3 + 24px * 2);
}

.vpTeamMembers.medium .container {
  grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
}

@media (min-width: 375px) {
  .vpTeamMembers.medium .container {
    grid-template-columns: repeat(auto-fit, minmax(288px, 1fr));
  }
}

.vpTeamMembers.medium.count-1 .container {
  max-width: 368px;
}
.vpTeamMembers.medium.count-2 .container {
  max-width: calc(368px * 2 + 24px);
}

.container {
  display: grid;
  gap: 24px;
  margin: 0 auto;
  max-width: 1152px;
}
</style>
