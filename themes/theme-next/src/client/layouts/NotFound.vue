<script setup lang="ts">
import VPFooter from '@theme/VPFooter.vue'
import VPNav from '@theme/VPNav.vue'
import VPSkipLink from '@theme/VPSkipLink.vue'
import { useRouteLocale, withBase } from 'vuepress/client'
import { useThemeLocaleData } from '../composables/index.js'
import type { Slot } from '../types.js'

defineSlots<{
  'layout-top'?: Slot
  'layout-bottom'?: Slot
  'not-found'?: Slot
  'nav-bar-title-before'?: Slot
  'nav-bar-title-after'?: Slot
  'nav-bar-content-before'?: Slot
  'nav-bar-content-after'?: Slot
  'nav-screen-content-before'?: Slot
  'nav-screen-content-after'?: Slot
}>()

const root = useRouteLocale()
const theme = useThemeLocaleData()
</script>

<template>
  <div class="vp-layout">
    <slot name="layout-top" />
    <VPSkipLink />

    <VPNav>
      <template #nav-bar-title-before>
        <slot name="nav-bar-title-before" />
      </template>
      <template #nav-bar-title-after>
        <slot name="nav-bar-title-after" />
      </template>
      <template #nav-bar-content-before>
        <slot name="nav-bar-content-before" />
      </template>
      <template #nav-bar-content-after>
        <slot name="nav-bar-content-after" />
      </template>
      <template #nav-screen-content-before>
        <slot name="nav-screen-content-before" />
      </template>
      <template #nav-screen-content-after>
        <slot name="nav-screen-content-after" />
      </template>
    </VPNav>

    <div id="VPContent" class="vp-content">
      <slot name="not-found">
        <div class="vp-not-found">
          <p class="code">{{ theme.notFound?.code ?? '404' }}</p>
          <h1 class="title">{{ theme.notFound?.title ?? 'PAGE NOT FOUND' }}</h1>
          <div class="divider" />
          <blockquote class="quote">
            {{
              theme.notFound?.quote ??
              "But if you don't change your direction, and if you keep looking, you may end up where you are heading."
            }}
          </blockquote>

          <div class="action">
            <a
              class="link"
              :href="withBase(root)"
              :aria-label="theme.notFound?.linkLabel ?? 'go to home'"
            >
              {{ theme.notFound?.linkText ?? 'Take me home' }}
            </a>
          </div>
        </div>
      </slot>
    </div>
    <VPFooter />
    <slot name="layout-bottom" />
  </div>
</template>

<style scoped>
.vp-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.vp-content {
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
  margin: var(--vp-layout-top-height, 0) auto 0;
}

@media (min-width: 960px) {
  .vp-content {
    padding-top: var(--vp-nav-height);
  }
}

.vp-not-found {
  padding: 64px 24px 96px;
  text-align: center;
}

@media (min-width: 768px) {
  .vp-not-found {
    padding: 96px 32px 168px;
  }
}

.code {
  font-weight: 600;
  font-size: 64px;
  line-height: 64px;
}

.title {
  padding-top: 12px;

  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 2px;
}

.divider {
  width: 64px;
  height: 1px;
  margin: 24px auto 18px;
  background-color: var(--vp-c-divider);
}

.quote {
  max-width: 256px;
  margin: 0 auto;

  color: var(--vp-c-text-2);

  font-weight: 500;
  font-size: 14px;
}

.action {
  padding-top: 20px;
}

.link {
  display: inline-block;

  padding: 3px 16px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 16px;

  color: var(--vp-c-brand-1);

  font-weight: 500;
  font-size: 14px;

  transition:
    border-color 0.25s,
    color 0.25s;
}

.link:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-2);
}
</style>
