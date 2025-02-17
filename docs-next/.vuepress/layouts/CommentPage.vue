<script setup lang="ts">
import { useDarkMode } from '@vuepress/theme-default/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'

const isDarkmode = useDarkMode()
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <!-- eslint-disable-next-line vue/no-undef-components -->
      <CommentService class="vp-doc-comment" :darkmode="isDarkmode" />
    </template>
  </ParentLayout>
</template>

<style scoped>
.vp-doc-comment {
  margin-top: 64px;
}
</style>
