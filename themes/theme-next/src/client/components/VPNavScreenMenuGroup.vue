<script setup lang="ts">
import VPNavScreenMenuGroupLink from '@theme/VPNavScreenMenuGroupLink.vue'
import VPNavScreenMenuGroupSection from '@theme/VPNavScreenMenuGroupSection.vue'
import { computed, ref } from 'vue'

const props = defineProps<{
  text: string
  items: any[]
}>()

const isOpen = ref(false)

const groupId = computed(
  () => `NavScreenGroup-${props.text.replace(' ', '-').toLowerCase()}`,
)

const toggle = (): void => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="vp-nav-screen-menu-group" :class="{ open: isOpen }">
    <button
      class="button"
      :aria-controls="groupId"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <span class="button-text" v-html="text"></span>
      <span class="vpi-plus button-icon" />
    </button>

    <div :id="groupId" class="items">
      <template v-for="item in items" :key="item.text">
        <div v-if="'link' in item" :key="item.text" class="item">
          <VPNavScreenMenuGroupLink :item="item" />
        </div>

        <div v-else class="group">
          <VPNavScreenMenuGroupSection :text="item.text" :items="item.items" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.vp-nav-screen-menu-group {
  overflow: hidden;
  height: 48px;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: border-color 0.5s;
}

.vp-nav-screen-menu-group .items {
  visibility: hidden;
}

.vp-nav-screen-menu-group.open .items {
  visibility: visible;
}

.vp-nav-screen-menu-group.open {
  height: auto;
  padding-bottom: 10px;
}

.vp-nav-screen-menu-group.open .button {
  padding-bottom: 6px;
  color: var(--vp-c-brand-1);
}

.vp-nav-screen-menu-group.open .button-icon {
  /* rtl:ignore */
  transform: rotate(45deg);
}

.button {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 12px 4px 11px 0;

  color: var(--vp-c-text-1);

  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  transition: color 0.25s;
}

.button:hover {
  color: var(--vp-c-brand-1);
}

.button-icon {
  transition: transform 0.25s;
}

.group:first-child {
  padding-top: 0;
}

.group + .group,
.group + .item {
  padding-top: 4px;
}
</style>
