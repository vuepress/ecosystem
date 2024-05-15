<script setup lang="ts">
import { computed } from 'vue'
import { usePageFrontmatter } from 'vuepress/client'
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js'

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
const footer = computed(() => frontmatter.value.footer)
const footerHtml = computed(() => frontmatter.value.footerHtml)
</script>

<template>
  <template v-if="footer">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="footerHtml" id="vp-footer" class="footer" v-html="footer" />
    <div v-else id="vp-footer" class="footer" v-text="footer" />
  </template>
</template>
