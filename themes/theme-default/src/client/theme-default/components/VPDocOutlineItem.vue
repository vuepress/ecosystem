<script setup lang="ts">
import type { DefaultTheme } from '../shared.js'

defineProps<{
  headers: DefaultTheme.OutlineItem[]
  root?: boolean
}>()
</script>

<template>
  <ul class="vp-doc-outline-item" :class="root ? 'root' : 'nested'">
    <li v-for="{ children, link, title } in headers">
      <a class="outline-link" :href="link" :title>
        <bdi>{{ title }}</bdi>
      </a>
      <template v-if="children?.length">
        <VPDocOutlineItem :headers="children" />
      </template>
    </li>
  </ul>
</template>

<style scoped>
.root {
  position: relative;
  z-index: 1;
}

.nested {
  padding-inline: 1rem;
}

.outline-link {
  --vp-doc-aside-offset: calc(
    var(--vp-layout-top-height, 0px) + var(--vp-doc-top-height, 0px)
  );
  display: block;

  overflow: hidden;

  color: var(--vp-c-text-mute);

  font-weight: 400;
  font-size: 0.875rem;
  line-height: 2.2857143;
  text-overflow: ellipsis;
  white-space: nowrap;

  scroll-margin-top: calc(
    var(--vp-nav-height) + var(--vp-doc-aside-offset) + 2rem
  );
  scroll-margin-bottom: 3rem;

  transition: color 0.5s;
}

.outline-link:hover,
.outline-link.active {
  color: var(--vp-c-text);
  transition: color 0.25s;
}

.outline-link.nested {
  padding-inline-start: 0.8125rem;
}
</style>
