<script setup lang="ts">
import { getCurrentInstance, type Component } from 'vue'

import type { FeatureIcon } from '../shared.js'
import VPImage from './VPImage.vue'
import VPLink from './VPLink.vue'

// `VPIcon` is registered by `@vuepress/plugin-icon`, resolve it from the app
// context so that a site without the plugin does not warn about a missing
// component
const iconComponent = getCurrentInstance()?.appContext.components.VPIcon as
  | Component
  | undefined

defineProps<{
  icon?: FeatureIcon
  title: string
  details?: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
}>()
</script>

<template>
  <VPLink
    class="vp-feature"
    :href="link"
    :rel
    :target
    :no-icon="true"
    :tag="link ? 'a' : 'div'"
  >
    <article class="box">
      <div v-if="typeof icon === 'object' && icon.wrap" class="icon">
        <VPImage
          :image="icon"
          :alt="icon.alt"
          :height="icon.height || 48"
          :width="icon.width || 48"
        />
      </div>
      <VPImage
        v-else-if="typeof icon === 'object'"
        :image="icon"
        :alt="icon.alt"
        :height="icon.height || 48"
        :width="icon.width || 48"
      />
      <div
        v-else-if="typeof icon === 'string' && icon.includes(':')"
        class="icon"
      >
        <!-- iconify icon names are rendered by @vuepress/plugin-icon -->
        <component v-if="iconComponent" :is="iconComponent" :icon="icon" />
      </div>
      <div v-else-if="icon" class="icon" v-html="icon"></div>
      <h2 class="title"><bdi v-html="title" /></h2>
      <ul v-if="Array.isArray(details)" class="details">
        <li v-for="item in details" :key="item"><bdi v-html="item" /></li>
      </ul>
      <p v-else-if="details" class="details"><bdi v-html="details" /></p>
      <div v-if="linkText" class="link-text">
        <p class="link-text-value">
          <bdi>{{ linkText }}</bdi> <span
            class="vpi-arrow-right link-text-icon"
          />
        </p>
      </div>
    </article>
  </VPLink>
</template>

<style scoped>
.vp-feature {
  display: block;

  height: 100%;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 0.75rem;

  background-color: var(--vp-c-bg-soft);

  transition:
    border-color 0.25s,
    background-color 0.25s;
}

.vp-feature.link:hover {
  border-color: var(--vp-c-brand);
}

.box {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
}

.box > :deep(.vp-image) {
  margin-bottom: 1.25rem;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 3rem;
  height: 3rem;
  margin-bottom: 1.25rem;
  border-radius: 0.375rem;

  background-color: var(--vp-c-default-soft);

  font-size: 1.5rem;

  transition: background-color 0.25s;
}

.title {
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5;
}

.details {
  flex-grow: 1;

  padding-top: 0.5rem;

  color: var(--vp-c-text-mute);

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.7142857;
}

ul.details {
  padding-inline-start: 0.875rem;
  list-style-type: disc;
}

.link-text {
  padding-top: 0.5rem;
}

.link-text-value {
  display: flex;
  align-items: center;

  color: var(--vp-c-brand);

  font-weight: 500;
  font-size: 0.875rem;
}

.link-text-icon {
  margin-inline-start: 0.375rem;
}
</style>
