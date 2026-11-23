---
icon: hammer
---

# theme-helper

<NpmBadge package="@vuepress/theme-helper" />

Helpers for VuePress theme authors.

The package provides the shared parts of a theme feature that only depends on the pages of a site: reading the pages, resolving the frontmatter conventions and generating data for the client. The theme keeps its own options, its own item shape and its own rendering.

Currently it provides the _generate the sidebar from the file structure_ and the _edit link_ features, and the page data extension that both of them need.

## Usage

```bash
npm i @vuepress/theme-helper@next
```

The package is used by `@vuepress/theme-default` and `@vuepress/theme-classic`. A theme author can depend on it to support the same conventions.

## Guide

### Generating the sidebar from the file structure

The feature has two sides: the node side generates the data from the pages, and the client side resolves the data into the items of the theme. A theme describes its own items with a helper created by `createSidebarStructureHelper()`:

```ts title="src/node/myTheme.ts"
import {
  createSidebarStructureHelper,
  extendsPageData,
} from '@vuepress/theme-helper'

import type { MyThemeItem } from '../shared/index.js'

const sidebarHelper = createSidebarStructureHelper<MyThemeItem>({
  // the theme data, used to find the scopes that use `'structure'`
  themeData: resolveThemeData(options),

  // how a group item is shaped in the theme options
  childrenKey: 'children',
  prefixKey: 'prefix',

  sorter: options.sidebarSorter,

  // customize the item of a page
  pageInfoGetter: (info, _page, defaults) => ({
    ...defaults,
    ...(info.frontmatter.icon ? { icon: info.frontmatter.icon } : {}),
  }),

  // customize the item of a directory
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

The helper finds the scopes from the theme data, by looking for the `'structure'` value of the sidebar option and for the `children: 'structure'` group items. You can provide a custom `getScopes()` when the sidebar option is shaped differently.

The getters receive the resolved `SidebarInfo` of the item, its page (the `README.md` page for a directory), and the default item that the helper would generate. The default item only contains `text` and `link`, so a getter adds the fields of the theme and can return `null` to skip the item. The children of a directory are attached by the helper, under `childrenKey`.

`prepare()` writes `@temp/theme-helper/sidebar.js`, which exports the generated data keyed by route scope. It must be called even when there is no scope, so that the generated module exists. `watch()` watches the generated pages in dev and regenerates the data, and it registers a watcher only when there is at least one scope.

In the client, `getSidebarStructure()` reads the data of a scope and returns the items customized by the getters:

```ts title="src/client/composables/useSidebar.ts"
import { getSidebarStructure } from '@vuepress/theme-helper/client'

import type { MyThemeItem } from '../shared/index.js'

