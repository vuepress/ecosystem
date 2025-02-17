<script setup lang="ts">
import { useDarkmode } from '@vuepress/theme-default/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'

const isDarkmode = useDarkmode()
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <!-- eslint-disable-next-line vue/no-undef-components -->
      <CommentService :darkmode="isDarkmode" />
    </template>
  </ParentLayout>
</template>
