<script setup lang="ts">
defineOptions({
  name: 'CodeGroupItem',
})

defineProps<{
  title: string
  active?: boolean
}>()
</script>

<template>
  <div
    class="code-group-item"
    :class="{ 'code-group-item__active': active }"
    role="tabpanel"
  >
    <slot />
  </div>
</template>
