<script setup lang="ts">
import { computed, inject } from 'vue'

import { layoutInfoInjectionKey } from '../composables/useLayout.js'
import type { ThemeableImage } from '../shared.js'
import VPButton from './VPButton.vue'
import VPImage from './VPImage.vue'

export interface HeroAction {
  theme?: 'brand' | 'alt'
  text: string
  link: string
  target?: string
  rel?: string
}

defineProps<{
  name?: string
  text?: string
  tagline?: string
  image?: ThemeableImage
  actions?: HeroAction[]
}>()

const { heroImageSlotExists } = inject(layoutInfoInjectionKey, {
  heroImageSlotExists: computed(() => false),
})
</script>

<template>
  <div class="vp-hero" :class="{ 'has-image': image || heroImageSlotExists }">
    <div class="container">
      <div class="main">
        <slot name="home-hero-info-before" />
        <slot name="home-hero-info">
          <h1 class="heading">
            <span v-if="name" dir="auto" v-html="name" class="name clip"></span>
            <span v-if="text" dir="auto" v-html="text" class="text"></span>
          </h1>
          <p v-if="tagline" class="tagline"><bdi v-html="tagline" /></p>
        </slot>
        <slot name="home-hero-info-after" />

        <div v-if="actions" class="actions">
          <slot name="home-hero-actions-before-actions" />
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
            <VPImage v-if="image" class="image-src" :image />
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
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 3rem)
    1.5rem 3rem;
}

@media (min-width: 40rem) {
  .vp-hero {
    padding: calc(
        var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 5rem
      )
      3rem 4rem;
  }
}

@media (min-width: 60rem) {
  .vp-hero {
    padding: calc(
        var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 5rem
      )
      4rem 4rem;
  }
}

.container {
  display: flex;
  flex-direction: column;
  max-width: 72rem;
  margin: 0 auto;
}

@media (min-width: 60rem) {
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

@media (min-width: 60rem) {
  .vp-hero.has-image .container {
    text-align: start;
  }
}

@media (min-width: 60rem) {
  .main {
    order: 1;
    width: calc((100% / 3) * 2);
  }

  .vp-hero.has-image .main {
    max-width: 37rem;
  }
}

.heading {
  display: flex;
  flex-direction: column;
}

.name,
.text {
  width: fit-content;
  max-width: 24.5rem;

  font-weight: 700;
  font-size: 2rem;
  line-height: 1.25;
  letter-spacing: -0.025rem;
  white-space: pre-wrap;

  &:lang(ja) {
    font-feature-settings: 'palt';
    word-break: auto-phrase;
  }
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
  background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}

@media (min-width: 40rem) {
  .name,
  .text {
    max-width: 36rem;
    font-size: 3rem;
    line-height: 1.1666667;
  }
}

@media (min-width: 60rem) {
  .name,
  .text {
    font-size: 3.5rem;
    line-height: 1.1428571;
  }

  .vp-hero.has-image .name,
  .vp-hero.has-image .text {
    margin: 0;
  }
}

.tagline {
  max-width: 24.5rem;
  padding-top: 0.5rem;

  color: var(--vp-c-text-mute);

  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.5555556;
  white-space: pre-wrap;
}

.vp-hero.has-image .tagline {
  margin: 0 auto;
}

@media (min-width: 40rem) {
  .tagline {
    max-width: 36rem;
    padding-top: 0.75rem;
    font-size: 1.25rem;
    line-height: 1.6;
  }
}

@media (min-width: 60rem) {
  .tagline {
    font-size: 1.5rem;
    line-height: 1.5;
  }

  .vp-hero.has-image .tagline {
    margin: 0;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  margin: -0.375rem;
  padding-top: 1.5rem;
}

.vp-hero.has-image .actions {
  justify-content: center;
}

@media (min-width: 40rem) {
  .actions {
    padding-top: 2rem;
  }
}

@media (min-width: 60rem) {
  .vp-hero.has-image .actions {
    justify-content: flex-start;
  }
}

.action {
  flex-shrink: 0;
  padding: 0.375rem;
}

.image {
  order: 1;
  margin: -4.75rem -1.5rem -3rem;
}

@media (min-width: 40rem) {
  .image {
    margin: -6.75rem -1.5rem -3rem;
  }
}

@media (min-width: 60rem) {
  .image {
    flex-grow: 1;
    order: 2;
    min-height: 100%;
    margin: 0;
  }
}

.image-container {
  position: relative;
  width: 20rem;
  height: 20rem;
  margin: 0 auto;
}

@media (min-width: 40rem) {
  .image-container {
    width: 24.5rem;
    height: 24.5rem;
  }
}

@media (min-width: 60rem) {
  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    transform: translate(calc(-2rem * var(--vp-direction-multiplier)), -2rem);
  }
}

.image-bg {
  position: absolute;
  top: 50%;
  left: 50%;

  width: 12rem;
  height: 12rem;
  border-radius: 50%;

  background-image: var(--vp-home-hero-image-background-image);

  filter: var(--vp-home-hero-image-filter);
  will-change: filter;

  transform: translate(-50%, -50%);
}

@media (min-width: 40rem) {
  .image-bg {
    width: 16rem;
    height: 16rem;
  }
}

@media (min-width: 60rem) {
  .image-bg {
    width: 20rem;
    height: 20rem;
  }
}

:deep(.image-src) {
  position: absolute;
  top: 50%;
  left: 50%;

  object-fit: contain;

  width: 100%;
  max-width: 12rem;
  height: 100%;
  max-height: 12rem;

  transform: translate(-50%, -50%);
}

@media (min-width: 40rem) {
  :deep(.image-src) {
    max-width: 16rem;
    max-height: 16rem;
  }
}

@media (min-width: 60rem) {
  :deep(.image-src) {
    max-width: 20rem;
    max-height: 20rem;
  }
}
</style>
