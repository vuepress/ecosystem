<script setup lang="ts">
import VPNavbarItems from '@theme/VPNavbarItems.vue'
import VPSidebarItems from '@theme/VPSidebarItems.vue'

defineSlots<{
  top?: (props: Record<never, never>) => any
  bottom?: (props: Record<never, never>) => any
}>()
</script>

<template>
  <aside class="vp-sidebar">
    <VPNavbarItems />
    <slot name="top" />
    <VPSidebarItems />
    <slot name="bottom" />
  </aside>
</template>

<style lang="scss">
@import '../styles/variables';

.vp-sidebar {
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  a {
    display: inline-block;
  }

  // override styles
  .vp-navbar-items {
    display: none;
    border-bottom: 1px solid var(--c-border);
    transition: border-color var(--t-color);
    padding: 0.5rem 0 0.75rem 0;

    @media (max-width: $MQMobile) {
      display: block;

      .vp-navbar-dropdown-item a.route-link-active::after {
        top: calc(1rem - 2px);
      }
    }

    a {
      font-weight: 600;
    }
  }

  // override styles
  .vp-navbar-item {
    display: block;
    line-height: 1.25rem;
    font-size: 1.1em;
    padding: 0.5rem 0 0.5rem 1.5rem;
  }
}
</style>