const guideItems = getSidebarStructure<MyThemeItem>('/guide/')
```

The scope is normalized, so `'/guide/'`, `'/guide'` and `'guide/'` all resolve to the same data.

### Frontmatter conventions

The pages control the generated items with their frontmatter, so every theme that uses the helper supports the same conventions.

| Field        | Where       | Description                                                                                                |
| ------------ | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `index`      | any page    | Set it to `false` to hide the page from the sidebar.                                                       |
| `order`      | any page    | The position of the item. A positive value puts it before the unordered ones, a negative value after them. |
| `shortTitle` | any page    | The text of the item, it takes precedence over the page title.                                             |
| `icon`       | any page    | The icon of the item. Themes that do not support item icons ignore it.                                     |
| `dir`        | `README.md` | The options of the group that represents the directory.                                                    |

The `dir` options of a directory are read from the frontmatter of its `README.md`:

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

- `text`: the text of the group, it falls back to the title of the `README.md` page.
- `icon`: the icon of the group.
- `collapsible`: whether the group is collapsible, `true` by default.
- `expanded`: whether the group is expanded, `false` by default. It only takes effect when the group is collapsible.
- `link`: whether the `README.md` page is the link of the group instead of a child item, `false` by default.
- `index`: set it to `false` to hide the whole directory from the sidebar.
- `order`: the position of the group, `0` by default.

### Sorting the items

`getSidebarSorter()` converts the `sidebarSorter` option of the theme into comparator functions. The option accepts a keyword, a function, or an array of them:

```ts
export default defineUserConfig({
  theme: themeDefault({
    sidebarSorter: ['readme', 'order', 'title', 'filename'],
  }),
})
```

The keywords are:

- `'readme'`: put the `README.md` page of a directory first.
- `'order'`: sort by the `order` frontmatter field: the positive values ascending, then the pages without an order, then the negative values descending.
- `'date'` and `'date-desc'`: sort by the `date` frontmatter field, ascending and descending.
- `'filename'`: sort by the file name with a natural order, and put a file before a directory of the same name.
- `'title'`: sort by the item text with a natural order.

A function receives two `SidebarInfo` items and returns a number, like the callback of `Array.prototype.sort()`. The default is `['readme', 'order', 'title', 'filename']`.

### Generating the edit link

The edit link is generated from the repository options of the theme and the relative file path of the page. A theme calls `extendsPageData()` in the `extendsPage` hook to save the relative file path and the page title, then uses `useEditLink()` in the client:

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

The theme options are typed by `EditLinkOptions`, and the page frontmatter can override `editLink` and `editLinkPattern`. The default patterns of the supported repositories are provided by `EDIT_LINK_PATTERNS`.

### Extending the page data

`extendsPageData()` saves the relative file path of the page into `page.data.filePathRelative`, and the page title into `page.routeMeta.title`. Themes use them to generate the edit link and the links of the navbar and the sidebar.

## Node API

### extendsPageData

::: fields
@`page` type=`Page` required

The page to extend, usually the argument of the `extendsPage` hook.
:::

It saves the relative file path into `page.data.filePathRelative`, and the page title into `page.routeMeta.title`.

### createSidebarStructureHelper

Creates a helper that generates the sidebar data of the theme from the file structure. It is the recommended API, and the low-level functions below build on the same pipeline.

::: fields
@`themeData` type=object required

The theme data, i.e. the root options and the `locales` options of the theme.

@`getScopes` type=`(themeData: object) => string[]`

A custom function that returns the route scopes to generate, it replaces the scopes detected from the sidebar option.

@`childrenKey` type=string default=`'children'`

The key of the field that holds the children of a group item.

@`prefixKey` type=string default=`'prefix'`

The key of the field that holds the prefix of a group item.

@`sorter` type=`SidebarSorter`

The sorter option of the theme.

@`pageInfoGetter` type=`(info: SidebarFileInfo, page: Page | undefined, defaults: Item) => Partial<Item> | null`

Customizes the item of a page. It receives the default item, and can return `null` to skip the page.

@`dirInfoGetter` type=`(info: SidebarDirInfo, readmePage: Page | null, defaults: Item) => Partial<Item> | null`

Customizes the item of a directory. It receives the default item, and can return `null` to skip the directory.
:::

The helper returns:

- `scopes`: the normalized scopes.
- `getData(app)`: the generated `SidebarStructureData<Item>`.
- `prepare(app)`: writes the generated data to `@temp/theme-helper/sidebar.js`.
- `watch(app, watchers)`: watches the generated pages in dev and regenerates the data, with a watcher registered only when there is at least one scope.

### getSidebarStructureScopes

::: fields
@`themeData` type=object required

The theme data, i.e. the root options and the `locales` options of the theme. The root options are merged with the matching locale options, like the client does.

@`childrenKey` type=string required

The key of the field that holds the children of a group item, e.g. `'items'` or `'children'`.

@`prefixKey` type=string required

The key of the field that holds the prefix of a group item, e.g. `'base'` or `'prefix'`.
:::

It returns the normalized scopes, e.g. `['/', '/guide/']`. A sidebar option accepts the special value `'structure'`, and a group item accepts `children: 'structure'` (or `items: 'structure'`), scoped by its prefix.

### getStructureInfo

::: fields
@`pages` type=`Page[]` required

The pages of the site.

@`scope` type=string required

The route scope as a file path, without a leading slash and with a trailing slash, e.g. `'guide/'` or `''` for the root.
:::

It returns the directory structure of the scope: `StructureDirInfo` and `StructureFileInfo` items, nested and sorted by path.

### getSidebarInfo

::: fields
@`pages` type=`Page[]` required

The pages of the site.

@`sorters` type=`SidebarSorterFunction[]` required

The comparator functions, usually resolved by `getSidebarSorter()`.

@`scope` type=string required

The route scope as a file path, without a leading slash and with a trailing slash.
:::

It converts the structure of the scope to `SidebarInfo` items, which resolve the frontmatter conventions: hidden pages, titles, icons, orders, directory groups and their options.

### getSidebarStructureData

::: fields
@`scopes` type=`string[]` required

The route scopes, as returned by `getSidebarStructureScopes()`.

@`sorter` type=`SidebarSorter`

The sorter option of the theme.

@`childrenKey` type=string default=`'children'`

The key of the field that holds the children of a group item.

@`pageInfoGetter` type=`SidebarPageInfoGetter`

The getter of the items of the pages.

@`dirInfoGetter` type=`SidebarDirInfoGetter`

The getter of the items of the directories.
:::

It returns the generated `SidebarStructureData<Item>`, keyed by the normalized scope. The default item of a page only contains `text` and `link`, so the getters of the theme add the fields of its own items.

### prepareSidebarData

It accepts the same options as `getSidebarStructureData()`, and writes `@temp/theme-helper/sidebar.js` with the generated data.

### watchSidebarData

It accepts the same options as `getSidebarStructureData()`, and watches the generated pages of the app in dev. The watcher is added to the `watchers` argument of the `onWatched` hook.

## Client API

### getSidebarStructure

```ts
const items = getSidebarStructure<MyThemeItem>('/guide/')
```

It returns the generated items of a scope, typed by the generic parameter, or an empty array when the scope is not generated.

### sidebarData

The raw `SidebarStructureData` read from the generated module, keyed by the normalized scope.

### useEditLink

```ts
const editLink: ComputedRef<{ text: string; link: string } | null> =
  useEditLink()
