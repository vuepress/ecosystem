<script lang="ts" setup>
import VPFlyout from '@theme/VPFlyout.vue'
import VPMenuLink from '@theme/VPMenuLink.vue'
import VPSocialLinks from '@theme/VPSocialLinks.vue'
import VPSwitchAppearance from '@theme/VPSwitchAppearance.vue'
import { computed } from 'vue'
import { useData } from '../composables/data.js'
import { useLangs } from '../composables/langs.js'

const { theme } = useData()
const { localeLinks, currentLang } = useLangs()

const hasExtraContent = computed(
  () =>
    (localeLinks.value.length && currentLang.value.label) ||
    theme.value.appearance ||
    theme.value.socialLinks,
)
</script>

<template>
  <VPFlyout
    v-if="hasExtraContent"
    class="vpNavBarExtra"
    label="extra navigation"
  >
    <div
      v-if="localeLinks.length && currentLang.label"
      class="group translations"
    >
      <p class="trans-title">{{ currentLang.label }}</p>

      <template v-for="locale in localeLinks" :key="locale.link">
        <VPMenuLink :item="locale" />
      </template>
    </div>

    <div
      v-if="theme.appearance && theme.appearance !== 'force-dark'"
      class="group"
    >
      <div class="item appearance">
        <p class="label">
          {{ theme.darkModeSwitchLabel || 'Appearance' }}
        </p>
        <div class="appearance-action">
          <VPSwitchAppearance />
        </div>
      </div>
    </div>

    <div v-if="theme.socialLinks" class="group">
      <div class="item social-links">
        <VPSocialLinks class="social-links-list" :links="theme.socialLinks" />
      </div>
    </div>
  </VPFlyout>
</template>

<style scoped>
.vpNavBarExtra {
  display: none;
  margin-right: -12px;
}

@media (min-width: 768px) {
  .vpNavBarExtra {
    display: block;
  }
}

@media (min-width: 1280px) {
  .vpNavBarExtra {
    display: none;
  }
}

.trans-title {
  padding: 0 24px 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.item.appearance,
.item.social-links {
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.item.appearance {
  min-width: 176px;
}

.appearance-action {
  margin-right: -2px;
}

.social-links-list {
  margin: -4px -8px;
}
</style>
