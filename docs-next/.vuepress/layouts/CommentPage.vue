<script setup lang="ts">
import { Layout, useDarkMode } from '@vuepress/theme-default/client'

const isDarkMode = useDarkMode()
</script>

<template>
  <Layout>
    <template #doc-bottom>
      <!-- eslint-disable-next-line vue/no-undef-components -->
      <CommentService :darkmode="isDarkMode" />
    </template>
  </Layout>
</template>
