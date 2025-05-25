<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const { name } = defineProps<{
  /** variable name */
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
  <div :id="name" :style="`border-color: var(--${name})`">{{ value }}</div>
</template>
