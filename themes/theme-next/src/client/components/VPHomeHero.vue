<script setup lang="ts">
import VPHero from '@theme/VPHero.vue'
import { usePageFrontmatter } from 'vuepress/client'
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js'
import type { Slot } from '../types.js'

defineSlots<{
  'home-hero-info-before'?: Slot
  'home-hero-info'?: Slot
  'home-hero-info-after'?: Slot
  'home-hero-actions-after'?: Slot
  'home-hero-image'?: Slot
}>()

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
</script>

<template>
  <VPHero
    v-if="frontmatter.hero"
    class="vp-home-hero"
    v-bind="frontmatter.hero"
    :actions="frontmatter.actions"
  >
    <template #home-hero-info-before>
      <slot name="home-hero-info-before" />
    </template>
    <template #home-hero-info>
      <slot name="home-hero-info" />
    </template>
    <template #home-hero-info-after>
      <slot name="home-hero-info-after" />
    </template>
    <template #home-hero-actions-after>
      <slot name="home-hero-actions-after" />
    </template>
    <template #home-hero-image>
      <slot name="home-hero-image" />
    </template>
  </VPHero>
</template>
