<script setup lang="ts">
import VPFlyout from '@theme/VPFlyout.vue'
import VPMenuLink from '@theme/VPMenuLink.vue'
import VPSocialLinks from '@theme/VPSocialLinks.vue'
import VPSwitchAppearance from '@theme/VPSwitchAppearance.vue'
import { useData } from '@theme/data'
import { useLangs } from '@theme/langs'
import { computed } from 'vue'

const { themeLocale } = useData()
const { localeLinks, currentLang } = useLangs()

const hasExtraContent = computed(
  () =>
    (localeLinks.value.length && currentLang.value.label) ||
    themeLocale.value.appearance ||
    themeLocale.value.socialLinks,
)
</script>

<template>
  <VPFlyout
    v-if="hasExtraContent"
    class="vp-navbar-extra"
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
      v-if="themeLocale.appearance && themeLocale.appearance !== 'force-dark'"
      class="group"
    >
      <div class="item appearance">
        <p class="label">
          {{ themeLocale.darkModeSwitchLabel || 'Appearance' }}
        </p>
        <div class="appearance-action">
          <VPSwitchAppearance />
        </div>
      </div>
    </div>

    <div v-if="themeLocale.socialLinks" class="group">
      <div class="item social-links">
        <VPSocialLinks
          class="social-links-list"
          :links="themeLocale.socialLinks"
        />
      </div>
    </div>
  </VPFlyout>
</template>

<style scoped>
.vp-navbar-extra {
  display: none;
  margin-right: -12px;
}

@media (min-width: 768px) {
  .vp-navbar-extra {
    display: block;
  }
}

@media (min-width: 1280px) {
  .vp-navbar-extra {
    display: none;
  }
}

.trans-title {
  padding: 0 24px 0 12px;

  color: var(--vp-c-text);

  font-weight: 700;
  font-size: 14px;
  line-height: 32px;
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
