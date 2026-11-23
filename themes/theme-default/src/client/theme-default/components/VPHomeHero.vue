<script setup lang="ts">
import { useHomeHero } from '../../composables/useThemePageData.js'
import VPHero from './VPHero.vue'

const hero = useHomeHero()
</script>

<template>
  <VPHero
    v-if="hero"
    class="vp-home-hero"
    :name="hero.name"
    :text="hero.text"
    :tagline="hero.tagline"
    :image="hero.image"
    :actions="hero.actions"
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
    <template #home-hero-actions-before-actions
      ><slot name="home-hero-actions-before-actions"
    /></template>
    <template #home-hero-image><slot name="home-hero-image" /></template>
  </VPHero>
</template>
