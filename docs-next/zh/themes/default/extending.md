# 继承

VuePress 默认主题有着大量的用户，因此我们对它进行了一些便于继承的设计，以便用户轻松进行定制化。

## 布局插槽

默认主题的 `Layout` 布局提供了一些插槽：

- 当 `pageLayout: 'doc'` (默认) 在 frontmatter 中被启用时：

  - `doc-top`
  - `doc-bottom`
  - `doc-footer-before`
  - `doc-before`
  - `doc-after`
  - `sidebar-nav-before`
  - `sidebar-nav-after`
  - `aside-top`
  - `aside-bottom`
  - `aside-outline-before`
  - `aside-outline-after`
  - `aside-ads-before`
  - `aside-ads-after`

- 当 `pageLayout: 'home'` 在 frontmatter 中被启用时：

  - `home-hero-before`
  - `home-hero-info-before`
  - `home-hero-info`
  - `home-hero-info-after`
  - `home-hero-actions-after`
  - `home-hero-image`
  - `home-hero-after`
  - `home-features-before`
  - `home-features-after`

- 当 `pageLayout: 'page'` 在 frontmatter 中被启用时：

  - `page-top`
  - `page-bottom`

- 当未找到页面 (404) 时:

  - `not-found`

- 总是启用:
  - `layout-top`
  - `layout-bottom`
  - `nav-bar-title-before`
  - `nav-bar-title-after`
  - `nav-bar-content-before`
  - `nav-bar-content-after`
  - `nav-screen-content-before`
  - `nav-screen-content-after`

在它们的帮助下，你可以很容易地添加或替换内容。下面通过一个示例来介绍一下如何使用布局插槽来继承默认主题。

首先，创建一个客户端配置文件 `.vuepress/client.ts` ：

```ts
import { defineClientConfig } from 'vuepress/client'
import Layout from './layouts/Layout.vue'

export default defineClientConfig({
  layouts: {
    Layout,
  },
})
```

接下来，创建 `.vuepress/layouts/Layout.vue` ，并使用由默认主题的 `Layout` 布局提供的插槽：

```vue
<script setup>
import { Layout } from '@vuepress/theme-default/client'
</script>

<template>
  <Layout>
    <template #doc-bottom>
      <div class="my-footer">This is my custom page footer</div>
    </template>
  </Layout>
</template>

<style lang="css">
.my-footer {
  text-align: center;
}
</style>
```

布局插槽十分实用，但有时候你可能会觉得它不够灵活。默认主题同样提供了替换单个组件的能力。

默认主题将所有 [非全局的组件](https://github.com/vuepress/ecosystem/tree/main/themes/theme-default/src/client/components) 都注册了一个带 `@theme` 前缀的 [alias](https://v2.vuepress.vuejs.org/zh/reference/plugin-api.html#alias) 。例如，`HomeFooter.vue` 的别名是 `@theme/HomeFooter.vue` 。

接下来，如果你想要替换 `HomeFooter.vue` 组件，只需要在配置文件 `.vuepress/config.ts` 中覆盖这个别名即可：

```ts
import { defaultTheme } from '@vuepress/theme-default'
import { getDirname, path } from 'vuepress/utils'
import { defineUserConfig } from 'vuepress'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  theme: defaultTheme(),
  alias: {
    '@theme/HomeFooter.vue': path.resolve(
      __dirname,
      './components/MyHomeFooter.vue',
    ),
  },
})
```

## 开发一个子主题

除了在 `.vuepress/config.ts` 和 `.vuepress/client.ts` 中直接扩展默认主题以外，你可以通过继承默认主题来开发一个你自己的主题：

```ts
import { defaultTheme, type DefaultThemeOptions } from '@vuepress/theme-default'
import type { Theme } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const childTheme = (options: DefaultThemeOptions): Theme => {
  return {
    name: 'vuepress-theme-child',
    extends: defaultTheme(options),

    // 在子主题的客户端配置文件中覆盖布局
    // 注意，你在发布到 NPM 之前会将 TS 构建为 JS ，因此这里需要设置为 JS 文件的路径
    clientConfigFile: path.resolve(__dirname, './client.js'),

    // 覆盖组件别名
    alias: {
      '@theme/HomeFooter.vue': path.resolve(
        __dirname,
        './components/MyHomeFooter.vue',
      ),
    },
  }
}
```
