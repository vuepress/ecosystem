---
url: /ecosystem/plugins/tools/auto-frontmatter.md
---
# auto-frontmatter

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

## Guide

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

## Options

`autoFrontmatterPlugin` accepts a frontmatter handle function, a rule object, or an array of rule objects.

::: fields
@`filter` type=`string[] | string | ((relativePath: string) => boolean)`

File filter, matches the relative path of the file.

Uses [picomatch](https://github.com/micromatch/picomatch) for pattern matching.

Pass a glob string, an array of glob strings (a string starting with `!` excludes files), or a function returning whether the file matches.

@`handle` type=`(data: AutoFrontmatterData, context: AutoFrontmatterContext) => AutoFrontmatterData | Promise<AutoFrontmatterData>`

The function to handle the frontmatter data.

`data` is the frontmatter data (`Record<string, unknown>`), `context` contains:

* `filepath`: The absolute path to the file.
* `relativePath`: The relative path to the file.
* `content`: The markdown content of the file.

:::

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

### `createPermalink(options)`

```ts
interface PermalinkOptions {
  /**
   * Algorithm used to derive the permalink value
   * @default 'crc32'
   */
  algorithm?: 'crc16' | 'crc32' | 'md5' | 'sha1' | 'sha256' | 'nanoid'

  /**
   * Encoding of a numeric hash, only applies to `crc16` and `crc32`
   * @default 'hex'
   */
  encoding?: 'hex' | 'dec'

  /**
   * Source used as the seed of the permalink
   * @default 'path'
   */
  source?: 'path' | 'content'

  /**
   * Amount of characters kept from the generated value, `0` keeps all
   * @default 8
   */
  length?: number

  /**
   * Prefix of the permalink
   * @default '/'
   */
  prefix?: string

  /**
   * Suffix of the permalink
   * @default '.html'
   */
  suffix?: string

  /**
   * Whether to overwrite existing permalinks
   * @default false
   */
  force?: boolean

  /**
   * Permalinks that are already used and must not be generated again
   */
  reserved?: Iterable<string>
}

function createPermalink(options?: PermalinkOptions): PermalinkHandle
```

Create a handler that derives a permalink from the file, similar to hexo's `abbrlink`.

The value is derived from the file path (or the content) instead of being random, so it is stable and reproducible. The handler also keeps a registry of used permalinks: before handling the files, the plugin reserves every permalink already written in the frontmatter, and a conflicting value gets an extra counter appended to its seed until it is unique.

```ts title=".vuepress/config.ts"
import {
  autoFrontmatterPlugin,
  createPermalink,
} from '@vuepress/plugin-auto-frontmatter'

export default {
  plugins: [
    autoFrontmatterPlugin({
      filter: 'posts/**/*.md', // [!code hl]
      handle: createPermalink({ prefix: '/posts/', source: 'path' }),
    }),
  ],
}
```

**Output**:

```md title="docs/posts/hello.md"
---
permalink: /posts/3f6a1b2c.html
---
```

::: tip `source`

* `path`: the permalink only depends on the file path, so rewriting the title or the body never breaks the link.
* `content`: the permalink depends on the body without the frontmatter, so any content change breaks the link.

:::

::: tip `algorithm` and `encoding`

* `crc16` / `crc32` produce a short checksum, which fits a short link best.
* `md5` / `sha1` / `sha256` produce a longer hash.
* `nanoid` produces a random string, which is **not** reproducible, and is kept for compatibility only.
* A checksum is zero padded to keep a stable length, so `length` only truncates it: `crc16` is 4 hex characters or 5 digits, `crc32` is 8 or 10.
* `encoding: 'dec'` only applies to `crc16` and `crc32`, every other algorithm uses hex.
* `nanoid` always generates exactly `length` characters, so `length: 0` falls back to 8 for it.

:::

::: warning
A page with `permalink: null` is left untouched, because `null` is how VuePress is told that the page has no permalink.
:::

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

::: warning
The value is random, so it cannot be reproduced once the frontmatter is lost, and it cannot guarantee that two files get different permalinks. Use `createPermalink` instead.
:::
