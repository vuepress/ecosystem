<script setup lang="ts">
import VPHero from '@theme/VPHero.vue'
import { usePageFrontmatter } from 'vuepress/client'
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js'

const fm = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
</script>

<template>
  <VPHero
    v-if="fm.hero"
    class="vpHomeHero"
    :name="fm.hero.name"
    :text="fm.hero.text"
    :tagline="fm.hero.tagline"
    :image="fm.hero.image"
    :actions="fm.actions"
  >
    <template #home-hero-info-before
      ><slot name="home-hero-info-before"
    /></template>
    <template #home-hero-info><slot name="home-hero-info" /></template>
    <template #home-hero-info-after
      ><slot name="home-hero-info-after"
    /></template>
    <template #home-hero-actions-after
      ><slot name="home-hero-actions-after"
    /></template>
    <template #home-hero-image><slot name="home-hero-image" /></template>
  </VPHero>
</template>
