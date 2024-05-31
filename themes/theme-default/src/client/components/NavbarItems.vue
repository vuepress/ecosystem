<script setup lang="ts">
import NavbarDropdown from '@theme/NavbarDropdown.vue'
import { computed, ref } from 'vue'
import { AutoLink } from 'vuepress/client'
import {
  DeviceType,
  useNavbarConfig,
  useNavbarRepo,
  useNavbarSelectLanguage,
  useThemeLocaleData,
  useUpdateDeviceStatus,
} from '../composables/index.js'

const navbarConfig = useNavbarConfig()
const navbarSelectLanguage = useNavbarSelectLanguage()
const navbarRepo = useNavbarRepo()

const isMobile = ref(false)

const navbarLabel = computed(() => {
  const themeLocale = useThemeLocaleData()
  return themeLocale.value.navbarLabel ?? 'site navigation'
})

const navbarLinks = computed(() => [
  ...navbarConfig.value,
  ...navbarSelectLanguage.value,
  ...navbarRepo.value,
])

useUpdateDeviceStatus(
  DeviceType.MOBILE,
  (mobileDesktopBreakpoint: number): void => {
    // avoid overlapping of long title and long navbar links
    isMobile.value = window.innerWidth < mobileDesktopBreakpoint
  },
)
</script>

<template>
  <nav v-if="navbarLinks.length" class="navbar-items" :aria-label="navbarLabel">
    <div v-for="item in navbarLinks" :key="item.text" class="navbar-item">
      <NavbarDropdown
        v-if="'children' in item"
        :class="{ mobile: isMobile }"
        :item="item"
      />
      <AutoLink v-else :config="item" />
    </div>
  </nav>
</template>
