<script setup lang="ts">
import type { TeamMember } from '../shared.js'
import VPLink from './VPLink.vue'
import VPSocialLinks from './VPSocialLinks.vue'

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
          <bdi>{{ member.name }}</bdi>
        </h1>
        <p v-if="member.title || member.org" class="affiliation">
          <span v-if="member.title" class="title">
            <bdi>{{ member.title }}</bdi>
          </span>
          <span v-if="member.title && member.org" class="at"> @ </span>
          <VPLink
            v-if="member.org"
            class="org"
            :class="{ link: member.orgLink }"
            :href="member.orgLink"
            no-icon
          >
            <bdi>{{ member.org }}</bdi>
          </VPLink>
        </p>
        <p v-if="member.desc" class="desc"><bdi v-html="member.desc" /></p>
        <div v-if="member.links" class="links">
          <VPSocialLinks :links="member.links" :me="false" />
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
  gap: 0.125rem;

  overflow: hidden;

  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
}

.vp-team-members-item.small .profile {
  padding: 2rem;
}

.vp-team-members-item.small .data {
  padding-top: 1.25rem;
}

.vp-team-members-item.small .avatar {
  width: 4rem;
  height: 4rem;
}

.vp-team-members-item.small .name {
  font-size: 1rem;
  line-height: 1.5;
}

.vp-team-members-item.small .affiliation {
  padding-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.4285714;
}

.vp-team-members-item.small .desc {
  padding-top: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.4285714;
}

.vp-team-members-item.small .links {
  margin: 0 -1rem -1.25rem;
  padding: 0.625rem 0 0;
}

.vp-team-members-item.medium .profile {
  padding: 3rem 2rem;
}

.vp-team-members-item.medium .data {
  padding-top: 1.5rem;
  text-align: center;
}

.vp-team-members-item.medium .avatar {
  width: 6rem;
  height: 6rem;
}

.vp-team-members-item.medium .name {
  font-size: 1.25rem;
  line-height: 1.4;
  letter-spacing: 0.0075em;
}

.vp-team-members-item.medium .affiliation {
  padding-top: 0.25rem;
  font-size: 1rem;
}

.vp-team-members-item.medium .desc {
  max-width: 18rem;
  padding-top: 1rem;
  font-size: 1rem;
}

.vp-team-members-item.medium .links {
  margin: 0 -1rem -0.75rem;
  padding: 1rem 0.75rem 0;
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
  inset: 0;

  object-fit: cover;

  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 50%;
}

.name {
  margin: 0;
  font-weight: 600;
  letter-spacing: normal;
}

.affiliation {
  margin: 0;
  color: var(--vp-c-text-mute);
  font-weight: 500;
  line-height: 1.5;
}

.org.link {
  color: var(--vp-c-text-mute);
  transition: color 0.25s;
}

.org.link:hover {
  color: var(--vp-c-brand);
}

.desc {
  margin: 0 auto;
  line-height: 1.5;
}

.desc :deep(a) {
  color: var(--vp-c-brand);
  font-weight: 500;
  transition: color 0.25s;
  text-decoration-style: dotted;
}

.links {
  display: flex;
  justify-content: center;
  height: 3.5rem;
}

.sp-link {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;

  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-sponsor);

  font-weight: 500;
  font-size: 0.875rem;
  text-align: center;

  transition:
    color 0.25s,
    background-color 0.25s;
}

.sp .sp-link.link:hover,
.sp .sp-link.link:focus {
  background-color: var(--vp-c-sponsor);
  color: var(--vp-c-white);
  outline: none;
}

.sp-icon {
  margin-inline-end: 0.5rem;
  font-size: 1rem;
}
</style>
