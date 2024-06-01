<script setup lang="ts">
import {
  useContributors,
  useEditNavLink,
  useLastUpdated,
  useThemeLocaleData,
} from '@theme/composables'
import VPEditIcon from '@theme/VPEditIcon.vue'
import { AutoLink } from 'vuepress/client'

const themeLocale = useThemeLocaleData()
const editNavLink = useEditNavLink()
const lastUpdated = useLastUpdated()
const contributors = useContributors()
</script>

<template>
  <footer class="vp-page-meta">
    <div v-if="editNavLink" class="vp-meta-item edit-link">
      <AutoLink class="label" :config="editNavLink">
        <template #before>
          <VPEditIcon />
        </template>
      </AutoLink>
    </div>

    <div class="vp-meta-item git-info">
      <div v-if="lastUpdated" class="vp-meta-item last-updated">
        <span class="meta-item-label">{{ themeLocale.lastUpdatedText }}: </span>
        <ClientOnly>
          <span class="meta-item-info">{{ lastUpdated }}</span>
        </ClientOnly>
      </div>

      <div
        v-if="contributors && contributors.length"
        class="vp-meta-item contributors"
      >
        <span class="meta-item-label"
          >{{ themeLocale.contributorsText }}:
        </span>
        <span class="meta-item-info">
          <template v-for="(contributor, index) in contributors" :key="index">
            <span class="contributor" :title="`email: ${contributor.email}`">
              {{ contributor.name }}
            </span>
            <template v-if="index !== contributors.length - 1">, </template>
          </template>
        </span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
@use '../styles/mixins';
@import '../styles/variables';

.vp-page-meta {
  @include mixins.content_wrapper;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  overflow: auto;

  padding-top: 0.75rem;
  padding-bottom: 0.75rem;

  @media print {
    margin: 0 !important;
    padding-inline: 0 !important;
  }

  @media (max-width: $MQMobile) {
    display: block;
  }

  .vp-meta-item {
    flex-grow: 1;

    .vp-meta-label {
      font-weight: 500;

      &:not(a) {
        color: var(--c-text-lighter);
      }
    }

    .vp-meta-info {
      color: var(--c-text-quote);
      font-weight: 400;
    }
  }

  .git-info {
    text-align: end;
  }

  .edit-link {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    margin-inline-end: 0.5rem;
    font-size: 14px;

    @media print {
      display: none;
    }

    .edit-icon {
      position: relative;
      bottom: -0.125em;

      width: 1em;
      height: 1em;
      margin-inline-end: 0.25em;
    }
  }

  .last-updated,
  .contributors {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    font-size: 14px;

    @media (max-width: $MQMobile) {
      font-size: 13px;
      text-align: start;
    }
  }
}
</style>
