<script setup lang="ts">
import { ref } from 'vue'

const isRTL = ref(false)

const toggleRTL = (): void => {
  const { documentElement } = document

  if (isRTL.value) {
    documentElement.removeAttribute('dir')
    documentElement.style.removeProperty('direction')
  } else {
    documentElement.setAttribute('dir', 'rtl')
    documentElement.style.setProperty('direction', 'rtl')
  }

  isRTL.value = !isRTL.value
}
</script>

<template>
  <button type="button" class="toggle-rtl-button" @click="toggleRTL">
    <VPIcon :icon="`toggle-${isRTL ? 'right' : 'left'}`" size="2rem" />
  </button>
</template>

<style>
.toggle-rtl-button {
  border-width: 0;
  background: transparent;
  color: var(--vp-c-text);
  cursor: pointer;
}
</style>
