<script setup lang="ts">
import VPFooter from '@theme/VPFooter.vue'
import VPNav from '@theme/VPNav.vue'
import VPSkipLink from '@theme/VPSkipLink.vue'
import { useRouteLocale, withBase } from 'vuepress/client'
import { useThemeLocaleData } from '../composables/index.js'

const root = useRouteLocale()
const theme = useThemeLocaleData()
</script>

<template>
  <div class="Layout">
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

    <div id="VPContent" class="vpContent">
      <slot name="not-found">
        <div class="notFound">
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
.Layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.vpContent {
  flex-grow: 1;
  flex-shrink: 0;
  margin: var(--vp-layout-top-height, 0px) auto 0;
  width: 100%;
}

@media (min-width: 960px) {
  .vpContent {
    padding-top: var(--vp-nav-height);
  }
}

.notFound {
  padding: 64px 24px 96px;
  text-align: center;
}

@media (min-width: 768px) {
  .notFound {
    padding: 96px 32px 168px;
  }
}

.code {
  line-height: 64px;
  font-size: 64px;
  font-weight: 600;
}

.title {
  padding-top: 12px;
  letter-spacing: 2px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}

.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin: 0 auto;
  max-width: 256px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.action {
  padding-top: 20px;
}

.link {
  display: inline-block;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 16px;
  padding: 3px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition:
    border-color 0.25s,
    color 0.25s;
}

.link:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-2);
}
</style>
