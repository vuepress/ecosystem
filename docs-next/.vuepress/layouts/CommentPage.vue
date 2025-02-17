<script setup lang="ts">
import { useDarkmode } from '@vuepress/theme-classic/client'
import ParentLayout from '@vuepress/theme-classic/layouts/Layout.vue'

const isDarkmode = useDarkmode()
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
