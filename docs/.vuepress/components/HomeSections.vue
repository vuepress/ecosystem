<script lang="ts" setup>
import { computed } from 'vue'
import { RouteLink, useLang } from 'vuepress/client'

interface HomeCard {
  title: string
  details: string
  link: string
  icon: string
}

const lang = useLang()
const isZh = computed(() => lang.value.startsWith('zh'))

const themes = computed<HomeCard[]>(() => [
  {
    title: isZh.value ? '默认主题' : 'Default Theme',
    details: isZh.value
      ? '从 VitePress 默认主题移植的薄布局层，功能由生态插件提供。'
      : 'A thin layout layer ported from the VitePress default theme, powered by the ecosystem plugins.',
    link: '/themes/default/',
    icon: 'lucide:palette',
  },
  {
    title: isZh.value ? '经典主题' : 'Classic Theme',
    details: isZh.value
      ? '经典 VuePress 主题，适合依赖其配置项与样式的现有站点。'
      : 'The classic VuePress theme, kept for existing sites that rely on its options and styles.',
    link: '/themes/classic/',
    icon: 'lucide:gem',
  },
])

const categories = computed<HomeCard[]>(() => [
  {
    title: 'AI',
    details: isZh.value
      ? '为 LLM 爬虫生成 llms.txt。'
      : 'Generate llms.txt for LLM crawlers.',
    link: '/plugins/ai/',
    icon: 'lucide:bot',
  },
  {
    title: isZh.value ? '分析' : 'Analytics',
    details: isZh.value
      ? '接入 Google Analytics、百度统计、Umami 与 Clarity。'
      : 'Google Analytics, Baidu, Umami and Clarity statistics.',
    link: '/plugins/analytics/',
    icon: 'lucide:chart-no-axes-combined',
  },
  {
    title: isZh.value ? '博客' : 'Blog',
    details: isZh.value
      ? '博客集合、订阅与评论。'
      : 'Blog collections, feeds and comments.',
    link: '/plugins/blog/',
    icon: 'lucide:newspaper',
  },
  {
    title: isZh.value ? '开发' : 'Development',
    details: isZh.value
      ? '当前标题高亮、git 信息、Sass 调色板、目录等。'
      : 'Active header links, git data, Sass palette, TOC and more.',
    link: '/plugins/development/',
    icon: 'lucide:server-cog',
  },
  {
    title: isZh.value ? '功能' : 'Features',
    details: isZh.value
      ? '图标、代码复制、图片缩放、公告、水印等。'
      : 'Icon, copy code, medium zoom, notice, watermark and more.',
    link: '/plugins/features/',
    icon: 'lucide:sparkles',
  },
  {
    title: 'Markdown',
    details: isZh.value
      ? '用标签页、提示容器、数学公式、图表扩展 Markdown。'
      : 'Extend Markdown with tabs, hint containers, math, charts and more.',
    link: '/plugins/markdown/',
    icon: 'octicon:markdown-16',
  },
  {
    title: 'PWA',
    details: isZh.value
      ? '渐进式 Web 应用与离线支持。'
      : 'Progressive web app and offline support.',
    link: '/plugins/pwa/',
    icon: 'lucide:layout-grid',
  },
  {
    title: isZh.value ? '搜索' : 'Search',
    details: isZh.value
      ? '本地搜索、DocSearch、Meilisearch 等。'
      : 'Local search, DocSearch, Meilisearch and more.',
    link: '/plugins/search/',
    icon: 'lucide:search',
  },
  {
    title: 'SEO',
    details: isZh.value
      ? 'Meta 标签、站点地图与 robots.txt。'
      : 'Meta tags, sitemap and robots.txt.',
    link: '/plugins/seo/',
    icon: 'lucide:scan-search',
  },
  {
    title: isZh.value ? '工具' : 'Tooling',
    details: isZh.value
      ? '自动 frontmatter、重定向、缓存等工具插件。'
      : 'Auto frontmatter, redirect, cache helpers and more.',
    link: '/plugins/tools/',
    icon: 'lucide:hammer',
  },
])
</script>

<template>
  <section class="vp-home-sections">
    <div class="vp-home-section">
      <h2 class="vp-home-section-title">
        {{ isZh ? '主题' : 'Themes' }}
      </h2>
      <p class="vp-home-section-details">
        {{
          isZh
            ? '两个主题，同一个目标：用生态插件构建你的站点。'
            : 'Two themes, one goal: build your site with the ecosystem plugins.'
        }}
      </p>
      <div class="vp-home-grid">
        <RouteLink
          v-for="card in themes"
          :key="card.link"
          class="vp-home-card"
          :to="card.link"
        >
          <VPIcon class="vp-home-card-icon" :icon="card.icon" />
          <h3 class="vp-home-card-title">
            {{ card.title }}
          </h3>
          <p class="vp-home-card-details">
            {{ card.details }}
          </p>
        </RouteLink>
      </div>
    </div>

    <div class="vp-home-section">
      <h2 class="vp-home-section-title">
        {{ isZh ? '插件' : 'Plugins' }}
      </h2>
      <p class="vp-home-section-details">
        {{
          isZh
            ? '其余功能都由插件提供，按需安装即可。'
            : 'Everything else lives in plugins — install what you need.'
        }}
      </p>
      <div class="vp-home-grid">
        <RouteLink
          v-for="card in categories"
          :key="card.link"
          class="vp-home-card"
          :to="card.link"
        >
          <VPIcon class="vp-home-card-icon" :icon="card.icon" />
          <h3 class="vp-home-card-title">
            {{ card.title }}
          </h3>
          <p class="vp-home-card-details">
            {{ card.details }}
          </p>
        </RouteLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vp-home-sections {
  max-width: 1152px;
  margin: 4rem auto 0;
  padding-inline: 24px;
}

.vp-home-section + .vp-home-section {
  margin-top: 4rem;
}

.vp-home-section-title {
  margin: 0 0 0.5rem;
  padding: 0;
  border: 0;

  font-weight: 600;
  font-size: 1.375rem;
}

.vp-home-section-details {
  margin: 0 0 1.5rem;
  color: var(--vp-c-text-mute);
  font-size: 0.9375rem;
}

.vp-home-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.vp-home-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;

  background: var(--vp-c-bg-soft);

  text-decoration: none;

  transition:
    border-color 0.25s,
    box-shadow 0.25s,
    transform 0.25s;
}

.vp-home-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 12px 24px -16px var(--vp-c-shadow);
}

.vp-home-card-icon {
  width: 1.75rem;
  height: 1.75rem;
  color: var(--vp-c-brand);
}

.vp-home-card-title {
  margin: 0;
  padding: 0;
  border: 0;

  color: var(--vp-c-text);

  font-weight: 600;
  font-size: 1rem;
}

.vp-home-card:hover .vp-home-card-title {
  color: var(--vp-c-brand);
}

.vp-home-card-details {
  margin: 0;
  color: var(--vp-c-text-mute);
  font-size: 0.875rem;
  line-height: 1.6;
}
</style>
