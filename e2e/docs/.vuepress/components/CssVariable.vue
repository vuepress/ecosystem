<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const { name } = defineProps<{
  /** Variable name */
  name: string
}>()

const value = ref('')

onMounted(() => {
  value.value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim()
})
</script>

<template>
  <div :style="`border-color: var(--${name})`">
    {{ name }}: <span :id="name">{{ value }}</span>
  </div>
</template>
