<script setup>
import { keys } from '@temp/blog/timeline.js'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { useRouter } from 'vue-router'
import ArticleList from '../components/ArticleList.vue'

const routes = useRouter().getRoutes()

const timelines = keys
  .map((key) => routes.find(({ name }) => name === key))
  .map(({ path, meta }) => ({ path, info: meta }))
</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <h1 class="timeline-title">Timeline</h1>
        <ArticleList :items="timelines" is-timeline />
      </main>
    </template>
  </ParentLayout>
</template>

<style lang="scss">
.timeline-title {
  padding: 0;
  text-align: center;
}
</style>
