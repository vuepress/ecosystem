<script setup>
import { keys } from '@temp/blog/article.js'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { useRouter } from 'vue-router'
import ArticleList from '../components/ArticleList.vue'

const routes = useRouter().getRoutes()

const articles = keys
  .map((key) => routes.find(({ name }) => name === key))
  .map(({ path, meta }) => ({ path, info: meta }))
</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <ArticleList :items="articles" />
      </main>
    </template>
  </ParentLayout>
</template>
