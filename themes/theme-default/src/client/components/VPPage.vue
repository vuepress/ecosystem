<script setup lang="ts">
import VPPageMeta from '@theme/VPPageMeta.vue'
import VPPageNav from '@theme/VPPageNav.vue'
import type { Slot } from '@vuepress/helper/client'
import { Content } from 'vuepress/client'

defineSlots<{
  'top'?: Slot
  'bottom'?: Slot
  'content-top'?: Slot
  'content-bottom'?: Slot
}>()
</script>

<template>
  <main class="vp-page">
    <slot name="top" />

    <div vp-content>
      <slot name="content-top" />

      <Content id="content" />

      <slot name="content-bottom" />
    </div>

    <VPPageMeta />

    <VPPageNav />

    <slot name="bottom" />
  </main>
</template>

<style lang="scss">
@use '../styles/mixins';
@use '../styles/variables' as *;

.vp-page {
  display: block;

  // leave space for navbar
  padding-top: var(--navbar-height);
  padding-bottom: 2rem;

  // leave space for sidebar
  padding-inline-start: var(--sidebar-width);

  // narrow desktop / iPad
  @media (max-width: $MQNarrow) {
    // leave space for sidebar
    padding-inline-start: var(--sidebar-width-mobile);
  }

  // wide mobile
  @media (max-width: $MQMobile) {
    // sidebar is collapsed
    padding-inline-start: 0;
  }

  [vp-content] {
    @include mixins.content-wrapper;

    & {
      padding-top: 0;
    }
  }
}
</style>
