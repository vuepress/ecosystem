<script setup lang="ts">
import VPNavbarBrand from '@theme/VPNavbarBrand.vue'
import VPNavbarItems from '@theme/VPNavbarItems.vue'
import VPToggleColorModeButton from '@theme/VPToggleColorModeButton.vue'
import VPToggleSidebarButton from '@theme/VPToggleSidebarButton.vue'
import { computed, ref } from 'vue'
import {
  DeviceType,
  useThemeLocaleData,
  useUpdateDeviceStatus,
} from '../composables/index.js'

defineEmits<(e: 'toggle-sidebar') => void>()

defineSlots<{
  before?: (props: Record<never, never>) => any
  after?: (props: Record<never, never>) => any
}>()

const themeLocale = useThemeLocaleData()

const navbar = ref<HTMLElement | null>(null)
const navbarBrand = ref<HTMLElement | null>(null)

const linksWrapperMaxWidth = ref(0)
const linksWrapperStyle = computed(() => {
  if (!linksWrapperMaxWidth.value) {
    return {}
  }
  return {
    maxWidth: linksWrapperMaxWidth.value + 'px',
  }
})

const getCssValue = (el: HTMLElement | null, property: string): number => {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const val = el?.ownerDocument?.defaultView?.getComputedStyle(el, null)?.[
    property
  ]
  const num = Number.parseInt(val, 10)

  return Number.isNaN(num) ? 0 : num
}

useUpdateDeviceStatus(
  DeviceType.MOBILE,
  (mobileDesktopBreakpoint: number): void => {
    // avoid overlapping of long title and long navbar links
    const navbarHorizontalPadding =
      getCssValue(navbar.value, 'paddingLeft') +
      getCssValue(navbar.value, 'paddingRight')
    if (window.innerWidth < mobileDesktopBreakpoint) {
      linksWrapperMaxWidth.value = 0
    } else {
      linksWrapperMaxWidth.value =
        navbar.value!.offsetWidth -
        navbarHorizontalPadding -
        (navbarBrand.value?.offsetWidth || 0)
    }
  },
)
</script>

<template>
  <header ref="navbar" class="vp-navbar">
    <VPToggleSidebarButton @toggle="$emit('toggle-sidebar')" />

    <span ref="navbarBrand">
      <VPNavbarBrand />
    </span>

    <div class="vp-navbar-items-wrapper" :style="linksWrapperStyle">
      <slot name="before" />
      <VPNavbarItems class="vp-hide-mobile" />
      <slot name="after" />
      <VPToggleColorModeButton v-if="themeLocale.colorModeSwitch" />
      <VPSearch />
    </div>
  </header>
</template>

<style lang="scss">
@import '../styles/variables';

.vp-navbar {
  --navbar-line-height: calc(
    var(--navbar-height) - 2 * var(--navbar-padding-v)
  );

  padding: var(--navbar-padding-v) var(--navbar-padding-h);
  line-height: var(--navbar-line-height);

  @media screen and (max-width: $MQMobile) {
    padding-left: 4rem;
  }
}

.vp-navbar-items-wrapper {
  display: flex;
  position: absolute;
  box-sizing: border-box;
  top: var(--navbar-padding-v);
  right: var(--navbar-padding-h);
  height: var(--navbar-line-height);
  padding-left: var(--navbar-padding-h);
  white-space: nowrap;
  font-size: 0.9rem;
}
</style>
