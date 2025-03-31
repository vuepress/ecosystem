<script setup>
import { docsearch } from 'meilisearch-docsearch'
import { onMounted } from 'vue'
import { pluginOptions } from './define'
import 'meilisearch-docsearch/css'

onMounted(() => {
  docsearch({
    container: '#docsearch',
    ...pluginOptions,
  })
})
</script>

<template>
  <div id="docsearch"></div>
</template>
