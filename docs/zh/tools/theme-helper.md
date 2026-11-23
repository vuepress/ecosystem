---
icon: hammer
---

# theme-helper

<NpmBadge package="@vuepress/theme-helper" />

VuePress 主题开发者的工具包。

该包提供主题功能的公共部分，这些功能只依赖站点的页面：读取页面、解析 frontmatter 约定并为客户端生成数据。主题仍保留自己的选项、自己的条目结构与自己的渲染方式。

目前它提供 _根据文件结构生成侧边栏_ 与 _编辑链接_ 功能，以及两者所需的页面数据扩展。

## Usage

```bash
npm i @vuepress/theme-helper@next
```

`@vuepress/theme-default` 与 `@vuepress/theme-classic` 都使用了该包。主题开发者可以依赖它来支持相同的约定。

## Guide

### 根据文件结构生成侧边栏 {#generating-the-sidebar-from-the-file-structure}

该功能分为两部分：Node 端根据页面生成数据，客户端把数据解析为主题自己的条目。主题通过 `createSidebarStructureHelper()` 创建的工具描述自己的条目：

```ts title="src/node/myTheme.ts"
import {
  createSidebarStructureHelper,
  extendsPageData,
} from '@vuepress/theme-helper'

import type { MyThemeItem } from '../shared/index.js'

const sidebarHelper = createSidebarStructureHelper<MyThemeItem>({
  // 主题数据，用于找到使用 `'structure'` 的范围
  themeData: resolveThemeData(options),

  // 主题选项中分组条目的形状
  childrenKey: 'children',
  prefixKey: 'prefix',

  sorter: options.sidebarSorter,

  // 自定义页面的条目
  pageInfoGetter: (info, _page, defaults) => ({
    ...defaults,
    ...(info.frontmatter.icon ? { icon: info.frontmatter.icon } : {}),
  }),

  // 自定义目录的条目
  dirInfoGetter: (info, _page, defaults) => ({
    ...defaults,
    ...(info.groupInfo.icon ? { icon: info.groupInfo.icon } : {}),
    ...(info.groupInfo.collapsible
      ? { collapsed: info.groupInfo.expanded !== true }
      : {}),
  }),
})

export const myTheme = (options: MyThemeOptions = {}): Theme => ({
  name: 'my-theme',
  onPrepared: (app) => sidebarHelper.prepare(app),
  onWatched: (app, watchers) => {
    sidebarHelper.watch(app, watchers)
  },
})
```

工具会根据主题数据自动查找范围，即侧边栏选项中的 `'structure'` 值与 `children: 'structure'` 的分组条目。如果侧边栏选项的结构不同，可以通过 `getScopes()` 自定义。

getter 会收到条目解析后的 `SidebarInfo`、它对应的页面（目录为 `README.md` 页面）以及工具默认生成的条目。默认条目只包含 `text` 与 `link`，因此 getter 可以添加主题自己的字段，也可以返回 `null` 以跳过该条目。目录的子项由工具按 `childrenKey` 附加。

`prepare()` 会写入 `@temp/theme-helper/sidebar.js`，它按路由范围导出生成的数据。即使没有任何范围也必须调用，以保证生成模块存在。`watch()` 会在开发模式下监听生成的页面并重新生成数据，且只在至少有一个范围时注册监听器。

在客户端，`getSidebarStructure()` 读取某个范围的数据，并返回经过 getter 自定义的条目：

```ts title="src/client/composables/useSidebar.ts"
import { getSidebarStructure } from '@vuepress/theme-helper/client'

import type { MyThemeItem } from '../shared/index.js'

const guideItems = getSidebarStructure<MyThemeItem>('/guide/')
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

### 生成编辑链接 {#generating-the-edit-link}

编辑链接由主题的仓库选项与页面的相对文件路径生成。主题在 `extendsPage` 钩子中调用 `extendsPageData()` 保存相对文件路径与页面标题，然后在客户端使用 `useEditLink()`：

```ts title="src/node/myTheme.ts"
import { extendsPageData } from '@vuepress/theme-helper'

export const myTheme = (): Theme => ({
  extendsPage: (page) => {
    extendsPageData(page)
  },
})
```

```ts title="src/client/components/PageMeta.vue"
import { useEditLink } from '@vuepress/theme-helper/client'

