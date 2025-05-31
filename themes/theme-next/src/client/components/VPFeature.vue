<script setup lang="ts">
import VPImage from '@theme/VPImage.vue'
import VPLink from '@theme/VPLink.vue'
import type { Feature } from '../../shared/index.js'

const { icon, title, details, link, rel, target, linkText } =
  defineProps<Feature>()
</script>

<template>
  <VPLink
    class="vp-feature"
    :href="link"
    :rel="rel"
    :target="target"
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
      <div v-else-if="icon" class="icon" v-html="icon"></div>
      <h2 class="title" v-html="title"></h2>
      <p v-if="details" class="details" v-html="details"></p>

      <div v-if="linkText" class="link-text">
        <p class="link-text-value">
          {{ linkText }} <span class="vpi-arrow-right link-text-icon" />
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
  border-radius: 12px;

  background-color: var(--vp-c-bg-soft);

  transition:
    border-color 0.25s,
    background-color 0.25s;
}

.vp-feature.link:hover {
  border-color: var(--vp-c-accent);
}

.box {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px;
}

.box > :deep(.vp-image) {
  margin-bottom: 20px;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;
  margin-bottom: 20px;
  border-radius: 6px;

  background-color: var(--vp-c-default-soft);

  font-size: 24px;

  transition: background-color 0.25s;
}

.title {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
}

.details {
  flex-grow: 1;

  padding-top: 8px;

  color: var(--vp-c-text-mute);

  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
}

.link-text {
  padding-top: 8px;
}

.link-text-value {
  display: flex;
  align-items: center;

  color: var(--vp-c-accent);

  font-weight: 500;
  font-size: 14px;
}

.link-text-icon {
  margin-left: 6px;
}
</style>
