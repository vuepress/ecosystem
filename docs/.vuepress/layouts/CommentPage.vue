<script setup lang="ts">
import { useDarkMode } from '@vuepress/theme-default/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'

const isDarkMode = useDarkMode()
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <!-- eslint-disable-next-line vue/no-undef-components -->
      <CommentService :darkmode="isDarkMode" />
    </template>
  </ParentLayout>
</template>
