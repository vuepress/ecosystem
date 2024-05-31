<script setup lang="ts">
import VPPageMeta from '@theme/VPPageMeta.vue'
import VPPageNav from '@theme/VPPageNav.vue'

defineSlots<{
  'top'?: (props: Record<never, never>) => any
  'bottom'?: (props: Record<never, never>) => any
  'content-top'?: (props: Record<never, never>) => any
  'content-bottom'?: (props: Record<never, never>) => any
}>()
</script>

<template>
  <main class="vp-page">
    <slot name="top" />

    <div class="theme-default-content">
      <slot name="content-top" />

      <Content />

      <slot name="content-bottom" />
    </div>

    <VPPageMeta />

    <VPPageNav />

    <slot name="bottom" />
  </main>
</template>

<style lang="scss">
@use '../styles/mixins';

.vp-page {
  padding-bottom: 2rem;
  display: block;
  padding-top: var(--navbar-height);
  padding-left: var(--sidebar-width);

  .theme-default-content {
    @include mixins.content_wrapper;

    padding-top: 0;
  }
}
</style>