```

It resolves the edit link of the current page from the theme data and the page frontmatter. It returns `null` when the edit link is disabled or cannot be resolved.

### resolveEditLink

::: fields
@`docsRepo` type=string required

The link or `owner/repo` of the documentation repository.

@`docsBranch` type=string required

The branch of the documentation repository.

@`docsDir` type=string required

The directory of the documentation in the repository.

@`filePathRelative` type=`string | null` required

The relative file path of the page.

@`editLinkPattern` type=string

The custom pattern of the edit link, it overrides the default pattern of the repository.
:::

It returns the edit link, or `null` when it cannot be resolved. The `EDIT_LINK_PATTERNS` constant provides the default patterns of the supported repositories.

### resolveRepoType

```ts
const repoType: RepoType = resolveRepoType('vuepress/ecosystem') // 'GitHub'
```

It resolves the type of a repository: `'GitHub'`, `'GitLab'`, `'Gitee'`, `'Bitbucket'` or `null`.

### useData

```ts
const { theme, frontmatter, page } = useData<
  MyThemeData,
  MyFrontmatter,
  MyPageData
>()
```

It combines `useThemeLocaleData()`, `usePageFrontmatter()` and `usePageData()` into a single object. The generic parameters type the theme locale data, the page frontmatter and the page data.

## Types

The types of the shared conventions are exported from the package root and the `shared` entry:

- `EditLinkOptions`, `EditLinkThemeData`, `EditLinkFrontmatter`, `EditLinkPageData`: the options, the theme data, the frontmatter and the page data of the edit link. A theme can extend them in its own types.
- `SidebarStructureData`, `SidebarStructureItem`, `SidebarStructureHelper`, `SidebarStructureHelperOptions`, `SidebarPageInfoGetter`, `SidebarDirInfoGetter`, `SidebarInfo`, `SidebarSorter`, `SidebarSorterFunction`, `SidebarSorterKeyword`: the types of the generated sidebar data.
