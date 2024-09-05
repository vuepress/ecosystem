<script setup lang="ts">
import VPFlyout from '@theme/VPFlyout.vue'
import VPMenuLink from '@theme/VPMenuLink.vue'
import { useData } from '../composables/data.js'
import { useLangs } from '../composables/langs.js'

const { theme } = useData()
const { localeLinks, currentLang } = useLangs()
</script>

<template>
  <VPFlyout
    v-if="localeLinks.length && currentLang.label"
    class="vp-navbar-translations"
    icon="vpi-languages"
    :label="theme.selectLanguageText || 'Change language'"
  >
    <div class="items">
      <p class="title">{{ currentLang.label }}</p>

      <template v-for="locale in localeLinks" :key="locale.link">
        <VPMenuLink :item="locale" />
      </template>
    </div>
  </VPFlyout>
</template>

<style scoped>
.vp-navbar-translations {
  display: none;
}

@media (min-width: 1280px) {
  .vp-navbar-translations {
    display: flex;
    align-items: center;
  }
}

.title {
  padding: 0 24px 0 12px;

  color: var(--vp-c-text);

  font-weight: 700;
  font-size: 14px;
  line-height: 32px;
}

.vp-navbar-translations :deep(.button) {
  padding: 12px;
}
</style>
