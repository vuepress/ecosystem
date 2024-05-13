<script setup lang="ts">
import VPLink from '@theme/VPLink.vue'
import { ref } from 'vue'
import { useLangs } from '../composables/langs.js'

const { localeLinks, currentLang } = useLangs()
const isOpen = ref(false)

function toggle(): void {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div
    v-if="localeLinks.length && currentLang.label"
    class="vpNavScreenTranslations"
    :class="{ open: isOpen }"
  >
    <button class="title" @click="toggle">
      <span class="vpi-languages icon lang" />
      {{ currentLang.label }}
      <span class="vpi-chevron-down icon chevron" />
    </button>

    <ul class="list">
      <li v-for="locale in localeLinks" :key="locale.link" class="item">
        <VPLink class="link" :href="locale.link">{{ locale.text }}</VPLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.vpNavScreenTranslations {
  height: 24px;
  overflow: hidden;
}

.vpNavScreenTranslations.open {
  height: auto;
}

.title {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.icon {
  font-size: 16px;
}

.icon.lang {
  margin-right: 8px;
}

.icon.chevron {
  margin-left: 4px;
}

.list {
  padding: 4px 0 0 24px;
}

.link {
  line-height: 32px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}
</style>
