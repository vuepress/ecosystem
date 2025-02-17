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

```ts
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
    transform?: (contributors: GitContributor[]) => GitContributor[]
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
     * 默认值：':repo/commit/:hash'
     *
     * - `:repo` - git 仓库的访问地址
     * - `:hash` - 提交记录的 hash
     */
    commitUrlPattern?: string

    /**
     * issue 访问地址模式
     * 默认值：':repo/issues/:issue'
     *
     * - `:repo` - git 仓库的访问地址
     * - `:issue` - issue 的 id
     */
    issueUrlPattern?: string

    /**
     * tag 访问地址模式,
     * 默认值：':repo/releases/tag/:tag'
     *
     * - `:repo` - git 仓库的访问地址
     * - `:tag` - tag 的名称
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

- 类型: `boolean | string[]`

- 详情：

  当前页面是否获取贡献者信息，该值会覆盖 [contributors](#contributors) 配置项。

  - `true` - 获取贡献者信息
  - `false` - 不获取贡献者信息
  - `string[]` - 额外的贡献者名单，有时候页面存在额外的贡献者，可以通过这个配置项来指定额外的贡献者名单来获取贡献者信息

### changelog

- 类型： `boolean`

- 详情：

  当前页面是否获取变更历史记录，该值会覆盖 [changelog](#changelog) 配置项。

## 页面数据

该插件会向页面数据中添加一个 `git` 字段。

在使用该插件后，可以在页面数据中获取该插件收集到的 Git 信息：

```ts
import type { GitPluginPageData } from '@vuepress/plugin-git'
import { usePageData } from 'vuepress/client'

export default {
  setup(): void {
    const page = usePageData<GitPluginPageData>()
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

- 类型： `GitContributor[]`

```ts
interface GitContributor {
  // 在页面中显示的贡献者名称
  name: string
  email: string
  // 在 git 托管服务中的用户名
  username: string
  commits: number
  avatar?: string
  url?: string
}
```

- 详情：

  页面的贡献者信息。

  该属性将会包含 [gitInclude](#gitinclude) 所列文件的贡献者。

### git.changelog

- 类型： `GitChangelog[]`

```ts
interface GitChangelog {
  /**
   * 提交 hash
   */
  hash: string
  /**
   * Unix 时间戳，单位毫秒，提交时间
   */
  date: number
  /**
   * 提交信息
   */
  message: string
  /**
   * 提交者名称
   */
  author: string
  /**
   * 提交者邮箱
   */
  email: string
  /**
   * 提交访问地址
   */
  commitUrl?: string
  /**
   * tag 访问地址
   */
  tagUrl?: string
  /**
   * 协同作者列表
   */
  coAuthors?: {
    name: string
    email: string
  }[]
}
```

- 详情：

  页面的变更历史记录。

  该属性将会包含 [gitInclude](#gitinclude) 所列文件的变更历史记录。
