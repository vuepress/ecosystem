---
icon: la:git-alt
---

# git

<NpmBadge package="@vuepress/plugin-git" />

该插件会收集你的页面的 Git 信息，包括创建和更新时间、贡献者、变更历史记录等。

默认主题的 [lastUpdated](../../themes/default/config.md#lastupdated) 和 [contributors](../../themes/default/config.md#contributors) 就是由该插件支持的。

该插件主要用于开发主题，大部分情况下你不需要直接使用它。

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

该插件要求你的项目在 [Git 仓库](https://git-scm.com/book/en/Git-Basics-Getting-a-Git-Repository) 下，这样它才能从提交历史记录中收集信息。

在构建站点时，你应该确保所有的提交记录是可以获取到的。举例来说， CI 工作流通常会在克隆你的仓库时添加 [--depth 1](https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---depthltdepthgt) 参数来避免拉取全部的提交记录，因此你需要禁用这个功能，以便该插件在 CI 可以中正常使用。

::: warning
该插件会显著降低准备数据的速度，特别是在你的页面数量很多的时候。你可以考虑在 `dev` 模式下禁用该插件来获取更好的开发体验。
:::

## 配置项

### createdTime

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否收集页面的创建时间。

### updatedTime

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否收集页面的更新时间。

### contributors

- 类型： `boolean | ContributorsOptions`

  ```ts
  interface ContributorInfo {
    /**
     * 贡献者在 git 托管服务中的用户名
     */
    username: string
    /**
     * 贡献者显示在页面上的名字， 默认为 `username`
     */
    name?: string
    /**
     * 贡献者别名， 由于贡献者可能在本地 git 配置中保存的 用户名与 git 托管服务用户名不一致，
     * 这时候可以通过别名映射到真实的用户名
     */
    alias?: string[] | string
    /**
     * 贡献者在 Git 托管服务中的主邮箱
     */
    email?: string
    /**
     * 贡献者在 Git 托管服务中的备用邮箱，或者曾经使用过的邮箱
     */
    emailAlias?: string[] | string
    /**
     * 贡献者头像地址
     * 如果 git 托管服务为 `github`，则可以忽略不填，由插件自动填充
     */
    avatar?: string
    /**
     * 头像访问地址模式
     * - `:username` - 贡献者的用户名
     *
     * @example 'https://github.com/:username'
     */
    avatarPattern?: string
    /**
     * 贡献者访问地址
     * 如果 git 托管服务为 `github`，则可以忽略不填，由插件自动填充
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
     * 贡献者转换函数，例如去重和排序
     * 该函数接收一个贡献者信息数组，返回一个新的贡献者信息数组。
     */
    transform?: (contributors: GitContributorInfo[]) => GitContributorInfo[]
  }
  ```

- 默认值： `true`

- 详情：

  是否收集页面的贡献者。

### changelog

- 类型： `boolean | ChangelogOptions`

  ```ts
  interface ChangelogOptions {
    /**
     * 最大变更记录条数
     */
    maxCount?: number

    /**
     * git 仓库的访问地址，例如：https://github.com/vuepress/ecosystem
     */
    repoUrl?: string

    /**
     * 提交记录访问地址模式
     *
     * - `:repo` - git 仓库的访问地址
     * - `:hash` - 提交记录的 hash
     *
     * @default ':repo/commit/:hash'
     */
    commitUrlPattern?: string

    /**
     * issue 访问地址模式
     *
     * - `:repo` - git 仓库的访问地址
     * - `:issue` - issue 的 id
     *
     * @default ':repo/issues/:issue'
     */
    issueUrlPattern?: string

    /**
     * tag 访问地址模式
     *
     * - `:repo` - git 仓库的访问地址
     * - `:tag` - tag 的名称
     *
     * @default ':repo/releases/tag/:tag'
     */
    tagUrlPattern?: string
  }
  ```

- 默认值： `false`

- 详情：

  是否收集页面变更历史记录。

### filter

- 类型： `(page: Page) => boolean`

- 详情：

  页面过滤器，如果返回 `true` ，该页面将收集 git 信息

### locales

- 类型： `Record<string, GitLocaleData>`

  ```ts
  export interface GitLocaleData {
    /**
     * 贡献者 标题
     */
    contributors: string
    /**
     * 更新日志 标题
     */
    changelog: string
    /**
     * 更新 `于` 文本
     */
    timeOn: string
    /**
     * 查看更新日志 文本
     */
    viewChangelog: string
    /**
     * 最近更新 文本
     */
    latestUpdateAt: string
  }
  ```

- 详情：

  多语言配置，在 [Git 组件](#component) 中使用。

## Frontmatter

### gitInclude

- 类型： `string[]`

- 详情：

  文件相对路径组成的数组，该数组中的文件会在计算页面数据时被包含在内。

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

  当前页面是否获取贡献者信息，该值会覆盖 [contributors](#contributors) 配置项。
  - `true` - 获取贡献者信息
  - `false` - 不获取贡献者信息
  - `string[]` - 额外的贡献者名单，有时候页面存在额外的贡献者，可以通过这个配置项来指定额外的贡献者名单来获取贡献者信息

### changelog

- 类型： `boolean`

- 详情：

  当前页面是否获取变更历史记录，该值会覆盖 [changelog](#changelog) 配置项。

## 可组合式 API

你可以从 `@vuepress/plugin-git/client` 中导入以下可组合式 API。

### useChangelog

获取当前页面的变更历史记录。

```ts
export interface CoAuthorInfo {
  /**
   * 协同作者名称
   */
  name: string
  /**
   * 协同作者邮箱
   */
  email: string
}

export interface GitChangelogItem {
  /**
   * 提交哈希
   */
  hash: string
  /**
   * Unix 时间戳，单位毫秒
   */
  time: number
  /**
   * 提交信息
   */
  message: string
  /**
   * 提交访问地址
   */
  commitUrl?: string
  /**
   * 发布标签
   */
  tag?: string
  /**
   * 标签访问地址
   */
  tagUrl?: string
  /**
   * 提交作者名称
   */
  author: string
  /**
   * 提交作者邮箱
   */
  email: string

  /**
   * 提交协同作者列表
   */
  coAuthors?: CoAuthorInfo[]

  /**
   * 提交日期文本
   */
  date: string
}

export const useChangelog: (
  enabled?: MaybeRefOrGetter<boolean>,
) => ComputedRef<GitChangelogItem[]>
```

### useContributors

获取当前页面的贡献者信息。

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
   * 贡献者在 git 托管服务中的用户名
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
   * 贡献者访问地址
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
   * 最后更新时间的日期对象
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

该插件会向页面数据中添加一个 `git` 字段。

在使用该插件后，可以在页面数据中获取该插件收集到的 Git 信息：

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

- 类型： `number`

- 详情：

  页面第一次提交的 Unix 毫秒时间戳。

  该属性将取当前页面及 [gitInclude](#gitinclude) 中所列文件的第一次提交的时间戳的最小值。

### git.updatedTime

- 类型： `number`

- 详情：

  页面最后一次提交的 Unix 毫秒时间戳。

  该属性将取当前页面及 [gitInclude](#gitinclude) 中所列文件的最后一次提交的时间戳的最大值。

### git.contributors

- 类型： `GitContributorInfo[]`

```ts
interface GitContributorInfo {
  // 在页面中显示的贡献者名称
  name: string
  // 贡献者邮箱
  email: string
  // 在 git 托管服务中的用户名
  username: string
  // 提交次数
  commits: number
  // 贡献者头像
  avatar?: string
  // 贡献者访问地址
  url?: string
}
```

- 详情：

  页面的贡献者信息。

  该属性将会包含 [gitInclude](#gitinclude) 所列文件的贡献者。

### git.changelog

- 类型： `GitChangelogInfo[]`

```ts
interface CoAuthorInfo {
  /**
   * 协同作者名称
   */
  name: string
  /**
   * 协同作者邮箱
   */
  email: string
}

interface GitChangelogInfo {
  /**
   * 提交哈希
   */
  hash: string
  /**
   * Unix 时间戳，单位毫秒
   */
  time: number
  /**
   * 提交信息
   */
  message: string
  /**
   * 提交访问地址
   */
  commitUrl?: string
  /**
   * 发布标签
   */
  tag?: string
  /**
   * 标签访问地址
   */
  tagUrl?: string
  /**
   * 提交者名称
   */
  author: string
  /**
   * 提交者邮箱
   */
  email: string

  /**
   * 协同作者列表
   */
  coAuthors?: CoAuthorInfo[]
}
```

- 详情：

  页面的变更历史记录。

  该属性将会包含 [gitInclude](#gitinclude) 所列文件的变更历史记录。

## Git 组件{#component}

插件提供了与 Git 信息相关的全局组件，可以在主题中使用。

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

列出当前页面的变更历史记录。

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
