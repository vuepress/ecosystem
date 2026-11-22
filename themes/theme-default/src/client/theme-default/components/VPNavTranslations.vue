<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { computed, ref, useId } from 'vue'

import { useLangs } from '../composables/useLangs.js'
import { useNavOverflow } from '../composables/useNavOverflow.js'
import type { ThemeConfig } from '../shared.js'
import VPFlyout from './VPFlyout.vue'
import VPLink from './VPLink.vue'
import VPMenuLink from './VPMenuLink.vue'

const props = defineProps<{
  /** Accordion inside the nav screen */
  screen?: boolean
  /** Titled group inside the `⋯` menu */
  menu?: boolean
}>()

const theme = useThemeLocaleData<ThemeConfig>()
const { localeLinks, currentLang } = useLangs({
  linkToCorrespondingPage: true,
})

const show = computed(
  () => !!(localeLinks.value.length && currentLang.value.label),
)

// only the inline bar flyout participates in the overflow engine
const overflow = props.screen || props.menu ? null : useNavOverflow()

const isCollapsed = computed(() => !!overflow && !overflow.state.translations)

const isOpen = ref(false)
const listId = useId()

function toggle() {
  isOpen.value = !isOpen.value
}

const localeProps = (locale: (typeof localeLinks.value)[number]) => ({
  'lang': locale.lang,
  'hreflang': locale.lang,
  'rel': 'alternate',
  'dir': locale.dir,
  'data-allow-mismatch': 'attribute' as const,
})
</script>

<template>
  <!-- accordion inside the nav screen -->
  <div
    v-if="screen && show"
    class="vp-nav-translations vp-nav-screen-translations"
    :class="{ open: isOpen }"
  >
    <button
      type="button"
      class="title"
      :aria-expanded="isOpen"
      :aria-controls="listId"
      @click="toggle"
    >
      <span class="vpi-languages icon lang" aria-hidden="true" />
      {{ currentLang.label }}
      <span class="vpi-chevron-down icon chevron" aria-hidden="true" />
    </button>

    <ul v-show="isOpen" :id="listId" class="list">
      <li v-for="locale in localeLinks" :key="locale.link" class="item">
        <VPLink
          class="link"
          :href="locale.link"
          :external="false"
          v-bind="localeProps(locale)"
        >
          {{ locale.text }}
        </VPLink>
      </li>
    </ul>
  </div>

  <!-- titled group inside the `⋯` menu -->
  <div v-else-if="menu && show" class="vp-nav-translations group translations">
    <p class="title">{{ currentLang.label }}</p>

    <ul>
      <template v-for="locale in localeLinks" :key="locale.link">
        <VPMenuLink
          :item="locale"
          :external="false"
          v-bind="localeProps(locale)"
        />
      </template>
    </ul>
  </div>

  <!-- inline flyout in the navbar -->
  <VPFlyout
    v-else-if="!menu && show"
    class="vp-nav-translations vp-navbar-translations"
    :class="{ collapsed: isCollapsed }"
    icon="vpi-languages"
    :label="theme.langMenuLabel || 'Change language'"
    :ref="
      (inst: any) => overflow?.setClusterEl('translations', inst?.$el ?? null)
    "
  >
    <p class="title">{{ currentLang.label }}</p>

    <ul class="items">
      <template v-for="locale in localeLinks" :key="locale.link">
        <VPMenuLink
          :item="locale"
          :external="false"
          v-bind="localeProps(locale)"
        />
      </template>
    </ul>
  </VPFlyout>
</template>

<style scoped>
/* flyout variant */
.vp-navbar-translations {
  display: none;
}

@media (min-width: 48rem) {
  .vp-navbar-translations {
    display: flex;
    align-items: center;
  }
}

.vp-navbar-translations .title {
  padding-block: 0;
  padding-inline: 0.75rem 1.5rem;

  color: var(--vp-c-text);

  font-weight: 700;
  font-size: 0.875rem;
  line-height: 2.2857143;
}

/* menu-group variant (inside the `⋯` menu) — matches the menu group
   titles */
.group > .title {
  padding: 0 0.75rem;

  color: var(--vp-c-text-mute);

  font-weight: 600;
  font-size: 0.875rem;
  line-height: 2.2857143;
}

/* accordion variant (inside the nav screen) */
.vp-nav-screen-translations .title {
  display: flex;
  align-items: center;

  color: var(--vp-c-text);

  font-weight: 500;
  font-size: 0.875rem;
}

.vp-nav-screen-translations .icon {
  font-size: 1rem;
}

.vp-nav-screen-translations .icon.lang {
  margin-inline-end: 0.5rem;
}

.vp-nav-screen-translations .icon.chevron {
  margin-inline-start: 0.25rem;
  transition: transform 0.25s;
}

.vp-nav-screen-translations.open .icon.chevron {
  transform: rotate(-90deg);
}

.vp-nav-screen-translations .list {
  padding-block: 0.25rem 0;
  padding-inline: 1.5rem 0;
}

.vp-nav-screen-translations .link {
  color: var(--vp-c-text);
  font-size: 0.8125rem;
  line-height: 2.4615385;
}
</style>
