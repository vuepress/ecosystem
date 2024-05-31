<script setup lang="ts">
import VPLink from '@theme/VPLink.vue'
import VPSocialLinks from '@theme/VPSocialLinks.vue'
import type { TeamMember } from '../../shared/index.js'

interface Props {
  size?: 'small' | 'medium'
  member: TeamMember
}

withDefaults(defineProps<Props>(), {
  size: 'medium',
})
</script>

<template>
  <article class="vp-team-members-item" :class="[size]">
    <div class="profile">
      <figure class="avatar">
        <img class="avatar-img" :src="member.avatar" :alt="member.name" />
      </figure>
      <div class="data">
        <h1 class="name">
          {{ member.name }}
        </h1>
        <p v-if="member.title || member.org" class="affiliation">
          <span v-if="member.title" class="title">
            {{ member.title }}
          </span>
          <span v-if="member.title && member.org" class="at"> @ </span>
          <VPLink
            v-if="member.org"
            class="org"
            :class="{ link: member.orgLink }"
            :href="member.orgLink"
            no-icon
          >
            {{ member.org }}
          </VPLink>
        </p>
        <p v-if="member.desc" class="desc" v-html="member.desc" />
        <div v-if="member.links" class="links">
          <VPSocialLinks :links="member.links" />
        </div>
      </div>
    </div>
    <div v-if="member.sponsor" class="sp">
      <VPLink class="sp-link" :href="member.sponsor" no-icon>
        <span class="vpi-heart sp-icon" /> {{ member.actionText || 'Sponsor' }}
      </VPLink>
    </div>
  </article>
</template>

<style scoped>
.vp-team-members-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.vp-team-members-item.small .profile {
  padding: 32px;
}

.vp-team-members-item.small .data {
  padding-top: 20px;
}

.vp-team-members-item.small .avatar {
  width: 64px;
  height: 64px;
}

.vp-team-members-item.small .name {
  line-height: 24px;
  font-size: 16px;
}

.vp-team-members-item.small .affiliation {
  padding-top: 4px;
  line-height: 20px;
  font-size: 14px;
}

.vp-team-members-item.small .desc {
  padding-top: 12px;
  line-height: 20px;
  font-size: 14px;
}

.vp-team-members-item.small .links {
  margin: 0 -16px -20px;
  padding: 10px 0 0;
}

.vp-team-members-item.medium .profile {
  padding: 48px 32px;
}

.vp-team-members-item.medium .data {
  padding-top: 24px;
  text-align: center;
}

.vp-team-members-item.medium .avatar {
  width: 96px;
  height: 96px;
}

.vp-team-members-item.medium .name {
  letter-spacing: 0.15px;
  line-height: 28px;
  font-size: 20px;
}

.vp-team-members-item.medium .affiliation {
  padding-top: 4px;
  font-size: 16px;
}

.vp-team-members-item.medium .desc {
  padding-top: 16px;
  max-width: 288px;
  font-size: 16px;
}

.vp-team-members-item.medium .links {
  margin: 0 -16px -12px;
  padding: 16px 12px 0;
}

.profile {
  flex-grow: 1;
  background-color: var(--vp-c-bg-soft);
}

.data {
  text-align: center;
}

.avatar {
  position: relative;
  flex-shrink: 0;
  margin: 0 auto;
  border-radius: 50%;
  box-shadow: var(--vp-shadow-3);
}

.avatar-img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  margin: 0;
  font-weight: 600;
}

.affiliation {
  margin: 0;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.org.link {
  color: var(--vp-c-text-2);
  transition: color 0.25s;
}

.org.link:hover {
  color: var(--vp-c-brand-1);
}

.desc {
  margin: 0 auto;
}

.desc :deep(a) {
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration-style: dotted;
  transition: color 0.25s;
}

.links {
  display: flex;
  justify-content: center;
  height: 56px;
}

.sp-link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-sponsor);
  background-color: var(--vp-c-bg-soft);
  transition:
    color 0.25s,
    background-color 0.25s;
}

.sp .sp-link.link:hover,
.sp .sp-link.link:focus {
  outline: none;
  color: var(--vp-c-white);
  background-color: var(--vp-c-sponsor);
}

.sp-icon {
  margin-right: 8px;
  font-size: 16px;
}
</style>
