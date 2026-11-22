<script setup lang="ts">
import theme, { useDarkMode } from '@vuepress/theme-default/client'

const ParentLayout = theme.Layout
const isDarkMode = useDarkMode()
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <!-- oxlint-disable-next-line vue/no-undef-components -->
      <CommentService :darkmode="isDarkMode" />
    </template>
  </ParentLayout>
</template>
