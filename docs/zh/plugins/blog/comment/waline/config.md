# Waline 选项

## 选项

::: fields
@`serverURL` type=string required

Waline 的服务端地址。

@`emoji` type=`(string | WalineEmojiInfo)[] | false` default=`['//unpkg.com/@waline/emojis@1.1.0/weibo']`

评论系统的表情设置。

其类型为：

```ts
type WalineEmojiPresets = `http://${string}` | `https://${string}`

interface WalineEmojiInfo {
  /**
   * 选项卡上的 Emoji 名称
   */
  name: string
  /**
   * 所在文件夹链接
   */
  folder?: string
  /**
   * Emoji 通用路径前缀
   */
  prefix?: string
  /**
   * Emoji 图片的类型，会作为文件扩展名使用
   */
  type?: string
  /**
   * 选项卡显示的 Emoji 图标
   */
  icon: string
  /**
   * Emoji 图片列表
   */
  items: string[]
}
```

参考：[自定义表情](https://waline.js.org/guide/features/emoji.html)。

@`dark` type=`string | boolean` default=`false`

暗黑模式支持。设置为 `true` 开启，`'auto'` 跟随设备偏好，或使用 CSS 选择器条件激活。

参考：[自定义样式](https://waline.js.org/guide/features/style.html)。

@`commentSorting` type=WalineCommentSorting default=`'latest'`

评论列表排序方式。可选值: `'latest'`、`'oldest'` 或 `'hottest'`。

@`meta` type=`string[]` default=`['nick', 'mail', 'link']`

评论者相关属性。可选值: `'nick'`、`'mail'`、`'link'`。

@`requiredMeta` type=`string[]` default=`[]`

评论必填字段。可选值：

- `[]` - 无必填字段
- `['nick']` - 昵称必填
- `['nick', 'mail']` - 昵称和邮箱必填

@`login` type=string default=`'enable'`

登录模式。可选值：

- `'enable'` - 启用登录（默认）
- `'disable'` - 禁用登录，用户填写信息
- `'force'` - 强制登录

@`wordLimit` type=`number | [number, number]` default=`0`

评论字数限制。单个数字设置最大字数，`0` 为无限制。

@`pageSize` type=number default=`10`

每页评论数量。

@`imageUploader` type=`((image: File) => Promise<string>) | false` client-only="Yes"

自定义图片上传方法。默认内嵌 Base64，设置 `false` 禁用。

函数应接收一个图片对象并返回提供图片地址的 Promise。

参考：[自定义图片上传](https://waline.js.org/cookbook/customize/upload-image.html)。

@`highlighter` type=`((code: string, lang: string) => string) | false` client-only="Yes"

代码高亮功能。默认使用 `hanabi`，函数会传入代码块原始内容和语言，你需要直接返回一个字符串。

你也可以传入自己的代码高亮器，或设置 `false` 禁用代码高亮。

参考：[自定义代码高亮](https://waline.js.org/cookbook/customize/highlighter.html)。

@`texRenderer` type=`((blockMode: boolean, tex: string) => string) | false` client-only="Yes"

自定义 TeX 渲染。默认会提示预览模式不支持 TeX。函数提供两个参数：第一个参数指示是否应该在块级渲染，第二个参数是 TeX 内容的字符串。返回 HTML 字符串作为渲染结果。

你可以导入 TeX 渲染器来提供预览功能。我们推荐你使用 KaTeX 或 MathJax，或设置 `false` 禁用 TeX 解析。

参考：[自定义 TeX 渲染器](https://waline.js.org/cookbook/customize/tex-renderer.html)。

@`search` type=`WalineSearchOptions | false` client-only="Yes"

图片搜索功能。设置 `false` 禁用内置搜索。

其类型为：

```ts
interface WalineSearchImageData extends Record<string, unknown> {
  /**
   * 图片链接
   */
  src: string

  /**
   * 图片标题
   *
   * 用于图片的 alt 属性
   */
  title?: string

  /**
   * 图片缩略图
   *
   * 为了更好的加载性能，我们会优先在列表中使用此缩略图
   *
   * @default src
   */
  preview?: string
}

type WalineSearchResult = WalineSearchImageData[]

interface WalineSearchOptions {
  /**
   * 搜索操作
   */
  search: (word: string) => Promise<WalineSearchResult>

  /**
   * 打开列表时展示的默认结果
   *
   * @default () => search('')
   */
  default?: () => Promise<WalineSearchResult>

  /**
   * 获取更多的操作
   *
   * 会在列表滚动到底部时触发，如果你的搜索服务支持分页功能，你应该设置此项实现无限滚动
   *
   * @default (word) => search(word)
   */
  more?: (word: string, currentCount: number) => Promise<WalineSearchResult>
}
```

@`recaptchaV3Key` type=string

reCAPTCHA V3 站点密钥。服务端还需设置 `RECAPTCHA_V3_SECRET` 环境变量。

@`reaction` type=`boolean | string[]` default=`false`

文章表情反应。设置 `true` 使用默认表情，或提供自定义表情 URL 数组（最多 8 个）。

@`metaIcon` type=boolean default=`true` plugin-only="Yes"

是否导入 Meta 图标。

@`locales` type=WalineLocales plugin-only="Yes"

Waline 多语言配置。

其类型为：

```ts
interface WalineLocales {
  [localePath: string]: Partial<WalineLocale>
}
```

参考：[Waline 多语言配置](https://waline.js.org/cookbook/customize/locale.html)。

:::

## 插件配置

在插件中配置可序列化选项：

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Waline',
      serverURL: 'https://waline.example.com',
      // 其他选项...
    }),
  ],
}
```

## 客户端配置

使用 `defineWalineConfig` 配置选项：

```ts title=".vuepress/client.ts"
import { defineWalineConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineWalineConfig({
  // Waline 配置选项
})
```
