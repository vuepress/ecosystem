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

A theme supports the feature with three steps:

1. collect the route scopes whose sidebar should be generated from the files;
2. generate the data in the `onPrepared` hook, and regenerate it in the `onWatched` hook when the pages are changed in dev;
3. resolve the data in the client and map it to the items of the theme.

The scopes are usually computed from the sidebar option of the theme. `getSidebarStructureScopes()` accepts the theme data, and the names of the fields that hold the children and the prefix of a group item:

```ts title="src/node/myTheme.ts"
import {
  getSidebarStructureScopes,
  prepareSidebarData,
  watchSidebarData,
} from '@vuepress/theme-helper'

const themeData = resolveThemeData(options)
const scopes = getSidebarStructureScopes({
  themeData,
  // a group item is `{ children: [...], prefix: '...' }`
  childrenKey: 'children',
  prefixKey: 'prefix',
})

export const myTheme = (options: MyThemeOptions = {}): Theme => ({
  name: 'my-theme',
  onPrepared: async (app) => {
    // always called, so that the generated module exists even when there is
    // no scope
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

`prepareSidebarData()` writes `@temp/theme-helper/sidebar.js`, which exports the generated data keyed by route scope.

In the client, `getSidebarStructure()` reads the data of a scope and returns theme-agnostic items:

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
:::

It returns the theme-agnostic `SidebarStructureData`, keyed by the normalized scope.

### prepareSidebarData

It accepts the same options as `getSidebarStructureData()`, and writes `@temp/theme-helper/sidebar.js` with the generated data.

### watchSidebarData

It accepts the same options as `getSidebarStructureData()`, and watches the generated pages of the app in dev. The watcher is added to the `watchers` argument of the `onWatched` hook.

## Client API

### getSidebarStructure

```ts
const items: SidebarStructureItem[] = getSidebarStructure(scope)
```

It returns the generated items of a scope, or an empty array when the scope is not generated.

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
- `SidebarStructureData`, `SidebarStructureItem`, `SidebarInfo`, `SidebarSorter`, `SidebarSorterFunction`, `SidebarSorterKeyword`: the types of the generated sidebar data.
