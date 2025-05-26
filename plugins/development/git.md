---
url: /plugins/development/git.md
---
# git

This plugin will collect git information of your pages, including the created and updated time, the contributors, the changelog, etc.

The [lastUpdated](../../themes/default/config.md#lastupdated) and [contributors](../../themes/default/config.md#contributors) of default theme is powered by this plugin.

This plugin is mainly used to develop themes. You won't need to use it directly in most cases.

## Usage

```bash
npm i -D @vuepress/plugin-git@next
```

```ts title=".vuepress/config.ts"
import { gitPlugin } from '@vuepress/plugin-git'

export default {
  plugins: [
    gitPlugin({
      // options
    }),
  ],
}
```

## Git Repository

This plugin requires your project to be inside a [Git Repository](https://git-scm.com/book/en/Git-Basics-Getting-a-Git-Repository), so that it can collect information from the commit history.

You should ensure all commits are available when building your site. For example, CI workflows usually clone your repository with [--depth 1](https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---depthltdepthgt) to avoid fetching all commits, so you should disable the behavior to make this plugin work properly in CI.

::: warning
This plugin will significantly slow down the speed of data preparation, especially when you have a lot of pages. You can consider disabling this plugin in `dev` mode to get better development experience.
:::

## Options

### createdTime

* Type: `boolean`

* Default: `true`

* Details:

  Whether to collect page created time or not.

### updatedTime

* Type: `boolean`

* Default: `true`

* Details:

  Whether to collect page updated time or not.

### contributors

* Type: `boolean | ContributorsOptions`

  ```ts
  interface ContributorInfo {
    /**
     * Contributor's username on the git hosting service
     */
    username: string
    /**
     * Contributor name displayed on the page, default is `username`
     */
    name?: string
    /**
     * The alias of the contributor,
     * Since contributors may have different usernames saved in their local git configuration
     * compared to their usernames on the hosting service, In this case, aliases can be used to
     * map to the actual usernames.
     */
    alias?: string[] | string
    /**
     * The primary email of the contributor
     */
    email?: string
    /**
     * The alternative emails of the contributor on the Git hosting service,
     * or emails they have used in the past.
     */
    emailAlias?: string[] | string
    /**
     * The avatar url of the contributor.
     *
     * If the git hosting service is `github`, it can be ignored and left blank,
     * as the plugin will automatically fill it in.
     */
    avatar?: string
    /**
     * The url of the contributor
     *
     * If the git hosting service is `github`, it can be ignored and left blank,
     * as the plugin will automatically fill it in.
     */
    url?: string
  }

  interface ContributorsOptions {
    /**
     * Contributor information
     */
    info?: ContributorInfo[]

    /**
     * Whether to add avatar in contributor information
     * @default false
     */
    avatar?: boolean

    /**
     * Avatar url pattern
     * - `:username` - Contributor's username
     *
     * @example 'https://github.com/:username'
     */
    avatarPattern?: string

    /**
     * Functions to transform contributors, e.g. remove duplicates ones and sort them.
     * The input is the contributors collected by this plugin, and the output should be the transformed contributors.
     */
    transform?: (contributors: GitContributor[]) => GitContributor[]
  }
  ```

* Default: `true`

* Details:

  Whether to collect page contributors or not.

### changelog

* Type: `boolean | ChangelogOptions`

  ```ts
  interface ChangelogOptions {
    /**
     * Maximum number of changelog
     */
    maxCount?: number

    /**
     * The url of the git repository, e.g: https://github.com/vuepress/ecosystem
     */
    repoUrl?: string

    /**
     * Commit url pattern
     * Default: ':repo/commit/:hash'
     *
     * - `:repo` - The url of the git repository
     * - `:hash` - Hash of the commit record
     */
    commitUrlPattern?: string

    /**
     * Issue url pattern
     * Default: ':repo/issues/:issue'
     *
     * - `:repo` - The url of the git repository
     * - `:issue` - Id of the issue
     */
    issueUrlPattern?: string

    /**
     * Tag url pattern
     * Default: ':repo/releases/tag/:tag'
     *
     * - `:repo` - The url of the git repository
     * - `:tag` - Name of the tag
     */
    tagUrlPattern?: string
  }
  ```

* Default: `false`

* Details:

  Whether to collect page changelog or not.

### filter

* Type: `(page: Page) => boolean`

* Details:

  Page filter, if it returns `true`, the page will collect git information.

### locales

* Type: `Record<string, GitLocaleData>`

  ```ts
  export interface GitLocaleData {
    /**
     * Contributors title
     */
    contributors: string

    /**
     * Changelog title
     */
    changelog: string

    /**
     * Word to represent a commit "on" a time
     */
    timeOn: string

    /**
     * Changelog button
     */
    viewChangelog: string

    /**
     * Latest updated
     */
    latestUpdateAt: string
  }
  ```

* Details:

  Locales configuration, used in the [Git Component](#component).

## Frontmatter

### gitInclude

* Type: `string[]`

* Details:

  An array of relative paths to be included when calculating page data.

* Example:

```md
---
gitInclude:
  - relative/path/to/file1
  - relative/path/to/file2
---
```

### contributors

* Type: `boolean | string[]`

* Details:

  Whether to collect contributor information for the current page, this value will override the [contributors](#contributors) configuration item.

  * `true` - Collect contributor information
  * `false` - Do not collect contributor information
  * `string[]` - List of additional contributors, sometimes there are additional contributors on the page, and this configuration item can be used to specify the list of additional contributors to obtain contributor information

### changelog

* Type: `boolean`

* Details:

  Whether to collect the change history for the current page, this value will override the [changelog](#changelog) configuration item.

## Composables

You can import the following composables from `@vuepress/plugin-git/client`.

### useChangelog

Get the changelog of the current page.

```ts
export interface GitChangelogItem {
  /**
   * Commit hash
   */
  hash: string
  /**
   * Unix timestamp in milliseconds
   */
  time: number
  /**
   * Commit message
   */
  message: string
  /**
   * The url of the commit
   */
  commitUrl?: string
  /**
   * release tag
   */
  tag?: string
  /**
   * The url of the release tag
   */
  tagUrl?: string
  /**
   * Commit author name
   */
  author: string
  /**
   * Commit author email
   */
  email: string

  /**
   * The co-authors of the commit
   */
  coAuthors?: CoAuthorInfo[]
  /**
   * Date text of the commit
   */
  date: string
}

export const useChangelog: (
  enabled?: MaybeRefOrGetter<boolean>,
) => ComputedRef<GitChangelogItem[]>
```

### useContributors

Get the contributors of the current page.

```ts
export interface GitContributorInfo {
  /**
   * Contributor display name
   */
  name: string
  /**
   * Contributor email
   */
  email: string

  /**
   * Contributor username on the git hosting service
   */
  username: string
  /**
   * Number of commits
   */
  commits: number
  /**
   * Contributor avatar
   */
  avatar?: string
  /**
   * The url of the contributor
   */
  url?: string
}

export const useContributors: (
  enabled?: MaybeRefOrGetter<boolean>,
) => ComputedRef<GitContributorInfo[]>
```

### useLastUpdated

Get the last updated time of the current page.

```ts
export interface LastUpdated {
  /**
   * The date object of the last updated time
   */
  date: Date
  /**
   * The ISO string of the last updated time
   */
  iso: string
  /**
   * The formatted text of the last updated time
   */
  text: string
  /**
   * The locale of the last updated time
   */
  locale: string
}

export const useLastUpdated: (
  enabled?: MaybeRefOrGetter<boolean>,
) => ComputedRef<LastUpdated | null>
```

## Page Data

This plugin will add a `git` field to page data.

After using this plugin, you can get the collected git information in page data:

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

* Type: `number`

* Details:

  Unix timestamp in milliseconds of the first commit of the page.

  This attribute would take the minimum of the first commit timestamps of the current page and the files listed in [gitInclude](#gitinclude).

### git.updatedTime

* Type: `number`

* Details:

  Unix timestamp in milliseconds of the last commit of the page.

  This attribute would take the maximum of the last commit timestamps of the current page and the files listed in [gitInclude](#gitinclude).

### git.contributors

* Type: `GitContributor[]`

```ts
interface GitContributor {
  // display name
  name: string
  email: string
  // username on the git hosting service
  username: string
  commits: number
  avatar?: string
  url?: string
}
```

* Details:

  The contributors information of the page.

  This attribute would also include contributors to the files listed in [gitInclude](#gitinclude).

### git.changelog

* 类型： `GitChangelog[]`

```ts
interface GitChangelog {
  /**
   * Commit hash
   */
  hash: string
  /**
   * Unix timestamp in milliseconds
   */
  date: number
  /**
   * Commit message
   */
  message: string
  /**
   * Commit author name
   */
  author: string
  /**
   * Commit author email
   */
  email: string
  /**
   * The url of the commit
   */
  commitUrl?: string
  /**
   * The url of the release tag
   */
  tagUrl?: string

  /**
   * The list of co-authors
   */
  coAuthors?: {
    name: string
    email: string
  }[]
}
```

* Details:

  The changelog of the page.

  This attribute would also include contributors to the files listed in [gitInclude](#gitinclude).

## Git Component{#component}

The plugin provides global components related to Git information, which can be used in themes.

### GitContributors

List the contributor information for the current page.

```vue{4}
<template>
  <div vp-content>
    <Content />
    <GitContributors />
  </div>
</template>
```

**Effect Preview:**

### GitChangelog

List the changelog of the current page.

```vue{4}
<template>
  <div vp-content>
    <Content />
    <GitChangelog />
  </div>
</template>
```

**Effect Preview:**
