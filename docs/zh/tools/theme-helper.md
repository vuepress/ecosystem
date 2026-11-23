---
icon: hammer
---

# theme-helper

<NpmBadge package="@vuepress/theme-helper" />

VuePress 主题开发者的工具包。

该包提供主题功能的公共部分，这些功能只依赖站点的页面：读取页面、解析 frontmatter 约定并为客户端生成数据。主题仍保留自己的选项、自己的条目结构与自己的渲染方式。

目前它提供 _根据文件结构生成侧边栏_ 功能。

## Usage

```bash
npm i @vuepress/theme-helper@next
```

`@vuepress/theme-default` 与 `@vuepress/theme-classic` 都使用了该包。主题开发者可以依赖它来支持相同的约定。

## Guide

### 根据文件结构生成侧边栏 {#generating-the-sidebar-from-the-file-structure}

主题通过三个步骤支持该功能：

1. 收集需要根据文件生成侧边栏的路由范围；
2. 在 `onPrepared` 钩子中生成数据，并在开发模式下页面变化时于 `onWatched` 钩子中重新生成；
3. 在客户端解析数据，并映射为主题自己的条目。

路由范围通常由主题的侧边栏选项计算得出。`getSidebarStructureScopes()` 接受主题数据，以及分组条目中保存子项与前缀的字段名：

```ts title="src/node/myTheme.ts"
import {
  getSidebarStructureScopes,
  prepareSidebarData,
  watchSidebarData,
} from '@vuepress/theme-helper'

const themeData = resolveThemeData(options)
const scopes = getSidebarStructureScopes({
  themeData,
  // 分组条目形如 `{ children: [...], prefix: '...' }`
  childrenKey: 'children',
  prefixKey: 'prefix',
})

export const myTheme = (options: MyThemeOptions = {}): Theme => ({
  name: 'my-theme',
  onPrepared: async (app) => {
    // 始终调用，即使没有任何范围，也保证生成模块存在
    await prepareSidebarData(app, { scopes, sorter: options.sidebarSorter })
  },
  onWatched: (_app, watchers) => {
    if (scopes.length > 0)
      watchSidebarData(_app, watchers, {
        scopes,
        sorter: options.sidebarSorter,
      })
  },
})
```

`prepareSidebarData()` 会写入 `@temp/theme-helper/sidebar.js`，它按路由范围导出生成的数据。

在客户端，`getSidebarStructure()` 读取某个范围的数据，并返回与主题无关的条目：

```ts title="src/client/composables/useSidebar.ts"
import { getSidebarStructure } from '@vuepress/theme-helper/client'

const resolveStructureItems = (scope: string) =>
  getSidebarStructure(scope).map(({ text, link, icon, children }) => ({
    text,
    ...(link ? { link } : {}),
    ...(icon ? { icon } : {}),
    ...(children ? { items: resolveStructureItems(...) } : {}),
  }))
```

范围会被规范化，因此 `'/guide/'`、`'/guide'` 与 `'guide/'` 都会解析到同一份数据。

### Frontmatter 约定 {#frontmatter-conventions}

页面通过 frontmatter 控制生成的条目，因此所有使用该工具的主题都支持相同的约定。

| 字段         | 位置        | 说明                                             |
| ------------ | ----------- | ------------------------------------------------ |
| `index`      | 任意页面    | 设为 `false` 可将该页面从侧边栏中隐藏。          |
| `order`      | 任意页面    | 条目的位置。正数排在无序条目之前，负数排在其后。 |
| `shortTitle` | 任意页面    | 条目的文本，优先于页面标题。                     |
| `icon`       | 任意页面    | 条目的图标。不支持条目图标的主题会忽略它。       |
| `dir`        | `README.md` | 表示目录的分组的选项。                           |

目录的 `dir` 选项从其 `README.md` 的 frontmatter 中读取：

```md title="guide/README.md"
---
dir:
  text: Guide
  icon: guide
  collapsible: true
  expanded: false
  link: true
  index: true
  order: 1
---
```

