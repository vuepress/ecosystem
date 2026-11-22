<script setup lang="ts">
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { computed } from 'vue'

import {
  usePageLastUpdated,
  useThemePageFrontmatter,
} from '../../composables/useThemePageData.js'
import { useContributors } from '../composables/useContributors.js'
import { useEditLink } from '../composables/useEditLink.js'
import { usePrevNext } from '../composables/usePrevNext.js'
import type { ThemeConfig } from '../shared.js'
import VPDocFooterContributors from './VPDocFooterContributors.vue'
import VPDocFooterLastUpdated from './VPDocFooterLastUpdated.vue'
import VPLink from './VPLink.vue'

const theme = useThemeLocaleData<ThemeConfig>()
const frontmatter = useThemePageFrontmatter()
const pageLastUpdated = usePageLastUpdated()

const editLink = useEditLink()
const control = usePrevNext()
const contributors = useContributors()

const hasEditLink = computed(
  () => theme.value.editLink && frontmatter.value.editLink !== false,
)
const hasLastUpdated = computed(() => pageLastUpdated.value)
const hasContributors = computed(() => contributors.value.length > 0)
const showFooter = computed(
  () =>
    hasEditLink.value ||
    hasLastUpdated.value ||
    hasContributors.value ||
    control.value.prev ||
    control.value.next,
)
</script>

<template>
  <footer v-if="showFooter" class="vp-doc-footer">
    <slot name="doc-footer-before" />

    <div
      v-if="hasEditLink || hasLastUpdated || hasContributors"
      class="edit-info"
    >
      <div v-if="hasEditLink" class="edit-link">
        <VPLink class="edit-link-button" :href="editLink.url" :no-icon="true">
          <span class="vpi-square-pen edit-link-icon" />
          {{ editLink.text }}
        </VPLink>
      </div>

      <div class="meta">
        <div v-if="hasLastUpdated" class="last-updated">
          <VPDocFooterLastUpdated />
        </div>
        <VPDocFooterContributors />
      </div>
    </div>

    <nav
      v-if="control.prev?.link || control.next?.link"
      class="prev-next"
      aria-labelledby="doc-footer-aria-label"
    >
      <span class="visually-hidden" id="doc-footer-aria-label">Pager</span>

      <div class="pager">
        <VPLink
          v-if="control.prev?.link"
          class="pager-link prev"
          :href="control.prev.link"
          :target="control.prev.target"
          :rel="control.prev.rel"
        >
          <span
            class="desc"
            v-html="theme.docFooter?.prev || 'Previous page'"
          ></span>
          <span class="title"><bdi v-html="control.prev.text" /></span>
        </VPLink>
      </div>
      <div class="pager">
        <VPLink
          v-if="control.next?.link"
          class="pager-link next"
          :href="control.next.link"
          :target="control.next.target"
          :rel="control.next.rel"
        >
          <span
            class="desc"
            v-html="theme.docFooter?.next || 'Next page'"
          ></span>
          <span class="title"><bdi v-html="control.next.text" /></span>
        </VPLink>
      </div>
    </nav>
  </footer>
</template>

<style scoped>
.vp-doc-footer {
  margin-top: 4rem;
}

.edit-info {
  padding-bottom: 1.125rem;
}

@media (min-width: 40rem) {
  .edit-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.875rem;
  }
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.edit-link-button {
  display: flex;
  align-items: center;

  border: 0;

  color: var(--vp-c-brand-1);

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 2.2857143;

  transition: color 0.25s;
}

.edit-link-button:hover {
  color: var(--vp-c-brand-2);
}

.edit-link-icon {
  margin-inline-end: 0.5rem;
}

.prev-next {
  display: grid;
  row-gap: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

@media (min-width: 40rem) {
  .prev-next {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
  }
}

.pager-link {
  display: block;

  width: 100%;
  height: 100%;
  padding: 0.6875rem 1rem 0.8125rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;

  transition: border-color 0.25s;
}

.pager-link:hover {
  border-color: var(--vp-c-brand-1);
}

.pager-link.next {
  margin-inline-start: auto;
  text-align: end;
}

.desc {
  display: block;

  color: var(--vp-c-text-2);

  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.6666667;
}

.title {
  display: block;

  color: var(--vp-c-brand-1);

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.4285714;

  transition: color 0.25s;
}
</style>
