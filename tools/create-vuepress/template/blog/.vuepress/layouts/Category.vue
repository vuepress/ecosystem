<script setup>
import { map } from '@temp/blog/category.js'
import { usePageFrontmatter } from '@vuepress/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import ArticleList from '../components/ArticleList.vue'

const routes = useRouter().getRoutes()
const frontmatter = usePageFrontmatter()

const categories = Object.entries(map).map(([name, { path, keys }]) => ({
  name,
  path,
  keys,
}))

const currentCategory = computed(() => frontmatter.value.key)

const items = computed(() =>
  currentCategory.value
    ? map[currentCategory.value].keys
        .map((key) => routes.find(({ name }) => name === key))
        .map(({ path, meta }) => ({ path, info: meta }))
    : [],
)
</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="category-wrapper">
          <RouterLink
            v-for="{ name, path, keys } in categories"
            :key="name"
            :to="path"
            class="category"
          >
            {{ name }}
            <span class="category-num">
              {{ keys.length }}
            </span>
          </RouterLink>
        </div>
        <ArticleList :items="items" />
      </main>
    </template>
  </ParentLayout>
</template>

<style lang="scss">
@use '@vuepress/theme-default/styles/mixins';

.category-wrapper {
  @include mixins.content_wrapper;

  padding-top: 1rem !important;
  padding-bottom: 0 !important;

  font-size: 14px;

  a {
    color: inherit;
  }

  .category {
    display: inline-block;
    vertical-align: middle;

    overflow: hidden;

    margin: 0.3rem 0.6rem 0.8rem;
    padding: 0.4rem 0.8rem;
    border-radius: 0.25rem;

    cursor: pointer;

    transition:
      background 0.3s,
      color 0.3s;

    @media (max-width: 419px) {
      font-size: 0.9rem;
    }

    .category-num {
      display: inline-block;

      min-width: 1rem;
      height: 1.2rem;
      margin-inline-start: 0.2em;
      padding: 0 0.1rem;
      border-radius: 0.6rem;

      font-size: 0.7rem;
      line-height: 1.2rem;
      text-align: center;
    }

    &.router-link-active {
      background: var(--c-brand);
      color: var(--c-bg);

      .category-num {
        color: var(--c-bg);
      }
    }
  }
}
</style>
