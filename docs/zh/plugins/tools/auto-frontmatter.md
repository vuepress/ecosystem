---
icon: pajamas:insert
---

# auto-frontmatter

<NpmBadge package="@vuepress/plugin-auto-frontmatter" />

在 markdown 文件的头部自动插入 frontmatter。

当 vuepress 启动时，根据 **匹配规则** 查找 markdown 文件，使用 `handle(data [,context])`
函数来生成 frontmatter，然后将 frontmatter 添加到 markdown 文件的头部。

::: tip 插件仅处理 [源文件目录](https://v2.vuepress.vuejs.org/zh/guide/getting-started.html#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84) 下的满足 [config.pagePatterns](https://v2.vuepress.vuejs.org/zh/reference/config.html#pagepatterns) 规则的 markdown 文件
:::

## 使用方法

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

## 配置说明

```ts
export type AutoFrontmatterData = Record<string, unknown>

/**
 * markdown 文件的上下文
 */
export interface AutoFrontmatterContext {
  /**
   * 文件绝对路径
   */
  filepath: string
  /**
   * 文件相对路径
   */
  relativePath: string
  /**
   * 文件 markdown 内容
   */
  content: string
}

/**
 * 处理 frontmatter 数据的函数
 */
export type AutoFrontmatterHandle<
  D extends AutoFrontmatterData = AutoFrontmatterData,
> = (data: D, context: AutoFrontmatterContext) => D | Promise<D>

export interface AutoFrontmatterRule {
  /**
   * 文件过滤器，匹配文件的相对路径
   *
   * 使用 [picomatch](https://github.com/micromatch/picomatch) 进行模式匹配
   */
  filter: string[] | string | ((relativePath: string) => boolean)
  /**
   * 处理 frontmatter 数据的函数
   */
  handle: AutoFrontmatterHandle
}

export type AutoFrontmatterPluginOptions =
  | AutoFrontmatterHandle
  | AutoFrontmatterRule
  | AutoFrontmatterRule[]
```

### 处理所有 markdown 文件

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

### 配置生成规则

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

### 多个生成规则

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
