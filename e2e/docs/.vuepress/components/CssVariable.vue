<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const props = defineProps<{
  /** variable name */
  name: string
}>()

const value = ref('')

onMounted(() => {
  value.value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${props.name}`)
    .trim()
})
</script>

<template>
  <div :id="name" :style="`border-color: var(--${name})`">{{ value }}</div>
</template>
