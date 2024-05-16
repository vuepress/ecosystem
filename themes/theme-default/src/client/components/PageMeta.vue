<script setup lang="ts">
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { AutoLink, usePageData, usePageFrontmatter } from 'vuepress/client'
import type { AutoLinkConfig } from 'vuepress/client'
import type {
  DefaultThemeNormalPageFrontmatter,
  DefaultThemePageData,
} from '../../shared/index.js'
import { useThemeLocaleData } from '../composables/index.js'
import { resolveEditLink } from '../utils/index.js'

const useEditNavLink = (): ComputedRef<null | AutoLinkConfig> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocale.value.editLink ?? true
    if (!showEditLink) {
      return null
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
      editLinkText,
    } = themeLocale.value

    if (!docsRepo) return null

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern:
        frontmatter.value.editLinkPattern ?? themeLocale.value.editLinkPattern,
    })

    if (!editLink) return null

    return {
      text: editLinkText ?? 'Edit this page',
      link: editLink,
    }
  })
}

const useLastUpdated = (): ComputedRef<null | string> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showLastUpdated =
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true

    if (!showLastUpdated) return null

    if (!page.value.git?.updatedTime) return null

    const updatedDate = new Date(page.value.git?.updatedTime)

    return updatedDate.toLocaleString()
  })
}

const useContributors = (): ComputedRef<
  null | Required<DefaultThemePageData['git']>['contributors']
> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showContributors =
      frontmatter.value.contributors ?? themeLocale.value.contributors ?? true

    if (!showContributors) return null

    return page.value.git?.contributors ?? null
  })
}

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
          <svg class="icon" viewBox="0 0 1024 1024">
            <g fill="currentColor">
              <path
                d="M430.818 653.65a60.46 60.46 0 0 1-50.96-93.281l71.69-114.012 7.773-10.365L816.038 80.138A60.46 60.46 0 0 1 859.225 62a60.46 60.46 0 0 1 43.186 18.138l43.186 43.186a60.46 60.46 0 0 1 0 86.373L588.879 565.55l-8.637 8.637-117.466 68.234a60.46 60.46 0 0 1-31.958 11.229z"
              />
              <path
                d="M728.802 962H252.891A190.883 190.883 0 0 1 62.008 771.98V296.934a190.883 190.883 0 0 1 190.883-192.61h267.754a60.46 60.46 0 0 1 0 120.92H252.891a69.962 69.962 0 0 0-69.098 69.099V771.98a69.962 69.962 0 0 0 69.098 69.098h475.911A69.962 69.962 0 0 0 797.9 771.98V503.363a60.46 60.46 0 1 1 120.922 0V771.98A190.883 190.883 0 0 1 728.802 962z"
              />
            </g>
          </svg>
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
@import '../styles/_variables';

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

    .icon {
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
