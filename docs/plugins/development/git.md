---
icon: la:git-alt
---

# git

<NpmBadge package="@vuepress/plugin-git" />

This plugin collects Git information for your pages, including creation and update timestamps, contributor lists, and changelogs.

The [lastUpdated](../../themes/default/config.md#lastupdated) and [contributors](../../themes/default/config.md#contributors) features in the default theme are powered by this plugin.

This plugin is primarily intended for theme development. In most cases, you will not need to use it directly.

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

This plugin requires your project to be located within a [Git Repository](https://git-scm.com/book/en/Git-Basics-Getting-a-Git-Repository) to properly collect data from the commit history.

Ensure that the full commit history is available when building your site. CI workflows often use [--depth 1](https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---depthltdepthgt) when cloning repositories to improve performance, which prevents the plugin from accessing the necessary history. You must disable this shallow clone behavior (usually by setting `fetch-depth: 0`) for the plugin to work correctly in CI environments.

::: warning
This plugin may significantly increase data preparation time during builds, especially for projects with a large number of pages. You may consider disabling this plugin in `dev` mode to improve the development experience.
:::

## Options

::: fields
@createdTime@ type=boolean default=`true`

Whether to collect the creation timestamp of the page.

@updatedTime@ type=boolean default=`true`

Whether to collect the update timestamp of the page.

@contributors@ type=`ContributorsOptions | boolean` default=`true`

Whether to collect contributor information for the page. You can also pass an object to configure it.

@@contributors.info@ type=`ContributorInfo[]`

Pre-defined contributor information.

@@@contributors.info[].username@ type=string required

The contributor's username on the Git hosting service.

@@@contributors.info[].name@ type=string

The contributor's display name on the page. Defaults to `username`.

@@@contributors.info[].alias@ type=`string[] | string`

Aliases for the contributor. Useful when a contributor's local Git username differs from their hosting service username. Use aliases to map them to the correct account.

@@@contributors.info[].email@ type=string

The primary email of the contributor.

@@@contributors.info[].emailAlias@ type=`string[] | string`

Alternative emails for the contributor (e.g., emails used in past commits).

@@@contributors.info[].avatar@ type=string

The avatar URL of the contributor. If the hosting service is `github`, this can be left blank, as the plugin will automatically populate it.

@@@contributors.info[].url@ type=string

The profile URL of the contributor. If the hosting service is `github`, this can be left blank, as the plugin will automatically populate it.

@@contributors.avatar@ type=boolean default=`false`

Whether to include avatars in contributor information.

@@contributors.avatarPattern@ type=string

The pattern for avatar URLs.

- `:username` - Contributor's username

@@contributors.transform@ type=`(contributors: GitContributorInfo[]) => GitContributorInfo[]`

A function to transform the contributors list (e.g., to deduplicate or sort). Accepts the list collected by the plugin and returns the transformed list.

@changelog@ type=`ChangelogOptions | boolean` default=`false`

Whether to collect the changelog for the page. You can also pass an object to configure it.

@@changelog.maxCount@ type=number

The maximum number of changelog entries to collect.

@@changelog.repoUrl@ type=string

The URL of the Git repository, e.g., `https://github.com/vuepress/ecosystem`.

@@changelog.commitUrlPattern@ type=string default=`':repo/commit/:hash'`

The pattern for commit URLs.

- `:repo` - The URL of the Git repository
- `:hash` - The hash of the commit

@@changelog.issueUrlPattern@ type=string default=`':repo/issues/:issue'`

The pattern for issue URLs.

- `:repo` - The URL of the Git repository
- `:issue` - The ID of the issue

@@changelog.tagUrlPattern@ type=string default=`':repo/releases/tag/:tag'`

The pattern for tag URLs.

- `:repo` - The URL of the Git repository
- `:tag` - The name of the tag

@filter@ type=`(page: Page) => boolean`

A function to filter pages. Git information will only be collected if this function returns `true`.

@locales@ type=`Record<string, GitLocaleData>`

Locale configuration, primarily used by the [Git Components](#component).

@@locales.contributors@ type=string

The title for the contributors section.

@@locales.changelog@ type=string

The title for the changelog section.

@@locales.timeOn@ type=string

The text representing a commit "on" a specific date.

@@locales.viewChangelog@ type=string

The text for the "View Changelog" button.

@@locales.latestUpdateAt@ type=string

The text for "Latest Updated".

:::

## Frontmatter

::: fields
@gitInclude@ type=`string[]`

An array of relative file paths. The Git history of these files will be included when calculating the current page's data (e.g., timestamps and contributors).

```md
---
gitInclude:
  - relative/path/to/file1
  - relative/path/to/file2
---
```

@contributors@ type=`boolean | string[]`

Controls the collection of contributor information for the current page. This overrides the global [contributors](#contributors) option.

- `true` - Enable collection.
- `false` - Disable collection.
- `string[]` - A list of additional contributors. Useful for manually specifying contributors who may not appear in the Git history.

@changelog@ type=boolean

Whether to collect the changelog for the current page. This overrides the global [changelog](#changelog) option.

:::

## Composables

You can import the following composables from `@vuepress/plugin-git/client`.

### useChangelog

Returns the changelog for the current page.

```ts
export interface CoAuthorInfo {
  /**
   * Co-author name
   */
  name: string
  /**
   * Co-author email
   */
  email: string
}

export interface GitChangelogItem extends GitChangelogInfo {
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
   * The URL of the commit
   */
  commitUrl?: string
  /**
   * Release tag associated with the commit
   */
  tag?: string
  /**
   * The URL of the release tag
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
   * Formatted date string of the commit
   */
  date: string
}

export const useChangelog: (
  enabled?: MaybeRefOrGetter<boolean>,
) => ComputedRef<GitChangelogItem[]>
```

### useContributors

Returns the list of contributors for the current page.

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
   * Contributor username on the Git hosting service
   */
  username: string
  /**
   * Number of commits
   */
  commits: number
  /**
   * Contributor avatar URL
   */
  avatar?: string
  /**
   * Contributor profile URL
   */
  url?: string
}

export const useContributors: (
  enabled?: MaybeRefOrGetter<boolean>,
) => ComputedRef<GitContributorInfo[]>
```

### useLastUpdated

Returns the last updated time of the current page.

```ts
export interface LastUpdated {
  /**
   * The Date object of the last updated time
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
   * The locale string for the date format
   */
  locale: string
}

export const useLastUpdated: (
  enabled?: MaybeRefOrGetter<boolean>,
) => ComputedRef<LastUpdated | null>
```

## Page Data

This plugin injects a `git` field into the page data.

You can access the collected Git information via the page data object:

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

- Type: `number`

- Details:

  The Unix timestamp (in milliseconds) of the page's first commit.

  This value reflects the earliest commit timestamp among the current page and any files listed in [gitInclude](#gitinclude).

### git.updatedTime

- Type: `number`

- Details:

  The Unix timestamp (in milliseconds) of the page's last commit.

  This value reflects the latest commit timestamp among the current page and any files listed in [gitInclude](#gitinclude).

### git.contributors

- Type: `GitContributorInfo[]`

```ts
interface GitContributorInfo {
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

- Details:

  The list of contributors for the page.

  This list includes contributors from the current page and any files listed in [gitInclude](#gitinclude).

### git.changelog

- Type: `GitChangelogInfo[]`

```ts
interface CoAuthorInfo {
  /**
   * Co-author name
   */
  name: string
  /**
   * Co-author email
   */
  email: string
}

interface GitChangelogInfo {
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
   * The URL of the commit
   */
  commitUrl?: string
  /**
   * Release tag associated with the commit
   */
  tag?: string
  /**
   * The URL of the release tag
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
}
```

- Details:

  The changelog for the page.

  This list includes commit history from the current page and any files listed in [gitInclude](#gitinclude).

## Git Component{#component}

The plugin registers global components for displaying Git information, which can be easily used within themes.

### GitContributors

Displays a list of contributors for the current page.

```vue{4}
<template>
  <div vp-content>
    <Content />
    <GitContributors />
  </div>
</template>
```

**Preview:**

<GitContributors :header-level="4" />

### GitChangelog

Displays the changelog for the current page.

```vue{4}
<template>
  <div vp-content>
    <Content />
    <GitChangelog />
  </div>
</template>
```

**Preview:**

<GitChangelog :header-level="4" />