const editLink = useEditLink()
```

主题选项由 `EditLinkOptions` 定义，页面 frontmatter 可以覆盖 `editLink` 与 `editLinkPattern`。支持的仓库的默认模式由 `EDIT_LINK_PATTERNS` 提供。

### 扩展页面数据 {#extending-the-page-data}

`extendsPageData()` 会将页面的相对文件路径保存到 `page.data.filePathRelative`，将页面标题保存到 `page.routeMeta.title`。主题使用它们生成编辑链接以及导航栏和侧边栏的链接。

## Node API

### extendsPageData

::: fields
@`page` type=`Page` required

需要扩展的页面，通常是 `extendsPage` 钩子的参数。
:::

它会将相对文件路径保存到 `page.data.filePathRelative`，将页面标题保存到 `page.routeMeta.title`。

### createSidebarStructureHelper

创建根据文件结构生成主题侧边栏数据的工具。这是推荐的 API，下面的底层函数都基于同一套流程。

::: fields
@`themeData` type=object required

主题数据，即主题的根配置与 `locales` 配置。

@`getScopes` type=`(themeData: object) => string[]`

自定义返回需要生成的路由范围的函数，它会取代根据侧边栏选项检测到的范围。

@`childrenKey` type=string default=`'children'`

分组条目中保存子项的字段名。

@`prefixKey` type=string default=`'prefix'`

分组条目中保存前缀的字段名。

@`sorter` type=`SidebarSorter`

主题的排序器选项。

@`pageInfoGetter` type=`(info: SidebarFileInfo, page: Page | undefined, defaults: Item) => Partial<Item> | null`

自定义页面的条目。它接收默认条目，可以返回 `null` 以跳过该页面。

@`dirInfoGetter` type=`(info: SidebarDirInfo, readmePage: Page | null, defaults: Item) => Partial<Item> | null`

自定义目录的条目。它接收默认条目，可以返回 `null` 以跳过该目录。
:::

工具会返回：

- `scopes`：规范化后的范围。
- `getData(app)`：生成的 `SidebarStructureData<Item>`。
- `prepare(app)`：把生成的数据写入 `@temp/theme-helper/sidebar.js`。
- `watch(app, watchers)`：在开发模式下监听生成的页面并重新生成数据，且只在至少有一个范围时注册监听器。

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

@`childrenKey` type=string default=`'children'`

分组条目中保存子项的字段名。

@`pageInfoGetter` type=`SidebarPageInfoGetter`

页面条目的 getter。

@`dirInfoGetter` type=`SidebarDirInfoGetter`

目录条目的 getter。
:::

它返回生成的 `SidebarStructureData<Item>`，以规范化后的范围为键。页面默认的条目只包含 `text` 与 `link`，因此主题的 getter 需要添加自己的条目字段。

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

### useEditLink

```ts
const editLink: ComputedRef<{ text: string; link: string } | null> =
  useEditLink()
```

它从主题数据与页面 frontmatter 解析当前页面的编辑链接。编辑链接被禁用或无法解析时返回 `null`。

### resolveEditLink

::: fields
@`docsRepo` type=string required

文档仓库的链接或 `owner/repo`。

@`docsBranch` type=string required

文档仓库的分支。

@`docsDir` type=string required

文档在仓库中的目录。

@`filePathRelative` type=`string | null` required

页面的相对文件路径。

@`editLinkPattern` type=string

自定义的编辑链接模式，它会覆盖仓库的默认模式。
:::

它返回编辑链接，无法解析时返回 `null`。`EDIT_LINK_PATTERNS` 常量提供支持的仓库的默认模式。

### resolveRepoType

```ts
const repoType: RepoType = resolveRepoType('vuepress/ecosystem') // 'GitHub'
```

它解析仓库的类型：`'GitHub'`、`'GitLab'`、`'Gitee'`、`'Bitbucket'` 或 `null`。

### useData

```ts
const { theme, frontmatter, page } = useData<
  MyThemeData,
  MyFrontmatter,
  MyPageData
>()
```

它将 `useThemeLocaleData()`、`usePageFrontmatter()` 与 `usePageData()` 组合到一个对象中。泛型参数用于标注主题多语言数据、页面 frontmatter 与页面数据的类型。

## 类型

公共约定的类型从包入口与 `shared` 入口导出：

- `EditLinkOptions`、`EditLinkThemeData`、`EditLinkFrontmatter`、`EditLinkPageData`：编辑链接的选项、主题数据、frontmatter 与页面数据。主题可以在自己的类型中扩展它们。
- `SidebarStructureData`、`SidebarStructureItem`、`SidebarStructureHelper`、`SidebarStructureHelperOptions`、`SidebarPageInfoGetter`、`SidebarDirInfoGetter`、`SidebarInfo`、`SidebarSorter`、`SidebarSorterFunction`、`SidebarSorterKeyword`：生成的侧边栏数据的类型。
