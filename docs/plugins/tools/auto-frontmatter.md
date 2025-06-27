---
icon: pajamas:insert
---

# auto-frontmatter

<NpmBadge package="@vuepress/plugin-auto-frontmatter" />

Automatically insert frontmatter at the beginning of markdown files.

When VuePress starts, locate markdown files based on **matching rules**, use the `handle(data [,context])` function to generate frontmatter, and then add the frontmatter to the beginning of the markdown file.

::: tip The plugin only processes markdown files under the [source directory](https://v2.vuepress.vuejs.org/guide/getting-started.html#directory-structure) that meet the [config.pagePatterns](https://v2.vuepress.vuejs.org/reference/config.html#pagepatterns) rules.
:::

## Usage

```bash
npm i -D @vuepress/plugin-auto-frontmatter@next
```

```ts title=".vuepress/config.ts"
import { autoFrontmatterPlugin } from '@vuepress/plugin-auto-frontmatter'

export default {
  plugins: [
    autoFrontmatterPlugin({
      // options
    }),
  ],
}
```

## Options

```ts
export type AutoFrontmatterData = Record<string, unknown>

/**
 * The context of the markdown file
 */
export interface AutoFrontmatterContext {
  /**
   * The absolute path to the file
   */
  filepath: string
  /**
   * The relative path to the file
   */
  relativePath: string
  /**
   * The markdown content of the file
   */
  content: string
}

/**
 * The function to handle the frontmatter data
 */
export type AutoFrontmatterHandle<
  D extends AutoFrontmatterData = AutoFrontmatterData,
> = (data: D, context: AutoFrontmatterContext) => D | Promise<D>

export interface AutoFrontmatterRule {
  /**
   * File filter, matches the relative path of the file
   *
   * Uses [picomatch](https://github.com/micromatch/picomatch) for pattern matching
   */
  filter: string[] | string | ((filepath: string) => boolean)
  /**
   * The function to handle the frontmatter data
   */
  handle: AutoFrontmatterHandle
}

export type AutoFrontmatterPluginOptions =
  | AutoFrontmatterHandle
  | AutoFrontmatterRule
  | AutoFrontmatterRule[]
```

### Process all markdown files

Pass directly to the `AutoFrontmatterHandle` function, indicating processing for all markdown files:

```ts title=".vuepress/config.ts"
import path from 'node:path'
import { autoFrontmatterPlugin } from '@vuepress/plugin-auto-frontmatter'

export default {
  plugins: [
    autoFrontmatterPlugin((data, context) => {
      // automatically add title
      data.title = data.title || path.basename(context.relativePath, '.md')
      return data
    }),
  ],
}
```

### Configuring General Rules

Use `AutoFrontmatterRule` to configure filter rules and handle functions, matching the relative paths of files.

The `filter` parameter accepts one or more glob strings, using [picomatch](https://github.com/micromatch/picomatch) for pattern matching:

```ts title=".vuepress/config.ts"
import path from 'node:path'
import { autoFrontmatterPlugin } from '@vuepress/plugin-auto-frontmatter'

export default {
  plugins: [
    autoFrontmatterPlugin({
      filter: ['posts/**/*.md'], // [!code hl]
      handle: (data, context) => {
        data.title = data.title || path.basename(context.relativePath, '.md')
        return data
      },
    }),
  ],
}
```

If you need to exclude files, you can pass a glob string starting with `!` to the `filter`:

```ts title=".vuepress/config.ts"
import path from 'node:path'
import { autoFrontmatterPlugin } from '@vuepress/plugin-auto-frontmatter'

export default {
  plugins: [
    autoFrontmatterPlugin({
      // Match all files under `posts`, but exclude the `posts/foo` directory
      filter: ['posts/**/*.md', '!posts/foo'], // [!code hl]
      handle: (data, context) => {
        data.title = data.title || path.basename(context.relativePath, '.md')
        return data
      },
    }),
  ],
}
```

`filter` can also accept a function, where returning `true` indicates a match and returning `false` indicates no match:

```ts title=".vuepress/config.ts"
import path from 'node:path'
import { autoFrontmatterPlugin } from '@vuepress/plugin-auto-frontmatter'

export default {
  plugins: [
    autoFrontmatterPlugin({
      // 匹配 posts 下的所有文件
      filter: (relativePath) => relativePath.startsWith('posts'), // [!code hl]
      handle: (data, context) => {
        data.title = data.title || path.basename(context.relativePath, '.md')
        return data
      },
    }),
  ],
}
```

### Multiple General Rules

You can configure multiple filter rules and handle functions, allowing different processing for files in different directories:

```ts title=".vuepress/config.ts"
import path from 'node:path'
import { autoFrontmatterPlugin } from '@vuepress/plugin-auto-frontmatter'

export default {
  plugins: [
    autoFrontmatterPlugin([
      {
        // Match all files under `posts`
        filter: ['posts/**/*.md'], // [!code hl]
        handle: (data, context) => {
          data.title = data.title || path.basename(context.relativePath, '.md')
          return data
        },
      },
      {
        // Match all files under `others`
        filter: ['others/**/*.md'], // [!code hl]
        handle: (data, context) => {
          data.title = data.title || path.basename(context.relativePath, '.md')
          data.foo = 'foo'
          return data
        },
      },
    ]),
  ],
}
```

## Helper Functions

The plugin provides some built-in helper functions that can be used to add new fields to the `frontmatter`:

### `addTitleByFilename(data, context)`

```ts
function addTitleByFilename(
  data: AutoFrontmatterData,
  context: AutoFrontmatterContext,
): void
```

Add title based on filename:

```ts title=".vuepress/config.ts"
import path from 'node:path'
import {
  addTitleByFilename,
  autoFrontmatterPlugin,
} from '@vuepress/plugin-auto-frontmatter'

export default {
  plugins: [
    autoFrontmatterPlugin((data, context) => {
      addTitleByFilename(data, context) // [!code ++]
      return data
    }),
  ],
}
```

**Output**:

```md title="docs/guide.md"
---
title: guide
---
```

### `addCreateDate(data, context, options)`

```ts
interface AddCreateDateOptions {
  /**
   * The frontmatter key name used when adding time
   * @default "date"
   */
  key?: string

  /**
   * Date format used when adding time
   * @default "date"
   */
  format?: 'date' | 'full' | 'time'
}

function addCreateDate(
  data: AutoFrontmatterData,
  context: AutoFrontmatterContext,
  options?: AddCreateDateOptions,
): void
```

Add date based on file creation time. This function will first attempt to read the creation time from `git` records, and if unavailable, it will use `fs.stats` to obtain the creation time.

```ts title=".vuepress/config.ts"
import path from 'node:path'
import {
  addCreateDate,
  autoFrontmatterPlugin,
} from '@vuepress/plugin-auto-frontmatter'

export default {
  plugins: [
    autoFrontmatterPlugin((data, context) => {
      addCreateDate(data, context, { format: 'full' }) // [!code ++]
      return data
    }),
  ],
}
```

**Output**:

```md title="docs/guide.md"
---
date: 2025-01-01 11:11:11
---
```

### `addShortPermalink(data, options)`

```ts
interface AddShortPermalinkOptions {
  /**
   * Use `nanoid` to generate a random character length
   * @default 8
   */
  length?: number
  /**
   * add a prefix
   * @default `/`
   */
  prefix?: string
  /**
   * add a suffix
   * @default `.html`
   */
  suffix?: string
}

function addShortPermalink(
  data: AutoFrontmatterData,
  options: AddShortPermalinkOptions,
): void
```

Using `nanoid` to generate random characters as permalink:

```ts title=".vuepress/config.ts"
import path from 'node:path'
import {
  addShortPermalink,
  autoFrontmatterPlugin,
} from '@vuepress/plugin-auto-frontmatter'

export default {
  plugins: [
    autoFrontmatterPlugin((data, context) => {
      addShortPermalink(data, { length: 8, prefix: '/', suffix: '.html' }) // [!code ++]
      return data
    }),
  ],
}
```

**Output**:

```md title="docs/guide.md"
---
permalink: /abcd1234.html
---
```
