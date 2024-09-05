<script setup lang="ts">
import VPButton from '@theme/VPButton.vue'
import VPImage from '@theme/VPImage.vue'
import { inject } from 'vue'
import type { DefaultThemeImage, HeroAction } from '../../shared/index.js'
import type { Slot } from '../types.js'

defineProps<{
  /**
   * Hero name
   */
  name?: string
  /**
   * Hero text
   */
  text?: string
  /**
   * Hero tagline
   */
  tagline?: string
  /**
   * Hero image
   */
  image?: DefaultThemeImage
  /**
   * Hero actions
   */
  actions?: HeroAction[]
}>()

defineSlots<{
  'home-hero-info-before'?: Slot
  'home-hero-info'?: Slot
  'home-hero-info-after'?: Slot
  'home-hero-actions-after'?: Slot
  'home-hero-image'?: Slot
}>()

const heroImageSlotExists = inject('hero-image-slot-exists')!
</script>

<template>
  <div class="vp-hero" :class="{ 'has-image': image || heroImageSlotExists }">
    <div class="container">
      <div class="main">
        <slot name="home-hero-info-before" />
        <slot name="home-hero-info">
          <h1 v-if="name" class="name">
            <span class="clip" v-html="name"></span>
          </h1>
          <p v-if="text" class="text" v-html="text"></p>
          <p v-if="tagline" class="tagline" v-html="tagline"></p>
        </slot>
        <slot name="home-hero-info-after" />

        <div v-if="actions" class="actions">
          <div v-for="action in actions" :key="action.link" class="action">
            <VPButton
              tag="a"
              size="medium"
              :theme="action.theme"
              :text="action.text"
              :href="action.link"
              :target="action.target"
              :rel="action.rel"
            />
          </div>
        </div>
        <slot name="home-hero-actions-after" />
      </div>

      <div v-if="image || heroImageSlotExists" class="image">
        <div class="image-container">
          <div class="image-bg" />
          <slot name="home-hero-image">
            <VPImage v-if="image" class="image-src" :image="image" />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vp-hero {
  margin-top: calc(
    (var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1
  );
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px)
    24px 48px;
}

@media (min-width: 640px) {
  .vp-hero {
    padding: calc(
        var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px
      )
      48px 64px;
  }
}

@media (min-width: 960px) {
  .vp-hero {
    padding: calc(
        var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px
      )
      64px 64px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  max-width: 1152px;
  margin: 0 auto;
}

@media (min-width: 960px) {
  .container {
    flex-direction: row;
  }
}

.main {
  position: relative;
  z-index: 10;

  flex-grow: 1;
  flex-shrink: 0;
  order: 2;
}

.vp-hero.has-image .container {
  text-align: center;
}

@media (min-width: 960px) {
  .vp-hero.has-image .container {
    text-align: left;
  }
}

@media (min-width: 960px) {
  .main {
    order: 1;
    width: calc((100% / 3) * 2);
  }

  .vp-hero.has-image .main {
    max-width: 592px;
  }
}

.name,
.text {
  max-width: 392px;

  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: -0.4px;
  white-space: pre-wrap;
}

.vp-hero.has-image .name,
.vp-hero.has-image .text {
  margin: 0 auto;
}

.name {
  color: var(--vp-home-hero-name-color);
}

.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}

@media (min-width: 640px) {
  /* stylelint-disable-next-line rule-empty-line-before */
  .name,
  .text {
    max-width: 576px;
    font-size: 48px;
    line-height: 56px;
  }
}

@media (min-width: 960px) {
  /* stylelint-disable-next-line rule-empty-line-before */
  .name,
  .text {
    font-size: 56px;
    line-height: 64px;
  }

  .vp-hero.has-image .name,
  .vp-hero.has-image .text {
    margin: 0;
  }
}

.tagline {
  max-width: 392px;
  padding-top: 8px;

  color: var(--vp-c-text-mute);

  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  white-space: pre-wrap;
}

.vp-hero.has-image .tagline {
  margin: 0 auto;
}

@media (min-width: 640px) {
  .tagline {
    max-width: 576px;
    padding-top: 12px;
    font-size: 20px;
    line-height: 32px;
  }
}

@media (min-width: 960px) {
  .tagline {
    font-size: 24px;
    line-height: 36px;
  }

  .vp-hero.has-image .tagline {
    margin: 0;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  margin: -6px;
  padding-top: 24px;
}

.vp-hero.has-image .actions {
  justify-content: center;
}

@media (min-width: 640px) {
  .actions {
    padding-top: 32px;
  }
}

@media (min-width: 960px) {
  .vp-hero.has-image .actions {
    justify-content: flex-start;
  }
}

.action {
  flex-shrink: 0;
  padding: 6px;
}

.image {
  order: 1;
  margin: -76px -24px -48px;
}

@media (min-width: 640px) {
  .image {
    margin: -108px -24px -48px;
  }
}

@media (min-width: 960px) {
  .image {
    flex-grow: 1;
    order: 2;
    min-height: 100%;
    margin: 0;
  }
}

.image-container {
  position: relative;
  width: 320px;
  height: 320px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .image-container {
    width: 392px;
    height: 392px;
  }
}

@media (min-width: 960px) {
  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    /* rtl:ignore */
    transform: translate(-32px, -32px);
  }
}

.image-bg {
  position: absolute;
  top: 50%;

  /* rtl:ignore */
  left: 50%;

  width: 192px;
  height: 192px;
  border-radius: 50%;

  background-image: var(--vp-home-hero-image-background-image);

  filter: var(--vp-home-hero-image-filter);

  /* rtl:ignore */
  transform: translate(-50%, -50%);
}

@media (min-width: 640px) {
  .image-bg {
    width: 256px;
    height: 256px;
  }
}

@media (min-width: 960px) {
  .image-bg {
    width: 320px;
    height: 320px;
  }
}

:deep(.image-src) {
  position: absolute;
  top: 50%;

  /* rtl:ignore */
  left: 50%;

  max-width: 192px;
  max-height: 192px;

  /* rtl:ignore */
  transform: translate(-50%, -50%);
}

@media (min-width: 640px) {
  :deep(.image-src) {
    max-width: 256px;
    max-height: 256px;
  }
}

@media (min-width: 960px) {
  :deep(.image-src) {
    max-width: 320px;
    max-height: 320px;
  }
}
</style>