- `text`：分组的文本，默认为 `README.md` 页面的标题。
- `icon`：分组的图标。
- `collapsible`：分组是否可折叠，默认为 `true`。
- `expanded`：分组是否展开，默认为 `false`。仅在分组可折叠时生效。
- `link`：`README.md` 页面是否作为分组的链接而不是子条目，默认为 `false`。
- `index`：设为 `false` 可将整个目录从侧边栏中隐藏。
- `order`：分组的位置，默认为 `0`。

### 排序条目 {#sorting-the-items}

`getSidebarSorter()` 会把主题的 `sidebarSorter` 选项转换为比较函数。该选项接受关键字、函数或它们的数组：

```ts
export default defineUserConfig({
  theme: themeDefault({
    sidebarSorter: ['readme', 'order', 'title', 'filename'],
  }),
})
```

关键字有：

- `'readme'`：把目录的 `README.md` 页面排在最前。
- `'order'`：按 `order` frontmatter 字段排序：正数升序，其次是没有 order 的页面，最后是负数降序。
- `'date'` 与 `'date-desc'`：按 `date` frontmatter 字段升序、降序排序。
- `'filename'`：按文件名自然排序，同名时文件排在目录之前。
- `'title'`：按条目文本自然排序。

函数接受两个 `SidebarInfo` 条目并返回数字，与 `Array.prototype.sort()` 的回调相同。默认值为 `['readme', 'order', 'title', 'filename']`。

## Node API

### getSidebarStructureScopes

::: fields
@`themeData` type=object required

主题数据，即主题的根配置与 `locales` 配置。根配置会与匹配的语言配置合并，与客户端的行为一致。

@`childrenKey` type=string required

分组条目中保存子项的字段名，如 `'items'` 或 `'children'`。

@`prefixKey` type=string required

分组条目中保存前缀的字段名，如 `'base'` 或 `'prefix'`。
:::

它返回规范化后的范围，如 `['/', '/guide/']`。侧边栏选项接受特殊值 `'structure'`，分组条目接受 `children: 'structure'`（或 `items: 'structure'`），并以其前缀作为范围。

### getStructureInfo

::: fields
@`pages` type=`Page[]` required

站点的页面。

@`scope` type=string required

作为文件路径的路由范围，不带前导斜线并带结尾斜线，如 `'guide/'`，根目录为 `''`。
:::

它返回该范围的目录结构：`StructureDirInfo` 与 `StructureFileInfo` 条目，它们按路径嵌套并排序。

### getSidebarInfo

::: fields
@`pages` type=`Page[]` required

站点的页面。

@`sorters` type=`SidebarSorterFunction[]` required

比较函数，通常由 `getSidebarSorter()` 得到。

@`scope` type=string required

作为文件路径的路由范围，不带前导斜线并带结尾斜线。
:::

它把该范围的结构转换为 `SidebarInfo` 条目，并解析 frontmatter 约定：隐藏页面、标题、图标、顺序、目录分组及其选项。

### getSidebarStructureData

::: fields
@`scopes` type=`string[]` required

路由范围，由 `getSidebarStructureScopes()` 返回。

@`sorter` type=`SidebarSorter`

主题的排序器选项。
:::

它返回与主题无关的 `SidebarStructureData`，以规范化后的范围为键。

### prepareSidebarData

它接受与 `getSidebarStructureData()` 相同的选项，并把生成的数据写入 `@temp/theme-helper/sidebar.js`。

### watchSidebarData

它接受与 `getSidebarStructureData()` 相同的选项，并在开发模式下监听 app 生成的页面。监听器会被添加到 `onWatched` 钩子的 `watchers` 参数中。

## Client API

### getSidebarStructure

```ts
const items: SidebarStructureItem[] = getSidebarStructure(scope)
```

它返回某个范围生成的条目，当该范围未被生成时返回空数组。

### sidebarData

从生成模块读取的原始 `SidebarStructureData`，以规范化后的范围为键。
