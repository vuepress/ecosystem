<script lang="ts" setup>
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

function toggle(): void {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="vpNavScreenMenuGroup" :class="{ open: isOpen }">
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
.vpNavScreenMenuGroup {
  border-bottom: 1px solid var(--vp-c-divider);
  height: 48px;
  overflow: hidden;
  transition: border-color 0.5s;
}

.vpNavScreenMenuGroup .items {
  visibility: hidden;
}

.vpNavScreenMenuGroup.open .items {
  visibility: visible;
}

.vpNavScreenMenuGroup.open {
  padding-bottom: 10px;
  height: auto;
}

.vpNavScreenMenuGroup.open .button {
  padding-bottom: 6px;
  color: var(--vp-c-brand-1);
}

.vpNavScreenMenuGroup.open .button-icon {
  /*rtl:ignore*/
  transform: rotate(45deg);
}

.button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 4px 11px 0;
  width: 100%;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.button:hover {
  color: var(--vp-c-brand-1);
}

.button-icon {
  transition: transform 0.25s;
}

.group:first-child {
  padding-top: 0px;
}

.group + .group,
.group + .item {
  padding-top: 4px;
}
</style>
