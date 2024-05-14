<script setup lang="ts">
import { Layout, useDarkMode } from '@vuepress/theme-default/client'

const isDarkMode = useDarkMode()
</script>

<template>
  <Layout>
    <template #doc-after>
      <!-- eslint-disable-next-line vue/no-undef-components -->
      <CommentService class="vp-doc-comment" :darkmode="isDarkMode" />
    </template>
  </Layout>
</template>

<style scoped>
.vp-doc-comment {
  margin-top: 64px;
}
</style>
