---
icon: pajamas:insert
---

# auto-frontmatter

<NpmBadge package="@vuepress/plugin-auto-frontmatter" />

在 markdown 文件的头部自动插入 frontmatter。

当 VuePress 启动时，根据 **匹配规则** 查找 markdown 文件，使用 `handle(data [,context])`
函数来生成 frontmatter，然后将 frontmatter 添加到 markdown 文件的头部。

::: tip 插件仅处理 [源文件目录](https://v2.vuepress.vuejs.org/zh/guide/getting-started.html#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84) 下的满足 [config.pagePatterns](https://v2.vuepress.vuejs.org/zh/reference/config.html#pagepatterns) 规则的 markdown 文件
:::

## 使用方法 {#usage}

```bash
npm i -D @vuepress/plugin-auto-frontmatter@next
```

```ts title=".vuepress/config.ts"
import { autoFrontmatterPlugin } from '@vuepress/plugin-auto-frontmatter'

export default {
  plugins: [
    autoFrontmatterPlugin({
      // 配置项
    }),
  ],
}
```

## 指南 {#guide}

### 处理所有 markdown 文件 {#process-all-markdown-files}

直接传入 `AutoFrontmatterHandle` 函数，表示对所有的 markdown 文件进行处理：

```ts title=".vuepress/config.ts"
import path from 'node:path'

import { autoFrontmatterPlugin } from '@vuepress/plugin-auto-frontmatter'

export default {
  plugins: [
    autoFrontmatterPlugin((data, context) => {
      // 自动填充 title
      data.title = data.title || path.basename(context.relativePath, '.md')
      return data
    }),
  ],
}
```

### 配置生成规则 {#configuring-general-rules}

使用 `AutoFrontmatterRule` 配置过滤规则和处理器，匹配文件的相对路径。

`filter` 参数接收一个或多个 glob 字符串，使用 [picomatch](https://github.com/micromatch/picomatch) 进行模式匹配：

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

如果需要排除文件，可以向 `filter` 传入以 `!` 开头的 glob 字符串：

```ts title=".vuepress/config.ts"
import path from 'node:path'

import { autoFrontmatterPlugin } from '@vuepress/plugin-auto-frontmatter'

export default {
  plugins: [
    autoFrontmatterPlugin({
      // 匹配 `posts` 下的所有文件，但是排除 `posts/foo` 目录
      filter: ['posts/**/*.md', '!posts/foo'], // [!code hl]
      handle: (data, context) => {
        data.title = data.title || path.basename(context.relativePath, '.md')
        return data
      },
    }),
  ],
}
```

`filter` 也可以传入一个函数，返回 `true` 表示匹配，返回 `false` 表示不匹配：

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

### 多个生成规则 {#multiple-general-rules}

可以同时配置多个过滤规则和处理器，这样可以针对不同的目录下的文件进行不同的处理：

```ts title=".vuepress/config.ts"
import path from 'node:path'

import { autoFrontmatterPlugin } from '@vuepress/plugin-auto-frontmatter'

export default {
  plugins: [
    autoFrontmatterPlugin([
      {
        // 匹配 posts 下的所有文件
        filter: ['posts/**/*.md'], // [!code hl]
        handle: (data, context) => {
          data.title = data.title || path.basename(context.relativePath, '.md')
          return data
        },
      },
      {
        // 匹配 others 下的所有文件
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

## 选项 {#options}

`autoFrontmatterPlugin` 接受 frontmatter 处理函数、规则对象，或规则对象数组。

::: fields
@`filter` type=`string[] | string | ((relativePath: string) => boolean)`

文件过滤器，匹配文件的相对路径。

使用 [picomatch](https://github.com/micromatch/picomatch) 进行模式匹配。

可以传入 glob 字符串、glob 字符串数组（以 `!` 开头的字符串用于排除文件），或返回文件是否匹配的函数。

@`handle` type=`(data: AutoFrontmatterData, context: AutoFrontmatterContext) => AutoFrontmatterData | Promise<AutoFrontmatterData>`

处理 frontmatter 数据的函数。

`data` 为 frontmatter 数据（`Record<string, unknown>`），`context` 包含：

- `filepath`: 文件绝对路径。
- `relativePath`: 文件相对路径。
- `content`: 文件 markdown 内容。

:::

## 帮助函数 {#helper-functions}

插件提供了一些内置的帮助函数，可用于向 `frontmatter` 中添加新的字段：

### `addTitleByFilename(data, context)`

```ts
function addTitleByFilename(
  data: AutoFrontmatterData,
  context: AutoFrontmatterContext,
): void
```

根据文件名添加 title：

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

**输出**：

```md title="docs/guide.md"
---
title: guide
---
```

### `addCreateDate(data, context, options)`

```ts
interface AddCreateDateOptions {
  /**
   * 添加时间时使用的 frontmatter 键名
   *
   * @default 'date'
   */
  key?: string

  /**
   * 添加时间时使用的日期格式
   *
   * @default 'date'
   */
  format?: 'date' | 'full' | 'time'
}

function addCreateDate(
  data: AutoFrontmatterData,
  context: AutoFrontmatterContext,
  options?: AddCreateDateOptions,
): void
```

根据文件创建时间添加 date，该函数会优先从 `git` 记录中读取创建时间，如果没有则使用 `fs.stats` 获取创建时间。

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

**输出**：

```md title="docs/guide.md"
---
date: 2025-01-01 11:11:11
---
```

### `createPermalink(options)`

```ts
interface PermalinkOptions {
  /**
   * 派生永久链接值的算法
   *
   * @default 'crc32'
   */
  algorithm?: 'crc16' | 'crc32' | 'md5' | 'sha1' | 'sha256' | 'nanoid'

  /**
   * 数值哈希的编码方式，仅对 `crc16` 与 `crc32` 生效
   *
   * @default 'hex'
   */
  encoding?: 'hex' | 'dec'

  /**
   * 永久链接种子的来源
   *
   * @default 'path'
   */
  source?: 'path' | 'content'

  /**
   * 保留的生成值字符数，`0` 表示不截断
   *
   * @default 8
   */
  length?: number

  /**
   * 永久链接前缀
   *
   * @default '/'
   */
  prefix?: string

  /**
   * 永久链接后缀
   *
   * @default '.html'
   */
  suffix?: string

  /**
   * 是否覆盖已有的永久链接
   *
   * @default false
   */
  force?: boolean

  /** 已被使用、不可再生成的永久链接 */
  reserved?: Iterable<string>
}

function createPermalink(options?: PermalinkOptions): PermalinkHandle
```

创建一个从文件派生永久链接的处理器，类似 hexo 的 `abbrlink`。

该值由文件路径（或内容）派生而来，而不是随机的，因此是稳定且可复现的。处理器还会维护已用永久链接的登记表：处理文件前，插件会把 frontmatter 中已存在的永久链接全部保留，发生冲突时会在种子上追加计数器，直到值唯一。

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

**输出**：

```md title="docs/posts/hello.md"
---
permalink: /posts/3f6a1b2c.html
---
```

::: tip `source`

- `path`：永久链接只取决于文件路径，因此修改标题或正文都不会破坏链接。
- `content`：永久链接取决于不含 frontmatter 的正文，因此内容一变链接就会失效。

:::

::: tip `algorithm` 与 `encoding`

- `crc16` / `crc32` 生成较短的校验和，最适合做短链接。
- `md5` / `sha1` / `sha256` 生成更长的哈希。
- `nanoid` 生成随机字符串，**不可复现**，仅为兼容而保留。
- 校验和会补零以保持长度稳定，因此 `length` 只会截断它：`crc16` 为 4 位十六进制或 5 位十进制，`crc32` 为 8 位或 10 位。
- `encoding: 'dec'` 仅对 `crc16` 与 `crc32` 生效，其他算法始终使用十六进制。
- `nanoid` 始终生成恰好 `length` 个字符，因此对它而言 `length: 0` 会回退为 8。

:::

::: warning
frontmatter 中带有 `permalink: null` 的页面不会被改动，因为 `null` 是告诉 VuePress 该页面没有永久链接的方式。
:::

### `addShortPermalink(data, options)`

```ts
interface AddShortPermalinkOptions {
  /**
   * 使用 `nanoid` 生成随机字符长度
   *
   * @default 8
   */
  length?: number
  /**
   * 前缀
   *
   * @default `/`
   */
  prefix?: string
  /**
   * 后缀
   *
   * @default `.html`
   */
  suffix?: string
}

function addShortPermalink(
  data: AutoFrontmatterData,
  options: AddShortPermalinkOptions,
): void
```

使用 `nanoid` 生成随机字符作为 permalink：

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

**输出**：

```md title="docs/guide.md"
---
permalink: /abcd1234.html
---
```

::: warning
该值是随机的，一旦 frontmatter 丢失就无法复现，也无法保证两个文件得到不同的永久链接。请改用 `createPermalink`。
:::
