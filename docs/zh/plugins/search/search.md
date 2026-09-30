---
icon: search
---

# search

<NpmBadge package="@vuepress/plugin-search" />

为你的文档网站提供本地搜索能力。

## 使用方法 {#usage}

```bash
npm i -D @vuepress/plugin-search@next
```

```ts title=".vuepress/config.ts"
import { searchPlugin } from '@vuepress/plugin-search'

export default {
  plugins: [
    searchPlugin({
      // 配置项
    }),
  ],
}
```

## 指南 {#guide}

### 本地搜索索引 {#local-search-index}

该插件会根据你的页面，在本地生成搜索索引，然后在用户访问站点时加载搜索索引文件。换句话说，这是一个轻量级的内置搜索能力，不会进行任何外部请求。

然而，当你的站点包含大量页面时，搜索索引文件也会变得非常大，它可能会拖慢你的页面加载速度。在这种情况下，我们建议你使用更成熟的解决方案 - [docsearch](./docsearch.md) 。

### 开发服务器 {#dev-server}

在开发服务器中，搜索索引会保存在内存里，因此编辑页面时只会更新该页面的条目，而不会重建整个索引。

为了获得更好的性能，在开发模式下添加/编辑/删除 Markdown 内容默认不会触发搜索索引的更新。如果你正在校对或优化搜索结果，可以通过设置 `hotReload: true` 选项来启用热重载。

## 选项 {#options}

::: fields
@`locales` type=`LocaleConfig<SearchPluginLocaleData>` default=`{}`

搜索框在不同 locales 下的文字。

参考：[多语言配置](../supported-locales.md)。

@@`locales.<localePath>.placeholder` type=string

搜索框的占位符文本。

@`hotKeys` type=`(KeyOptions | string)[]` default=`['s', '/']`

指定热键的 [event.key](http://keycode.info/) 。当按下热键时，搜索框会被聚焦。将该配置项设为空数组可以禁用热键功能。

@@`hotKeys[*].key` type=string required

热键的 `event.key` 值。

@@`hotKeys[*].ctrl` type=boolean

是否同时按下 `event.ctrlKey`。

@@`hotKeys[*].shift` type=boolean

是否同时按下 `event.shiftKey`。

@@`hotKeys[*].alt` type=boolean

是否同时按下 `event.altKey`。

@@`hotKeys[*].meta` type=boolean

是否同时按下 `event.metaKey`。

@`maxSuggestions` type=number default=`5`

指定搜索结果的最大条数。

@`isSearchable` type=`(page: Page) => boolean` default=`() => true`

一个函数，用于判断一个页面是否应该被包含在搜索索引中。

```ts title=".vuepress/config.ts"
export default {
  plugins: [
    searchPlugin({
      // 排除首页
      isSearchable: (page) => page.path !== '/',
    }),
  ],
}
```

@`getExtraFields` type=`(page: Page) => string[]` default=`() => []`

一个函数，用于在页面的搜索索引中添加额外字段。

默认情况下，该插件会将页面标题和小标题作为搜索索引。该配置项可以帮助你添加更多的可搜索字段。

```ts title=".vuepress/config.ts"
export default {
  plugins: [
    searchPlugin({
      // 允许搜索 Frontmatter 中的 `tags`
      getExtraFields: (page) => page.frontmatter.tags ?? [],
    }),
  ],
}
```

@`hotReload` type=boolean default="同 --debug 标志的状态"

是否在开发服务器中，当 markdown 文件变更时更新搜索索引。

参考：[开发服务器](#dev-server)。

:::

## 样式 {#styles}

你可以通过 CSS 变量来自定义搜索框的样式：

@[code](@vuepress/plugin-search/src/client/styles/vars.css)

## 组件 {#components}

- SearchBox
