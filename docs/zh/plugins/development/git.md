---
icon: la:git-alt
---

# git

<NpmBadge package="@vuepress/plugin-git" />

该插件会收集页面的 Git 信息，包括创建时间、更新时间、贡献者列表以及变更日志等。

默认主题中的 [lastUpdated](../../themes/default/config.md#lastupdated) 和 [contributors](../../themes/default/config.md#contributors) 功能正是由该插件提供支持的。

该插件主要用于主题开发，在大多数情况下你不需要直接使用它，而是通过主题配置来开启相关功能。

## 使用方法

```bash
npm i -D @vuepress/plugin-git@next
```

```ts title=".vuepress/config.ts"
import { gitPlugin } from '@vuepress/plugin-git'

export default {
  plugins: [
    gitPlugin({
      // 配置项
    }),
  ],
}
```

## Git 仓库

本插件要求你的项目必须在一个 [Git 仓库](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E8%8E%B7%E5%8F%96-Git-%E4%BB%93%E5%BA%93)中，以便它能从提交历史中收集信息。

你应该确保在构建站点时可以访问到完整的提交记录。例如，CI 工作流（如 GitHub Actions）通常会使用 [--depth 1](https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---depthltdepthgt) 来克隆仓库以减少下载量，这会导致无法获取历史记录。为了让本插件正常工作，你应该在 CI 配置中禁用这种浅克隆行为（通常是将 `fetch-depth` 设置为 `0`）。

::: warning
该插件会显著降低数据准备阶段的速度，特别是当你拥有大量页面时。你可以考虑在 `dev` 模式下禁用此插件，以获得更好的开发体验。
:::

## 配置项

### createdTime

- 类型：`boolean`

- 默认值：`true`

- 详情：

  是否收集页面的创建时间。

### updatedTime

- 类型：`boolean`

- 默认值：`true`

- 详情：

  是否收集页面的更新时间。

### contributors

- 类型：`boolean | ContributorsOptions`

  ```ts
  interface ContributorInfo {
    /**
     * 贡献者在 git 托管服务上的用户名
     */
    username: string
    /**
     * 页面上显示的贡献者名称，默认为 `username`
     */
    name?: string
    /**
     * 贡献者的别名，
     * 因为贡献者在本地 git 配置中保存的用户名可能与托管服务上的用户名不同。
     * 在这种情况下，可以使用别名映射到实际的用户名。
     */
    alias?: string[] | string
    /**
     * 贡献者的主要邮箱
     */
    email?: string
    /**
     * 贡献者在 Git 托管服务上的备用邮箱，
     * 或者他们过去使用过的邮箱。
     */
    emailAlias?: string[] | string
    /**
     * 贡献者的头像 url。
     *
     * 如果 git 托管服务是 `github`，可以忽略并留空，
     * 插件会自动填充它。
     */
    avatar?: string
    /**
     * 贡献者的主页 url
     *
     * 如果 git 托管服务是 `github`，可以忽略并留空，
     * 插件会自动填充它。
     */
    url?: string
  }

  interface ContributorsOptions {
    /**
     * 贡献者信息
     */
    info?: ContributorInfo[]

    /**
     * 是否在贡献者信息中添加头像
     * @default false
     */
    avatar?: boolean

    /**
     * 头像 url 模式
     * - `:username` - 贡献者的用户名
     *
     * @example 'https://github.com/:username'
     */
    avatarPattern?: string

    /**
     * 转换贡献者列表的函数，例如去重和排序。
     * 输入是插件收集到的贡献者列表，输出应该是转换后的贡献者列表。
     */
    transform?: (contributors: GitContributorInfo[]) => GitContributorInfo[]
  }
  ```

- 默认值：`true`

- 详情：

  是否收集页面的贡献者信息。

### changelog

- 类型：`boolean | ChangelogOptions`

  ```ts
  interface ChangelogOptions {
    /**
     * 变更日志的最大条目数
     */
    maxCount?: number

    /**
     * git 仓库的 url，例如: https://github.com/vuepress/ecosystem
     */
    repoUrl?: string

    /**
     * 提交记录 url 模式
     *
     * - `:repo` - git 仓库的 url
     * - `:hash` - 提交记录的哈希值
     *
     * @default ':repo/commit/:hash'
     */
    commitUrlPattern?: string

    /**
     * Issue url 模式
     *
     * - `:repo` - git 仓库的 url
     * - `:issue` - Issue 的 ID
     *
     * @default ':repo/issues/:issue'
     */
    issueUrlPattern?: string

    /**
     * Tag url 模式
     *
     * - `:repo` - git 仓库的 url
     * - `:tag` - Tag 的名称
     *
     * @default ':repo/releases/tag/:tag'
     */
    tagUrlPattern?: string
  }
  ```

- 默认值：`false`

- 详情：

  是否收集页面的变更日志。

### filter

- 类型：`(page: Page) => boolean`

- 详情：

  页面过滤器。如果返回 `true`，则该页面将收集 git 信息。

### locales

- 类型：`Record<string, GitLocaleData>`

  ```ts
  export interface GitLocaleData {
    /**
     * 贡献者标题
     */
    contributors: string

    /**
     * 变更日志标题
     */
    changelog: string

    /**
     * 用于表示提交时间 "在" 某时的词语
     */
    timeOn: string

    /**
     * 查看变更日志按钮的文字
     */
    viewChangelog: string

    /**
     * 最近更新
     */
    latestUpdateAt: string
  }
  ```

- 详情：

  多语言配置，用于 [Git 组件](#component)。

## Frontmatter

### gitInclude

- 类型：`string[]`

- 详情：

  一个包含相对路径的数组。在计算页面数据（如时间、贡献者）时，会将这些文件的 Git 历史也包含在内。

- 示例：

```md
---
gitInclude:
  - relative/path/to/file1
  - relative/path/to/file2
---
```

### contributors

- 类型：`boolean | string[]`

- 详情：

  是否收集当前页面的贡献者信息，此值将覆盖全局的 [contributors](#contributors) 配置项。
  - `true` - 收集贡献者信息
  - `false` - 不收集贡献者信息
  - `string[]` - 额外的贡献者列表。有时页面会有额外的贡献者（例如不在 git 历史中），可以使用此配置项指定额外的贡献者列表以获取其详细信息。

### changelog

- 类型：`boolean`

- 详情：

  是否收集当前页面的变更历史，此值将覆盖全局的 [changelog](#changelog) 配置项。

## 组合式 API

你可以从 `@vuepress/plugin-git/client` 导入以下组合式 API。

### useChangelog

获取当前页面的变更日志。

```ts
export interface CoAuthorInfo {
  /**
   * 共同作者姓名
   */
  name: string
  /**
   * 共同作者邮箱
   */
  email: string
}

export interface GitChangelogItem extends GitChangelogInfo {
  /**
   * 提交哈希
   */
  hash: string
  /**
   * Unix 时间戳（毫秒）
   */
  time: number
  /**
   * 提交信息
   */
  message: string
  /**
   * 提交记录的 url
   */
  commitUrl?: string
  /**
   * 发布标签 (tag)
   */
  tag?: string
  /**
   * 发布标签的 url
   */
  tagUrl?: string
  /**
   * 提交作者姓名
   */
  author: string
  /**
   * 提交作者邮箱
   */
  email: string

  /**
   * 提交的共同作者
   */
  coAuthors?: CoAuthorInfo[]

  /**
   * 提交的日期文本
   */
  date: string
}

export const useChangelog: (
  enabled?: MaybeRefOrGetter<boolean>,
) => ComputedRef<GitChangelogItem[]>
```

### useContributors

获取当前页面的贡献者列表。

```ts
export interface GitContributorInfo {
  /**
   * 贡献者显示名称
   */
  name: string
  /**
   * 贡献者邮箱
   */
  email: string

  /**
   * 贡献者在 git 托管服务上的用户名
   */
  username: string
  /**
   * 提交次数
   */
  commits: number
  /**
   * 贡献者头像
   */
  avatar?: string
  /**
   * 贡献者主页 url
   */
  url?: string
}

export const useContributors: (
  enabled?: MaybeRefOrGetter<boolean>,
) => ComputedRef<GitContributorInfo[]>
```

### useLastUpdated

获取当前页面的最后更新时间。

```ts
export interface LastUpdated {
  /**
   * 最后更新时间的 Date 对象
   */
  date: Date
  /**
   * 最后更新时间的 ISO 字符串
   */
  iso: string
  /**
   * 最后更新时间的格式化文本
   */
  text: string
  /**
   * 最后更新时间的语言环境
   */
  locale: string
}

export const useLastUpdated: (
  enabled?: MaybeRefOrGetter<boolean>,
) => ComputedRef<LastUpdated | null>
```

## 页面数据

该插件会向页面数据（Page Data）中添加一个 `git` 字段。

使用该插件后，你可以通过以下方式在页面数据中获取收集到的 git 信息：

```ts
import type { GitPluginPageData } from '@vuepress/plugin-git'
import { usePage } from 'vuepress/client'

export default {
  setup(): void {
    const page = usePage<GitPluginPageData>()
    console.log(page.value.git)
  },
}
```

### git.createdTime

- 类型：`number`

- 详情：

  页面第一次提交的 Unix 时间戳（毫秒）。

  该属性会取当前页面以及 [gitInclude](#gitinclude) 中列出的文件的最早提交时间戳中的最小值。

### git.updatedTime

- 类型：`number`

- 详情：

  页面最后一次提交的 Unix 时间戳（毫秒）。

  该属性会取当前页面以及 [gitInclude](#gitinclude) 中列出的文件的最后提交时间戳中的最大值。

### git.contributors

- 类型：`GitContributorInfo[]`

```ts
interface GitContributorInfo {
  // 显示名称
  name: string
  email: string
  // git 托管服务上的用户名
  username: string
  commits: number
  avatar?: string
  url?: string
}
```

- 详情：

  页面的贡献者信息。

  该属性也会包含 [gitInclude](#gitinclude) 中列出的文件的贡献者。

### git.changelog

- 类型：`GitChangelogInfo[]`

```ts
interface CoAuthorInfo {
  /**
   * 共同作者姓名
   */
  name: string
  /**
   * 共同作者邮箱
   */
  email: string
}

interface GitChangelogInfo {
  /**
   * 提交哈希
   */
  hash: string
  /**
   * Unix 时间戳（毫秒）
   */
  time: number
  /**
   * 提交信息
   */
  message: string
  /**
   * 提交记录的 url
   */
  commitUrl?: string
  /**
   * 发布标签 (tag)
   */
  tag?: string
  /**
   * 发布标签的 url
   */
  tagUrl?: string
  /**
   * 提交作者姓名
   */
  author: string
  /**
   * 提交作者邮箱
   */
  email: string

  /**
   * 提交的共同作者
   */
  coAuthors?: CoAuthorInfo[]
}
```

- 详情：

  页面的变更日志。

  该属性也会包含 [gitInclude](#gitinclude) 中列出的文件的变更记录。

## Git 组件{#component}

本插件提供了与 Git 信息相关的全局组件，可在主题中直接使用。

### GitContributors

列出当前页面的贡献者信息。

```vue{4}
<template>
  <div vp-content>
    <Content />
    <GitContributors />
  </div>
</template>
```

**效果预览：**

<GitContributors :header-level="4" />

### GitChangelog

列出当前页面的变更日志。

```vue{4}
<template>
  <div vp-content>
    <Content />
    <GitChangelog />
  </div>
</template>
```

**效果预览：**

<GitChangelog :header-level="4" />
