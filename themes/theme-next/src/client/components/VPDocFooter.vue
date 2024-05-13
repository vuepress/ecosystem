<script setup lang="ts">
import VPDocFooterContributors from '@theme/VPDocFooterContributors.vue'
import VPDocFooterLastUpdated from '@theme/VPDocFooterLastUpdated.vue'
import VPLink from '@theme/VPLink.vue'
import { computed } from 'vue'
import { useData } from '../composables/data.js'
import { useEditLink } from '../composables/edit-link.js'
import { usePrevNext } from '../composables/prev-next.js'

const { theme, frontmatter } = useData()

const editLink = useEditLink()
const control = usePrevNext()

const hasEditLink = computed(() => {
  return theme.value.editLink && frontmatter.value.editLink !== false
})
const hasLastUpdated = computed(() => {
  return theme.value.lastUpdated && frontmatter.value.lastUpdated !== false
})
const hasContributors = computed(() => {
  return theme.value.contributors && frontmatter.value.contributors !== false
})

const showFooter = computed(() => {
  return (
    hasEditLink.value ||
    hasLastUpdated.value ||
    control.value.prev ||
    control.value.next
  )
})
</script>

<template>
  <footer v-if="showFooter" class="vpDocFooter">
    <slot name="doc-footer-before" />

    <div v-if="hasEditLink || hasLastUpdated" class="edit-info">
      <div v-if="hasEditLink && editLink" class="edit-link">
        <VPLink class="edit-link-button" :href="editLink.link" :no-icon="true">
          <span class="vpi-square-pen edit-link-icon" />
          {{ editLink.text }}
        </VPLink>
      </div>

      <div v-if="hasLastUpdated" class="last-updated">
        <VPDocFooterLastUpdated />
      </div>
    </div>

    <div v-if="hasContributors" class="contributors">
      <VPDocFooterContributors />
    </div>

    <nav
      v-if="control.prev?.link || control.next?.link"
      class="prev-next"
      aria-labelledby="doc-footer-aria-label"
    >
      <span id="doc-footer-aria-label" class="visually-hidden">Pager</span>

      <div class="pager">
        <VPLink
          v-if="control.prev?.link"
          class="pager-link prev"
          :href="control.prev.link"
        >
          <span
            class="desc"
            v-html="theme.docFooter?.prev || 'Previous page'"
          ></span>
          <span class="title" v-html="control.prev.text"></span>
        </VPLink>
      </div>
      <div class="pager">
        <VPLink
          v-if="control.next?.link"
          class="pager-link next"
          :href="control.next.link"
        >
          <span
            class="desc"
            v-html="theme.docFooter?.next || 'Next page'"
          ></span>
          <span class="title" v-html="control.next.text"></span>
        </VPLink>
      </div>
    </nav>
  </footer>
</template>

<style scoped>
.vpDocFooter {
  margin-top: 64px;
}

.edit-info,
.contributors {
  padding-bottom: 18px;
}

.contributors {
  margin-top: -18px;
}

@media (min-width: 640px) {
  .edit-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 14px;
  }

  .contributors {
    margin-top: -14px;
    padding-bottom: 14px;
  }
}

.edit-link-button {
  display: flex;
  align-items: center;
  border: 0;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}

.edit-link-button:hover {
  color: var(--vp-c-brand-2);
}

.edit-link-icon {
  margin-right: 8px;
}

.prev-next {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  display: grid;
  grid-row-gap: 8px;
}

@media (min-width: 640px) {
  .prev-next {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }
}

.pager-link {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.25s;
}

.pager-link:hover {
  border-color: var(--vp-c-brand-1);
}

.pager-link.next {
  margin-left: auto;
  text-align: right;
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}
</style>
